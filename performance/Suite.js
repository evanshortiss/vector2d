
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
    this.abs();
    this.magnitude();
    this.clone();
    this.zero();
    this.reverse();
    this.toString();
    this.multiplyByScalar();
    this.normalise();
    this.divS();
    this.lengthSq();

    return this.results;
  },

  _run: function (fn) {
    var time = 0;

    for(var i = 0; i < this.rounds; i++) {
      var s = Date.now(),
        len = this.vectors.length;

      for(var j = 0; j < len ; j++) {
        fn(j);
      }

      time += (Date.now() - s);
    }

    return time / this.rounds;
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
    var self = this;

    this.results.push({
      time: this._run(function (index) {
        self.vectors[index].add(self.vectors[randInt(0, self.vectors.length - 1)]);
      }),
      name: 'add'
    });
  },

  subtract: function () {
    var self = this;

    this.results.push({
      time: this._run(function (index) {
        self.vectors[index].subtract(self.vectors[randInt(0, self.vectors.length - 1)]);
      }),
      name: 'subtract'
    });
  },

  magnitude: function() {
    var self = this;

    this.results.push({
      time: this._run(function (index) {
        self.vectors[index].magnitude();
      }),
      name: 'magnitude'
    });
  },

  abs: function() {
    var self = this;

    this.results.push({
      time: this._run(function (index) {
        self.vectors[index].abs();
      }),
      name: 'abs'
    });
  },

  round: function() {
    var self = this;

    this.results.push({
      time: this._run(function (index) {
        self.vectors[index].round();
      }),
      name: 'round'
    });
  },

  clone: function() {
    var self = this;

    this.results.push({
      time: this._run(function (index) {
        self.vectors[index].clone();
      }),
      name: 'clone'
    });
  },

  zero: function() {
    var self = this;

    this.results.push({
      time: this._run(function (index) {
        self.vectors[index].zero();
      }),
      name: 'zero'
    });
  },

  reverse: function() {
    var self = this;

    this.results.push({
      time: this._run(function (index) {
        self.vectors[index].reverse();
      }),
      name: 'reverse'
    });
  },

  toString: function() {
    var self = this;

    this.results.push({
      time: this._run(function (index) {
        self.vectors[index].toString();
      }),
      name: 'toString'
    });
  },

  multiplyByScalar: function() {
    var self = this;

    this.results.push({
      time: this._run(function (index) {
        self.vectors[index].multiplyByScalar(randInt(1, 10));
      }),
      name: 'multiplyByScalar'
    });
  },

  normalise: function() {
    var self = this;

    this.results.push({
      time: this._run(function (index) {
        self.vectors[index].normalise(randInt(1, 10));
      }),
      name: 'normalise'
    });
  },

  divS: function() {
    var self = this;

    this.results.push({
      time: this._run(function (index) {
        self.vectors[index].divS(randInt(1, 10));
      }),
      name: 'divS'
    });
  },

  lengthSq: function() {
    var self = this;

    this.results.push({
      time: this._run(function (index) {
        self.vectors[index].lengthSq(randInt(1, 10));
      }),
      name: 'lengthSq'
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
