/* eslint-disable no-param-reassign */
import { Rect2D } from './util';
import BaseComponent from './base-component';

interface Direction {
  x: number,
  y: number,
}

interface SnakePart {
  rect: Rect2D,
  direction: Direction,
}

export default class Player extends BaseComponent {
  public name = 'Player';
  public id: string;

  private parts: Array<SnakePart>;
  private callback: Function;
  private inputQueue: Array<Direction> = [];
  private baseSpeed = 5;

  constructor(headPosition: Rect2D, id: string, callback: Function) {
    super();
    const direction = { x: 1, y: 0 };
    this.parts = [{ direction, rect: headPosition }];
    this.id = id;
    this.callback = callback;
  }

  public update = (deltaTime: number) => {
    this.move(deltaTime);
    this.callback();
  }

  public get snake() {
    return {
      head: this.parts[0],
      tail: this.parts[this.parts.length - 1],
    };
  }

  public addDirectionInput = (dir: Direction) => {
    if (dir.x === 0 && dir.y === 0) return;

    const { head } = this.snake;
    if (this.inputQueue.length < 1) {
      if (head.direction.x + dir.x !== 0 || head.direction.y + dir.y !== 0) {
        this.inputQueue.push(dir);
      }
      return;
    }

    const prevInput = this.inputQueue[this.inputQueue.length - 1];
    if (prevInput.x + dir.x !== 0 || prevInput.y !== dir.y) {
      this.inputQueue.push(dir);
    }
  }

  // ! REMOVE LATER
  public toJSON = () => this.parts.map((part) => part.rect)

  private getNewPoint = () => {
    const { direction, rect } = this.snake.head;
    return {
      x: direction.x < 0 ? rect.x : rect.x + rect.width - 15,
      y: direction.y < 0 ? rect.y : rect.y + rect.height - 15,
    };
  }

  private moveLeft = (distance: number) => {
    const { head } = this.snake;
    head.rect.x -= distance;
    if (this.parts.length > 1) {
      head.rect.width += distance;
    }
  }

  private moveRight = (distance: number) => {
    const { head } = this.snake;
    if (this.parts.length > 1) {
      head.rect.width += distance;
    } else {
      head.rect.x += distance;
    }
  }

  private moveUp = (distance: number) => {
    const { head } = this.snake;
    head.rect.y -= distance;
    if (this.parts.length > 1) {
      head.rect.height += distance;
    }
  }

  private moveDown = (distance: number) => {
    const { head } = this.snake;
    if (this.parts.length > 1) {
      head.rect.height += distance;
    } else {
      head.rect.y += distance;
    }
  }

  private moveTail = (distance: number) => {
    if (!(this.parts.length > 1)) return;
    const { direction, rect } = this.snake.tail;
    // shrink part
    if (direction.x < 0) {
      rect.width -= distance;
    }
    if (direction.x > 0) {
      rect.x += distance;
      rect.width -= distance;
    }
    if (direction.y < 0) {
      rect.height -= distance;
    }
    if (direction.y > 0) {
      rect.y += distance;
      rect.height -= distance;
    }
    // remove part
    if (rect.height < 15 || rect.width < 15) {
      console.clear();
      // console.log(this.parts);
      // console.log(rect);
      this.parts.pop();
    }
  }

  private move = (deltaTime: number) => {
    const { width, height } = this.snake.head.rect;
    // create new part with new direction
    if (this.inputQueue.length && (width >= 30 || height >= 30)) {
      const { x, y } = this.getNewPoint();
      const direction = this.inputQueue.shift()!;
      this.parts.unshift({
        direction,
        rect: new Rect2D(x, y, 15, 15),
      });
    }

    const { head } = this.snake;
    const distance = {
      x: (deltaTime / this.baseSpeed) * head.direction.x,
      y: (deltaTime / this.baseSpeed) * head.direction.y,
    };

    if (distance.x < 0) this.moveLeft(Math.abs(distance.x));
    if (distance.x > 0) this.moveRight(Math.abs(distance.x));
    if (distance.y < 0) this.moveUp(Math.abs(distance.y));
    if (distance.y > 0) this.moveDown(Math.abs(distance.y));

    this.moveTail(Math.abs(distance.x + distance.y));
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
