// array of all generated strings
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

// currently generated text if any
var curText;
//currently placed text if any
var curPlacedText;
// is there a text placed
var textPlaced = false;
// is the placed button placed
var buttonPlacedBool = false;

// handle of generate text buton
document.getElementById('btn').onclick = function () {
    // remove old generated things
    var textDiv = document.getElementById('text_div');
    while (textDiv.firstChild) {
        textDiv.removeChild(textDiv.firstChild);
    }

    // choose random index
    var index = Math.floor(Math.random() * strings.length);

    // create TextNode
    var node = document.createTextNode("Your text is: ");
    //   var textDiv = document.getElementById('text_div');
    textDiv.appendChild(node);

    // create TextNode
    var node2 = document.createTextNode(strings[index]);
    curText = strings[index];
    textDiv.appendChild(node2);

    // make buttons for uploading images visible
    document.getElementById("file_input").style.visibility = "visible";
    document.getElementById("target").style.visibility = "visible";
}

// listener for the file_input button
const fileInput = document.getElementById('file_input');
fileInput.addEventListener('change', (e) => createURLObject(e.target.files));

// get the target for DnD
const target = document.getElementById('target');
// listener for drop
target.addEventListener('drop', (e) => {
    e.stopPropagation();
    e.preventDefault();

    createURLObject(e.dataTransfer.files);
});

// listener for dragover
target.addEventListener('dragover', (e) => {
    e.stopPropagation();
    e.preventDefault();
});

// get image from fileList and create it
function createURLObject(fileList) {
    let file = null;

    for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].type.match(/^image\//)) {
            file = fileList[i];
            break;
        }
    }

    if (file !== null) {
        drawImageOnCanvas(file);
        // make save button visible
        document.getElementById("save_btn").style.visibility = "visible";
    }
}


// draw image on canvas
function drawImageOnCanvas(file) {
    // new image => no text placed
    textPlaced = false;

    // create an image element
    var image = document.createElement("IMG");
    image.src = URL.createObjectURL(file);

    // resize image
    image.height = 255;
    image.width = 255;

    // get canvas and context
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext('2d');

    // on load -> draw it
    image.onload = function (e) {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
    }

    // create button for placing text on image, iff not created so far
    if (!buttonPlacedBool) {
        // create new button and set attributes
        var newButton = document.createElement("BUTTON");
        newButton.setAttribute('id', 'placeTextButton');
        newButton.setAttribute('class', 'button');
        newButton.innerHTML = "Place Text on Image";

        // add button to btnDiv
        var btnDiv = document.getElementById("placeTextButtonDiv");
        btnDiv.appendChild(newButton);
        // placeTextButton is placed
        buttonPlacedBool = true;

        // define onClick function for the new button
        newButton.onclick = function () {

            // if text already placed
            if (textPlaced) {
                // if the same text -> work  is done
                if (curText == curPlacedText) {
                    return;
                }
                // clear canvas and redraw current image
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                //      canvas.width = image.width;
                //     canvas.height = image.height;
                context.drawImage(image, 0, 0, image.width, image.height);
            }

            // get length of current image
            // we use that for calculating font appropriately
            var len = curText.length;
            if (len < 4) {
                // font can't be so big
                len = 4
            }

            // calculate font appropriately
            var font = (canvas.width - 50) / len + 3;
            font = Math.ceil(font);
            if (font < 14 && len <= 27) {
                font = 14
            }

            // draw text on canvas
            context.fillStyle = "red";
            context.font = font + "pt Verdana";
            context.textAlign = "center";
            context.fillText(curText, (canvas.width / 2), font + 10);
            textPlaced = true;
            curPlacedText = curText;
        } // end of button on click
    } // end of if
} // end of function drawImageOnCanvas

