'use strict';

var Vector = require('./Vector.js')
  , Float32Vector = require('./Float32Vector.js')
  , ObjectVector = require('./ObjectVector.js');

function Vec2D() {}

Vec2D.prototype = {
  ArrayVector: Vector,
  ObjectVector: ObjectVector,
  Float32Vector: Float32Vector
};

module.exports = new Vec2D();
