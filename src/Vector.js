'use strict';

/**
 * Primary Vector class. Uses Array type for axis storage.
 * @class Vector
 * @param {Number} x The x component of this Vector
 * @param {Number} y The y component of this Vector
 */
function Vector(x, y) {
  if (this instanceof Vector === false) {
    return new Vector(x, y);
  }

  this._axes = [x, y];
}
module.exports = Vector;

var precision = [
  1,
  10,
  100,
  1000,
  10000,
  100000,
  1000000,
  10000000,
  100000000,
  1000000000,
  10000000000
];

Vector.prototype = {
  ctor: Vector,

  /**
   * Set both x and y
   * @param x   New x val
   * @param y   New y val
   */
  setAxes: function(x, y) {
    this.x = x;
    this.y = y;
    return this;
  },


  /**
   * Getter for x axis.
   * @return {Number}
   */
  getX: function() {
    return this.x;
  },


  /**
   * Setter for x axis.
   */
  setX: function(x) {
    this.x = x;

    return this;
  },


  /**
   * Getter for y axis.
   * @return {Number}
   */
  getY: function() {
    return this.y;
  },


  /**
   * Setter for y axis.
   */
  setY: function(y) {
    this.y = y;

    return this;
  },


  /**
   * View vector as a string such as "Vec2D: (0, 4)"
   * @param   {Boolean}
   * @return  {String}
   */
  toString: function(round) {
    if (round) {
      return '(' + Math.round(this.x) +
        ', ' + Math.round(this.y) + ')';
    }
    return '(' + this.x + ', ' + this.y + ')';
  },


  /**
   * Return an array containing the vector axes.
   * @return {Array}
   */
  toArray: function() {
    return new Array(this.x, this.y);
  },


  /**
   * Return an array containing the vector axes.
   * @return {Object}
   */
  toObject: function() {
    return {
      x: this.x,
      y: this.y
    };
  },


  /**
   * Add the provided Vector to this one.
   * @param {Vector} vec
   */
  add: function(vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  },


  /**
   * Subtract the provided vector from this one.
   * @param {Vector} vec
   */
  subtract: function(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  },


  /**
   * Check is the vector provided equal to this one.
   * @param   {Vec2D}   vec
   * @return  {Boolean}
   */
  equals: function(vec) {
    return (vec.x == this.x && vec.y == this.y);
  },


  /**
   * Multiply this vector by the provided vector.
   * @param {Vector} vec
   */
  multiplyByVector: function(vec) {
    this.x *= vec.x;
    this.y *= vec.y;
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
    this.x /= vec.x;
    this.y /= vec.y;
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
    this.x *= n;
    this.y *= n;

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
    this.x /= n;
    this.y /= n;
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
    return this.divideByScalar(this.magnitude());
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
    var x = this.x,
      y = this.y;

    return Math.sqrt((x * x) + (y * y));
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
    var x = this.x,
      y = this.y;

    return (x * x) + (y * y);
  },


  /**
   * Get the dot product of this vector by another.
   * @param   {Vector} vec
   * @return  {Number}
   */
  dot: function(vec) {
    return (vec.x * this.x) + (vec.y * this.y);
  },


  /**
   * Get the cross product of this vector by another.
   * @param   {Vector} vec
   * @return  {Number}
   */
  cross: function(vec) {
    return ((this.x * vec.y) - (this.y * vec.x));
  },


  /**
   * Reverses this vector.
   */
  reverse: function() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  },


  /**
   * Convert vector to absolute values.
   * @param   {Vector} vec
   */
  abs: function() {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);

    return this;
  },


  /**
   * Zeroes the vector
   * @return  {Vector}
   */
  zero: function() {
    this.x = this.y = 0;
    return this;
  },


  /**
   * Distance between this vector and another.
   * @param {Vector} v
   */
  distance: function (v) {
    var x = this.x - v.x;
    var y = this.y - v.y;

    return Math.sqrt((x * x) + (y * y));
  },


  /**
   * Rotate the vetor by provided radians.
   * @param   {Number}  rads
   * @return  {Vector}
   */
  rotate: function(rads) {
    var cos = Math.cos(rads),
      sin = Math.sin(rads);

    var ox = this.x,
      oy = this.y;

    this.x = ox * cos - oy * sin;
    this.y = ox * sin + oy * cos;

    return this;
  },


  /**
   * Round this vector to n decimal places
   * @param {Number}  n
   */
  round: function(n) {
    // Default is two decimals
    n = n || 2;

    var p = precision[n];

    // This performs waaay better than toFixed and give Float32 the edge again.
    // http://www.dynamicguru.com/javascript/round-numbers-with-precision/
    this.x = ((0.5 + (this.x * p)) << 0) / p;
    this.y = ((0.5 + (this.y * p)) << 0) / p;

    return this;
  },


  /**
   * Create a copy of this vector.
   * @return {Vector}
   */
  clone: function() {
    return new this.ctor(this.x, this.y);
  }
};

Object.defineProperty(Vector.prototype, 'x', {
  get: function () {
    return this._axes[0];
  },
  set: function (x) {
    this._axes[0] = x;
  }
});

Object.defineProperty(Vector.prototype, 'y', {
  get: function () {
    return this._axes[1];
  },
  set: function (y) {
    this._axes[1] = y;
  }
});
