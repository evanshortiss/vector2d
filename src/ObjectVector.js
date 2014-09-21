'use strict';

var util = require('util')
  , Vector = require('./Vector.js');

function ObjectVector(x, y) {
  if (this instanceof ObjectVector === false) {
    return new ObjectVector(x, y);
  }

  this._axes = {
    0: x,
    1: y
  };
}
util.inherits(ObjectVector, Vector);

ObjectVector.prototype.ctor = ObjectVector;

module.exports = ObjectVector;
