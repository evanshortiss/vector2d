'use strict';

var util = require('util')
  , Vector = require('./Vector.js');

function Float32Vector(x, y) {
  if (this instanceof Float32Vector === false) {
    return new Float32Vector(x, y);
  }

  this._axes = new Float32Array(2);
  this._axes[0] = x;
  this._axes[1] = y;
}
util.inherits(Float32Vector, Vector);

Float32Vector.prototype.ctor = Float32Vector;

module.exports = Float32Vector;
