Vec2D - 2D Vector Library for JavaScript
===

[![build-status](https://travis-ci.org/evanshortiss/vec2d.svg?branch=master)
](https://travis-ci.org/evanshortiss/vec2d.svg?branch=master)

## Browser Support
[![browser support](https://ci.testling.com/evanshortiss/vec2d.png)
](https://ci.testling.com/evanshortiss/vec2d)

Full API support is available in the browsers listed in green above. Browsers marked in red generally support the library, but do not support Float32Vectors so simply don't use these and you'll be fine.

## Version 2.0.0+ Breaking Changes
Version 2.0.0 has been updated to remove my manual build steps in favour of using the awesome [browserify](http://browserify.org/).

As of version 2.0.0 all methods on the Vec2D object have been removed, only the classes *ArrayVector*, *Float32Vector* and *ObjectVector* are left. I made this choice to ensure it's always explicitly known which type of Vector is being created and to make the library easier to work with.

## About
An easy to use 2D Vector library with 3 methods of Vector representation to allow you to squeeze out as much performance as possible.

Vec2D provides 3 main modes of Vector representations (classes):

* ArrayVector
* Float32Vector
* ObjectVector

Regardless of class used all library functions can be used in the same manner and developers will not need to worry about the vector representation. You should also be able to mix vector types as the interface and base class used is consistent across the types with only the underlying data structure used to store the axes being modified.

The mode used depends on use case, for example if you plan to create many vectors in each frame of a game, but perform very few operations on them then ArrayVector might be fastest. Float32Arrays can be used for faster operations on vectors, but creating these is expensive so it is important to choose the best vector representation for your application.

## Usage

### Node.js
To install:

```bash
  $ npm install vector2d
```

To use:

```javascript
  // Usage in node.js application if installed via npm
  var Vec2D = require('vector2d');
```

### Browser
Just include a script tag as you'd expect:

```javascript
<script src="path/to/vec2d.js" type="text/javascript"></script>
```


## Performance

Performance can be gauged by running the command below. This currently only operates in a node environment so you need to run it from a terminal.

```bash
Evan@Evans-MacBook-Pro:~/vec2d$ make performance
node --expose-gc ./performance/index.js
Tests are averaged from 5 passes/runs on a set of 100000 vectors. Please wait...

Float32Vector:
"generate (e.g new Float32Vector)", 936ms
"add", 38ms
"subtract", 36.8ms
"round", 6ms
"abs", 6.2ms
"magnitude", 3.8ms
"clone", 883.2ms
"zero", 3ms
"reverse", 6.8ms
"toString", 8.4ms
"multiplyByScalar", 6.6ms
"normalise", 11.4ms
"divS", 7ms
"lengthSq", 4.8ms

ArrayVector:
"generate (e.g new Vector)", 34ms
"add", 39.8ms
"subtract", 36.4ms
"round", 4.6ms
"abs", 4.2ms
"magnitude", 2ms
"clone", 6.2ms
"zero", 1.6ms
"reverse", 4.4ms
"toString", 14ms
"multiplyByScalar", 5.8ms
"normalise", 9ms
"divS", 6.4ms
"lengthSq", 4.2ms

ObjectVector:
"generate (e.g new ObjectVector)", 10ms
"add", 24.2ms
"subtract", 23.6ms
"round", 7ms
"abs", 6.6ms
"magnitude", 3.2ms
"clone", 6.8ms
"zero", 3.6ms
"reverse", 5.4ms
"toString", 27.6ms
"multiplyByScalar", 7ms
"normalise", 10.4ms
"divS", 8.4ms
"lengthSq", 4ms
```

## Library Function Structure
To avoid garbage collection and allow for faster operation all vector instance methods will modify the existing vector where possible. If you want to produce a new vector as a result of an operation do not use instance methods. The example below demonstrates this.


```javascript
  // Create a vector
  var v0 = Vec2D.ObjectVector(23, 150);
  var v1 = Vec2D.ObjectVector(23, 150);
  var v2 = Vec2D.ObjectVector(13, -50);

  // Add v1 and v0 to produce a new Vector
  var result = v0.clone().add(v1);
  // Prints "(46, 300)"
  result.toString();
  // Prints "(23, 150)"
  v0.toString();

  // Add v1 to v0 using instance method.
  v0.add(v1);
  // Prints "(46, 300)" as the underlying vector has been modified
  v0.toString();

  // Will return -14402
  v2.dot(v0)
```

## API

### Instance Methods
Vectors returned by calling **Vec2D.ObjectVector/ArrayVector/Float32Vector(x, y)** have the following methods accessible on them. All instance methods modify the underlying vector where appropriate. For example calling *multiplyByScalar* will multiply the vector x and y components by the provided number and return the updated underlying vector itself (a reference to *this*) rather than a new instance. The benefit if this is that less objects are created meaning improved performance and methods can be chained.

So, what if I don't want to modify the underlying vector you ask!? Simple *v.clone()*, checkout the example below.

```javascript
  var av0 = Vec2D.ArrayVector(10, 0),
    av1 = Vec2D.ArrayVector(0, 5);

  // Methods are chainable where you'd expect
  var result = av0.clone().add(av1);
  result.toString(); // (10, 5)

  // It hasn't changed!
  av0.toString(); // (10, 0)
```

##### setAxes(x, y)

##### getX()

##### setX(x)

##### getY()

##### setY(y)

##### toString()
Convert vector to a String with format "(0, 0)"

##### toArray()
Convert vector to standard JavaScript Array [2.823, 1.541]

##### toObject()
Covert vector to a JSON object with format { x: 1.4, y: 8 }.

##### add(vector)
Modify this vector by adding the provided vector to it.

##### subtract(vector)
Modify this vector by subtracting the provided vector from it.

##### equals(vector)
Check does this vector equal the provided vector.

##### mulV(vector)
Multiply this vector by provided vector.

##### divV(vector)
Divide this vector by provided vector.

##### mulS(number)
Multiply this vector by a number.

##### divS(number)
Divide this vector by a number.

##### dot(vector)
Returns dot product from this vector and the provided vector.

##### cross(vector)
Returns cross product from this vector and the provided vector.

##### reverse()
Reverse the values in this vector.

##### abs()
Convert stored values to absolute values.

##### distance(vec)
Find the distance between this vector and the provided _vec_;

##### zero()
Set vector values to 0.

##### rotate(radians)
Rotate vector by provided radians.

##### clone()
Returns a clone of this vector.

##### normalise() / normalize() / unit()

##### magnitude() / length()

##### lengthSq()

