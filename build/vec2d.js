(function() {
  function ArrayVector(x, y) {
    if (AxesArray.name === "Float32Array") {
      this._axes = new AxesArray([ x, y ]);
    } else {
      this._axes = new AxesArray(x, y);
    }
  }
  ArrayVector.prototype = {
    setAxes: function(x, y) {
      this._axes[0] = x;
      this._axes[1] = y;
    },
    getX: function() {
      return this._axes[0];
    },
    setX: function(x) {
      this._axes[0] = x;
      return this;
    },
    getY: function() {
      return this._axes[1];
    },
    setY: function(y) {
      this._axes[1] = y;
      return this;
    },
    toString: function(round) {
      if (round) {
        return "(" + Math.round(this.getX()) + ", " + Math.round(this.getY()) + ")";
      }
      return "(" + this.getX() + ", " + this.getY() + ")";
    },
    toArray: function() {
      return new Array(this._axes[0], this._axes[1]);
    },
    toObject: function() {
      return {
        x: this._axes[0],
        y: this._axes[1]
      };
    },
    add: function(vec) {
      this._axes[0] += vec._axes[0];
      this._axes[1] += vec._axes[1];
      return this;
    },
    subtract: function(vec) {
      this._axes[0] -= vec._axes[0];
      this._axes[1] -= vec._axes[1];
      return this;
    },
    equals: function(vec) {
      return vec._axes[0] == this._axes[0] && vec._axes[1] == this._axes[1];
    },
    multiplyByVector: function(vec) {
      this._axes[0] *= vec._axes[0];
      this._axes[1] *= vec._axes[1];
      return this;
    },
    divideByVector: function(vec) {
      this._axes[0] /= vec._axes[0];
      this._axes[1] /= vec._axes[1];
      return this;
    },
    multiplyByScalar: function(n) {
      this._axes[0] *= n;
      this._axes[1] *= n;
      return this;
    },
    divideByScalar: function(n) {
      this._axes[0] /= n;
      this._axes[1] /= n;
      return this;
    },
    normalise: function() {
      return this.multiplyByScalar(1 / this.magnitude());
    },
    normalize: function() {
      return this.normalise();
    },
    unit: function() {
      return this.normalise();
    },
    magnitude: function() {
      return Math.sqrt(this._axes[0] * this._axes[0] + this._axes[1] * this._axes[1]);
    },
    length: function() {
      return this.magnitude();
    },
    lengthSq: function() {
      return this._axes[0] * this._axes[0] + this._axes[1] * this._axes[1];
    },
    dot: function(vec) {
      return vec._axes[0] * this._axes[0] + vec._axes[1] * this._axes[1];
    },
    cross: function(vec) {
      return this._axes[0] * vec._axes[1] - this._axes[1] * vec._axes[0];
    },
    reverse: function(vec) {
      this._axes[0] = -this._axes[0];
      this._axes[1] = -this._axes[1];
      return this;
    },
    abs: function() {
      this._axes[0] = Math.abs(this._axes[0]);
      this._axes[1] = Math.abs(this._axes[1]);
      return this;
    },
    zero: function() {
      this._axes[0] = this._axes = 0;
      return this;
    },
    rotate: function(rads) {
      var cos = Math.cos(rads), sin = Math.sin(rads);
      var ox = this._axes[0], oy = this._axes[1];
      this._axes[0] = ox * cos - oy * sin;
      this._axes[1] = ox * sin + oy * cos;
      return this;
    },
    clone: function() {
      return new ArrayVector(this._axes[0], this._axes[1]);
    }
  };
  function ObjectVector(x, y) {
    this.x = x;
    this.y = y;
  }
  ObjectVector.prototype = {
    setAxes: function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    },
    getX: function() {
      return this.x;
    },
    setX: function(x) {
      this.x = x;
      return this;
    },
    getY: function() {
      return this.y;
    },
    setY: function(y) {
      this.y = y;
      return this;
    },
    toString: function(round) {
      if (round) {
        return "(" + Math.round(this.getX()) + ", " + Math.round(this.getY()) + ")";
      }
      return "(" + this.getX() + ", " + this.getY() + ")";
    },
    toArray: function() {
      return new Array(this.x, this.y);
    },
    toObject: function() {
      return {
        x: this.x,
        y: this.y
      };
    },
    add: function(vec) {
      this.x += vec.x;
      this.y += vec.y;
      return this;
    },
    subtract: function(vec) {
      this.x -= vec.x;
      this.y -= vec.y;
      return this;
    },
    equals: function(vec) {
      return vec.x == this.x && vec.y == this.y;
    },
    multiplyByVector: function(vec) {
      this.x *= vec.x;
      this.y *= vec.y;
      return this;
    },
    divideByVector: function(vec) {
      this.x /= vec.x;
      this.y /= vec.y;
      return this;
    },
    multiplyByScalar: function(n) {
      this.x *= n;
      this.y *= n;
      return this;
    },
    divideByScalar: function(n) {
      this.x /= n;
      this.y /= n;
      return this;
    },
    normalise: function() {
      return this.multiplyByScalar(1 / this.magnitude());
    },
    normalize: function() {
      return this.normalise();
    },
    unit: function() {
      return this.normalise();
    },
    magnitude: function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    length: function() {
      return this.magnitude();
    },
    lengthSq: function() {
      return this.x * this.x + this.y * this.y;
    },
    dot: function(vec) {
      return vec.x * this.x + vec.y * this.y;
    },
    cross: function(vec) {
      return this.x * vec.y - this.y * vec.x;
    },
    reverse: function(vec) {
      this.x = -this.x;
      this.y = -this.y;
      return this;
    },
    abs: function() {
      this.x = Math.abs(this.x);
      this.y = Math.abs(this.y);
      return this;
    },
    rotate: function(rads) {
      var cos = Math.cos(rads), sin = Math.sin(rads);
      var ox = this.x, oy = this.y;
      this.x = ox * cos - oy * sin;
      this.y = ox * sin + oy * cos;
      return this;
    },
    zero: function() {
      this.x = this.y = 0;
      return this;
    },
    clone: function() {
      return new ObjectVector(this.x, this.y);
    }
  };
  var useObjects = false;
  var AxesArray = Array;
  function isVector(v) {
    return v instanceof ArrayVector || v instanceof ObjectVector;
  }
  function Vec2D() {}
  Vec2D.prototype = {
    ArrayVector: ArrayVector,
    ObjectVector: ObjectVector,
    create: function(x, y) {
      if (!x) {
        x = 0;
      }
      if (!y) {
        y = 0;
      }
      if (useObjects === true) {
        return new ObjectVector(x, y);
      } else {
        return new ArrayVector(x, y);
      }
    },
    random: function(minX, maxX, minY, maxY) {
      var x = minX + (maxX - minX) * Math.random();
      var y = minY + (maxY - minY) * Math.random();
      return this.create(x, y);
    },
    abs: function(vec) {
      return this.create(Math.abs(vec.getX(), vec.getY()));
    },
    useStandardArrays: function() {
      useObjects = false;
      AxesArray = Array;
    },
    useFloat32Arrays: function() {
      useObjects = false;
      AxesArray = Float32Array;
    },
    useObjects: function() {
      useObjects = true;
    },
    add: function(v0, v1) {
      return this.create(v0.getX() + v1.getX(), v0.getY() + v1.getY());
    },
    subtract: function(v0, v1) {
      return this.create(v0.getX() - v1.getX(), v0.getY() - v1.getY());
    },
    equals: function(v0, v1) {
      return v0.equals(v1);
    },
    vectorTimesVector: function(v0, v1) {
      return this.create(v0.getX() * v1.getX(), v0.getY() * v1.getY());
    },
    vectorTimesScalar: function(vec, n) {
      return this.create(vec.getX() * n, vec.getY() * n);
    },
    nomalise: function(vec) {
      return this.timesScalar(vec, 1 / vec.magnitude());
    },
    normalize: function(vec) {
      return this.normalise(vec);
    },
    unit: function(vec) {
      return this.normalise(vec);
    },
    dot: function(v0, v1) {
      return v0.getX() * v1.getX() + v0.getY() * v1.getY();
    },
    cross: function(v0, v1) {
      return v0.getX() * v1.getY() - v0.getY() * v1.getX();
    },
    magnitude: function(vec) {
      return vec.magnitude();
    },
    length: function(vec) {
      return vec.magnitude();
    },
    rotate: function(vec, rads) {
      var cos = Math.cos(rads), sin = Math.sin(rads);
      var ox = vec.getX(), oy = vec.getY();
      var x = ox * cos - oy * sin;
      var y = ox * sin + oy * cos;
      return this.create(x, y);
    },
    distance: function(v0, v1) {
      var x = v0.getX() - v1.getX();
      var y = v0.getY() - v1.getY();
      return Math.sqrt(x * x + y * y);
    },
    reverse: function(vec) {
      return this.create(-vec.getX(), -vec.getY());
    }
  };
  if (typeof window !== "undefined") {
    window.Vec2D = new Vec2D();
  } else {
    module.exports = new Vec2D();
  }
})();