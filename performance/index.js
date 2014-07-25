var Vec2D = require('../src/Vec2D.js'),
  Suite = require('./Suite');

var VECTOR_COUNT = 1000000,
  TEST_PASSES = 10;

console.log('Tests are averaged from %d passes/runs on a set of %d vectors. Please wait...', TEST_PASSES, VECTOR_COUNT);

var av = new Suite(Vec2D.ArrayVector, 100000, 5).run();
var fv = new Suite(Vec2D.Float32Vector, 100000, 5).run();
var ov = new Suite(Vec2D.ObjectVector, 100000, 5).run();

function stats(item) {
  console.log('"%s", %dms', item.name, item.time);
}

console.log('\nFloat32Vector:');
fv.forEach(stats);

console.log('\nArrayVector:');
av.forEach(stats);

console.log('\nObjectVector:');
ov.forEach(stats);