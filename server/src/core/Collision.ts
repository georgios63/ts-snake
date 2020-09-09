import type { Rect } from './types';

/**
 * 1. Has to track which objects are colliding
 * 2. Has to have a way of making the collisions
 *    known to code outside the class
 *
 * constraints:
 * 1. Doesn't duplicate collisions (i.e collider A can only collide with collider B ONCE)
 */
type Collider = {
  name: string;
  shape: Array<Rect>;
  callback?: Function;
}

export default class Collision {
  static checkForCollision = (c1: Collider, c2: Collider) => {
    for (let c1ShapeIndex = 0; c1ShapeIndex < c1.shape.length; c1ShapeIndex += 1) {
      for (let c2ShapeIndex = 0; c2ShapeIndex < c2.shape.length; c2ShapeIndex += 1) {
        const r1 = c1.shape[c1ShapeIndex];
        const r2 = c2.shape[c2ShapeIndex];

        if (Collision.isColliding(r1, r2)) {
          if (c1.callback) c1.callback(c2.shape);
          if (c2.callback) c2.callback(c1.shape);
          return;
        }
      }
    }
  }

  static isColliding = (r1: Rect, r2: Rect) => {
    if (r1.x > r2.x + r2.width || r2.x > r1.x + r1.width) return false;
    if (r1.y > r2.y + r2.height || r2.y > r1.y + r1.height) return false;
    return true;
  }
}
