const Task = require('genetic').Task
const FITNESS_MAX = 160000 * 256;

console.log( "FitMax ", FITNESS_MAX )

var options = {
  'getRandomSolution': getRandomSolution,
  'popSize': 10,
  'stopCriteria': stopCriteria,
  'fitness': fitness,
  'minimize': false,
  'mutateProbability': 0.1,
  'mutate': mutate,
  'crossoverProbability': 0.5,
  'crossover': crossover
}

function crossover( mother, father, cb ) {
  let n = random( mother.length - 1 )
  cb( _.first(mother, n).concat(_.rest(father, n)) )
}

function mutate( solution, cb ) {
  solution[ random(50 - 1) ] = {
    'x': random(CANVAS_W), 
    'y': random(CANVAS_H),
    's': random(20)
  }
  cb( solution )
}

function getRandomSolution( cb ) {
  let solution = [];
  for( let i = 0; i < 50; i++ ) {
    let fillStyle = "rgb("+
      Math.floor(Math.random()*256)+","+
      Math.floor(Math.random()*256)+","+
      Math.floor(Math.random()*256)+")";

    solution.push({
      'x': random(CANVAS_W), 
      'y': random(CANVAS_H), 
      's': random(20),
      'c': fillStyle
    })
  }
  cb( solution )
}

function stopCriteria() {
  return (this.generation == 100000)
}

function fitness( solution, cb ) {
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

document.getElementById('startBtn').onclick = function() {
  let t = new Task( options )
  t.on('statistics', function(s) {
    document.getElementById( 'minScore' ).innerHTML = s.minScore
    document.getElementById( 'maxScore' ).innerHTML = s.maxScore
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
    console.log( "Done: ", stats )
  })
}