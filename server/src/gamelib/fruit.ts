import { v4 as uuid } from 'uuid';
import Collider from './collider';
import { Rect2D } from './util';

export default class Fruit {
  public id = uuid();
  public type = 'Fruit';
  public position: Rect2D;
  public isEaten = false;

  private collider: Collider;

  constructor(position: Rect2D) {
    this.position = position;
    this.collider = new Collider(this.position, this);
  }

  public onCollision = () => {
    this.isEaten = true;
  }

  public destroy = () => {
    if (this.collider) {
      this.collider.destroy();
    }
  }
}
