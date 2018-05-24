"use strict"

import { AbstractVector } from "./AbstractVector"

export class ObjectVector extends AbstractVector {
  protected _x: number
  protected _y: number

  constructor(x: number, y: number) {
    super(ObjectVector)
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
