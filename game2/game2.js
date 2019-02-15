var strings = [
    "Women..",
    "Men..",
    "I have an exam tomorrow",
    "Man\'s best friend",
    "I love trains",
    "Mobile Computing",
    "Flutter: It is just..",
    "I can\'t think of anything..",
]

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var xsArr = new Array();
var ysArr = new Array();
var dragArr = new Array();
var isDrawing;

var redColor = "#FF0000";
var blueColor = "#0000FF";
var greenColor = "#008000";
var yellowColor = "#FFD700";
var purpleColor = "#800080"; // 	#663399

var currentColor = redColor;
var colorsArr = new Array();

var smallSize = 2.5;
var mediumSize = 5;
var largeSize = 8;
var hugeSize = 11;

var currentSize = mediumSize;
var sizesArr = new Array();

var currentTool = "marker";

////

document.body.addEventListener("touchstart", function (e) {
    if (e.target.tagName == 'CANVAS') {
        e.preventDefault();
        addElement();
    }
}, false);

document.body.addEventListener("touchend", function (e) {
    if (e.target.tagName == 'CANVAS') {
        e.preventDefault();
        addElement();
    }
}, false);

document.body.addEventListener("touchmove", function (e) {
    if (e.target.tagName == 'CANVAS') {
        e.preventDefault();
        addElement();
    }
}, false);



/////









document.getElementById('btn').onclick = function () {

    var textDiv = document.getElementById('text_div');
    while (textDiv.firstChild) {
        textDiv.removeChild(textDiv.firstChild);
    }

    var index = Math.floor(Math.random() * strings.length);

    var node = document.createTextNode("Your text is: ");
    //   var textDiv = document.getElementById('text_div');
    textDiv.appendChild(node);

    var node2 = document.createTextNode(strings[index]);
    textDiv.appendChild(node2);

    // draw text on canvas

    document.getElementById("save_btn").style.visibility = "visible";
}

canvas.onmousedown = function (e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    isDrawing = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
}

canvas.onmousemove = function (e) {
    if (isDrawing) {
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
    }
}

canvas.onmouseup = function (e) {
    isDrawing = false;
}

canvas.onmouseleave = function (e) {
    isDrawing = false;
}



function addClick(x, y, dragging) {
    xsArr.push(x);
    ysArr.push(y);
    dragArr.push(dragging);
    if (currentTool == "eraser") {
        colorsArr.push("white");
    } else {
        colorsArr.push(currentColor);
    }
    sizesArr.push(currentSize);
}


function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    //   context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    //context.lineWidth = 5;

    for (var i = 0; i < xsArr.length; i++) {
        context.beginPath();
        if (dragArr[i] && i) {
            context.moveTo(xsArr[i - 1], ysArr[i - 1]);
        } else {
            context.moveTo(xsArr[i] - 1, ysArr[i]);
        }
        context.lineTo(xsArr[i], ysArr[i]);
        context.closePath();
        context.strokeStyle = colorsArr[i];
        context.lineWidth = sizesArr[i];
        context.stroke();
    }

}

document.getElementById('red_btn').onclick = function () {
    currentColor = redColor;
}

document.getElementById('blue_btn').onclick = function () {
    currentColor = blueColor;
}

document.getElementById('green_btn').onclick = function () {
    currentColor = greenColor;
}

document.getElementById('yellow_btn').onclick = function () {
    currentColor = yellowColor;
}

document.getElementById('purple_btn').onclick = function () {
    currentColor = purpleColor;
}

document.getElementById('small_btn').onclick = function () {
    currentSize = smallSize;
}

document.getElementById('medium_btn').onclick = function () {
    currentSize = mediumSize;
}

document.getElementById('large_btn').onclick = function () {
    currentSize = largeSize;
}

document.getElementById('huge_btn').onclick = function () {
    currentSize = hugeSize;
}

document.getElementById('clear_btn').onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    xsArr = new Array();
    ysArr = new Array();
    dragArr = new Array();
    colorsArr = new Array();
    sizesArr = new Array();
}

document.getElementById('marker_btn').onclick = function () {
    currentTool = "marker";
}

document.getElementById('eraser_btn').onclick = function () {
    currentTool = "eraser";
}


canvas.addEventListener("touchstart", function (e) {
//    mousePos = getTouchPos(canvas, e);
    e.preventDefault();
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchend", function (e) {
    e.preventDefault();
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchmove", function (e) {
    e.preventDefault();
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

document.body.addEventListener("touchcancel", function (e) {
    e.preventDefault();
    var mouseEvent = new MouseEvent("onmouseleave", {});
    canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}






function addElement() {
    var testDiv = document.getElementById('test');

    var node = document.createTextNode("ASDDDDDDDDDDSADadsadasdsasdasds: ");
    //   var textDiv = document.getElementById('text_div');
    testDiv.appendChild(node);
}

