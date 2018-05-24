const precision = [
  1,
  10,
  100,
  1000,
  10000,
  100000,
  1000000,
  10000000,
  100000000,
  1000000000,
  10000000000
]

export interface VectorConstructable<T> {
  new (x: number, y: number): T
}

export abstract class AbstractVector {
  constructor(protected ctor: VectorConstructable<AbstractVector>) {}

  abstract set x(x: number)
  abstract get x(): number

  abstract set y(y: number)
  abstract get y(): number

  /**
   * Set both x and y
   * @param x   New x val
   * @param y   New y val
   */
  setAxes(x: number, y: number) {
    this.x = x
    this.y = y
    return this
  }

  /**
   * Getter for x axis.
   */
  getX() {
    return this.x
  }

  /**
   * Setter for x axis
   */
  setX(x: number) {
    this.x = x

    return this
  }

  /**
   * Getter for y axis.
   * @return {Number}
   */
  getY() {
    return this.y
  }

  /**
   * Setter for y axis.
   */
  setY(y: number) {
    this.y = y

    return this
  }

  /**
   * View vector as a string such as "Vec2D: (0, 4)"
   */
  toString(round = false) {
    if (round) {
      return `(${Math.round(this.x)}, ${Math.round(this.y)})`
    }
    return `(${this.x}, ${this.y})`
  }

  /**
   * Return an array containing the vector axes.
   */
  toArray() {
    return [this.x, this.y]
  }

  /**
   * Return an array containing the vector axes.
   */
  toObject() {
    return {
      x: this.x,
      y: this.y
    }
  }

  /**
   * Add the provided Vector to this one.
   * @param {Vector} vec
   */
  add(vec: AbstractVector) {
    this.x += vec.x
    this.y += vec.y

    return this
  }

  /**
   * Subtract the provided vector from this one.
   * @param {Vector} vec
   */
  subtract(vec: AbstractVector) {
    this.x -= vec.x
    this.y -= vec.y

    return this
  }

  /**
   * Check is the vector provided equal to this one.
   * @param   {Vec2D}   vec
   * @return  {Boolean}
   */
  equals(vec: AbstractVector) {
    return vec.x === this.x && vec.y === this.y
  }

  /**
   * Multiply this vector by the provided vector.
   * @param {Vector} vec
   */
  multiplyByVector(vec: AbstractVector) {
    this.x *= vec.x
    this.y *= vec.y

    return this
  }

  mulV(vec: AbstractVector) {
    return this.multiplyByVector(vec)
  }

  /**
   * Multiply this vector by the provided vector.
   * @param {Vector} vec
   */
  divideByVector(vec: AbstractVector) {
    this.x /= vec.x
    this.y /= vec.y
    return this
  }

  divV(v: AbstractVector) {
    return this.divideByVector(v)
  }

  /**
   * Multiply this vector by the provided number
   * @param n
   */
  multiplyByScalar(n: number) {
    this.x *= n
    this.y *= n

    return this
  }

  mulS(n: number) {
    return this.multiplyByScalar(n)
  }

  /**
   * Divive this vector by the provided number
   * @param {Number} n
   */
  divideByScalar(n: number) {
    this.x /= n
    this.y /= n
    return this
  }

  divS(n: number) {
    return this.divideByScalar(n)
  }

  /**
   * Normalise this vector. Directly affects this vector.
   * Use Vec2D.normalise(vector) to create a normalised clone of this.
   */
  normalise() {
    return this.divideByScalar(this.magnitude())
  }

  /**
   * For American spelling.
   * Same as unit/normalise function.
   */
  normalize() {
    return this.normalise()
  }

  /**
   * The same as normalise.
   */
  unit() {
    return this.normalise()
  }

  /**
   * Return the magnitude (length) of this vector.
   */
  magnitude() {
    const x = this.x
    const y = this.y

    return Math.sqrt(x * x + y * y)
  }

  /**
   * Return the magnitude (length) of this vector.
   */
  length() {
    return this.magnitude()
  }

  /**
   * Return the squred length of a vector
   */
  lengthSq() {
    const x = this.x
    const y = this.y

    return x * x + y * y
  }

  /**
   * Get the dot product of this vector by another.
   * @param {Vector} vec
   */
  dot(vec: AbstractVector) {
    return vec.x * this.x + vec.y * this.y
  }

  /**
   * Get the cross product of this vector by another.
   * @param {Vector} vec
   */
  cross(vec: AbstractVector) {
    return this.x * vec.y - this.y * vec.x
  }

  /**
   * Reverses this vector.
   */
  reverse() {
    this.x = -this.x
    this.y = -this.y
    return this
  }

  /**
   * Convert vector to absolute values.
   * @param   {Vector} vec
   */
  abs() {
    this.x = Math.abs(this.x)
    this.y = Math.abs(this.y)

    return this
  }

  /**
   * Zeroes the vector
   */
  zero() {
    this.x = this.y = 0

    return this
  }

  /**
   * Distance between this vector and another.
   * @param {Vector} v
   */
  distance(v: AbstractVector) {
    var x = this.x - v.x
    var y = this.y - v.y

    return Math.sqrt(x * x + y * y)
  }

  /**
   * Rotate the vetor by provided radians.
   * @param   {Number}  rads
   */
  rotate(rads: number) {
    const cos = Math.cos(rads)
    const sin = Math.sin(rads)

    const ox = this.x
    const oy = this.y

    this.x = ox * cos - oy * sin
    this.y = ox * sin + oy * cos

    return this
  }

  /**
   * Round this vector to n decimal places
   * @param {Number}  n
   */
  round(n = 2) {
    var p = precision[n]

    // This performs waaay better than toFixed and give Float32 the edge again.
    // http://www.dynamicguru.com/javascript/round-numbers-with-precision/
    this.x = ((0.5 + this.x * p) << 0) / p
    this.y = ((0.5 + this.y * p) << 0) / p

    return this
  }

  /**
   * Create a copy of this vector.
   */
  clone() {
    return new this.ctor(this.x, this.y)
  }
}
