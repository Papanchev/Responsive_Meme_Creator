

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



document.getElementById('inputButton').onclick = function() {
    
    var upperText = document.forms["myForm"]["upText"].value;
    var lowerText = document.forms["myForm"]["lowText"].value;

    var img = curImg;
    img.crossOrigin = "Anonymous";
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.crossOrigin = "Anonymous";
    canvas.width = img.width;
    
    canvas.height = img.height;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height);

    var font = (img.height + img.width ) * 0.05;
    font = Math.ceil(font);

    ctx.font = font + "pt Verdana";
    ctx.fillStyle = "red";
    var dy = img.height * 0.1;

    ctx.fillText(upperText,40,dy + font);
    ctx.fillText(lowerText,40,img.height - dy);

    document.getElementById('save_btn').style.visibility = "visible";
   // console.log(ctx.getImageData(50, 50, 100, 100));
}

document.getElementById('gen_btn').onclick = function() {
    var myDiv = document.getElementById('div_img');
    while(myDiv.firstChild) {
        myDiv.removeChild(myDiv.firstChild);
    }

    var index = Math.floor(Math.random() * images.length); 
    var img = document.createElement('img');

  //  img.crossOrigin = "anonymous";
    img.setAttribute("id", "img_id");
    var newSrc = '..' + images[index];
    img.src = newSrc;

    console.log(img.height);
    img.height = 255;
    img.width = 255;
    
    myDiv.appendChild(img);
    console.log(img.height);

    curImg = img;
    pictureLoaded = true;
    document.getElementById('form_id').style.visibility = "visible";
    document.getElementById('inputButton').style.visibility = "visible";
}

var button = document.getElementById('save_btn');
button.addEventListener('click', function (e) {
    var canvas = document.getElementById('canvas');
    canvas.crossOrigin = "anonymous";
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
});

