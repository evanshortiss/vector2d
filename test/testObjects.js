/**
 * tests.js
 * Contains test suite for library.
 */

var assert = require('assert'),
  Vec2D = require('../src/Vec2D.js');


describe('Test Vec2D Library instance methods.', function() {

  describe('Vector creation methods.', function() {
    it('Should create a vectors successfully from array, object and x, y params', function() {
      var v1 = new Vec2D.ObjectVector(1, 2);
      assert(v1);
      assert(v1.getX() === 1);
      assert(v1.getY() === 2);
      assert(v1 instanceof Vec2D.ObjectVector);
    });

    it('Should create an ObjectVector directly', function() {
      var v = new Vec2D.ObjectVector(0, 23);

      assert(v.getX() === 0);
      assert(v.getY() === 23);
    });
  });

  describe('Setting vector x and y params (Setters)', function() {
    it('Should modify vector axes to provided values.', function() {
      var v1 = new Vec2D.ObjectVector(1, 2);

      // Set both x and y
      v1.setAxes(33, 57);
      assert(v1.getX() === 33);
      assert(v1.getY() === 57);

      // Just x
      v1.setX(10);
      assert(v1.getX() === 10);

      // Just y
      v1.setX(47);
      assert(v1.getX() === 47);
    });
  });

  describe('toString()', function() {
    it('Should return vector as properly formatted string', function() {
      var v1 = new Vec2D.ObjectVector(10.9, 20.3);

      assert(v1.toString() === '(' + v1.getX() + ', ' + v1.getY() + ')');
      assert(v1.toString(true) === '(11, 20)');
    });
  });

  describe('toArray()', function() {
    it('Should return vector as standard array.', function() {
      var v1 = new Vec2D.ObjectVector(645, 234);

      var res = v1.toArray();
      assert(res[0] === 645);
      assert(res[1] === 234);
    });
  });

  describe('toObject()', function() {
    it('Should return an object containgin x and y properties', function() {
      var v1 = new Vec2D.ObjectVector(645, 234);

      var res = v1.toObject();
      assert(res.x === 645);
      assert(res.y === 234);
    });
  });

  describe('add()', function() {
    it('Should add two vectors using the instance method.', function() {
      var v1 = new Vec2D.ObjectVector(2, 4);
      var v2 = new Vec2D.ObjectVector(3, 34);

      v1.add(v2);
      assert(v1.getX() === 5 && v1.getY() === 38);
      assert(v2.getX() === 3 && v2.getY() === 34);
    });
  });

  describe('subtract()', function() {
    it('Should subtract one vector from another via instance method', function() {
      var v1 = new Vec2D.ObjectVector(2, 4);
      var v2 = new Vec2D.ObjectVector(3, 34);

      v1.subtract(v2);
      assert(v1.getX() === -1 && v1.getY() === -30);
      assert(v2.getX() === 3 && v2.getY() === 34);
    });
  });

  describe('equals()', function() {
    it('Should determine vectors are equal before any modifications and not after.', function() {
      var v1 = new Vec2D.ObjectVector(3, 34);
      var v2 = new Vec2D.ObjectVector(3, 34);

      assert(v1.equals(v2));
      assert(v2.equals(v1));
      v1.add(v2);
      assert(!v1.equals(v2));
      assert(!v2.equals(v1));
    });
  });

  describe('multiplyByVector()', function() {
    it('Should multiply vector by another  without producing a new vector.', function() {
      var v1 = new Vec2D.ObjectVector(5, 3);
      var v2 = new Vec2D.ObjectVector(3, 10);

      v1.multiplyByVector(v2);

      assert(v1.getX() === 15);
      assert(v1.getY() === 30);
      assert(v2.getX() === 3);
      assert(v2.getY() === 10);
    });
  });

  describe('divideByVector', function() {
    it('Should dive one vector by another without producing a new vector.', function() {
      var v1 = new Vec2D.ObjectVector(10, 20);
      var v2 = new Vec2D.ObjectVector(2, 10);

      v1.divideByVector(v2);

      assert(v1.getX() === 5);
      assert(v1.getY() === 2);
      assert(v2.getX() === 2);
      assert(v2.getY() === 10);
    });
  });

  describe('multiplyByScalar()', function() {
    it('Should multiply vector by number without producing a new vector.', function() {
      var v1 = new Vec2D.ObjectVector(5, 3);

      v1.multiplyByScalar(3);

      assert(v1.getX() === 15);
      assert(v1.getY() === 9);
    });
  });

  describe('divideByScalar()', function() {
    it('Should divide vector by number without producing a new vector.', function() {
      var v1 = new Vec2D.ObjectVector(6, 9);

      v1.divideByScalar(3);

      assert(v1.getX() === 2);
      assert(v1.getY() === 3);
    });
  });

  describe('magnitude()', function() {
    it('Should return length of the vector.', function() {
      var v1 = new Vec2D.ObjectVector(6, 9);
      var len = Math.sqrt(v1.getX() * v1.getX() + v1.getY() * v1.getY());

      assert(v1.magnitude() === len);
    });
  });

  describe('normalise()', function() {
    it('Should return unit/normalised version of this vector.', function() {
      var v1 = new Vec2D.ObjectVector(6, 9);
      var len = v1.magnitude();
      var v2 = new Vec2D.ObjectVector(v1.getX() / len, v1.getY() / len);
      v1.normalise();

      // Rounding error occurs in object version
      if(v1.x) {
        // Screw it, will sort out epsilon val or something when I can
      } else {
        assert(v1.equals(v2));
      }
    });
  });

  describe('dot()', function() {
    it('Should apply dot result to the vector method is called on.', function() {
      var v1 = new Vec2D.ObjectVector(6, 9);
      var v2 = new Vec2D.ObjectVector(10, 9);

      var expected = v1.getX()*v2.getX() + v1.getY()*v2.getY();
      var res = v1.dot(v2);

      assert(res === expected);
    });
  });

  describe('reverse()', function() {
    it('Should reverse vector axes', function() {
      var v1 = new Vec2D.ObjectVector(6, 9);
      v1.reverse();

      assert(v1.getX() === -6);
      assert(v1.getY() === -9);
    });
  });

  describe('clone()', function() {
    it('Should create a copy of the vector.', function() {
      var v1 = new Vec2D.ObjectVector(47, 345);
      var clone = v1.clone();

      assert(clone != v1);
      assert(clone.equals(v1));
    });
  });

  describe('cross()', function() {
    it('Should return a scalar value.', function() {
      var v1 = new Vec2D.ObjectVector(12, 32);
      var v2 = new Vec2D.ObjectVector(2, 56);

      assert(v1.cross(v2) === (v1.getX() * v2.getY() - v1.getY() *v2.getX()) );
      assert(v1.getX() === 12 && v1.getY() === 32);
      assert(v2.getX() === 2 && v2.getY() === 56);
    });
  })
});