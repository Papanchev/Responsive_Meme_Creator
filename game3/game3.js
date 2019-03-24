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
    document.getElementById("text_div").style.display = "block";
    document.getElementById("main_input_div").style.display = "block";
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
        document.getElementById("savebtn_div").style.display = "block";
    }
}


// draw image on canvas
function drawImageOnCanvas(file) {
    // new image => no text placed
    textPlaced = false;
    var toRotate = false;

    // create an image element
    var image = document.createElement("IMG");
    image.src = URL.createObjectURL(file);

    
    

    // resize image
  //  image.height = 255;
  //  image.width = 255;

    // get canvas and context
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext('2d');

    // on load -> draw it
    image.onload = function (e) {
        toRotate = false;
        if (image.width < image.height) {
            toRotate = true;
        }
        toRotate = false;
        image.height = 255;
        image.width = 255;

        if (toRotate) {
            const width = 255; // after rotation
            const height = 255; // after rotation
            const scale = width / image.height; // how much to scale the image to fit
            
            canvas.width = width;
            canvas.height = height;
            context.setTransform(
                0, scale, // x axis down the screen
                -scale, 0, // y axis across the screen from right to left
                width,    // x origin is on the right side of the canvas 
                0         // y origin is at the top
            );
            context.drawImage(image, 0, 0, image.width, image.height);
         //   context.drawImage(image, 0, 0);
            context.setTransform(1, 0, 0, 1, 0, 0);
        } else {
            // no need to rotate image
            /*
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, image.width, image.height);
            */


            const width = 255; // after rotation
            const height = 255; // after rotation
            const scale = width / image.height; // how much to scale the image to fit
            
            canvas.width = width;
            canvas.height = height;

            context.drawImage(image, 0, 0, image.width, image.height);
          //  context.drawImage(image, 0, 0);
        }
    }

    // create button for placing text on image, iff not created so far
    if (!buttonPlacedBool) {
        // create new button and set attributes
        var newButton = document.createElement("BUTTON");
        newButton.setAttribute('id', 'placeTextButton');
        newButton.setAttribute('class', 'btn btn-success mb-1');
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


var button = document.getElementById('btn_download');
button.addEventListener('click', function (e) {
    var canvas = document.getElementById('myCanvas');
    canvas.crossOrigin = "anonymous";
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
});

document.getElementById('link_btn').onclick = function () {
    var currentUrl = window.location.href;
    var n = currentUrl.lastIndexOf('/');
    currentUrl = currentUrl.substring(0, n);
    n = currentUrl.lastIndexOf('/');
    currentUrl = currentUrl.substring(0, n);

    currentUrl = currentUrl + "/index.html"
    window.location.href = currentUrl;
}