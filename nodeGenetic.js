const Task = require('genetic').Task
const FITNESS_MAX = 160000 * 256;

console.log( "FitMax ", FITNESS_MAX )

var options = {
  'getRandomSolution': getRandomSolution,
  'popSize': 50,
  'stopCriteria': stopCriteria,
  'fitness': fitness,
  'minimize': false,
  'mutateProbability': 0.2,
  'mutate': mutate,
  'crossoverProbability': 0.5,
  'crossover': crossover
}

function crossover( mother, father, cb ) {
  let middle = random( mother.length - 1 )
  cb( _.first(mother, middle).concat(_.rest(father, middle)) )
}

function mutate( solution, cb ) {
  for( let i = 0; i < random( 40000 ); i++ ) {
    solution[ random(160000 - 1) ] = random( 255 )
  }
  cb( solution )
}

function getRandomSolution( cb ) {
  initCanvas()
  let solution = _.flatten( canvasCtx.getImageData(0, 0, CANVAS_W, CANVAS_H).data )
  cb( solution )
}

function stopCriteria() {
  return (this.generation == 5500)
}

function fitness( solution, cb ) {
  let sum = 0
  for( let i = 0; i < solution.length; i++ ) {
    let d = Math.abs( solution[i] - imageData[i] )
    sum = sum + d
  }
  cb( FITNESS_MAX - sum )
}

document.getElementById('startBtn').onclick = function() {
  let t = new Task( options )
  t.on('statistics', function(s) {
    console.log( s )
    document.getElementById( 'minScore' ).innerHTML = s.minScore
    document.getElementById( 'maxScore' ).innerHTML = s.maxScore
    let imgData = canvasCtx.createImageData(CANVAS_W, CANVAS_H)
    imgData.data.set( s.max )
    canvasCtx.putImageData(imgData, 0, 0)
  })
  t.on('error', function(err) {
    console.error( err )
  })
  t.run(function(stats) {
    console.log( "Done: ", stats )
  })
}