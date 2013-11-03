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
  var useObjects = false;
  var AxesArray = Array;

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
    } else {
      return [0, 0];
    }
  }


  /**
   * Check is the passed param a Vec2D instance.
   * @param   {Mixed}   v   The var to check.
   * @return  {Boolean}     The result of check.
   */

  function isVector(v) {
    return v instanceof Vector || v instanceof ObjectVector;
  };


  /**
   * Genric create function for lib.
   */

  function create(arguments) {
    if (useObjects == true) {
      return new ObjectVector(parseArgs(arguments));
    }
    return new Vector(parseArgs(arguments));
  }


  /**
   * Set both x and y
   * @param x   New x val
   * @param y   New y val
   */

  function set(x, y) {
    if (x instanceof Array) {
      this.setX(x[0]);
      this.setY(x[1]);
    } else if (typeof x === 'object') {
      this.setX(x.x);
      this.setY(x.y);
    } else {
      this.setX(x);
      this.setY(y);
    }

    return this;
  }


  /**
   * Add provided vector to calling one.
   * @param {Vector}
   */

  function add(v) {
    this.setX(this.getX() + v.getX());
    this.setY(this.getY() + v.getY());

    return this;
  }


  /**
   * Subtract provided vector from calling one.
   * @param {Vector}
   */

  function subtract(v) {
    this.setX(this.getX() - v.getX());
    this.setY(this.getY() - v.getY());

    return this;
  }


  /**
   * Multiply vector by scalar
   * @param {Number} s
   */

  function multS(s) {
    this.setX(this.getX() * s);
    this.setY(this.getY() * s);

    return this;
  }


  /**
   * Multiply vector by vector
   * @param {Vector} v
   */

  function multV(v) {
    this.setX(this.getX() * v.getX());
    this.setY(this.getY() * v.getY());

    return this;
  }


  /**
   * Divide vector by scalar
   * @param {Number} s
   */

  function divS(s) {
    this.setX(this.getX() / s);
    this.setY(this.getY() / s);

    return this;
  }


  /**
   * Divide vector by vector
   * @param {Vector} v
   */

  function divV(v) {
    this.setX(this.getX() / v.getX());
    this.setY(this.getY() / v.getY());

    return this;
  }


  /**
   * Returns the length of the vector.
   * @return {Number}
   */

  function length() {
    var x = this.getX(),
      y = this.getY();

    return Math.sqrt((x * x) + (y * y));
  }


  /**
   * Returns the squared length of the vector.
   * @return {Number}
   */

  function lengthSq() {
    var x = this.getX(),
      y = this.getY();

    return (x * x) + (y * y);
  }


  /**
   * Find distance between calling vector and provided vec
   * @param {Vector} v
   */

  function distance(v) {
    var x = this.getX() - v.getX();
    var y = this.getY() - v.getY();

    return Math.sqrt((x * x) + (y * y));
  }


  /**
   * Normalise this vector.
   */

  function normalise() {
    return multS.call(this, 1 / this.length());
  }


  /**
   * Get the dot product of this vector by another.
   * @param   {Vector} v
   * @return  {Number}
   */

  function dot(v) {
    return (v.getX() * this.getX()) + (v.getY() * this.getY());
  }


  /**
   * Convert the provided vector to be absolute.
   * @param {Boolean} overwrite
   */

  function abs(overwrite) {
    if (overwrite) {
      this.setX(Math.abs(this.getX()));
      this.setY(Math.abs(this.getY()));

      return this;
    }

    return create(Math.abs(vec.getX(), vec.getY()));
  }


  /**
   * Get the cross product of this vector by another.
   * @param   {Vector} v
   * @return  {Number}
   */

  function cross(v) {
    return ((this.getX() * v.getY()) - (this.getY() * v.getX()));
  }


  /**
   * Returns the reverse of the provided vector.
   * @return {Vector}
   */

  function reverse() {
    this.setX(-this.getX());
    this.setY(-this.getY());

    return this;
  }


  /**
   * Create a copy of this vector.
   * @return {Vector}
   */

  function clone() {
    var arg = [this.getX(), this.getY()];

    // Use the appropriate constructor
    if (this instanceof ObjectVector) {
      return new ObjectVector(arg);
    }
    return new Vector(arg);
  }


  /**
   * Check are two vectors equal
   * @param {Vector} v
   */

  function equals(v) {
    return this.getX() === v.getX() && this.getY() === v.getY();
  }


  /**
   * Convert a vector to JSON object.
   */

  function toObject() {
    return {
      x: this.getX(),
      y: this.getY()
    };
  }


  /**
   * Convert vector to array
   */

  function toArray() {
    return [this.getX(), this.getY()];
  }


  /**
   * Convert vector to string with format "(x, y)"
   * @param {Boolean} round
   */

  function toString(round) {
    var x = this.getX(),
      y  = this.getY();

    if(round) {
      x = Math.round(x);
      y = Math.round(y);
    }

    return '(' + x + ', ' + y + ')'
  }


  /****************************************************************************
   * Main array based vector class. Has instance methods attached to prototype.
   * @constructor
   * @param {Array}  axes
   ****************************************************************************/
  var Vector = function(axes) {
      // Constructor for each array type is different. (Float32Array vs Array)
      if (AxesArray.name === 'Float32Array') {
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

    add: add,
    dot: dot,
    divV: divV,
    divS: divS,
    setAxes: set,
    multV: multV,
    multS: multS,
    cross: cross,
    clone: clone,
    equals: equals,
    length: length,
    unit: normalise,
    reverse: reverse,
    toArray: toArray,
    magnitude: length,
    lengthSq: lengthSq,
    toObject: toObject,
    toString: toString,
    subtract: subtract,
    normalise: normalise,
    normalize: normalise,
    divideByVector: divV,
    divideByScalar: divS,
    multiplyByScalar: multS,
    multiplyByVector: multV,
  };


  /****************************************************************************
   * Main object based vector class. Has instance methods attached to prototype.
   * @constructor
   * @param {Array}  axes
   ****************************************************************************/
  var ObjectVector = function(axes) {
      // Constructor for each array type is different. (Float32Array vs Array)
      this._axes = {
        x: axes[0],
        y: axes[1]
      };
    };

  // Inherit from standard array based Vector 
  ObjectVector.prototype = new Vector([0, 0]);

  // Support object data structure
  ObjectVector.prototype.getX = function() {
    return this._axes.x;
  };
  ObjectVector.prototype.getY = function() {
    return this._axes.y;
  };
  ObjectVector.prototype.setX = function(x) {
    this._axes.x = x;
  };
  ObjectVector.prototype.setY = function(y) {
    this._axes.y = y;
  };

  /****************************************************************************
   Publically exposed Vector interface.
   ****************************************************************************/
  var Vec2D = function() {

    };


  Vec2D.prototype = {
    Vector: Vector,
    ObjectVector: ObjectVector,

    /**
     * Create a new Vector.
     * @param {Number}  [x]
     * @param {Number}  [y]
     * @param {Object}  [axes]
     * @param {Array}   [axes]
     */
    create: function() {
      return create(arguments);
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

      return create(x, y);
    },


    /**
     * Get absolute vector from provided vector.
     * @param   {Vector}
     * @return  {Vector}
     */
    abs: function(vec) {
      abs.call(vec, false)
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
      return add.call(v0.clone(), v1);
    },


    /**
     * Subtract v0 from v1 to produce a new Vector.
     * @param   {Vector} v0
     * @param   {Vector} v1
     * @return  {Vector}
     */
    subtract: function(v0, v1) {
      return subtract.call(v0.clone(), v1);
    },


    /**
     * Check are the provided vectors equal.
     * @param   {Vector}   v0
     * @param   {Vector}   v1
     * @return  {Boolean}
     */
    equals: function(v0, v1) {
      return equals.call(v0, v1);
    },


    /**
     * Multiply a vector by a vector to produce a new Vector
     * @param   {Vector} v0
     * @param   {Vector} v1
     * @return  {Vector}
     */
    vectorTimesVector: function(v0, v1) {
      return multV.call(v0.clone(), v1);
    },


    /**
     * Multiply a vector by a number to produce a new vector.
     * @param   {Vector} vec    The var to store a result in.
     * @param   {Number} n      The Vector to subtract from this one.
     * @return  {Vector}
     */
    vectorTimesScalar: function(vec, n) {
      return multS.call(vec.clone(), n);
    },


    /**
     * Return a normalised version of provided vector.
     * @param   {Vector} vec
     * @return  {Vector}
     */
    nomalise: function(vec) {
      return nomalise.call(vec.clone());
    },


    /**
     * Same as normalise
     */
    normalize: function(vec) {
      return this.normalise(vec);
    },


    /**
     * Same as normalise.
     */
    unit: function(vec) {
      return this.normalise(vec);
    },


    /**
     * Return the dot product of two vectors or this vector dot another.
     * @param   {Vector} v0
     * @param   {Vector} v1
     * @return  {Number}
     */
    dot: function(v0, v1) {
      return dot.call(v0, v1);
    },


    /**
     * Calculate the cross product of two vectors.
     * @param   {Vector} v0
     * @param   {Vector} v1
     * @param   {Vector}
     */
    cross: function(v0, v1) {
      return cross.call(v0, v1);
    },


    /**
     * Return the magnitude (length) of a vector.
     * @param   {Vector} vec
     * @return  {Number}
     */
    magnitude: function(vec) {
      return length.call(vec);
    },


    /**
     * Same as the magnitude.
     */
    length: function(vec) {
      return this.magnitude(vec);
    },


    /**
     * Return squared length of vector.
     * @param   {Vector}
     * @return  {Number}
     */
    lengthSq: function(vec) {
      lengthSq.call(vec);
    },


    /**
     * Find sqaure distance between two vectors.
     * @param   {Vector} v0
     * @param   {Vector} v1
     * @return  {Number}
     */
    distance: function(v0, v1) {
      distance.call(v0, v1);
    },


    /**
     * Returns the reverse of the provided vector.
     * @param   {Vector} vec
     * @return  {Vector}
     */
    reverse: function(vec) {
      return reverse.call(v0.clone());
    }
  };

  // Expose publically
  if (typeof window !== 'undefined') {
    window.Vec2D = new Vec2D();
  } else {
    module.exports = new Vec2D();
  }
})();