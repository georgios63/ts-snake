import { Field, Rect2D } from '@/core';

describe('Field test suite', () => {
  it('Creates 4 borders spanning full field width and height', () => {
    const field = new Field(10, 1000, 750);
    const expected = [
      new Rect2D(0, 0, 1000, 10), // top
      new Rect2D(990, 0, 10, 750), // right
      new Rect2D(0, 740, 1000, 10), // bottom
      new Rect2D(0, 0, 10, 750), // left
    ];

    expect(field.boundaries).toEqual(expected);
  });
});
