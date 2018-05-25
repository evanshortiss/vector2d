import { AbstractVector } from "./AbstractVector"

/**
 * A vector representation that stores the axes in a Float32Array
 *
 * ```
 * const v = new Vec2D.Float32Vector(2, 5)
 * ```
 */
export class Float32Vector extends AbstractVector {
  protected axes: Float32Array

  constructor(x: number, y: number) {
    super(Float32Vector)
    this.axes = new Float32Array(2)
    this.axes[0] = x
    this.axes[1] = y
  }

  get x(): number {
    return this.axes[0]
  }
  set x(x: number) {
    this.axes[0] = x
  }

  get y(): number {
    return this.axes[1]
  }
  set y(y: number) {
    this.axes[1] = y
  }
}
