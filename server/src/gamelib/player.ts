/* eslint-disable no-param-reassign */
import BaseComponent from './base-component';
import { Rect2D } from './util';
import Snake from './snake';

export default class Player extends BaseComponent {
  private snake: Snake;

  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.snake = new Snake(new Rect2D(x, y, width, height));
  }

  public get position() {
    return this.snake.parts.map((part) => part.rect);
  }

  public update = (deltaTime: number) => {
    this.snake.update(deltaTime);
  }

  public onDirectionalInput = (direction: { x: number; y: number }) => {
    this.snake.addDirectionInput(direction);
  }
}
