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

(function(window, undefined) {

  // The array type to use for storage of axes.
  var AxesArray = Array;
  var useFloat32 = false;
  if (typeof(Float32Array) !== 'undefined') {
    AxesArray = Float32Array;
    useFloat32 = true;
  }


  /**
   * Parse the arguments passed into Vec2D and Vec3D.
   * @param {Mixed}   args  The argument array from caller function.
   * @return {Array}        The resulting axes array.
   */
  function parseArgs(args) {
    // User passed x and y
    if (args.length === 2) {
      return new Array(args[0], args[1]);
    }
    // User passed an array
    else if (Object.prototype.toString.call(args[0]) === '[object Array]') {
      return args[0];
    }
    // User passed x and y in an object
    else if (typeof(args[0]) === 'object') {
      return [args[0].x, args[0].y];
    }
  }


  /**
   * Check is the passed param a Vec2D instance.
   * @param   {Mixed}   v   The var to check.
   * @return  {Boolean}     The result of check.
   */
  function isVector(v) {
    return v instanceof Vector;
  };


  /****************************************************************************
   * Main vector class. Has instance methods attached to prototype.
   * @constructor
   * @param {Array}  axes
   ****************************************************************************/
  var Vector = function(axes) {
      // Constructor for each array type is different.
      if(useFloat32 === true) {
        this._axes = new AxesArray([axes[0], axes[1]]);
      } else {
        this._axes = new AxesArray(axes[0], axes[1]);
      }
    };

  Vector.prototype = {
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
    },


    /**
     * View vector as a string such as "Vec2D: (0, 4)"
     * @return {String}
     */
    toString: function() {
      return '(' + this.getX().toString() + ', ' + this.getY().toString() + ')'
    },


    /**
     * Return an array containing the vector axes.
     * @return {Array}
     */
    toArray: function() {
      return new Array([this.getX(), this.getY()]);
    },


    /**
     * Return an array containing the vector axes.
     * @return {Object}
     */
    toObject: function() {
      return {
        "x": this.getX(),
        "y": this.getY()
      };
    },


    /**
     * Add the provided Vector to this one.
     * @param {Vector} vec
     */
    add: function(vec) {
      this._axes[0] += vec._axes[0];
      this._axes[1] += vec._axes[1];
    },

    /**
     * Subtract the provided vector from this one.
     * @param {Vector} vec
     */
    subtract: function(vec) {
      this._axes[0] -= vec._axes[0];
      this._axes[1] -= vec._axes[1];
    },


    /**
     * Check is the vector provided equal to this one.
     * @param   {Vec2D}   vec
     * @return  {Boolean}
     */
    equals: function(vec) {
      return (vec.getX() === this.getX() && vec.getY() === this.getY());
    },


    /**
     * Multiply this vector by the provided vector.
     * @param {Vector} vec
     */
    multiplyByVector: function(vec) {
      this._axes[0] *= vec._axes[0];
      this._axes[1] *= vec._axes[1];
    },


    /**
     * Multiply this vector by the provided vector.
     * @param {Vector} vec
     */
    divideByVector: function(vec) {
      this._axes[0] /= vec._axes[0];
      this._axes[1] /= vec._axes[1];
    },


    /**
     * Multiply this vector by the provided number
     * @param {Number} n
     */
    multiplyByScalar: function(n) {
      this._axes[0] *= n;
      this._axes[1] *= n;
    },


    /**
     * Divive this vector by the provided number
     * @param {Number} n
     */
    divideByScalar: function(n) {
      this._axes[0] /= n;
      this._axes[1] /= n;
    },


    /**
     * Normalise this vector.
     * Directly affects this vector.
     * Use Vec2D.normalise(vector) to create a normalised clone of this.
     */
    normalise: function() {
      this.multiplyByScalar(1 / this.magnitude());
    },


    /**
     * For American spelling.
     * Same as unit/normalise function.
     */
    normalize: function() {
      this.normalise();
    },


    /**
     * The same as normalise.
     */
    unit: function() {
      this.normalise();
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
      return ( (this._axes[0]*vec._axes[1]) - (this._axes[1]*vec._axes[0]) );
    },

    /**
     * Returns the reverse of the provided vector.
     * @param   {Vector} vec
     * @return  {Vector}
     */
    reverse: function(vec) {
      this._axes[0] = -this._axes[0];
      this._axes[1] = -this._axes[1];
    },


    /**
     * Create a copy of this vector.
     * @return {Vector}
     */
    clone: function() {
      return new Vector(this._axes[0], this._axes[1])
    }
  };


  /****************************************************************************
   Publically exposed Vector interface.
   ****************************************************************************/
  var Vec2D = function() {
      
    };


  Vec2D.prototype = {
    Vector: Vector,
    /**
     * Create a new Vector.
     * @param {Number}  [x]
     * @param {Number}  [y]
     * @param {Object}  [axes]
     * @param {Array}   [axes]
     */
    create: function() {
      return new this.Vector(parseArgs(arguments));
    },


    /**
     * Instruct the library to use standard JavaScript arrays.
     * Otherwise the library will try use Float32Arrays if available.
     */
    useStandardArrays: function() {
      AxesArray = Array;
      useFloat32 = false;
    },


    /**
     * Add two provided Vectors to produce a new one.
     * @param   {Vector} v0
     * @param   {Vector} v1
     * @return  {Vector}
     */
    add: function(v0, v1) {
      return this.create(v0._axes[0] + v1._axes[0], v0._axes[1] + v1._axes[1])
    },


    /**
     * Subtract v0 from v1 to produce a new Vector.
     * @param   {Vector} v0
     * @param   {Vector} v1
     * @return  {Vector}
     */
    subtract: function(v0, v1) {
      return this.create(v0._axes[0] + v1._axes[0], v0._axes[1] + v1._axes[1])
    },


    /**
     * Check are the provided vectors equal.
     * @param   {Vector}   v0
     * @param   {Vector}   v1
     * @return  {Boolean}
     */
    equals: function(v0, v1) {
      return (v1._axes[0] === v0._axes[0] && v1._axes[1] === v0._axes[1]);
    },


    /**
     * Multiply a vector by a vector to produce a new Vector
     * @param   {Vector} v0
     * @param   {Vector} v1
     * @return  {Vector}
     */
    vectorTimesVector: function(v0, v1) {
      return this.create(v0._axes[0] * v1._axes[0], v0._axes[1] * v1._axes[1])
    },


    /**
     * Multiply a vector by a number to produce a new vector.
     * @param   {Vector} vec    The var to store a result in.
     * @param   {Number} n      The Vector to subtract from this one.
     * @return  {Vector}
     */
    vectorTimesScalar: function(vec, n) {
      return this.create(vec._axes[0] * n, vec._axes[1] * n)
    },


    /**
     * Return a normalised version of provided vector.
     * @param   {Vector} vec
     * @return  {Vector}
     */
    nomalise: function(vec) {
      return this.timesScalar(vec, 1 / vec.magnitude())
    },


    /**
     * Same as normalise
     */
    normalize: function(vec) {
      return this.normalise(v);
    },


    /**
     * Same as normalise.
     */
    unit: function(vec) {
      return this.normalise(v);
    },


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
      return ( (v0._axes[0]*v1._axes[1]) - (v0._axes[1]*v1._axes[0]) );
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
     * Returns the reverse of the provided vector.
     * @param   {Vector} vec
     * @return  {Vector}
     */
    reverse: function(vec) {
      return this.create(-vec._axes[0], -vec._axes[1]);
    }
  };

  // Expose publically
  if (window) {
    window.Vec2D = new Vec2D();
  } else {
    module.exports = new Vec2D();
  }

})(window);