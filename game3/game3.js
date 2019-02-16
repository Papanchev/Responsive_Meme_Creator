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


//var image;

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

    // make buttons for uploading images visible
    document.getElementById("file_input").style.visibility = "visible";
    document.getElementById("target").style.visibility = "visible";

}

const fileInput = document.getElementById('file_input');
fileInput.addEventListener('change', (e) => createURLObject(e.target.files));

const target = document.getElementById('target');
target.addEventListener('drop', (e) => {
    e.stopPropagation();
    e.preventDefault();

    createURLObject(e.dataTransfer.files);
});

target.addEventListener('dragover', (e) => {
    e.stopPropagation();
    e.preventDefault();

});

function createURLObject(fileList) {
    let file = null;

    for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].type.match(/^image\//)) {
            file = fileList[i];
            break;
        }
    }

    if (file !== null) {
        /*
        var image = document.createElement("IMG");
        image.src = URL.createObjectURL(file);

        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext('2d');

        image.onload = function (e) {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);
        }
        */
        drawImageOnCanvas(file);
        document.getElementById("save_btn").style.visibility = "visible";
    }
}



function drawImageOnCanvas(file) {
    var image = document.createElement("IMG");
    image.src = URL.createObjectURL(file);

    image.height = 255;
    image.width = 255;

    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext('2d');

    image.onload = function (e) {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
    }
}

