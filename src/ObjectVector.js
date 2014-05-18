var util = require('util'),
  Vector = require('./Vector');

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
module.exports = ObjectVector;

ObjectVector.prototype.clone = function() {
  return new ObjectVector(this._axes[0], this._axes[1]);
};
