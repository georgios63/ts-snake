import type { Rect } from './types';

export default class Fruit {
  public position: Rect;
  public isConsumed = false;

  constructor(position: Rect) {
    this.position = position;
  }

  public onCollision = () => {
    this.isConsumed = true;
  }
}
