import { Rect2D, Collision } from '@/core';

function makeMockCollider(
  id: string,
  type: string,
  shape: Array<Rect2D>,
  onCollision?: Function,
) {
  return {
    id,
    type,
    shape,
    onCollision,
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

  it('Calls the collider\'s callback with the id and type of collision target', () => {
    const fieldSize = 500;

    const rectCollection1 = [new Rect2D(8, 50, 30, 10), new Rect2D(8, 50, 10, 20)];
    const rectCollection2 = [
      new Rect2D(0, 0, fieldSize, 10), // top
      new Rect2D(0, 0, 10, fieldSize), // left
      new Rect2D(0, fieldSize - 10, fieldSize, 10), // bottom
      new Rect2D(fieldSize - 10, 0, 10, fieldSize), // right
    ];

    const mockCallback = jest.fn(({ id, type }) => {});
    const c1 = makeMockCollider('0', 'c1', rectCollection1, mockCallback);
    const c2 = makeMockCollider('1', 'c2', rectCollection2);

    Collision.checkForCollision(c1, c2);

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toEqual({ id: c2.id, type: c2.type });
  });

  it('Stores all type of colliders', () => {
    const collidersCollection = [
      makeMockCollider('0', 'Snake', [new Rect2D(0, 0, 30, 10)], jest.fn(() => {})),
      makeMockCollider('1', 'Snake', [new Rect2D(10, 0, 30, 10)], jest.fn(() => {})),
      makeMockCollider('2', 'Fruit', [new Rect2D(0, 0, 5, 5)], jest.fn(() => {})),
    ];

    const cb0 = collidersCollection[0].onCollision as jest.Mock;
    const cb1 = collidersCollection[1].onCollision as jest.Mock;
    const cb2 = collidersCollection[2].onCollision as jest.Mock;

    const collectionCopy = [...collidersCollection];

    Collision.evaluateCollisions(collidersCollection);

    expect(cb0.mock.calls.length).toBe(2);
    expect(cb1.mock.calls.length).toBe(1);
    expect(cb2.mock.calls.length).toBe(1);
    expect(collidersCollection).toEqual(collectionCopy);
  });
});
