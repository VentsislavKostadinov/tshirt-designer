/*window.onload = initialTshirtImg()


  function initialTshirtImg() {
    let img = document.querySelector(".frontImage");
    //img.style.display = 'block';
   // console.log(img.src);

    let imgTest = new Image();
    imgTest.src = img.src;
    console.log(imgTest.src);
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
      ctx.drawImage(imgTest, 150, 150);


  } */

  function clearScreen() {
    $('#editorButtons').hide();
    $('#editorImage').hide();
    $('footer').hide()

}

$("#rotate").click(function () {
    $(".img-fluid").toggle();
    $('#preview').toggle();
});

$('#color').click(function () {

    $('#colorModal').modal('show');
})

function drawColors() {

    let html = '';

    html += `
    <ul class="list-group">
    <li class="list-group-item color-preview"  title="White" style="background-color:#ffffff;"></li>
    <li class="list-group-item color-preview"  title="Dark Heather" style="background-color:#616161;"></li>
    <li class="list-group-item color-preview" title="Gray" style="background-color:#f0f0f0;"></li>
    <li class="list-group-item color-preview" title="Charcoal" style="background-color:#5b5b5b;"></li>
    <li class="list-group-item color-preview"  title="Black" style="background-color:#222222;"></li>
    <li class="list-group-item color-preview"  title="Heather Orange" style="background-color:#fc8d74;"></li>
    <li class="list-group-item color-preview"  title="Heather Dark Chocolate" style="background-color:#432d26;"></li>
    <li class="list-group-item color-preview"  title="Salmon" style="background-color:#eead91;"></li>
    <li class="list-group-item color-preview"  title="Chesnut" style="background-color:#806355;"></li>
    <li class="list-group-item color-preview"  title="Dark Chocolate" style="background-color:#382d21;"></li>
    <li class="list-group-item color-preview"  title="Citrus Yellow" style="background-color:#faef93;"></li>
    <li class="list-group-item color-preview"  title="Avocado" style="background-color:#aeba5e;"></li>
    <li class="list-group-item color-preview"  title="Kiwi" style="background-color:#8aa140;"></li>
    <li class="list-group-item color-preview"  title="Irish Green" style="background-color:#1f6522;"></li>
    <li class="list-group-item color-preview"  title="Scrub Green" style="background-color:#13afa2;"></li>
    <li class="list-group-item color-preview"  title="Teal Ice" style="background-color:#b8d5d7;"></li>
    <li class="list-group-item color-preview"  title="Heather Sapphire" style="background-color:#15aeda;"></li>
    <li class="list-group-item color-preview"  title="Sky" style="background-color:#a5def8;"></li>
    <li class="list-group-item color-preview"  title="Antique Sapphire" style="background-color:#0f77c0;"></li>
    <li class="list-group-item color-preview" title="Heather Navy" style="background-color:#3469b7;"></li>							
    <li class="list-group-item color-preview"  title="Cherry Red" style="background-color:#c50404;"></li>
  </ul>
    `;

    return html;
}

$('#colorDrawer').html(drawColors())

let colorPreview = document.querySelectorAll('.color-preview');
for (let i = 0; i < colorPreview.length; i++) {

    colorPreview[i].addEventListener('click', () => {

        $('#colorModal').modal('hide');
        let appliedColor = colorPreview[i].style.backgroundColor;
        $('#editorImage').css('background-color', appliedColor)

        console.log($('#editorImage').css('background-color'))
    })
}

/*let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let img = new Image();

let Input = document.getElementById('words');
let x = 10;
let y = 30;
ctx.font = "bold 20px sans-serif";
ctx.fillStyle = "black";
$('#words').keyup(function () {
    ctx.fillText($("#words").val(), x, y);
});

var imageLoader = document.getElementById('file-select');
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (e) {
        // img = new Image();
        img.onload = function () {
            imageWidth = img.width / 6;

            imageHeight = img.height / 5;
            imageRight = imageX + imageWidth;
            imageBottom = imageY + imageHeight;
            draw(true, true);
        }

      
        img.src = e.target.result;
        //console.log(reader.result); base64

    }
    reader.readAsDataURL(e.target.files[0]);
    


    $('#addModal').modal('hide')

}

var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

var startX;
var startY;
var isDown = false;

var pi2 = Math.PI * 2;
var resizerRadius = 3;
var rr = resizerRadius * resizerRadius;
var draggingResizer = {
    x: 0,
    y: 0
};
var imageX = 0;
var imageY = 0;
var imageWidth, imageHeight, imageRight, imageBottom;
var draggingImage = false;
var startX;
var startY;

/*var img = new Image();
img.onload = function () {
    imageWidth = canvas.width;
    imageHeight = canvas.height;
    imageRight = imageX + imageWidth;
    imageBottom = imageY + imageHeight
    draw(true, false);
}
img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"; */


/*function draw(withAnchors, withBorders) {

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the image
    ctx.drawImage(img, 0, 0, img.width, img.height, imageX, imageY, imageWidth, imageHeight);

    // optionally draw the draggable anchors 
        if (withAnchors) {
            drawDragAnchor(imageX, imageY);
            drawDragAnchor(imageRight, imageY);
            drawDragAnchor(imageRight, imageBottom);
            drawDragAnchor(imageX, imageBottom);
        }

        // optionally draw the connecting anchor lines
        if (withBorders) {
            ctx.beginPath();
            ctx.moveTo(imageX, imageY);
            ctx.lineTo(imageRight, imageY);
            ctx.lineTo(imageRight, imageBottom);
            ctx.lineTo(imageX, imageBottom);
            ctx.closePath();
            ctx.stroke();
        }
  

}

function drawDragAnchor(x, y) {

    ctx.beginPath();
    ctx.arc(x, y, resizerRadius, 0, pi2, false);
    ctx.closePath();
    ctx.fill();
}

function anchorHitTest(x, y) {

    var dx, dy;

    // top-left
    dx = x - imageX;
    dy = y - imageY;
    if (dx * dx + dy * dy <= rr) {
        return (0);
    }
    // top-right
    dx = x - imageRight;
    dy = y - imageY;
    if (dx * dx + dy * dy <= rr) {
        return (1);
    }
    // bottom-right
    dx = x - imageRight;
    dy = y - imageBottom;
    if (dx * dx + dy * dy <= rr) {
        return (2);
    }
    // bottom-left
    dx = x - imageX;
    dy = y - imageBottom;
    if (dx * dx + dy * dy <= rr) {
        return (3);
    }
    return (-1);

}


function hitImage(x, y) {

    return (x > imageX && x < imageX + imageWidth && y > imageY && y < imageY + imageHeight);

}


function handleMouseDown(e) {
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    draggingResizer = anchorHitTest(startX, startY);
    draggingImage = draggingResizer < 0 && hitImage(startX, startY);
}

function handleMouseUp(e) {
    draggingResizer = -1;
    draggingImage = false;
    draw(true, false);
}

function handleMouseOut(e) {
    handleMouseUp(e);
}

function handleMouseMove(e) {




    if (draggingResizer > -1) {

        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);

        // resize the image
        console.log(draggingResizer);
        switch (draggingResizer) {
            case 0:
                //top-left
                imageX = mouseX;
                imageWidth = imageRight - mouseX;
                imageY = mouseY;
                imageHeight = imageBottom - mouseY;
                break;
            case 1:
                //top-right
                imageY = mouseY;
                imageWidth = mouseX - imageX;
                imageHeight = imageBottom - mouseY;
                break;
            case 2:
                //bottom-right
                imageWidth = mouseX - imageX;
                imageHeight = mouseY - imageY;
                break;
            case 3:
                //bottom-left
                imageX = mouseX;
                imageWidth = imageRight - mouseX;
                imageHeight = mouseY - imageY;
                break;
        }

        if (imageWidth < 25) {
            imageWidth = 25;
        }
        if (imageHeight < 25) {
            imageHeight = 25;
        }

        // set the image right and bottom
        imageRight = imageX + imageWidth;
        imageBottom = imageY + imageHeight;

        // redraw the image with resizing anchors
        draw(true, true);

    } else if (draggingImage) {

        imageClick = false;

        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);

        // move the image by the amount of the latest drag
        var dx = mouseX - startX;
        var dy = mouseY - startY;
        imageX += dx;
        imageY += dy;
        imageRight += dx;
        imageBottom += dy;
        // reset the startXY for next time
        startX = mouseX;
        startY = mouseY;

        // redraw the image with border
        draw(false, true);

    }


}


$("#canvas").mousedown(function (e) {
    handleMouseDown(e);
});
$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});
$("#canvas").mouseup(function (e) {
    handleMouseUp(e);
});
$("#canvas").mouseout(function (e) {
    handleMouseOut(e);
}); */



/*let resetCanvas = document.getElementById('reset');
resetCanvas.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

const saveImg = document.getElementById('tshirt-add-to-cart');
saveImg.addEventListener('click', () => {

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    //let img = new Image();

    img.onload = function() {

        ctx.drawImage(img, 0, 0);

    }

    let image = document.querySelector('.frontImage');
    console.log(image);
    img.src = image.src

    console.log(canvas.toDataURL('image/jpeg'));
}) */

var stage = new Konva.Stage({
    container: 'preview',
    width: 430,
    height: 530,
    });

// listen for the file input change event and load the image.
$("#file-select").change(function(e){

    function update(activeAnchor) {
        var group = activeAnchor.getParent();
    
        var topLeft = group.get('.topLeft')[0];
        var topRight = group.get('.topRight')[0];
        var bottomRight = group.get('.bottomRight')[0];
        var bottomLeft = group.get('.bottomLeft')[0];
        var image = group.get('Image')[0];
    
        var anchorX = activeAnchor.getX();
        var anchorY = activeAnchor.getY();
    
        // update anchor positions
        switch (activeAnchor.getName()) {
            case 'topLeft':
                topRight.setY(anchorY);
                bottomLeft.setX(anchorX);
                break;
            case 'topRight':
                topLeft.setY(anchorY);
                bottomRight.setX(anchorX);
                break;
            case 'bottomRight':
                bottomLeft.setY(anchorY);
                topRight.setX(anchorX);
                break;
            case 'bottomLeft':
                bottomRight.setY(anchorY);
                topLeft.setX(anchorX);
                break;
        }
    
        image.position(topLeft.position());
    
        var width = topRight.getX() - topLeft.getX();
        var height = bottomLeft.getY() - topLeft.getY();
        if(width && height) {
            image.width(width);
            image.height(height);
        }
    }
    function addAnchor(group, x, y, name) {
        var stage = group.getStage();
        var layer = group.getLayer();
    
        var anchor = new Konva.Circle({
            x: x,
            y: y,
            stroke: '#666',
            fill: '#ddd',
            strokeWidth: 2,
            radius: 5,
            name: name,
            draggable: true,
            dragOnTop: false
        });
    
        anchor.on('dragmove', function() {
            update(this);
            layer.draw();
        });
        anchor.on('mousedown touchstart', function() {
            group.setDraggable(false);
            this.moveToTop();
        });
        anchor.on('dragend', function() {
            group.setDraggable(true);
            layer.draw();
        });
        // add hover styling
        anchor.on('mouseover', function() {
            var layer = this.getLayer();
            document.body.style.cursor = 'pointer';
            this.setStrokeWidth(4);
            layer.draw();
        });
        anchor.on('mouseout', function() {
            var layer = this.getLayer();
            document.body.style.cursor = 'default';
            this.setStrokeWidth(2);
            layer.draw();
        });
    
        group.add(anchor);
    }
    
   
    
    var layer = new Konva.Layer();
    stage.add(layer);
    //stage.draw();
    
    
    var selectedImg = new Konva.Image({
        width: 170,
        height: 90
    });
    
    
    var selectedImgPortrait = new Konva.Image({
        width: 120,
        height: 200
    });
    
    let selectedImgSquare = new Konva.Image({
    
        width: 120,
        height: 120
    })
    
    //x: 115,
    //y: 100,
    
    var wrapKonvaContainer = new Konva.Group({
        x: 100,
        y: 70,
        draggable: true
    });
    
    // x: 145,
    // y: 90
    
    var wrapKonvaContainer2 = new Konva.Group({
        x: 125,
        y: 50,
        draggable: true
    });
    
    var wrapKonvaContainer3 = new Konva.Group({
        x: 125,
        y: 50,
        draggable: true
    });
    
    
    layer.add(wrapKonvaContainer3);
    //layer.add(wrapKonvaContainer2);
   // layer.add(wrapKonvaContainer3);
   // wrapKonvaContainer.add(selectedImg);
   // wrapKonvaContainer.add(selectedImgPortrait);
    wrapKonvaContainer3.add(selectedImgSquare);

    var tr3 = new Konva.Transformer({
        nodes: [selectedImgSquare],
        keepRatio: true,
        enabledAnchors: [
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
        ],
    });
    layer.add(tr3);


  var url = URL.createObjectURL(e.target.files[0]);

  console.log(url);



  var imageObj1 = new Image();
  imageObj1.onload = function() {

    let imgWidth = imageObj1.width;
    let imgHeight = imageObj1.height;
    console.log(imgWidth);
    console.log(imgHeight);

/*    if(imgWidth > imgHeight) {

        console.log('landscale');

        var tr1 = new Konva.Transformer({
            nodes: [selectedImg],
            keepRatio: true,
            enabledAnchors: [
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
            ],
        });
        layer.add(tr1);

        selectedImg.image(imageObj1);
        console.log(selectedImg);

        // if portrait
    } else if(imgWidth < imgHeight) {

        console.log('portrait');

        var tr2 = new Konva.Transformer({
            nodes: [selectedImgPortrait],
            keepRatio: true,
            enabledAnchors: [
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
            ],
        });
        layer.add(tr2);
        selectedImgPortrait.image(imageObj1)
   
    } else {
               console.log('square');
        var tr3 = new Konva.Transformer({
            nodes: [selectedImgSquare],
            keepRatio: true,
            enabledAnchors: [
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
            ],
        });
        layer.add(tr3);
        selectedImgSquare.image(imageObj1);
    } */

    //  console.log(selectedImg); // obj with image data
    selectedImgSquare.image(imageObj1);
      layer.draw();
      $('#addModal').modal('hide');

  };
  imageObj1.src = url;

/*var URL = window.webkitURL || window.URL;
var url = URL.createObjectURL(e.target.files[0]);
var img = new Image();
img.src = url;

img.onload = function() {

  var img_width = img.width;
  var img_height = img.height;

  // calculate dimensions to get max 300px
  var max = 300;
  var ratio = (img_width > img_height ? (img_width / max) : (img_height / max))

  // now load the Konva image
  var theImg = new Konva.Image({
    image: img,
    x: 50,
    y: 30,
    width: img_width/ratio,
    height: img_height/ratio,
    draggable: true

  });

  layer.add(theImg);
  layer.draw();
} */

});

$('#delete').on('click', function() {

    stage.destroy()
 
    
})