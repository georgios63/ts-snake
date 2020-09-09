/* eslint-disable no-param-reassign */
/* eslint dot-notation: "off" */
import { SNAKE_WIDTH } from '@/constants';
import { Snake, Rect2D } from '@/core';
import type { Direction, Part } from '@/core/types';

const direction = {
  right: { x: 1, y: 0 } as Direction,
  left: { x: -1, y: 0 } as Direction,
  up: { x: 0, y: -1 } as Direction,
  down: { x: 0, y: 1 } as Direction,
};

describe('Snake directional test suite', () => {
  const defaultPosition = new Rect2D(10, 10, 30, SNAKE_WIDTH);

  let snake: Snake;

  beforeEach(() => {
    snake = new Snake(defaultPosition);
  });

  it('Creates a new body part', () => {
    const rect = new Rect2D(10, 10, SNAKE_WIDTH, 30);

    snake['createPart'](rect, direction.up);

    expect(snake.head).toEqual({ rect, direction: direction.up });
  });

  it('Instantiates with a direction', () => {
    expect(snake.head.direction).toEqual(direction.right);
  });

  it('Adds one direction to the input queue', () => {
    snake.addDirection(direction.down);
    const expected = [direction.down];

    expect(snake['inputQueue']).toEqual(expected);
  });

  it('Adds two directional inputs to the input queue', () => {
    snake.addDirection(direction.down);
    snake.addDirection(direction.left);

    const expected = [direction.down, direction.left];

    expect(snake['inputQueue']).toEqual(expected);
  });

  it('Overrides the last input in the queue when a third direction is added', () => {
    snake.addDirection(direction.down);
    snake.addDirection(direction.left);
    snake.addDirection(direction.right);

    const expected = [
      direction.down,
      direction.right,
    ];

    expect(snake['inputQueue']).toEqual(expected);
  });

  it('Will not override previous input if remaining inputs would clash', () => {
    snake.addDirection(direction.down);
    snake.addDirection(direction.left);
    snake.addDirection(direction.up);

    const expected = [
      direction.down,
      direction.left,
    ];

    expect(snake['inputQueue']).toEqual(expected);
  });

  it('Ignores input for the direction the snake is already moving if queue is empty', () => {
    snake.addDirection(direction.right);
    expect(snake['inputQueue']).toEqual([]);
  });

  it('Ignores inputs that go into the opposite direction of the previous input', () => {
    snake.addDirection(direction.left);
    expect(snake['inputQueue']).toEqual([]);

    snake.addDirection(direction.down);
    snake.addDirection(direction.up);

    const expected = [direction.down];

    expect(snake['inputQueue']).toEqual(expected);
  });

  it('Ignores duplicate inputs', () => {
    snake.addDirection(direction.down);
    snake.addDirection(direction.down);
    snake.addDirection(direction.down);

    const expected = [direction.down];

    expect(snake['inputQueue']).toEqual(expected);
  });
});

describe('Snake movement test suite', () => {
  function overrideInitialDirection(snake: Snake, newDirection: Direction) {
    snake.head.direction = newDirection;
  }

  let snake: Snake;

  const origin = { x: 10, y: 10 };
  const initialPosition = new Rect2D(origin.x, origin.y, 30, SNAKE_WIDTH);
  const distance = 10;

  beforeEach(() => {
    snake = new Snake(initialPosition);
  });

  it('Moves head to the right', () => {
    const newPosition = initialPosition.x + distance;

    snake.move(distance);
    expect(snake.head.rect.x).toBe(newPosition);
  });

  it('Moves head to the left', () => {
    const newPosition = initialPosition.x - distance;
    overrideInitialDirection(snake, direction.left);

    snake.move(distance);
    expect(snake.head.rect.x).toBe(newPosition);
  });

  it('Moves head up', () => {
    const newPosition = initialPosition.y - distance;
    overrideInitialDirection(snake, direction.up);

    snake.move(distance);
    expect(snake.head.rect.y).toBe(newPosition);
  });

  it('Moves head down', () => {
    const newPosition = initialPosition.y + distance;
    overrideInitialDirection(snake, direction.down);

    snake.move(distance);
    expect(snake.head.rect.y).toBe(newPosition);
  });

  it('Moves from right to up', () => {
    snake.addDirection(direction.up);
    snake.move(5);

    const headRect = new Rect2D(origin.x + 15, origin.y - 5, SNAKE_WIDTH, SNAKE_WIDTH + 5);
    const tailRect = new Rect2D(origin.x + 5, origin.y, 25, SNAKE_WIDTH);

    const expected = [headRect, tailRect];

    expect(snake.parts.map((part: Part) => part.rect)).toEqual(expected);
  });

  it('Moves from up to left', () => {
    snake = new Snake(new Rect2D(origin.x, origin.y, SNAKE_WIDTH, 30));
    overrideInitialDirection(snake, direction.up);

    snake.addDirection(direction.left);
    snake.move(5);

    const headRect = new Rect2D(origin.x - 5, origin.y, SNAKE_WIDTH + 5, SNAKE_WIDTH);
    const tailRect = new Rect2D(origin.x, origin.y, SNAKE_WIDTH, 25);

    const expected = [headRect, tailRect];

    expect(snake.parts.map((part: Part) => part.rect)).toEqual(expected);
  });

  it('Moves from left to down', () => {
    snake = new Snake(new Rect2D(origin.x, origin.y, 30, SNAKE_WIDTH));
    overrideInitialDirection(snake, direction.left);

    snake.addDirection(direction.down);
    snake.move(5);

    const headRect = new Rect2D(origin.x, origin.y, SNAKE_WIDTH, SNAKE_WIDTH + 5);
    const tailRect = new Rect2D(origin.x, origin.y, 25, SNAKE_WIDTH);

    const expected = [headRect, tailRect];

    expect(snake.parts.map((part: Part) => part.rect)).toEqual(expected);
  });

  it('Moves from down to right', () => {
    snake = new Snake(new Rect2D(origin.x, origin.y, SNAKE_WIDTH, 30));
    overrideInitialDirection(snake, direction.down);

    snake.addDirection(direction.right);
    snake.move(5);

    const headRect = new Rect2D(origin.x, origin.y + 15, SNAKE_WIDTH + 5, SNAKE_WIDTH);
    const tailRect = new Rect2D(origin.x, origin.y + 5, SNAKE_WIDTH, 25);

    const expected = [headRect, tailRect];

    expect(snake.parts.map((part: Part) => part.rect)).toEqual(expected);
  });

  it('Remove tail the moment it reaches the previous head origin', () => {
    snake = new Snake(new Rect2D(origin.x, origin.y, SNAKE_WIDTH * 2, SNAKE_WIDTH));
    overrideInitialDirection(snake, direction.left);

    snake.addDirection(direction.down);
    snake.move(SNAKE_WIDTH + 5);

    const headRect = new Rect2D(origin.x, origin.y + 5, SNAKE_WIDTH, SNAKE_WIDTH * 2);

    const expected = [headRect];

    expect(snake.parts.map((part: Part) => part.rect)).toEqual(expected);
  });

  it('Grows while only containing a single part', () => {
    snake = new Snake(new Rect2D(origin.x, origin.y, 30, SNAKE_WIDTH));
    snake.grow(10);
    snake.move(15);

    const headRect = new Rect2D(origin.x + 5, origin.y, 40, SNAKE_WIDTH);

    const expected = [headRect];

    expect(snake.parts.map((part: Part) => part.rect)).toEqual(expected);
  });

  it('Grows only the movement distance when distance is less than growth value', () => {
    snake = new Snake(new Rect2D(origin.x, origin.y, 30, SNAKE_WIDTH));
    snake.grow(10);
    snake.move(7);

    const headRect = new Rect2D(origin.x, origin.y, 37, SNAKE_WIDTH);

    const expected = [headRect];

    expect(snake.parts.map((part: Part) => part.rect)).toEqual(expected);
  });

  it('Grows while containing multiple parts', () => {
    snake = new Snake(new Rect2D(origin.x, origin.y, 30, SNAKE_WIDTH));
    overrideInitialDirection(snake, direction.left);

    snake.addDirection(direction.down);
    snake.grow(10);
    snake.move(15);

    const headRect = new Rect2D(origin.x, origin.y, SNAKE_WIDTH, SNAKE_WIDTH + 15);
    const tailRect = new Rect2D(origin.x, origin.y, 25, SNAKE_WIDTH);

    const expected = [headRect, tailRect];

    expect(snake.parts.map((part: Part) => part.rect)).toEqual(expected);
  });
});
