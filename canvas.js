var canvasElem = document.getElementById( 'canvas' );
var canvasCtx = canvasElem.getContext( '2d' );

var imageElem = document.getElementById( 'image' );
var imageCtx = imageElem.getContext( '2d' );

const CANVAS_W = 480;
const CANVAS_H = 480;

function random(to) {
  return Math.floor( (Math.random() * to) + 1);
}

function initCanvas() {
  for( let i = 0; i < 1000; i++ ) {
    let x = random( CANVAS_W );
    let y = random( CANVAS_H );
    let s = random( 50 );

    canvasCtx.beginPath();
    canvasCtx.arc(x, y, s, 0, 2 * Math.PI);
    canvasCtx.fillStyle = "rgb("+
      Math.floor(Math.random()*256)+","+
      Math.floor(Math.random()*256)+","+
      Math.floor(Math.random()*256)+")";
    canvasCtx.fill();
  }
}

function canvasToImageData() {
  let imageData = canvasCtx.getImageData(0, 0, CANVAS_W, CANVAS_H);
  console.log( imageData );
}

function imageToImageData() {
  let imageData = canvasCtx.getImageData(0, 0, CANVAS_W, CANVAS_H);
  console.log( imageData );
}

initCanvas();
canvasToImageData();
imageToImageData();