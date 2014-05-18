
function Suite (vType, vecCount, rounds) {
  this.vType = vType;
  this.rounds = rounds;
  this.results = [];

  this.vectors = this.generate(vecCount);
}
module.exports = Suite;

Suite.prototype = {
  run: function() {
    this.add();
    this.subtract();
    this.round();
    this.magnitude();

    return this.results;
  },

  // Generate vectors for the test
  generate: function (i) {
    var vectors = [],
      s = Date.now();

    while (i) {
      i--;

      vectors.push( new this.vType(randFloat(), randFloat()) );
    }

    this.results.push({
      time: (Date.now() - s),
      name: 'generate (e.g new ' + this.vType.name + ')'
    });

    return vectors;
  },

  // Perform additions
  add: function () {
    var time = 0;

    for(var i = 0; i < this.rounds; i++) {
      var s = Date.now(),
        len = this.vectors.length;

      for(var j = 0; j < len ; j++) {
        // Add vector to another random vector
        this.vectors[j].add(this.vectors[randInt(0, this.vectors.length - 1)]);
      }

      time += (Date.now() - s);
    }

    // Time averaged over passes
    this.results.push({
      time: time / this.rounds,
      name: 'add'
    });
  },

  subtract: function () {
    var time = 0;

    for(var i = 0; i < this.rounds; i++) {
      var s = Date.now(),
        len = this.vectors.length;

      for(var j = 0; j < len ; j++) {
        // Add vector to another random vector
        this.vectors[j].subtract(this.vectors[randInt(0, this.vectors.length - 1)]);
      }

      time += (Date.now() - s);
    }

    // Time averaged over passes
    this.results.push({
      time: time / this.rounds,
      name: 'subtract'
    });
  },

  magnitude: function() {
    var time = 0;

    for(var i = 0; i < this.rounds; i++) {
      var s = Date.now(),
        len = this.vectors.length;

      for(var j = 0; j < len ; j++) {
        this.vectors[j].magnitude();
      }

      time += (Date.now() - s);
    }

    // Time averaged over passes
    this.results.push({
      time: time / this.rounds,
      name: 'magnitude'
    });
  },

  round: function() {
    var time = 0;

    for(var i = 0; i < this.rounds; i++) {
      var s = Date.now(),
        len = this.vectors.length;

      for(var j = 0; j < len ; j++) {
        // Round to four places
        this.vectors[j].round(4);
      }

      time += (Date.now() - s);
    }

    // Time averaged over passes
    this.results.push({
      time: time / this.rounds,
      name: 'round'
    });
  }
};

function randFloat (min, max) {
  min = min || -1000;
  max = max || 1000;

  return Math.random() * (max - min) + min;
}

function randInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
