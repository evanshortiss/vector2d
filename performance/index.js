var Vec2D = require('../src/Vec2D.js'),
  Suite = require('./Suite');

var VECTOR_COUNT = 100000,
  TEST_PASSES = 5;

console.log('Tests are averaged from %d passes/runs on a set of %d vectors. Please wait...', TEST_PASSES, VECTOR_COUNT);

var fv = new Suite(Vec2D.Float32Vector, 100000, 5).run();
var av = new Suite(Vec2D.ArrayVector, 100000, 5).run();
var ov = new Suite(Vec2D.ObjectVector, 100000, 5).run();

function stats(item) {
  console.log('%dms "%s"', item.time, item.name);
}

console.log('\nFloat32Vector:');
fv.forEach(stats);

console.log('\nArrayVector:');
av.forEach(stats);

console.log('\nObjectVector:');
ov.forEach(stats);