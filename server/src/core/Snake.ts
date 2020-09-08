import { SNAKE_WIDTH } from '@/constants';
import { Rect2D } from '.';
import type { Direction, Part } from './types';

export default class Snake {
  public parts: Array<Part> = [];

  private inputQueue: Array<Direction> = [];

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

  public move = (distance: number) => {
    if (this.inputQueue.length) this.updateDirection();

    const { head, tail } = this;
    if (head === tail) {
      head.rect.x += head.direction.x * distance;
      head.rect.y += head.direction.y * distance;
      return;
    }

    this.updateHeadPosition(distance);
    this.updateTailPosition(distance);
  }

  private updateHeadPosition = (distance: number) => {
    const { head } = this;

    if (head.direction.x !== 0) {
      head.rect.width += distance;
      if (head.direction.x < 0) head.rect.x -= distance;
    }
    if (head.direction.y !== 0) {
      head.rect.height += distance;
      if (head.direction.y < 0) head.rect.y -= distance;
    }
  }

  private updateTailPosition = (distance: number) => {
    const { tail } = this;

    if (tail.direction.x !== 0) {
      tail.rect.width -= distance;
      if (tail.direction.x > 0) tail.rect.x += distance;
    }
    if (tail.direction.y !== 0) {
      tail.rect.height -= distance;
      if (tail.direction.y > 0) tail.rect.y += distance;
    }

    this.applyExcessDistanceToNextPart();
  }

  private applyExcessDistanceToNextPart = () => {
    const { tail } = this;
    const partLength = tail.rect.width > tail.rect.height
      ? tail.rect.height
      : tail.rect.width;

    const excessDistance = SNAKE_WIDTH - partLength;
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
