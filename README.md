# Vec2D - 2D Vectors for TypeScript & JavaScript

[![Travis CI](https://travis-ci.org/evanshortiss/vec2d.svg?branch=master)](https://travis-ci.org/evanshortiss/vec2d)
[![Coverage Status](https://coveralls.io/repos/github/evanshortiss/vec2d/badge.svg?branch=master)](https://coveralls.io/github/evanshortiss/vec2d?branch=master)
[![npm version](https://badge.fury.io/js/vector2d.svg)](https://badge.fury.io/js/vector2d)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

## About
An easy to use 2D Vector library with 3 methods of Vector representation to
optimise for your particular use case.

Vec2D provides 3 main modes of Vector representations (classes):

* Vec2D.ArrayVector
* Vec2D.Float32Vector
* Vec2D.Vector

The different representations is really more of an experiment than a necessity
since for most users `Vector` or `ArrayVector` types will be fine.

Regardless of the class used all methods can be used in the same manner and
you don't need to worry about the underlying representation.

## Installation and Usage

Install via npm:

```bash
npm install vector2d
```

Usage with JavaScript:

```js
var Vec2D = require('vector2d');

const v = new Vec2D.Vector(2, 3)
```

Usage with TypeScript/ES6:

```ts
import * as Vec2D from 'vector2d'

const v = new Vec2D.Vector(2, 3)
```

It's also possible to use this module directly in the browser through
`window.Vec2D`. Simply clone the code locally and run the following:

```
npm install
npm run browserify
npm run uglify
```

This will produce `vec2d.js` and `vec2d.min.js` files in `dist/` the folder of
the repository that you can include via `<script>` tags.

## API

### Vector Instance Methods
All instance methods modify the underlying vector where possible. For example
calling *multiplyByScalar* will multiply the vector x and y components by the
provided number and return the updated vector itself (a reference to *this*)
rather than a new instance. The benefit if this is that less objects are created
which reduces garbage collection and makes chaining possible.

If you don't want to modfy the vector itself you can call `v.clone()` and modify
the newly returned vector instead. Here's an example.

```js
const av0 = new Vec2D.ArrayVector(10, 0)
const av1 = new Vec2D.ArrayVector(0, 5)

// Methods are chainable where you'd expect
const newVec = av0.clone().add(av1);
newVec.toString(); // (10, 5)

// Original vector hasn't changed!
av0.toString(); // (10, 0)
```


#### setAxes(x, y)
Set the x and y values of this vector.

#### toString()
Convert vector to a String with format "(0, 0)"

#### toArray()
Convert vector to standard JavaScript Array [2.823, 1.541]

#### toObject()
Covert vector to a JSON object with format { x: 1.4, y: 8 }.

#### add(vector)
Modify this vector by adding the provided vector to it.

#### subtract(vector)
Modify this vector by subtracting the provided vector from it.

#### equals(vector)
Check does this vector equal the provided vector.

#### mulV(vector)
Multiply this vector by provided vector.

#### divV(vector)
Divide this vector by provided vector.

#### mulS(number)
Multiply this vector by a number.

#### divS(number)
Divide this vector by a number.

#### dot(vector)
Returns dot product from this vector and the provided vector.

#### cross(vector)
Returns cross product from this vector and the provided vector.

#### reverse()
Reverse the values in this vector.

#### abs()
Convert stored values to absolute values.

#### distance(vec)
Find the distance between this vector and the provided _vec_;

#### zero()
Set vector values to 0.

#### rotate(radians)
Rotate vector by provided radians.

#### clone()
Returns a clone of this vector.
