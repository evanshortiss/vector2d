/**
 * perf.js
 * Some performance tests.
 */

var Vec2D = require('./vec2d.js'),
  program = require('commander');

program
  .version('0.0.1')
  .option('-c, --count <count>', 'Number of times to perform each operation', Number, 100000)
  .option('-rmin, --rmin <rmin>', 'Smallest random number to use.', Number, -10000)
  .option('-rmax, --rmax <rmax>', 'Largest random number to use.', Number, 10000)
  .parse(process.argv);

var RAND_MIN = program.rmin,
  RAND_MAX = program.rmax,
  OPERATION_COUNT = program.count;


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

var util = {
  start: null,

  startTimer: function() {
    this.start = new Date().getTime();
  },

  getTimePassed: function() {
    return new Date().getTime() - this.start;
  },

  runTask: function(name, callback) {
    var self = this;

    suite[name](function() {
      self.startTimer();
      console.log('\nStart task: ' + name);
    }, function() {
      console.log('Finished task: ' + name + ' in ' + self.getTimePassed().toString() + 'ms');
      if (callback) {
        callback();
      }
    });
  }
};

var suite = {
  generateFloat32: function(start, end) {
    start();
    var i = OPERATION_COUNT;

    Vec2D.useFloat32Arrays();

    var float32Vectors = [];
    while (i) {
      float32Vectors.push(Vec2D.create(randomFloat(), randomFloat()));
      i--;
    }

    end();
    return float32Vectors;
  },

  generateStandard: function(start, end) {
    start();
    var i = OPERATION_COUNT;

    Vec2D.useStandardArrays();

    var vectors = [];
    while (i) {
      vectors.push(Vec2D.create(randomFloat(), randomFloat()));
      i--;
    }

    end();
    return vectors;
  },


  generateObjects: function(start, end) {
    start();
    var i = OPERATION_COUNT;

    Vec2D.useObjects();

    var vectors = [];
    while (i) {
      vectors.push(Vec2D.create(randomFloat(), randomFloat()));
      i--;
    }

    end();
    return vectors;
  },


  addFloat32: function(start, end) {
    var vectors = this.generateFloat32(function(){}, function(){});
    start();

    var i = vectors.length-1;
    while(i) {
      vectors[i].add(vectors[i]);
      i--;
    }

    end();
  },

  addArray: function(start, end) {
    var vectors = this.generateStandard(function(){}, function(){});
    start();

    var i = vectors.length-1;
    while(i) {
      vectors[i].add(vectors[i]);
      i--;
    }

    end();
  },

  addObjects: function(start, end) {
    var vectors = this.generateObjects(function(){}, function(){});
    start();

    var i = vectors.length-1;
    while(i) {
      vectors[i].add(vectors[i]);
      i--;
    }

    end();
  },

  updateFloat32: function(start, end) {
    var vectors = this.generateFloat32(function(){}, function(){});
    start();

    var i = vectors.length-1;
    while(i) {
      vectors[i].setAxes(randomFloat(), randomFloat());
      i--;
    }

    end();
  },

  updateArray: function(start, end) {
    var vectors = this.generateStandard(function(){}, function(){});
    start();

    var i = vectors.length-1;
    while(i) {
      vectors[i].setAxes(randomFloat(), randomFloat());
      i--;
    }

    end();
  },

  updateObjects: function(start, end) {
    var vectors = this.generateObjects(function(){}, function(){});
    start();

    var i = vectors.length-1;
    while(i) {
      vectors[i].setAxes(randomFloat(), randomFloat());
      i--;
    }

    end();
  }
}

console.log('Running performance tests with ' + OPERATION_COUNT + ' vectors per test item...');
util.runTask('generateFloat32');
util.runTask('generateStandard');
util.runTask('generateObjects');
util.runTask('addFloat32');
util.runTask('addArray');
util.runTask('addObjects');
util.runTask('updateFloat32');
util.runTask('updateArray');
util.runTask('updateObjects');