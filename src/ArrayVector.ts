import { AbstractVector } from "./AbstractVector"

export class ArrayVector extends AbstractVector {
  protected axes: number[]

  constructor(x: number, y: number) {
    super(ArrayVector)
    this.axes = [x, y]
    this.ctor = ArrayVector
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
