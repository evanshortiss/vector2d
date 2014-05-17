Vec2D - 2D Vector Library for JavaScript
===

[![browser support](https://ci.testling.com/evanshortiss/evanshortiss.png)
](https://ci.testling.com/evanshortiss/evanshortiss)

## About
An easy to use 2D Vector library with 3 methods of Vector representation for performance tuning, and all within 5KB.

Vec2D provides 3 main modes of operation (Vector representations):

* Array (Default mode)
* Float32Array
* Object

Regardless of operation mode all library functions can be used in the same manner and developers will not need to worry about the vector representation.

```
  // You only need to call these once if you don't plan on changing mode

  // Use Float32 Arrays
  Vec2D.useFloat32Arrays();
  // Use Objects
  Vec2D.useObjects();
  // Go back to default Array mode
  Vec2D.useStandardArrays();
```

In some instances mixing operation modes may work but I have not yet tested for all use cases. The mode used depends on use case, for example if you plan to create many vectors in each frame of a game, but perform very few operations on them then Objects might be fastest. Float32Arrays can be used for faster operations on vectors, but creating these is expensive so it is important to choose the best vector representation for your application. See the [Performance Statistics](#perf) section for more info.

Tested on:
* Node.js 0.8.8, 0.10.15
* Chrome 27
* Safari 6.0.3.


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
  var v0 = Vec2D.create(23, 150);
  var v1 = Vec2D.create(23, 150);
  var v2 = Vec2D.create(13, -50);

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
Vectors returned by calling **Vec2D.create(x, y)** have the following methods accessible on them. All instance methods modify the underlying vector where appropriate. For example calling mulS will multiply the vector x and y components by the provided number. Instance methods that don't have a regular return value **multV** for example will simple return the vector itself meaning these methods can be chained.

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
Covert vector to a JSON object.

##### add(vector)
Modify this vector by adding the provided vector to it.

##### subtract(vector)
Modify this vector by subtracting the provided vector from it.

##### equals(vector)
Check does this vector equal the provided vector.

##### multV(vector)
Multiply this vector by provided vector.

##### divV(vector)
Divide this vector by provided vector.

##### multS(number)
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
These methods when called return a new Vector. **ArrayVector** and **ObjectVector** must be called using the new keyword. For example **Vec2D.ArrayVector(x, y)** or **Vec2D.abs(myVec)**.

##### ArrayVector(x, y)
Use to create an Array based vector.

##### ObjectVector(x, y)
Use to create an Object based vector.

##### Float32Vector(x, y)
Use to create a Float32 based vector.

##### create(x, y)
Create a vector using the current type. For example, by default this will create Array based Vectors. If you called **Vec2D.useObjects()** it will create Object based Vectors.

##### random(min, max)
Create a random vector with specified min and max values.

##### abs(vector)
Return an instance of the passed vector with it's the absolute values for it's x and y components.

##### useStandardArrays()
Force **Vec2D.create(x, y)** to use Array for vector class.

##### useFloat32Arrays()
Force **Vec2D.create(x, y)** to use Float32Array vector class.

##### useObjects()
Force **Vec2D.create(x, y)** to use Object for class.

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

