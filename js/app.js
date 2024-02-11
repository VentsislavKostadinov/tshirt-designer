let tShirtOrTextColor = "";

let colors = `
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

function clearScreen() {
  $("#editorButtons").hide();
  $("#editorImage").hide();
  $("footer").hide();
}

$("#rotate").click(function () {
  $(".img-fluid").toggle();
  $("#preview").toggle();
});

$("#color").click(function () {
  tShirtOrTextColor = "tShirtColor";
  $("#colorModal").modal("show");
});

function drawColors() {
  let html = "";

  html += colors;

  return html;
}

$("#colorDrawer").html(drawColors());

function update(activeAnchor) {
  let group = activeAnchor.getParent();

  let topLeft = group.get(".topLeft")[0];
  let topRight = group.get(".topRight")[0];
  let bottomRight = group.get(".bottomRight")[0];
  let bottomLeft = group.get(".bottomLeft")[0];
  let image = group.get("Image")[0];

  let anchorX = activeAnchor.getX();
  let anchorY = activeAnchor.getY();

  // update anchor positions
  switch (activeAnchor.getName()) {
    case "topLeft":
      topRight.setY(anchorY);
      bottomLeft.setX(anchorX);
      break;
    case "topRight":
      topLeft.setY(anchorY);
      bottomRight.setX(anchorX);
      break;
    case "bottomRight":
      bottomLeft.setY(anchorY);
      topRight.setX(anchorX);
      break;
    case "bottomLeft":
      bottomRight.setY(anchorY);
      topLeft.setX(anchorX);
      break;
  }

  image.position(topLeft.position());

  let width = topRight.getX() - topLeft.getX();
  let height = bottomLeft.getY() - topLeft.getY();
  if (width && height) {
    image.width(width);
    image.height(height);
  }
}

function addAnchor(group, x, y, name) {
  let stage = group.getStage();
  let layer = group.getLayer();

  let anchor = new Konva.Circle({
    x: x,
    y: y,
    stroke: "#666",
    fill: "#ddd",
    strokeWidth: 2,
    radius: 5,
    name: name,
    draggable: true,
    dragOnTop: false,
  });

  anchor.on("dragmove", function () {
    update(this);
    layer.draw();
  });
  anchor.on("mousedown touchstart", function () {
    group.setDraggable(false);
    this.moveToTop();
  });
  anchor.on("dragend", function () {
    group.setDraggable(true);
    layer.draw();
  });
  // add hover styling
  anchor.on("mouseover", function () {
    let layer = this.getLayer();
    document.body.style.cursor = "pointer";
    this.setStrokeWidth(4);
    layer.draw();
  });
  anchor.on("mouseout", function () {
    let layer = this.getLayer();
    document.body.style.cursor = "default";
    this.setStrokeWidth(2);
    layer.draw();
  });

  group.add(anchor);
}

let stage = new Konva.Stage({
  container: "preview",
  width: 158,
  height: 258,
});

let layer = new Konva.Layer();
stage.add(layer);
//stage.draw();

let maxWidth = $(".konvajs-content").innerWidth();
let maxHeight = $(".konvajs-content").innerHeight();

$("#addingText").click(function () {
  tShirtOrTextColor = "textColor";
  $("#editorTextModal").modal("show");
});

$("#drawText").click(addText);

let textNode = new Konva.Text();

const MAX_WIDTH = 150;

function addText() {
  $("#editorTextModal").modal("hide");
  stage.add(layer);

  $("#addModal").modal("hide");
  $("#textMaxLength").show();

  textNode.setAttrs({
    x: 5,
    y: 20,
    width: 140,
    height: "auto",
    fontSize: 22,
    keepRatio: true,
    align: "center",
    text: "Type your text",
    draggable: true,

    dragBoundFunc: function (pos) {
      let newX = pos.x < 0 ? 0 : pos.x && pos.x > 16 ? 16 : pos.x;
      let newY =
        pos.y < 0
          ? 0
          : pos.y && pos.y > stage.height() - textNode.height()
          ? stage.height() - textNode.height()
          : pos.y;

      return {
        x: newX,
        y: newY,
      };
    },
  });

  layer.add(textNode);
  /* SHOW FONT COLORS AFTER TEXT IS ADDED */

  let tr = new Konva.Transformer({
    nodes: [textNode],
    keepRatio: true,
    align: "center",
    enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],

    boundBoxFunc: function (oldBoundBox, newBoundBox) {
      if (Math.abs(newBoundBox.width) > MAX_WIDTH) {
        return oldBoundBox;
      }

      return newBoundBox;
    },
  });

  textNode.on("transform", function () {
    // reset scale, so only with is changing by transformer
    textNode.setAttrs({
      width: textNode.width() * textNode.scaleX(),
      scaleX: 1,
    });
  });

  layer.add(tr);

  layer.on("dragstart", function (e) {
    document.querySelector(".konvajs-content").style.border = "1px solid black";
  });

  layer.on("dragend", function (e) {
    document.querySelector(".konvajs-content").style.border = "none";
  });

  textNode.on("click tap", () => {
    // hide text node and transformer:

    textNode.hide();
    tr.hide();

    // create textarea over canvas with absolute position
    // first we need to find position for textarea
    // how to find it?

    // at first lets find position of text node relative to the stage:
    let textPosition = textNode.absolutePosition();

    // so position of textarea will be the sum of positions above:
    let areaPosition = {
      x: stage.container().offsetLeft + textPosition.x,
      y: stage.container().offsetTop + textPosition.y,
    };

    // create textarea and style it
    let textLenght;
    let textarea = document.createElement("textarea");

    textarea.addEventListener("keyup", (e) => {
      textLenght = e.target.value.length;

      if (textLenght > 16) {
        textarea.style.fontSize = "16px";
      }
    });

    //textarea.setAttribute('maxLength', 15)
    $("#preview").append(textarea);

    // apply many styles to match text on canvas as close as possible
    // remember that text rendering on canvas and on the textarea can be different
    // and sometimes it is hard to make it 100% the same. But we will try...
    textarea.value = textNode.text();
    textarea.style.position = "absolute";
    // textarea.style.top = areaPosition.y + 'px';
    textarea.style.top = "70px";
    // textarea.style.left = areaPosition.x + 'px';
    textarea.style.left = "110px";
    textarea.style.width = textNode.width() - textNode.padding() * 2 + "px";
    // textarea.style.height =
    //   textNode.height() - textNode.padding() * 2 + 5 + 'px';
    textarea.style.maxWidth = stage.width() * 2 + "px";
    textarea.style.fontSize = textNode.fontSize() + "px";
    textarea.style.border = "none";
    textarea.style.padding = "0px";
    textarea.style.margin = "0px";
    textarea.style.overflow = "hidden";
    textarea.style.background = "none";
    textarea.style.outline = "none";
    textarea.style.resize = "none";
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.transformOrigin = "left top";
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill();
    rotation = textNode.rotation();
    let transform = "";
    if (rotation) {
      transform += "rotateZ(" + rotation + "deg)";
    }

    let px = 0;
    // also we need to slightly move textarea on firefox
    // because it jumps a bit
    let isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    if (isFirefox) {
      px += 2 + Math.round(textNode.fontSize() / 20);
    }
    transform += "translateY(-" + px + "px)";

    textarea.style.transform = transform;

    // reset height
    textarea.style.height = "auto";
    // after browsers resized it we can set actual value
    textarea.style.height = textarea.scrollHeight + 3 + "px";

    textarea.focus();

    function removeTextarea() {
      textarea.parentNode.removeChild(textarea);
      window.removeEventListener("click", handleOutsideClick);
      textNode.show();
      tr.show();
      //tr.forceUpdate();
    }

    function setTextareaWidth(newWidth) {
      if (!newWidth) {
        // set width for placeholder
        newWidth = textNode.placeholder.length * textNode.fontSize();
      }
      // some extra fixes on different browsers
      let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      let isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      if (isSafari || isFirefox) {
        newWidth = Math.ceil(newWidth);
      }

      let isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
      if (isEdge) {
        newWidth += 1;
      }
      textarea.style.width = newWidth + "px";
    }

    textarea.addEventListener("keydown", function (e) {
      // hide on enter
      // but don't hide on shift + enter
      if (e.keyCode === 13 && !e.shiftKey) {
        textNode.text(textarea.value);
        removeTextarea();
      }
      // on esc do not set value back to node
      if (e.keyCode === 27) {
        removeTextarea();
      }
    });

    textarea.addEventListener("keydown", function (e) {
      scale = textNode.getAbsoluteScale().x;
      setTextareaWidth(textNode.width() * scale);
      textarea.style.height = "auto";
      textarea.style.height =
        textarea.scrollHeight + textNode.fontSize() + "px";

      if (textLenght > 16) {
        textNode.fontSize(16);
      }
    });

    function handleOutsideClick(e) {
      if (e.target !== textarea) {
        textNode.text(textarea.value);
        removeTextarea();
      }
    }

    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    });
  });
}

$("#fontColorPickerWrap h2").show();
$("#fontColorPicker").html(colors);

let chooseColor = document.querySelectorAll(".color-preview");

for (let i = 0; i < chooseColor.length; i++) {
  chooseColor[i].addEventListener("click", () => {

    if (tShirtOrTextColor === "tShirtColor") {

      $("#colorModal").modal("hide");
      let appliedColor = chooseColor[i].style.backgroundColor;
      $("#editorImage").css("background-color", appliedColor);

    }

    if (tShirtOrTextColor === "textColor") {

      let appliedColor = chooseColor[i].style.backgroundColor;

      textNode.setAttrs({
        fill: appliedColor,
      });
      $("#editorTextModal").modal("hide");
    }
  });
}

/* FONT STYLE */

$("#chooseFontStyle").on("change", function () {
  let chosenFontStyle = $(this).val();

  if (chosenFontStyle === "bold") {
    textNode.setAttrs({
      fontStyle: chosenFontStyle,
      fontSize: 21,
    });
  } else {
    textNode.setAttrs({
      fontStyle: chosenFontStyle,
    });
  }

  $("#editorTextModal").modal("hide");
});

/* FONT FAMILY */

$("#chooseFontFamily").on("change", function () {
  let chosenFontFamily = $(this).val();

  textNode.setAttrs({
    fontFamily: chosenFontFamily,
  });

  $("#editorTextModal").modal("hide");
});

// listen for the file input change event and load the image.
$("#file-select").change(function (e) {
  let spinner = document.querySelector(".spinner-grow");
  let container = document.querySelector(".container-fluid");

  spinner.style.display = "block";
  container.style.display = "none";
  clearCanvas();

  let originalImage = e.target.files[0];

  spinner.style.display = "block";
  document.querySelector(".container-fluid").style.display = "none";

  let originalTotalSize = (originalImage.size / 1048576).toFixed(3);
  originalTotalSize = Number(originalTotalSize);

  imageConversion.compress(originalImage, 0.2).then((res) => {

    let getOriginalImageSize = res.size;
    let totalSizeInKB = (getOriginalImageSize / (1024 * 1024)).toFixed(3);
    totalSizeInKB = Number(totalSizeInKB);

    let url = URL.createObjectURL(res);

    let imageObj1 = new Image();
    imageObj1.onload = function () {
      stage.add(layer);

      // create an image
      let selectedImg = new Konva.Image({
        width: 158,
        draggable: true,
        scaleX: 1,
        scaleY: 1,
        dragBoundFunc: function (pos) {
          let newX =
            pos.x < 0
              ? 0
              : pos.x && pos.x > stage.width() - tr1.width()
              ? stage.width() - tr1.width()
              : pos.x;
          let newY =
            pos.y < 0
              ? 0
              : pos.y && pos.y > stage.height() - tr1.height()
              ? stage.height() - tr1.height()
              : pos.y;

          return {
            x: newX,
            y: newY,
          };
        },
      });
      let canvasContent = document.querySelector(".konvajs-content");

      selectedImg.on("dragstart", function (e) {
        canvasContent.style.border = "1px solid black";
      });

      selectedImg.on("dragend", function (e) {
        canvasContent.style.border = "none";
      });

      // landscape
      if (imageObj1.width > imageObj1.height) {
        selectedImg.setAttrs({
          // width: 180,
          // height: 120
          width: 140,
          height: 90,
        });
      }

      // portrait
      if (imageObj1.width < imageObj1.height) {
        selectedImg.setAttrs({
          //width: 120,
          //height: 180
          width: 90,
          height: 140,
        });
      }

      // square
      if (imageObj1.width === imageObj1.height) {

        selectedImg.setAttrs({
          width: 100,
          height: 100,
        });
      }

      // create image container
      let wrapCanvasContainer = new Konva.Group({
        x: 10,
        y: 10,

        //x: 40,
        //  y: 50,

        draggable: true,
      });

      layer.add(wrapCanvasContainer);
      wrapCanvasContainer.add(selectedImg);

      selectedImg.on("transform", function () {
      });

      let tr1 = new Konva.Transformer({
        nodes: [selectedImg],
        keepRatio: true,
        enabledAnchors: [
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
        ],
        boundBoxFunc: function (oldBoundBox, newBoundBox) {
          if (Math.abs(newBoundBox.width) > MAX_WIDTH) {
            return oldBoundBox;
          }

          return newBoundBox;
        },
      });

      layer.add(tr1);

      selectedImg.image(imageObj1);
      layer.draw();
      $("#addModal").modal("hide");

      spinner.style.display = "none";
      document.querySelector(".container-fluid").style.display = "block";
    };

    imageObj1.src = url;
    spinner.style.display = "none";
    container.style.display = "block";

    //const file = new File([url], 'untitled')

    // end file select
  }); // end compressing
});

$("#delete").on("click", clearCanvas);

function clearCanvas() {
  // remove text, no destroy it if reuse
  layer.destroy();
}

$("#tshirt-add-to-cart").on("click", function () {
  let dataURL = stage.toDataURL();
});
