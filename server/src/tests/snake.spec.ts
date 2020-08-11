import { Snake, Point } from '@/gamelib';

describe('Snake class test suite', () => {
  let snake: Snake;

  beforeEach(() => {
    snake = new Snake(new Point(0, 1), new Point(0, 0));
  });

  it('It moves!', () => {
    snake.update();
    expect(snake.head).toEqual(new Point(0, 2));
  });
});
