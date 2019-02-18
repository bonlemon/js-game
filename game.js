"use strict";
// import Vector from "./src/vector";

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  plus(vector) {
    if (!Vector.prototype.isPrototypeOf(vector)) {
      throw new Error("Можно прибавлять к вектору только вектор типа Vector.");
    }
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  times(multiplier) {
    return new Vector(this.x * multiplier, this.y * multiplier);
  }
}

// const start = new Vector(30, 50);
// const moveTo = new Vector(5, 10);
// const finish = start.plus(moveTo.times(2));

// console.log(`Исходное расположение: ${start.x}:${start.y}`);
// console.log(`Текущее расположение: ${finish.x}:${finish.y}`);

class Actor {
  constructor(
    pos = new Vector(0, 0),
    size = new Vector(1, 1),
    speed = new Vector(0, 0)
  ) {
    if (
      !Vector.prototype.isPrototypeOf(pos) ||
      !Vector.prototype.isPrototypeOf(size) ||
      !Vector.prototype.isPrototypeOf(speed)
    ) {
      throw new Error("Можно прибавлять к вектору только вектор типа Vector.");
    }
    this.pos = pos;
    this.size = size;
    this.speed = speed;
  }

  get type() {
    return "actor";
  }
  get left() {
    return this.pos.x;
  }
  get right() {
    return this.pos.x + this.size.x;
  }
  get top() {
    return this.pos.y;
  }
  get bottom() {
    return this.pos.y + this.size.y;
  }
  act() {}

  isIntersect(actor) {
    if (!Actor.prototype.isPrototypeOf(actor) || !actor) {
      throw new Error("Можно прибавлять к вектору только вектор типа Vector.");
    }
    if (actor === this) {
      return false;
    }
    return (
      actor.pos === this.pos ||
      actor.size === this.size ||
      actor.speed === this.speed ||
      (actor.pos.x !== this.pos.x &&
        actor.pos.y !== this.pos.y &&
        this.pos.x + this.size.x >= actor.pos.x &&
        this.pos.y + this.size.y >= actor.pos.y)
    );
  }
}

class Level {
  constructor(grid = [], actors = []) {
    this.grid = grid;
    this.actors = actors;
    this.player = actors.find(actor => actor.type === "player");
    this.height = grid.length;
    this.width = grid.reduce((acc, item) => {
      if (acc < item.length) {
        return item.length;
      }
      return acc;
    }, 0);
    this.status = null;
    this.finishDelay = 1;
  }
  isFinished() {
    console.clear();
    console.log(this.status);
    console.log(this.finishDelay);
    if (this.status !== null && this.finishDelay < 0) {
      return true;
    }
    // console.clear();

    return false;
  }

  actorAt(actor) {
    if (!Actor.prototype.isPrototypeOf(actor) || !actor) {
      throw new Error("Можно прибавлять к вектору только вектор типа Vector.");
    }
    const a = this.actors.find(item => !item.isIntersect(actor));

    console.log(a);
    return a;
  }
}
