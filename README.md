Vec2D - 2D Vector Library for JavaScript
===

### Testing
Tests are being written currently. Running tests requires node.js and the mocha framework.

```
  $ npm install -g mocha
  $ cd ved2d
  $ mocha
  .......
```

Tested as working on Chrome 27 and Safari 6.0.3.

### About
Inspired in part by <a href="http://media.tojicode.com/sfjs-vectors/">Efficient JavaScript Vector Math</a> (I make no efficiency guarantees!). Vec2D provides 3 main modes of operation: Array (Default mode), Float32Array, and Object. Using the library in ecah mode is transparent but internal vector representation is handled differently. Float32Arrays can be used for fast operations on vectors (but creating these is expensive). If only standard JavaScript arrays are available then these will be used in place of Float32Array. Don't mix operation modes as this isn't supported!

```javascript
  // Use Float32 Arrays
  Vec2D.useFloat32Arrays();
  // Use Objects
  Vec2D.useObjects();
  // Go back to default Array mode
  Vec2D.useStandardArrays();
```

### Usage
Can be used in browser or within a node.js application.
Usage of instance methods and static methods is different. Instance methods do not produce new vector instances as results, they instead modify the Vector they are called upon, this applies to almost all operations (obviously clone() will return a new instance and magnitude() returns a number). The code snippet below demonstrates this behaviour. Using instance methods to perform vector operations as much as possible will minimise garbage collection and result in better application performance.

```javascript
  // Usage in node.js application
  var Vec2D = require('vector2d');
```

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
  // Prints "(46, 300)" as the Vector has been modified
  v0.toString();

  // Will return -14402
  v2.dot(v0)
```

### Performance Statistics
This section will be filled in soon. For now running the tests will provide a basic performance overview prior to tests. Tests can be run be running the mocha command in the project root directory.