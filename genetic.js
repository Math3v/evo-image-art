var genetic = Genetic.create();

genetic.optimize = Genetic.Optimize.Minimize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.FittestRandom;

genetic.seed = function() {
  console.log( "Seed ", _.flatten( canvasCtx.getImageData(0, 0, CANVAS_W, CANVAS_H).data ) )
  return _.flatten( canvasCtx.getImageData(0, 0, CANVAS_W, CANVAS_H).data )
}

genetic.mutate = function( image ) {
  console.log( "Mutate ", image )
  return _.shuffle( image )
}

genetic.crossover = function( mother, father ) {
  console.log( "Crossover ", mother.length, father.length )
  let middle = Math.floor( mother.length / 2 )

  return [_.first(mother, middle).concat(_.rest(father, middle)), 
          _.first(father, middle).concat(_.rest(mother, middle))]
}

genetic.fitness = function( image ) {
  console.log( "Fitness ", image.length )
  let sum = 0;
  for( let i = 0; i < image.length; i++ ) {
    sum += (image[i] - imageData[i])
  }
  return sum
}

genetic.generation = function( pop, generation, stats ) {
  console.log( "Generation ", pop, generation, stats )
  return true
}

genetic.notification = function( pop, generation, stats, isFinished ) {
  console.log( "Notification ", pop, generation, stats, isFinished )
}

var config = {
  'iterations': 3,
  'size': 5,
  'crossover': 0.7,
  'mutation': 0.1,
  'webWorkers': false,
  'skip': 0
};

document.getElementById('startBtn').onclick = function() {
  genetic.evolve(config, {})
}