Vec2D - 2D Vector Library for JavaScript
===

## About
An easy to use 2D Vector library with 3 methods of Vector representation for performance tuning, and all within 5KB.

Vec2D provides 3 main modes of operation (Vector representations): 

* Array (Default mode)
* Float32Array
* Object

Regardless of operation mode all library functions can be used in the same manner and developers will not need to worry about the vector representation. 

```javascript
  // You only need to call these once if you don't plan on changing mode

  // Use Float32 Arrays
  Vec2D.useFloat32Arrays();
  // Use Objects
  Vec2D.useObjects();
  // Go back to default Array mode
  Vec2D.useStandardArrays();
```

In some instances mixing operation modes may work but I have not yet tested for all use cases. The mode used depends on use case, for example if you plan to create many vectors in each frame of a game, but perform very few operations on them then Objects might be fastest. Float32Arrays can be used for faster operations on vectors, but creating these is expensive so it is important to choose the best vector representation for your application. See the [Performance Statistics](#perf) section for more info.

## Testing
Running tests requires node.js and the mocha framework.

```
  $ npm install -g mocha
  $ cd ved2d
  $ mocha
  .......
```

Tested on: 
* Node.js 0.8.8
* Chrome 27
* Safari 6.0.3.


## Usage

### Node.js
To install:
```
  $ npm install vector2d
```

To use:
```javascript
  // Usage in node.js application if installed via npm
  var Vec2D = require('vector2d');
```

### Browser
Just include a script tag as you'd expect:
```html
<script src="path/to/vec2d.js" type="text/javascript"></script>
```

### Library Functions
To avoid garbage collection and allow for faster operation all vector instance methods will modify the existing vector where possible. If you want to produce a new vector as a result of an operation do not use instance methods. The example below demonstrates this.

```javascript
  // Create vectors using different parameter types
  var v0 = Vec2D.create({
    x: 23,
    y: 150
  });
  var v1 = Vec2D.create([23, 150]);
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

<a name="perf" />
## Performance
To get an idea of the different performance based on the types being used run ```node perf.js``` in the project root directory. This compares the same operation set using each of the three Vector representations, Array, Float32Array and Object. 



