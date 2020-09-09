import { Rect2D, Collision } from '@/core';

/**
 * Collider:
 * - shape / rectangulars (to detect IF it collides)
 * - name (identifier for the collider)
 * - callback (to pass the information 'the collision between 2 entities'
 * of the outcome where is needed)
 */

function makeMockCollider(shape: Array<Rect2D>, name: string, callback?: Function) {
  return {
    shape,
    name,
    callback,
  };
}

describe('Collision test suite', () => {
  it('Has a collision between two rectangulars', () => {
    const r1 = new Rect2D(0, 0, 10, 10);
    const r2 = new Rect2D(0, 0, 10, 10);

    expect(Collision.isColliding(r1, r2)).toBe(true);
  });

  it('Has no collision between two rectangulars', () => {
    const r1 = new Rect2D(0, 0, 10, 10);
    const r2 = new Rect2D(20, 0, 10, 10);

    expect(Collision.isColliding(r1, r2)).toBe(false);
  });

  it('Does call the collider\'s callback when it collides', () => {
    const fieldSize = 500;

    const rectCollection1 = [new Rect2D(8, 50, 30, 10), new Rect2D(8, 50, 10, 20)];
    const rectCollection2 = [
      new Rect2D(0, 0, fieldSize, 10), // top
      new Rect2D(0, 0, 10, fieldSize), // left
      new Rect2D(0, fieldSize - 10, fieldSize, 10), // bottom
      new Rect2D(fieldSize - 10, 0, 10, fieldSize), // right
    ];

    const mockCallback = jest.fn((shape: Array<Rect2D>) => {});
    const c1 = makeMockCollider(rectCollection1, 'c1', mockCallback);
    const c2 = makeMockCollider(rectCollection2, 'c2');

    Collision.checkForCollision(c1, c2);

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toEqual(c2.shape);
  });
});

it('fails', () => {
  expect(false).toBe(true);
});

/**
 * fruit -> if collides, -> isEaten,
 * player / snake -> needs to know what it collided with (
 *   can be self, boundary, other snake, fruit, power-up
 * )
 */
