import { Rect2D } from '.';

export default class Field {
  public boundaries: Array<Rect2D>;

  constructor(boundaryWidth: number, width: number, height: number) {
    this.boundaries = [
      new Rect2D(0, 0, width, boundaryWidth),
      new Rect2D(width - boundaryWidth, 0, boundaryWidth, height),
      new Rect2D(0, height - boundaryWidth, width, boundaryWidth),
      new Rect2D(0, 0, boundaryWidth, height),
    ];
  }
}
