const CANVAS_W = 200;
const CANVAS_H = 200;

var canvasElem = document.getElementById( 'canvas' );
var canvasCtx = canvasElem.getContext( '2d' );

var imageElem = document.getElementById( 'image' );
var imageCtx = imageElem.getContext( '2d' );
var imageData;

var hiddenCanvasElem = document.getElementById( 'fitness' );
var hiddenCanvasCtx  = hiddenCanvasElem.getContext( '2d' );

function random(to) {
  return Math.floor( (Math.random() * to) + 1);
}

function initCanvas() {
  // for( let i = 0; i < 100; i++ ) {
  //   let x = random( CANVAS_W );
  //   let y = random( CANVAS_H );
  //   let s = random( 20 );

  //   canvasCtx.beginPath();
  //   canvasCtx.arc(x, y, s, 0, 2 * Math.PI);
  //   canvasCtx.fillStyle = "rgb("+
  //     Math.floor(Math.random()*256)+","+
  //     Math.floor(Math.random()*256)+","+
  //     Math.floor(Math.random()*256)+")";
  //   canvasCtx.fill();
  // }

  // canvasCtx.fillStyle = 'red'
  // canvasCtx.fillRect(0, 0, 200, 100)
  // canvasCtx.fillStyle = 'blue'
  // canvasCtx.fillRect(0, 100, 200, 100)
  // canvasCtx.fill()

  // let canvasData = _.flatten( canvasCtx.getImageData(0, 0, CANVAS_W, CANVAS_H).data )
  // let sum = 0;
  // for( let i = 0; i < canvasData.length; i++ ) {
  //   sum += ( Math.abs(canvasData[i] - imageData[i]) )
  //   console.log( Math.abs(canvasData[i] - imageData[i]))
  // }

  // console.log( sum )
}

function initImage() {
  var hiddenImgElem = document.getElementById('img');
  console.log( 'Init image', hiddenImgElem )
  imageCtx.drawImage(hiddenImgElem, 0, 0, CANVAS_W, CANVAS_H)
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

//initImage();
//initCanvas();
//genetic.evolve(config, {});