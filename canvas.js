const CANVAS_W = 200;
const CANVAS_H = 200;

var canvasElem = document.getElementById( 'canvas' );
var canvasCtx = canvasElem.getContext( '2d' );

var imageElem = document.getElementById( 'image' );
var imageCtx = imageElem.getContext( '2d' );
var imageData;

function random(to) {
  return Math.floor( (Math.random() * to) + 1);
}

function initCanvas() {
  for( let i = 0; i < 1200; i++ ) {
    let x = random( CANVAS_W );
    let y = random( CANVAS_H );
    let s = random( 7 );

    canvasCtx.beginPath();
    canvasCtx.arc(x, y, s, 0, 2 * Math.PI);
    canvasCtx.fillStyle = "rgb("+
      Math.floor(Math.random()*256)+","+
      Math.floor(Math.random()*256)+","+
      Math.floor(Math.random()*256)+")";
    canvasCtx.fill();
  }
}

function initImage() {
  imageCtx.drawImage(document.getElementById('img'), 0, 0, CANVAS_W, CANVAS_H)
  console.log( imageCtx.getImageData(0, 0, CANVAS_W, CANVAS_H) )
  imageData = _.flatten( imageCtx.getImageData(0, 0, CANVAS_W, CANVAS_H).data )
}

function canvasToImageData() {
  let imageData = canvasCtx.getImageData(0, 0, CANVAS_W, CANVAS_H);
  return _.flatten( imageData );
  //console.log( imageData );
  //let data = canvasElem.toDataURL().replace(/^data:image\/\w+;base64,/, "");
  //let buf = new Buffer(data, 'base64');
  //fs.writeFileSync('tmp.png', buf);

  //resemble('fly.jpg')
  //.compareTo('tmp.png')
  //.ignoreColors()
  //.onComplete(function(data){
  //  console.log(data);
  //});
}

function imageToImageData() {
  //let imageData = canvasCtx.getImageData(0, 0, CANVAS_W, CANVAS_H);
  //console.log( imageData );
}

initCanvas();
initImage();
//genetic.evolve(config, {});