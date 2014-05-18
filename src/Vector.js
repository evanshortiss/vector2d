function Vector(x, y) {
  if (this instanceof Vector === false) {
    return new Vector(x, y);
  }

  this._axes = [x, y];
}
module.exports = Vector;

var precision = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000];

Vector.prototype = {
  ctor: Vector,

  /**
   * Set both x and y
   * @param x   New x val
   * @param y   New y val
   */
  setAxes: function(x, y) {
    this._axes[0] = x;
    this._axes[1] = y;
    return this;
  },


  /**
   * Getter for x axis.
   * @return {Number}
   */
  getX: function() {
    return this._axes[0];
  },


  /**
   * Setter for x axis.
   */
  setX: function(x) {
    this._axes[0] = x;

    return this;
  },


  /**
   * Getter for y axis.
   * @return {Number}
   */
  getY: function() {
    return this._axes[1];
  },


  /**
   * Setter for y axis.
   */
  setY: function(y) {
    this._axes[1] = y;

    return this;
  },


  /**
   * View vector as a string such as "Vec2D: (0, 4)"
   * @param   {Boolean}
   * @return  {String}
   */
  toString: function(round) {
    if (round) {
      return '(' + Math.round(this._axes[0]) + ', ' + Math.round(this._axes[1]) + ')';
    }
    return '(' + this._axes[0] + ', ' + this._axes[1] + ')';
  },


  /**
   * Return an array containing the vector axes.
   * @return {Array}
   */
  toArray: function() {
    return new Array(this._axes[0], this._axes[1]);
  },


  /**
   * Return an array containing the vector axes.
   * @return {Object}
   */
  toObject: function() {
    return {
      x: this._axes[0],
      y: this._axes[1]
    };
  },


  /**
   * Add the provided Vector to this one.
   * @param {Vector} vec
   */
  add: function(vec) {
    this._axes[0] += vec._axes[0];
    this._axes[1] += vec._axes[1];
    return this;
  },


  /**
   * Subtract the provided vector from this one.
   * @param {Vector} vec
   */
  subtract: function(vec) {
    this._axes[0] -= vec._axes[0];
    this._axes[1] -= vec._axes[1];
    return this;
  },


  /**
   * Check is the vector provided equal to this one.
   * @param   {Vec2D}   vec
   * @return  {Boolean}
   */
  equals: function(vec) {
    return (vec._axes[0] == this._axes[0] && vec._axes[1] == this._axes[1]);
  },


  /**
   * Multiply this vector by the provided vector.
   * @param {Vector} vec
   */
  multiplyByVector: function(vec) {
    this._axes[0] *= vec._axes[0];
    this._axes[1] *= vec._axes[1];
    return this;
  },
  mulV: function(v) {
    return this.multiplyByVector(v);
  },


  /**
   * Multiply this vector by the provided vector.
   * @param {Vector} vec
   */
  divideByVector: function(vec) {
    this._axes[0] /= vec._axes[0];
    this._axes[1] /= vec._axes[1];
    return this;
  },
  divV: function(v) {
    return this.divideByVector(v);
  },


  /**
   * Multiply this vector by the provided number
   * @param {Number} n
   */
  multiplyByScalar: function(n) {
    this._axes[0] *= n;
    this._axes[1] *= n;

    return this;
  },
  mulS: function(n) {
    return this.multiplyByScalar(n);
  },


  /**
   * Divive this vector by the provided number
   * @param {Number} n
   */
  divideByScalar: function(n) {
    this._axes[0] /= n;
    this._axes[1] /= n;
    return this;
  },
  divS: function(n) {
    return this.divideByScalar(n);
  },


  /**
   * Normalise this vector. Directly affects this vector.
   * Use Vec2D.normalise(vector) to create a normalised clone of this.
   */
  normalise: function() {
    return this.multiplyByScalar(1 / this.magnitude());
  },


  /**
   * For American spelling.
   * Same as unit/normalise function.
   */
  normalize: function() {
    return this.normalise();
  },


  /**
   * The same as normalise.
   */
  unit: function() {
    return this.normalise();
  },


  /**
   * Return the magnitude (length) of this vector.
   * @return  {Number}
   */
  magnitude: function() {
    return Math.sqrt((this._axes[0] * this._axes[0]) + (this._axes[1] * this._axes[1]));
  },


  /**
   * Return the magnitude (length) of this vector.
   * @return  {Number}
   */
  length: function() {
    return this.magnitude();
  },


  /**
   * Return the squred length of a vector
   * @return {Number}
   */
  lengthSq: function() {
    return (this._axes[0] * this._axes[0]) + (this._axes[1] * this._axes[1]);
  },


  /**
   * Get the dot product of this vector by another.
   * @param   {Vector} vec
   * @return  {Number}
   */
  dot: function(vec) {
    return (vec._axes[0] * this._axes[0]) + (vec._axes[1] * this._axes[1]);
  },


  /**
   * Get the cross product of this vector by another.
   * @param   {Vector} vec
   * @return  {Number}
   */
  cross: function(vec) {
    return ((this._axes[0] * vec._axes[1]) - (this._axes[1] * vec._axes[0]));
  },


  /**
   * Reverses this vector.
   */
  reverse: function() {
    this._axes[0] = -this._axes[0];
    this._axes[1] = -this._axes[1];
    return this;
  },


  /**
   * Convert vector to absolute values.
   * @param   {Vector} vec
   */
  abs: function() {
    this._axes[0] = Math.abs(this._axes[0]);
    this._axes[1] = Math.abs(this._axes[1]);

    return this;
  },


  /**
   * Zeroes the vector
   * @return  {Vector}
   */
  zero: function() {
    this._axes[0] = this._axes[1] = 0;
    return this;
  },


  /**
   * Rotate the vetor by provided radians.
   * @param   {Number}  rads
   * @return  {Vector}
   */
  rotate: function(rads) {
    var cos = Math.cos(rads),
      sin = Math.sin(rads);

    var ox = this._axes[0],
      oy = this._axes[1];

    this._axes[0] = ox * cos - oy * sin;
    this._axes[1] = ox * sin + oy * cos;

    return this;
  },


  /**
   * Round this vector to n decimal places
   * @param {Number}  n
   */
  round: function(n) {
    // Default is two decimals
    n = n || 2;

    // This performs waaay better than toFixed and give Float32 the edge again.
    // http://www.dynamicguru.com/javascript/round-numbers-with-precision/
    this._axes[0] = ((0.5 + (this._axes[0] * precision[n])) << 0) / precision[n];
    this._axes[1] = ((0.5 + (this._axes[1] * precision[n])) << 0) / precision[n];

    return this;
  },


  /**
   * Create a copy of this vector.
   * @return {Vector}
   */
  clone: function() {
    return new this.ctor(this._axes[0], this._axes[1]);
  }
};
