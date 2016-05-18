const Task = require('genetic').Task
const FITNESS_MAX = 160000 * 256;

console.log( "FitMax ", FITNESS_MAX )

/* Parameters */
var popSize = 20;
var mutateRate = 0.1;
var crossRate = 0.7;
var solutionSize = 150;
var generations = 100000;
var maxElemSize = 20;
/* Parameters END */

var winner;

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function getSetting( id ) {
  return document.getElementById( id ).value;
}

function crossover( mother, father, cb ) {
  let n = random( mother.length - 1 )
  cb( _.first(mother, n).concat(_.rest(father, n)) )
}

function mutate( solution, cb ) {
  solution[ random(solutionSize - 1) ] = {
    'x': random(CANVAS_W), 
    'y': random(CANVAS_H),
    's': random(maxElemSize),
    'c': "rgb("+
      Math.floor(Math.random()*256)+","+
      Math.floor(Math.random()*256)+","+
      Math.floor(Math.random()*256)+")"
  }
  cb( solution )
}

function getRandomSolution( cb ) {
  let solution = [];
  for( let i = 0; i < solutionSize; i++ ) {
    solution.push({
      'x': random(CANVAS_W), 
      'y': random(CANVAS_H), 
      's': random(maxElemSize),
      'c': "rgb("+
        Math.floor(Math.random()*256)+","+
        Math.floor(Math.random()*256)+","+
        Math.floor(Math.random()*256)+")"
    })
  }
  cb( solution )
}

function stopCriteria() {
  return (this.generation == generations)
}

function fitness( solution, cb ) {
  hiddenCanvasCtx.clearRect(0, 0, CANVAS_W, CANVAS_H)
  for( let i = 0; i < solution.length; i++ ) {
    hiddenCanvasCtx.beginPath();
    hiddenCanvasCtx.arc( solution[i].x, solution[i].y, solution[i].s, 0, 2*Math.PI)
    hiddenCanvasCtx.fillStyle = solution[i].c;
    hiddenCanvasCtx.fill();
  }
  let canvasData = _.flatten( hiddenCanvasCtx.getImageData(0, 0, CANVAS_W, CANVAS_H).data )
  let sum = 0;
  for( let i = 0; i < canvasData.length; i++ ) {
    sum += ( Math.abs(canvasData[i] - imageData[i]) )
  }
  cb( FITNESS_MAX - sum )
}

document.getElementById('imageBtn').onclick = function() {
  var imgPath = dialog.showOpenDialog({
    'properties': ['openFile'],
    'filters': [
      {name: 'Images', extensions: ['jpg', 'png']}
    ]
  });
  console.log( imgPath[0] );
  fs.readFile( imgPath[0], (err, data) => {
    if( err ) {
      console.error( err );
    }
    fs.writeFileSync('tmp', data);
    var img = document.getElementById( 'img' );
    img.src = 'tmp';
    //imageCtx.drawImage(img, 0, 0, CANVAS_W, CANVAS_H);
  })
}

document.getElementById('startBtn').onclick = function() {
  initImage();
  fs.unlinkSync('tmp');
  popSize = getSetting('popSize')
  mutateRate = getSetting('mutateRate');
  crossRate = getSetting('crossRate');
  solutionSize = getSetting('solutionSize');
  generations = getSetting('generations');
  maxElemSize = getSetting('maxElemSize');

  let t = new Task( {
    'getRandomSolution': getRandomSolution,
    'popSize': popSize,
    'stopCriteria': stopCriteria,
    'fitness': fitness,
    'minimize': false,
    'mutateProbability': mutateRate,
    'mutate': mutate,
    'crossoverProbability': crossRate,
    'crossover': crossover
  } )
  t.on('statistics', function(s) {
    document.getElementById( 'minScore' ).innerHTML = s.minScore
    document.getElementById( 'maxScore' ).innerHTML = s.maxScore
    document.getElementById( 'avgScore' ).innerHTML = Math.floor( s.avg )
    canvasCtx.clearRect(0, 0, CANVAS_W, CANVAS_H)
    for( let i = 0; i < s.max.length; i++ ) {
      canvasCtx.beginPath();
      canvasCtx.arc( s.max[i].x, s.max[i].y, s.max[i].s, 0, 2*Math.PI)
      canvasCtx.fillStyle = s.max[i].c;
      canvasCtx.fill();
    }
  })
  t.on('iteration start', function(g) {
    document.getElementById( 'actGener' ).innerHTML = g
  })
  t.on('error', function(err) {
    console.error( err )
  })
  t.run(function(stats) {
    winner = stats.max;
    console.log( "Done: ", stats )
  })
}

document.getElementById('saveRBtn').onclick = function() {
  var ctx = new C2S(200, 200);
  for( let i = 0; i < winner.length; i++ ) {
    ctx.beginPath();
    ctx.arc( winner[i].x, winner[i].y, winner[i].s, 0, 2*Math.PI)
    ctx.fillStyle = winner[i].c;
    ctx.fill();
  }
  var myRectangle = ctx.getSerializedSvg(true);

  fs.writeFileSync(getUserHome()+'/evo-art.svg', myRectangle);
  dialog.showMessageBox({
    'type': 'info',
    'buttons': ['OK'],
    'title': 'Output saved!',
    'message': `Output file saved to ${getUserHome() + '/evo-art.svg'}`
  })
}