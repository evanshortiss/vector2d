var util = require('util'),
  ArrayVector = require('./ArrayVector');

function Float32Vector(x, y) {
  this._axes = new Float32Array(2);
  this._axes[0] = x;
  this._axes[1] = y;
}
util.inherits(Float32Vector, ArrayVector);

module.exports = Float32Vector;

