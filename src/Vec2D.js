// *****************************************************************************
// Publically exposed Vector interface.
// *****************************************************************************

var Vector = require('./Vector.js'),
  Float32Vector = require('./Float32Vector.js'),
  ObjectVector = require('./ObjectVector.js'),
  precision =[1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000];

/**
 * Some methods below return copies of vectors.
 * This function will determine the type of instance to return.
 * @param {Vector} v
 * @param {Number} x
 * @param {Number} y
 */
function create(v, x, y) {
  if (v instanceof ObjectVector) {
    return new ObjectVector(x, y);
  } else if (v instanceof Vector) {
    return new Vector(x, y);
  } else if (v instanceof Float32Vector) {
    return new Float32Vector(x, y);
  } else {
    throw new Error('Vector of unknown type was passed to create!');
  }
}

function Vec2D() {}

Vec2D.prototype = {
  ArrayVector: Vector,
  ObjectVector: ObjectVector,
  Float32Vector: Float32Vector,


  /**
   * Get absolute vector from provided vector.
   * @param   {Vector}
   * @return  {Vector}
   */
  abs: function(vec) {
    return create(vec, Math.abs(vec._axes[0], vec._axes[1]));
  },


  /**
   * Round this vector to n decimal places
   * @param {Number}  n
   */
  round: function(vec, n) {
    // Default is two decimals
    n = n || 2;

    var x = Math.round(vec._axes[0] * precision[n]) / precision[n];
    var y = Math.round(vec._axes[1] * precision[n]) / precision[n];

    return create(vec, x, y);
  },


  /**
   * Add v0 to v1 to produce a new vector
   * @param   {Vector} v0
   * @param   {Vector} v1
   * @return  {Vector}
   */
  add: function(v0, v1) {
    return create(v0, v0._axes[0] + v1._axes[0], v0._axes[1] + v1._axes[1]);
  },


  /**
   * Subtract v0 from v1 to produce a new Vector.
   * @param   {Vector} v0
   * @param   {Vector} v1
   * @return  {Vector}
   */
  subtract: function(v0, v1) {
    return create(v0, v0._axes[0] - v1._axes[0], v0._axes[1] - v1._axes[1]);
  },


  /**
   * Check are the provided vectors equal.
   * @param   {Vector}   v0
   * @param   {Vector}   v1
   * @return  {Boolean}
   */
  equals: function(v0, v1) {
    return v0.equals(v1);
  },


  /**
   * Multiply a vector by a vector to produce a new Vector
   * @param   {Vector} v0
   * @param   {Vector} v1
   * @return  {Vector}
   */
  vectorTimesVector: function(v0, v1) {
    return create(v0, v0._axes[0] * v1._axes[0], v0._axes[1] * v1._axes[1]);
  },


  multV: this.vectorTimesVector,


  /**
   * Multiply a vector by a number to produce a new vector.
   * @param   {Vector} vec    The var to store a result in.
   * @param   {Number} n      The Vector to subtract from this one.
   * @return  {Vector}
   */
  vectorTimesScalar: function(vec, n) {
    return create(vec, vec._axes[0] * n, vec._axes[1] * n);
  },


  multS: this.vectorTimesScalar,


  /**
   * Return a normalised version of provided vector.
   * @param   {Vector} vec
   * @return  {Vector}
   */
  nomalise: function(vec) {
    return this.timesScalar(vec, 1 / vec.magnitude());
  },


  /**
   * Same as normalise
   */
  normalize: this.nomalise,


  /**
   * Same as normalise.
   */
  unit: this.normalise,


  /**
   * Return the dot product of two vectors or this vector dot another.
   * @param   {Vector} v0
   * @param   {Vector} v1
   * @return  {Number}
   */
  dot: function(v0, v1) {
    return (v0._axes[0] * v1._axes[0]) + (v0._axes[1] * v1._axes[1]);
  },


  /**
   * Calculate the cross product of two vectors.
   * @param   {Vector} v0
   * @param   {Vector} v1
   * @param   {Vector}
   */
  cross: function(v0, v1) {
    return ((v0._axes[0] * v1._axes[1]) - (v0._axes[1] * v1._axes[0]));
  },


  /**
   * Return the magnitude (length) of a vector.
   * @param   {Vector} vec
   * @return  {Number}
   */
  magnitude: function(vec) {
    return vec.magnitude();
  },


  /**
   * Same as the magnitude.
   */
  length: function(vec) {
    return vec.magnitude();
  },


  /**
   * Rotate the given vector by given radians and return new vector.
   * @param {Vector}  vec
   * @param {Number}  rad
   * return {Vector}
   */
  rotate: function(vec, rads) {
    var cos = Math.cos(rads),
      sin = Math.sin(rads);

    var ox = vec._axes[0],
      oy = vec._axes[1];

    var x = ox * cos - oy * sin;
    var y = ox * sin + oy * cos;

    return create(vec, x, y);
  },


  /**
   * Find sqaure distance between two vectors.
   * @param   {Vector} v0
   * @param   {Vector} v1
   * @return  {Number}
   */
  distance: function(v0, v1) {
    var x = v0._axes[0] - v1._axes[0];
    var y = v0._axes[1] - v1._axes[1];

    return Math.sqrt((x * x) + (y * y));
  },


  /**
   * Returns the reverse of the provided vector.
   * @param   {Vector} vec
   * @return  {Vector}
   */
  reverse: function(vec) {
    return create(vec, -vec._axes[0], -vec._axes[1]);
  }
};

module.exports = new Vec2D();
