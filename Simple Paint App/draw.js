var canvas,
    context,
    dragging = false,
    dragStartLocation,
    snapshot;


function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function takeSnapshot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}
// Draw Triangle

function drawTriangle(position, sides, angle) {
    var coordinates = [],
        radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: dragStartLocation.x + radius * Math.cos(angle), y: dragStartLocation.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }
    context.closePath();
}

function draw(position) {
    var Sides = 3,
        Angle = 90
        drawTriangle(position, Sides, Angle * (Math.PI / 180));
        context.fillStyle = RandColor();
        context.fill()
}
// Mouse Event

function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapshot();
}

function drag(event) {
    var position;
    if (dragging === true) {
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        draw(position);
    }
}

function dragStop(event) {
    dragging = false;
    restoreSnapshot();
    var position = getCanvasCoordinates(event);
    draw(position);
}
// Get Random Color

function RandColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// Delete Particular Element

function deleteRect(){
    canvas.clearRect(canvas.left,canvas.top,canvas.width,canvas.height);
}
// Clear All Canvas

function resetCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
// Main

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    var clearCanvas = document.getElementById("clearCanvas");

    context.strokeStyle = 'black';
    context.lineWidth = "1";
    context.lineCap = 'round';
    
    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
    clearCanvas.addEventListener('ondblclick', deleteRect,false);
    clearCanvas.addEventListener('click', resetCanvas, false);
}

window.addEventListener('load', init, false);