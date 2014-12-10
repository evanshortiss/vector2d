'use strict';

var util = require('util')
  , Vector = require('./Vector.js');

function ObjectVector(x, y) {
  if (this instanceof ObjectVector === false) {
    return new ObjectVector(x, y);
  }

  this._x = x;
  this._y = y;
}
util.inherits(ObjectVector, Vector);

Object.defineProperty(ObjectVector.prototype, 'x', {
  get: function () {
    return this._x;
  },
  set: function (x) {
    this._x = x;
  }
});

Object.defineProperty(ObjectVector.prototype, 'y', {
  get: function () {
    return this._y;
  },
  set: function (y) {
    this._y = y;
  }
});

ObjectVector.prototype.ctor = ObjectVector;

module.exports = ObjectVector;
