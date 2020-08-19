/* eslint-disable no-param-reassign */
import { v4 as uuid } from 'uuid';
import BaseComponent from './base-component';
import { Rect2D } from './util';
import Collider from './collider';
import Snake from './snake';

export default class Player extends BaseComponent {
  public type = 'Player';
  public id = uuid();
  private snake: Snake;
  private collider: Collider;

  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.snake = new Snake(new Rect2D(x, y, width, height));
    this.collider = new Collider(
      this.snake.parts.map((part: any) => part.rect),
      this,
      false,
    );
  }

  public get position() {
    return this.snake.parts.map((part: any) => part.rect);
  }

  public update = (deltaTime: number) => {
    this.snake.update(deltaTime);
    this.collider.shape = this.snake.parts.map((part: any) => part.rect);
  }

  public onDirectionalInput = (direction: { x: number; y: number }) => {
    this.snake.addDirectionInput(direction);
  }

  public onCollision = (collider: any) => {
    // collisions
  }
}
