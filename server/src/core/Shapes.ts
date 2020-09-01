/* eslint-disable max-classes-per-file */
export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Rect2D {
  public x: { min: number; max: number; };
  public y: { min: number; max: number; };

  constructor(p1: Point, p2: Point) {
    this.x = p1.x < p2.x ? { min: p1.x, max: p2.x } : { min: p2.x, max: p1.x };
    this.y = p1.y < p2.y ? { min: p1.y, max: p2.y } : { min: p2.y, max: p1.y };
  }

  public get origin() {
    return { x: this.x.min, y: this.y.min };
  }

  public get width() {
    return this.x.max - this.x.min;
  }

  public get height() {
    return this.y.max - this.y.min;
  }
}
