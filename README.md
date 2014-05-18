Vec2D - 2D Vector Library for JavaScript
===

## Browser Support
[![browser support](https://ci.testling.com/evanshortiss/vec2d.png)
](https://ci.testling.com/evanshortiss/vec2d)

Full API support is available in the browsers listed in green above. Browsers marked in red generally support the library, but do not support Float32Arrays so simply don't use these.

## Version 2.0.0 Breaking Changes
Version 2.0.0 has been updated to remove my manual build steps in favour of using the awesome [browserify](http://browserify.org/).

As of version 2.0.0 the **Vec2D.create**, **Vec2D.random** functions have been removed. I made this choice to ensure it's always explicitly known which type of Vector is being created. Naturally this means that the **useObjects**, **useFloat32Arrays** and **useStandardArrays** are no longer present.

## About
An easy to use 2D Vector library with 3 methods of Vector representation for performance tuning.

Vec2D provides 3 main modes of operation (Vector representations):

* ArrayVector
* Float32Array
* ObjectVector

Regardless of operation mode all library functions can be used in the same manner and developers will not need to worry about the vector representation.

In some instances mixing operation modes may work but I have not yet tested for all use cases. The mode used depends on use case, for example if you plan to create many vectors in each frame of a game, but perform very few operations on them then Objects might be fastest. Float32Arrays can be used for faster operations on vectors, but creating these is expensive so it is important to choose the best vector representation for your application. See the [Performance Statistics](#perf) section for more info.

## Usage

### Node.js
To install:

```
  $ npm install vector2d
```

To use:

```
  // Usage in node.js application if installed via npm
  var Vec2D = require('vector2d');
```

### Browser
Just include a script tag as you'd expect:

```
<script src="path/to/vec2d.js" type="text/javascript"></script>
```

## Library Function Structure
To avoid garbage collection and allow for faster operation all vector instance methods will modify the existing vector where possible. If you want to produce a new vector as a result of an operation do not use instance methods. The example below demonstrates this.


```
  // Create a vector
  var v0 = Vec2D.ObjectVector(23, 150);
  var v1 = Vec2D.ObjectVector(23, 150);
  var v2 = Vec2D.ObjectVector(13, -50);

  // Add v1 and v0 to produce a new Vector
  var result = Vec2D.add(v0, v1);
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

###Vector Instance Methods
Vectors returned by calling **Vec2D.[ObjectVector/ArrayVector/Float32Vector](x, y)** have the following methods accessible on them. All instance methods modify the underlying vector where appropriate. For example calling *multiplyByScalar* will multiply the vector x and y components by the provided number and return the updated underlying vector itself rather than a new instance.

The benefit if this is that less objects are created and methods can be chained.

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

##### zero()
Set vector values to 0.

##### rotate(radians)
Rotate vector by provided radians.

##### clone()
Returns a clone of this vector.

##### normalise() / normalize() / unit()

##### magnitude() / length()

##### lengthSq()


### Static Class Methods
These methods when called return a new Vector where appropriate. **ArrayVector**, **ObjectVector** and **Float32Vector** must be called using the new keyword. For example **new Vec2D.ArrayVector(x, y)**.

##### ArrayVector(x, y)
Use to create an Array based vector.

##### ObjectVector(x, y)
Use to create an Object based vector.

##### Float32Vector(x, y)
Use to create a Float32 based vector.

##### abs(vector)
Return an instance of the passed vector with it's the absolute values for it's x and y components.

##### add(v1, v2)
Add two vectors to produce a new output.

##### subtract(v1, v2);
Subtract v2 from v1 to produce a new vector.

##### equals(v1, v2)
See if the provided Vectors are equal.

##### vectorTimesVector(v1, v2) / multV(v1, v2)
Multiply v1 by v2 to return a new vector.

##### vectorTimesScalar(vector, number) / multS(vector, number)
Multiply vector by the provided number to create a new vector.

##### nomalise(vector) / normalize(vector) / unit(vector)
Normalise this vector

##### dot(v1, v2)

##### cross(v1, v2)

##### magnitude(vector) / length(vector)

##### rotate(vector, radians)

##### distance(v1, v2)

##### reverse(vector)

