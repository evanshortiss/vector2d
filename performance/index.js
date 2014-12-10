var Vec2D = require('../src/Vec2D.js'),
  Suite = require('./Suite');

var VECTOR_COUNT = 100000,
  TEST_PASSES = 5;

console.log('Tests are averaged from %d passes/runs on a set of %d vectors. Please wait...', TEST_PASSES, VECTOR_COUNT);

var av = new Suite(Vec2D.ArrayVector, VECTOR_COUNT, TEST_PASSES).run();
var fv = new Suite(Vec2D.Float32Vector, VECTOR_COUNT, TEST_PASSES).run();
var ov = new Suite(Vec2D.ObjectVector, VECTOR_COUNT, TEST_PASSES).run();

function stats(item) {
  console.log('"%s", %dms', item.name, item.time);
}

console.log('\nFloat32Vector:');
fv.forEach(stats);
global.gc();

setTimeout(function () {
  console.log('\nArrayVector:');
  av.forEach(stats);

  global.gc();

  setTimeout(function () {
    console.log('\nObjectVector:');
    ov.forEach(stats);
  }, 4000);
}, 4000);
