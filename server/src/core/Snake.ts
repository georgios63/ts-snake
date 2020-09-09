import { SNAKE_WIDTH } from '@/constants';
import { Rect2D } from '.';
import type { Direction, Part } from './types';

export default class Snake {
  public parts: Array<Part> = [];

  private inputQueue: Array<Direction> = [];
  private growthSize = 0;

  constructor(initialPosition: Rect2D) {
    this.createPart(initialPosition, { x: 1, y: 0 });
  }

  public get head() { return this.parts[0]; }
  public get tail() { return this.parts[this.parts.length - 1]; }

  public addDirection = (direction: Direction) => {
    const prevDirection = this.inputQueue.length
      ? this.inputQueue[0]
      : this.parts[0].direction;

    if (
      Math.abs(direction.x + prevDirection.x) !== 1
      || Math.abs(direction.y + prevDirection.y) !== 1
    ) return;

    if (this.inputQueue.length === 2) this.inputQueue.pop();

    this.inputQueue.push(direction);
  }

  public grow = (growthSize: number) => {
    this.growthSize += growthSize;
  }

  public move = (distance: number) => {
    if (this.inputQueue.length) this.updateDirection();

    this.updateHeadPosition(distance);
    this.updateTailPosition(distance);
  }

  private updateHeadPosition = (distance: number) => {
    const { head } = this;
    const [coordinate, length] = head.direction.x ? ['x', 'width'] : ['y', 'height'];

    head.rect[length] += distance;
    if (head.direction[coordinate] < 0) head.rect[coordinate] -= distance;
  }

  private updateTailPosition = (distance: number) => {
    const { tail } = this;
    const [coordinate, length] = tail.direction.x ? ['x', 'width'] : ['y', 'height'];

    const computedDistance = Math.max(0, distance - this.growthSize);
    this.growthSize = Math.max(0, this.growthSize - distance);

    tail.rect[length] -= computedDistance;
    if (tail.direction[coordinate] > 0) tail.rect[coordinate] += computedDistance;

    this.applyExcessDistanceToNextPart();
  }

  private applyExcessDistanceToNextPart = () => {
    const { tail } = this;

    const excessDistance = SNAKE_WIDTH - Math.min(tail.rect.width, tail.rect.height);
    if (!excessDistance) return;

    this.parts.pop();
    this.updateTailPosition(excessDistance);
  }

  private updateDirection = () => {
    const { rect } = this.head;
    if (
      !(rect.width >= SNAKE_WIDTH * 2)
      && !(rect.height >= SNAKE_WIDTH * 2)
    ) return;

    const direction = this.inputQueue.shift()!;
    const { x, y } = this.getNextOrigin();

    this.createPart(new Rect2D(x, y, SNAKE_WIDTH, SNAKE_WIDTH), direction);
  }

  private getNextOrigin = () => {
    const { rect, direction } = this.head;
    let { x, y } = rect;

    if (direction.x > 0) x = rect.x + (rect.width - SNAKE_WIDTH);
    if (direction.y > 0) y = rect.y + (rect.height - SNAKE_WIDTH);

    return { x, y };
  }

  private createPart = (rect: Rect2D, direction: Direction) => {
    this.parts.unshift({ rect, direction });
  }
}
