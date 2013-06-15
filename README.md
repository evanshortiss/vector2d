Vec2D - Simple 2D Vector Library for JavaScript
===

### Testing
Need to write tests.
Tested on Chrome 27 and Safari 6.0.3.

### About
Vec2D will attempt to use Float32Array types internally for faster operation through indexing. If only standard JavaScript arrays are available then these will be used. Alternatively you can force the use of standard JavaScript arrays. Inspired in part by <a href="http://media.tojicode.com/sfjs-vectors/#36">Efficient JavaScript Vector Math</a>(Efficiency not guaranteed).

```javascript
  // Use standard array instead of Float32Array
  Vec2D.useStandardArrays();
```

### Usage
Usage of instance methods and static methods is different. Instance methods do not produce new vector instances as results, they instead modify the Vector they are called on, this applies to all operations. The code snippet below demonstrates this behaviour. Instance operations such as cross and dot products return results and will not modify the underlying Vector.

```javascript
  // Create vectors using different parameter types
  var v0 = Vec2D.create({
    x: 23,
    y: 150
  });
  var v1 = Vec2D.create([23, 150]);
  var v2 = Vec2D.create(13, -50);

  // Add v1 and v0 tp produce a new Vector
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