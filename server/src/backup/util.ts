import { v4 as uuid } from 'uuid';

/* eslint-disable import/prefer-default-export */
export class Rect2D {
  public id = uuid();
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
