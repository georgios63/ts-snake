/* eslint-disable no-param-reassign */
import { Rect2D } from './util';
import BaseComponent from './base-component';

export default class Player extends BaseComponent {
  public name = 'Player';

  private _snake: Array<Rect2D>;
  private direction: { x: number, y: number };
  private prevDirection: { x: number; y: number };
  private callback: Function;
  private inputQueue: Array<any> = [];
  // temp
  private speed = 15;

  constructor(headPosition: Rect2D, callback: Function) {
    super();
    this._snake = [headPosition];
    this.callback = callback;
    this.setInitialDirection(headPosition);
    this.prevDirection = { ...this.direction };
  }

  public update = (deltaTime: number) => {
    this.move(deltaTime);
    this.callback();
  }

  public get snake() {
    return {
      head: this._snake[0],
      tail: this._snake[this._snake.length - 1],
    };
  }

  // ! REMOVE LATER
  public toJSON = () => this._snake

  private setInitialDirection = (headPosition: Rect2D) => {
    this.direction = { x: 1, y: 0 };
  }

  public setDirection = ({ x, y }: { x: number, y: number }) => {
    const { head } = this.snake;
    if (x === 0 && y === 0) return;
    if (x + this.direction.x === 0 && y + this.direction.y === 0) return;
    if (head.height < 30 && head.width < 30) {
      this.inputQueue.push({ x, y });
      return;
    }

    this.prevDirection = { ...this.direction };
    this.direction = { x, y };
  }

  private moveLeft = (distance: number) => {
    const { head } = this.snake;
    head.x -= distance;
    head.width += distance;
  }

  private moveRight = (distance: number) => {
    const { head } = this.snake;
    head.width += distance;
  }

  private moveUp = (distance: number) => {
    const { head } = this.snake;
    head.y -= distance;
    head.height += distance;
  }

  private moveDown = (distance: number) => {
    const { head } = this.snake;
    head.height += distance;
  }

  private shrink = (distance: number) => {
    const { tail } = this.snake;
    if (tail.height > tail.width) {
      tail.height -= distance;
    } else {
      tail.width -= distance;
    }
    if (tail.width < 0 || tail.height < 0) {
      this._snake.pop();
    }
  }

  private getNextPoint = () => {
    const { head } = this.snake;
    if (this.direction.x !== 0) {
      // moving left or right
      return {
        x: head.x,
        y: this.prevDirection.y < 0 ? head.y : head.y + head.height - 15,
      };
    }
    return {
      x: this.prevDirection.x < 0 ? head.x : head.x + head.width - 15,
      y: head.y,
    };
  }

  private move = (deltaTime: number) => {
    const { head } = this.snake;

    if (this.inputQueue.length > 0 && head.width >= 30 && head.height >= 30) {
      this.direction = this.inputQueue.shift();
    }

    const xDistance = (deltaTime / this.speed) * this.direction.x;
    const yDistance = (deltaTime / this.speed) * this.direction.y;

    if (
      (head.height === 15 && yDistance !== 0)
      || (head.width === 15 && xDistance !== 0)
    ) {
      const point = this.getNextPoint();
      this._snake.unshift(new Rect2D(point.x, point.y, 15, 15));
    }

    this.shrink(Math.abs(xDistance + yDistance));

    if (xDistance < 0) this.moveLeft(Math.abs(xDistance));
    if (xDistance > 0) this.moveRight(Math.abs(xDistance));
    if (yDistance < 0) this.moveUp(Math.abs(yDistance));
    if (yDistance > 0) this.moveDown(Math.abs(yDistance));
  }
}

/**   0  1  2  3  4  5  6  7  8
 * 0 [_][_][_][_][_][_][_][_][_]
 * 1 [_][_][_][_][_][_][_][_][_]
 * 2 [_][_][_][P][X][_][_][_][_]
 * 3 [_][_][_][X][X][_][_][_][_]
 * 4 [_][_][_][X][X][_][_][_][_]
 * 5 [_][_][_][_][_][_][_][_][_]
 * 6 [_][_][_][_][_][_][_][_][_]
 */
