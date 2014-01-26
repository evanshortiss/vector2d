/**
 * perf.js
 * Some performance tests.
 */

var Vec2D = require('./build/vec2d.js');

var RAND_MIN = -1000,
  RAND_MAX = 1000,
  OPERATION_COUNT = 500000;


// Generate num vectors of type
function create(type) {
  var vectors = [];

  if (type === 'float32') {
    Vec2D.useFloat32Arrays();
  } else if (type === 'array') {
    Vec2D.useStandardArrays();
  } else if ('object') {
    Vec2D.useObjects();
  } else {
    throw new Error('Invalid type for creating vectors...');
  }

  var i = 0;
  while (i < OPERATION_COUNT) {
    vectors[i] = Vec2D.create(randomFloat(), randomFloat());
    i++;
  }

  return vectors;
}


// Test time for updating vector values.
function update(type) {
  var vectors = create(type);
  
  return t = time(function() {
    var i = 0;

    while (i < OPERATION_COUNT) {
      vectors[i].setX(randomFloat());
      i++;
    }
  });
}


// Test read speed
function read(type) {
  var vectors = create(type);

  return t = time(function() {
    var i = 0;
    var val = 0.1;

    while (i < OPERATION_COUNT) {
      val = vectors[i].getX();
      i++;
    }
  });
}


// Add two vectors using instance methods
function addV(type) {
  var vectors = create(type);

  return t = time(function() {
    var i = 0;

    while (i < OPERATION_COUNT) {
      vectors[i].add(vectors[randomInt(1, OPERATION_COUNT - 1)]);
      i++;
    }
  });
}


// Determine time taken to run a function.
function time(fn, callback) {
  var start = Date.now();
  var res = fn();
  var time = Date.now() - start;

  if (callback) {
    return callback(time, res);
  } else {
    return time;
  }
}


function randomFloat(min, max) {
  if (!min) {
    min = RAND_MIN;
  }

  if (!max) {
    max = RAND_MAX;
  }

  return min + (max - min) * Math.random();
}


function randomInt(min, max) {
  if (!min) {
    min = RAND_MIN;
  }

  if (!max) {
    max = RAND_MAX;
  }

  return Math.floor(min + (1 + max - min) * Math.random());
}


console.log('\n====================== STARTING TESTS ======================\n');
console.log('Tests regenerate new vectors for each operation set, be patient!\n\n');
console.log('===============================================================\n');

console.log('%sms to create Object...\n', time(function() {
  create('object');
}));
console.log('%sms to add vector to itself in existing Object type...\n', addV('object'));
console.log('%sms to update existing Object type...\n', update('object'));
console.log('%sms to read from Object type...\n', read('object'));
console.log('===============================================================\n');

console.log('%sms to create Array...\n', time(function() {
  create('array');
}));
console.log('%sms to add vector to itself in existing Array type...\n', addV('array'));
console.log('%sms to update existing Array type...\n', update('array'));
console.log('%sms to read from Array type...\n', read('array'));
console.log('===============================================================\n');

console.log('%sms to create Float32...\n', time(function() {
  create('float32');
}));
console.log('%sms to add vector to itself in existing Float32 type...\n', addV('float32'));
console.log('%sms to update existing Float32 type...\n', update('float32'));
console.log('%sms to read from Float32 type...\n', read('float32'));
console.log('===============================================================\n');

