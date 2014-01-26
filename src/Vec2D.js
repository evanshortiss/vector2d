
// Default is to not use objects
var useObjects = false;
// Default is to use standard array
var AxesArray = Array;

/**
 * Check is the passed param a Vec2D instance.
 * @param   {Mixed}   v   The var to check.
 * @return  {Boolean}     The result of check.
 */

function isVector(v) {
  return v instanceof ArrayVector || v instanceof ObjectVector;
}

// *****************************************************************************
// Publically exposed Vector interface.
// *****************************************************************************

function Vec2D() {}

Vec2D.prototype = {
  ArrayVector: ArrayVector, 
  ObjectVector: ObjectVector,
  Float32Vector: Float32Vector,

  /**
   * Create a new Vector.
   * @param {Number}  [x]
   * @param {Number}  [y]
   */
  create: function(x, y) {
    if (useObjects === true) {
      return new ObjectVector(x, y);
    } else {
      return new ArrayVector(x, y);
    }
  },


  /**
   * Create a randomised vector, with specified min and max values.
   * @param {Number} minX
   * @param {Number} maxX
   * @param {Number} minY
   * @param {Number} maxY
   */
  random: function(minX, maxX, minY, maxY) {
    var x = minX + (maxX - minX) * Math.random();
    var y = minY + (maxY - minY) * Math.random();

    return this.create(x, y);
  },


  /**
   * Get absolute vector from provided vector.
   * @param   {Vector}
   * @return  {Vector}
   */
  abs: function(vec) {
    return this.create(Math.abs(vec.getX(), vec.getY()));
  },


  /**
   * Instruct the library to use standard JavaScript arrays.
   * Otherwise the library will try use Float32Arrays if available. (This is default)
   */
  useStandardArrays: function() {
    useObjects = false;
    AxesArray = Array;
  },


  /**
   * Instruct the library to use Float32 JavaScript arrays. (This is default)
   * Otherwise the library will use standard array.
   */
  useFloat32Arrays: function() {
    useObjects = false;
    AxesArray = Float32Array;
  },


  /**
   * Instruct library to use Objects to represent vectors.
   */
  useObjects: function() {
    useObjects = true;
  },


  /**
   * Add v0 to v1 to produce a new vector
   * @param   {Vector} v0
   * @param   {Vector} v1
   * @return  {Vector}
   */
  add: function(v0, v1) {
    return this.create(v0.getX() + v1.getX(), v0.getY() + v1.getY());
  },


  /**
   * Subtract v0 from v1 to produce a new Vector.
   * @param   {Vector} v0
   * @param   {Vector} v1
   * @return  {Vector}
   */
  subtract: function(v0, v1) {
    return this.create(v0.getX() - v1.getX(), v0.getY() - v1.getY());
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
    return this.create(v0.getX() * v1.getX(), v0.getY() * v1.getY());
  },


  multV: this.vectorTimesVector,


  /**
   * Multiply a vector by a number to produce a new vector.
   * @param   {Vector} vec    The var to store a result in.
   * @param   {Number} n      The Vector to subtract from this one.
   * @return  {Vector}
   */
  vectorTimesScalar: function(vec, n) {
    return this.create(vec.getX() * n, vec.getY() * n);
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
    return (v0.getX() * v1.getX()) + (v0.getY() * v1.getY());
  },


  /**
   * Calculate the cross product of two vectors.
   * @param   {Vector} v0
   * @param   {Vector} v1
   * @param   {Vector}
   */
  cross: function(v0, v1) {
    return ((v0.getX() * v1.getY()) - (v0.getY() * v1.getX()));
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

    var ox = vec.getX(), 
      oy = vec.getY();

    var x = ox * cos - oy * sin;
    var y = ox * sin + oy * cos;

    return this.create(x, y);
  },


  /**
   * Find sqaure distance between two vectors.
   * @param   {Vector} v0
   * @param   {Vector} v1
   * @return  {Number}
   */
  distance: function(v0, v1) {
    var x = v0.getX() - v1.getX();
    var y = v0.getY() - v1.getY();

    return Math.sqrt((x * x) + (y * y));
  },


  /**
   * Returns the reverse of the provided vector.
   * @param   {Vector} vec
   * @return  {Vector}
   */
  reverse: function(vec) {
    return this.create(-vec.getX(), -vec.getY());
  }
};

// Expose publically
if (typeof window !== 'undefined') {
  window.Vec2D = new Vec2D();
} else {
  module.exports = new Vec2D();
}