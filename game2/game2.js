

//var FileSaver = require('file-saver');

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

var curText;
var textPlaced = false;
var textFont;


var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// drawing variables
var xsArr = new Array();
var ysArr = new Array();
var dragArr = new Array();
var isDrawing;

// color variables
var redColor = "#FF0000";
var blueColor = "#0000FF";
var greenColor = "#008000";
var yellowColor = "#FFD700";
var purpleColor = "#800080"; // 	#663399

var currentColor = redColor;
var colorsArr = new Array();

// size of drawing  lines
var smallSize = 2.5;
var mediumSize = 5;
var largeSize = 10;
var hugeSize = 15;

var currentSize = mediumSize;
var sizesArr = new Array();

// marker or eraser tool
var currentTool = "marker";


// preventing scrolling and page reloading when drawin with touch events
document.body.addEventListener("touchstart", function (e) {
    if (e.target.tagName == 'CANVAS') {
        e.preventDefault();
    }
}, false);

document.body.addEventListener("touchend", function (e) {
    if (e.target.tagName == 'CANVAS') {
        e.preventDefault();
    }
}, false);

document.body.addEventListener("touchmove", function (e) {
    if (e.target.tagName == 'CANVAS') {
        e.preventDefault();
    }
}, false);









// generating a text for the user
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
    curText = strings[index];

    textDiv.appendChild(node2);

    // Create the  placeTextButton
    var newButton = document.createElement("BUTTON");
    newButton.setAttribute('id', 'placeTextButton');
    newButton.setAttribute('class', 'btn btn-success mb-2 mt-4');
    newButton.innerHTML = "Place Text on Canvas";

    newButton.onclick = function() {
        var len = curText.length;
        if (len < 4) {
            len = 4
        }
        var font = (canvas.width - 50 )/ len;
        font = Math.ceil(font);
    
        context.font = font + "pt Verdana";
        context.textAlign = "center";
        context.fillText(curText,(canvas.width / 2),font + 10);
        textPlaced = true;
        textFont = font;

        redraw();
    }

    // placing the button into its div
    var placeTextBtnDiv = document.getElementById('placeTextBtnDiv');
    while (placeTextBtnDiv.firstChild) {
        placeTextBtnDiv.removeChild(placeTextBtnDiv.firstChild);
    }
    placeTextBtnDiv.appendChild(newButton);

    // display mainDiv
    document.getElementById("mainDiv").style.display = "block";

}


//handle drawing events
canvas.onmousedown = function (e) {

    var mouseX = e.layerX;
    var mouseY = e.layerY;
    /*
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    */
    isDrawing = true;
    addClick(mouseX, mouseY);
   // addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
}

canvas.onmousemove = function (e) {
    if (isDrawing) {
        addClick(e.layerX, e.layerY, true);
       // addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
    }
}

canvas.onmouseup = function (e) {
    isDrawing = false;
}

canvas.onmouseleave = function (e) {
    isDrawing = false;
}


// handle all arrays
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

// redraws the entire canvas
function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    if (textPlaced) {
        context.font = textFont + "pt Verdana";
        context.textAlign = "center";
        context.fillText(curText,(canvas.width / 2),textFont + 10);
    }

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

document.getElementById('red_btn').onchange = function () {
    currentColor = redColor;
  //  $(this).addClass('active');
}

document.getElementById('blue_btn').onchange = function () {
    currentColor = blueColor;
}

document.getElementById('green_btn').onchange = function () {
    currentColor = greenColor;
}

document.getElementById('yellow_btn').onchange = function () {
    currentColor = yellowColor;
}

document.getElementById('purple_btn').onchange = function () {
    currentColor = purpleColor;
}


document.getElementById('small_btn').onchange = function () {
    currentSize = smallSize;
}

document.getElementById('medium_btn').onchange = function () {
    currentSize = mediumSize;
}

document.getElementById('large_btn').onchange = function () {
    currentSize = largeSize;
}

document.getElementById('huge_btn').onchange = function () {
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

document.getElementById('marker_btn').onchange = function () {
    currentTool = "marker";
}

document.getElementById('eraser_btn').onchange = function () {
    currentTool = "eraser";
}




// use touch events on canvas to fire mouse events.
// making the site mobile-friendly
canvas.addEventListener("touchstart", function (e) {
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


//


var button = document.getElementById('btn_download');
button.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
    
});

/*
    // learn how to import that  shit
document.getElementById('save_btn').onclick = function () {
    canvas.toBlob(function(blob) {
        saveAs(blob, "new_image.png");
    });
}
*/