import type { Rect } from './types';

type Collider = {
  id: string;
  type: string;
  shape: Array<Rect>;
  onCollision?: Function;
}

export default class Collision {
  static evaluateCollisions = (colliders: Array<Collider>) => {
    const collidersList = [...colliders];

    while (collidersList.length > 1) {
      const c1 = collidersList.shift()!;
      collidersList.forEach((c2) => Collision.checkForCollision(c1, c2));
    }
  }

  static checkForCollision = (cA: Collider, cB: Collider) => {
    for (let indexA = 0; indexA < cA.shape.length; indexA += 1) {
      for (let indexB = 0; indexB < cB.shape.length; indexB += 1) {
        const r1 = cA.shape[indexA];
        const r2 = cB.shape[indexB];

        if (Collision.isColliding(r1, r2)) {
          if (cA.onCollision) cA.onCollision({ id: cB.id, type: cB.type });
          if (cB.onCollision) cB.onCollision({ id: cA.id, type: cA.type });
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
