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
    if (this.status !== null && this.finishDelay < 0) {
      return true;
    }

    return false;
  }

  actorAt(actor) {
    if (!Actor.prototype.isPrototypeOf(actor) || !actor) {
      throw new Error("Можно прибавлять к вектору только вектор типа Vector.");
    }
    console.log("*****");
    console.clear();
    console.log(actor);
    console.log(this.actors);

    if (this.actors.length > 1) {
      for (const item of this.actors) {
        console.log(item);
        console.log(actor.isIntersect(item));
        if (actor.isIntersect(item)) {
          return item;
        }
      }
    }
  }

  obstacleAt(position, size) {
    if (
      !Vector.prototype.isPrototypeOf(position) ||
      !Vector.prototype.isPrototypeOf(size) ||
      !position ||
      !size
    ) {
      throw new Error("Можно прибавлять к вектору только вектор типа Vector.");
    }

    const x = position.x + size.x;
    const y = position.y + size.y;

    if (Number.isInteger(x) || Number.isInteger(y)) {
      if (this.grid[y] && this.grid[y][x]) {
        return this.grid[y][x];
      } else if (position.y >= this.grid.length) {
        return "lava";
      } else if (
        position.x < 0 ||
        x > this.width ||
        y > this.height ||
        position.y < 0
      ) {
        return "wall";
      }
    } else {
      const x = Math.floor(position.x + size.x);
      const y = Math.floor(position.y + size.y);
      if (this.grid[y][x]) {
        return this.grid[y][x];
      }
    }
  }

  removeActor(actor) {
    if (!Actor.prototype.isPrototypeOf(actor) || !actor) {
      throw new Error("Можно прибавлять к вектору только вектор типа Actor.");
    }
    const actorIndex = this.actors.indexOf(actor);
    this.actors = [
      ...this.actors.slice(0, actorIndex),
      ...this.actors.slice(actorIndex + 1)
    ];
  }

  noMoreActors(type) {
    if (!type) {
      return true;
    }
    for (const item of this.actors) {
      if (item.type === type) {
        return false;
      }

      return true;
    }
  }

  playerTouched(type, actor) {
    if (["lava", "fireball"].includes(type)) {
      this.status = "lost";
    } else if (type === "coin") {
      this.removeActor(actor);
      if (this.actors.find(a => a.type === "coin")) {
        this.status = "won";
      }
    }
  }
}
