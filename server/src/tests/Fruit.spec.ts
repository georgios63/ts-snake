import { Fruit, Rect2D } from '@/core';

describe('Fruit test suite', () => {
  let fruit: Fruit;

  beforeEach(() => {
    const position = new Rect2D(0, 0, 10, 10);
    fruit = new Fruit(position);
  });

  it('Should not be consumed by default', () => {
    expect(fruit.isConsumed).toBe(false);
  });

  it('Updates isConsumed state when collided with', () => {
    fruit.onCollision();

    expect(fruit.isConsumed).toBe(true);
  });
});
