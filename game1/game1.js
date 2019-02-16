

var images = [
    "/images/img0.jpg",
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
    "/images/img6.jpg",
    "/images/img7.jpg",
]

var curImgSrc = "";
var curImg;
var pictureLoaded = false;

function pageLoad() {
    /*
    if (pictureLoaded) {
        var myDiv = document.getElementById('div_img');
        var img = document.createElement('img');
        img.setAttribute("id", "img_id");
        img.src = curImgSrc;
        myDiv.appendChild(img);
    }
    */
}



document.getElementById('inputButton').onclick = function() {
    /*
    if (pictureLoaded) {
        var myDiv = document.getElementById('div_img');
        var img = document.createElement('img');
        img.setAttribute("id", "img_id");
        img.src = curImgSrc;
        myDiv.appendChild(img);
    }
    */
    
    var upperText = document.forms["myForm"]["upText"].value;
    var lowerText = document.forms["myForm"]["lowText"].value;

    var img = curImg;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.crossOrigin = "Anonymous";
    canvas.width = img.width;
    
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    var font = (img.height + img.width ) * 0.05;
    font = Math.ceil(font);

    ctx.font = font + "pt Verdana";
    ctx.fillStyle = "red";
    var dy = img.height * 0.1;

    ctx.fillText(upperText,40,dy + font);
    ctx.fillText(lowerText,40,img.height - dy);
   // console.log(ctx.getImageData(50, 50, 100, 100));
}

document.getElementById('btn').onclick = function() {
    var myDiv = document.getElementById('div_img');
    while(myDiv.firstChild) {
        myDiv.removeChild(myDiv.firstChild);
    }

    var index = Math.floor(Math.random() * images.length); 
    var img = document.createElement('img');
    img.setAttribute("id", "img_id");
    var newSrc = '..' + images[index];
    img.src = newSrc;

    console.log(img.src);

    myDiv.appendChild(img);
    curImg = img;
    pictureLoaded = true;
    document.getElementById('form_id').style.visibility = "visible";
}

