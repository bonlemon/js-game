"use strict";

export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  plus(vector) {
    if (typeof vector === Vector) {
      throw new Error("Можно прибавлять к вектору только вектор типа Vector.");
    }
  }
}
