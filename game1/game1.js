

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

  //  var font = (img.height + img.width ) * 0.05;
    var len = (upperText.length > lowerText.length) ? upperText.length : lowerText.length;
    if (len < 4) {
        len = 4
    }
    var font = (img.width - 50 )/ len
    font = Math.ceil(font);

    ctx.font = font + "pt Verdana";
    console.log(ctx.font);
    ctx.fillStyle = "red";
   // var dy = img.height * 0.1;

    ctx.textAlign = "center";
    ctx.fillText(upperText,(img.width / 2),font + 10);
    ctx.fillText(lowerText,(img.width / 2),img.height - 15);

    document.getElementById('save_div').style.display = "block";
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

    img.height = 255;
    img.width = 255;
    
    myDiv.appendChild(img);

    curImg = img;
    pictureLoaded = true;
    document.getElementById("input_div").style.display = "block";
  //  document.getElementById('form_id').style.visibility = "visible";
  //  document.getElementById('inputButton').style.visibility = "visible";
}

var button = document.getElementById('save_btn');
button.addEventListener('click', function (e) {
    var canvas = document.getElementById('canvas');
    canvas.crossOrigin = "anonymous";
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
});


document.getElementById('link_btn').onclick = function() {
  var currentUrl = window.location.href;
  var n = currentUrl.lastIndexOf('/');
  currentUrl = currentUrl.substring(0,n);
  n = currentUrl.lastIndexOf('/');
  currentUrl = currentUrl.substring(0,n);

  currentUrl = currentUrl + "/index.html"
  window.location.href = currentUrl;
}
