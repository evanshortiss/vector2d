// Copyright (c) 2013 Evan Shortiss
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
(function() {
  /****************************************************************************
   * Main array based vector class. Has instance methods attached to prototype.
   * @constructor
   * @param {Array}  axes
   ****************************************************************************/

  function ArrayVector(x, y) {
    if (AxesArray === Array) {
      this._axes = [x, y];
    } else {
      this._axes = new AxesArray(2);
      this._axes[0] = x;
      this._axes[1] = y;
    }
  }

  function Float32Vector(x, y) {
    var originalType = AxesArray;
    // Force use of Float32Array
    AxesArray = Float32Array;
    var v = new ArrayVector(x, y);
    // Switch to previous type
    AxesArray = originalType;
    return v;
  }
  ArrayVector.prototype = {
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
        return "(" + Math.round(this.getX()) + ", " + Math.round(this.getY()) + ")";
      }
      return "(" + this.getX() + ", " + this.getY() + ")";
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
      return vec._axes[0] == this._axes[0] && vec._axes[1] == this._axes[1];
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
    /**
     * Multiply this vector by the provided vector.
     * @param {Vector} vec
     */
    divideByVector: function(vec) {
      this._axes[0] /= vec._axes[0];
      this._axes[1] /= vec._axes[1];
      return this;
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
    /**
     * Divive this vector by the provided number
     * @param {Number} n
     */
    divideByScalar: function(n) {
      this._axes[0] /= n;
      this._axes[1] /= n;
      return this;
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
      return Math.sqrt(this._axes[0] * this._axes[0] + this._axes[1] * this._axes[1]);
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
      return this._axes[0] * this._axes[0] + this._axes[1] * this._axes[1];
    },
    /**
     * Get the dot product of this vector by another.
     * @param   {Vector} vec
     * @return  {Number}
     */
    dot: function(vec) {
      return vec._axes[0] * this._axes[0] + vec._axes[1] * this._axes[1];
    },
    /**
     * Get the cross product of this vector by another.
     * @param   {Vector} vec
     * @return  {Number}
     */
    cross: function(vec) {
      return this._axes[0] * vec._axes[1] - this._axes[1] * vec._axes[0];
    },
    /**
     * Reverses this vector.
     * @param   {Vector} vec
     */
    reverse: function(vec) {
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
     * Create a copy of this vector.
     * @return {Vector}
     */
    clone: function() {
      return new ArrayVector(this._axes[0], this._axes[1]);
    }
  };
  /****************************************************************************
   * Main object based vector class. Has instance methods attached to prototype.
   * @constructor
   * @param {Array}  axes
   ****************************************************************************/

  function ObjectVector(x, y) {
    this.x = x;
    this.y = y;
  }
  ObjectVector.prototype = {
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
        return "(" + Math.round(this.getX()) + ", " + Math.round(this.getY()) + ")";
      }
      return "(" + this.getX() + ", " + this.getY() + ")";
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
      return vec.x == this.x && vec.y == this.y;
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
    /**
     * Multiply this vector by the provided vector.
     * @param {Vector} vec
     */
    divideByVector: function(vec) {
      this.x /= vec.x;
      this.y /= vec.y;
      return this;
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
    /**
     * Divive this vector by the provided number
     * @param {Number} n
     */
    divideByScalar: function(n) {
      this.x /= n;
      this.y /= n;
      return this;
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
      return Math.sqrt(this.x * this.x + this.y * this.y);
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
      return this.x * this.x + this.y * this.y;
    },
    /**
     * Get the dot product of this vector by another.
     * @param   {Vector} vec
     * @return  {Number}
     */
    dot: function(vec) {
      return vec.x * this.x + vec.y * this.y;
    },
    /**
     * Get the cross product of this vector by another.
     * @param   {Vector} vec
     * @return  {Number}
     */
    cross: function(vec) {
      return this.x * vec.y - this.y * vec.x;
    },
    /**
     * Returns the reverse of the provided vector.
     * @param   {Vector} vec
     */
    reverse: function(vec) {
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
     * Zeroes the vector
     * @return  {Vector}
     */
    zero: function() {
      this.x = this.y = 0;
      return this;
    },
    /**
     * Create a copy of this vector.
     * @return {Vector}
     */
    clone: function() {
      return new ObjectVector(this.x, this.y);
    }
  };
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
      return v0.getX() * v1.getX() + v0.getY() * v1.getY();
    },
    /**
     * Calculate the cross product of two vectors.
     * @param   {Vector} v0
     * @param   {Vector} v1
     * @param   {Vector}
     */
    cross: function(v0, v1) {
      return v0.getX() * v1.getY() - v0.getY() * v1.getX();
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
      return Math.sqrt(x * x + y * y);
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
  if (typeof window !== "undefined") {
    window.Vec2D = new Vec2D();
  } else {
    module.exports = new Vec2D();
  }
})();