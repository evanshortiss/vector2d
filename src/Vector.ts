"use strict"

import { AbstractVector } from "./AbstractVector"

/**
 * A vector representation that stores the axes as part of the instance itself
 *
 * ```ts
 * const v = new Vec2D.Vector(2, 5)
 * ```
 */
export class Vector extends AbstractVector {
  protected _x: number
  protected _y: number

  constructor(x: number, y: number) {
    super(Vector)
    this._x = x
    this._y = y
  }

  get x(): number {
    return this._x
  }
  set x(x: number) {
    this._x = x
  }

  get y(): number {
    return this._y
  }
  set y(y: number) {
    this._y = y
  }
}
