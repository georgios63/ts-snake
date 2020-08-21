import { Rect2D } from './util';

interface Collider {
  shape: Rect2D | Array<Rect2D>;
  ref: any;
  isStaticObject: boolean;
}

class Collision {
  private registeredColliders: Array<Collider> = [];

  public registerCollider = (collider: Collider) => {
    this.registeredColliders.push(collider);
  }

  public unregisterCollider = (collider: Collider) => {
    this.registeredColliders = this.registeredColliders.filter((c) => c !== collider);
  }

  public evaluateCollision = () => {
    this.registeredColliders.forEach((self) => {
      if (!self.ref.onCollision) return;
      this.registeredColliders.forEach((other) => {
        if (self === other) {
          this.checkInternalCollisions(self);
          return;
        }
        this.checkExternalCollisions(self, other);
      });
    });
  }

  private checkInternalCollisions = (collider) => {
    if (!Array.isArray(collider.shape)) return;

    const selfShape = collider.shape[0];
    collider.shape.forEach((otherShape) => {
      if (this.isColliding(selfShape, otherShape)) {
        collider.ref.onCollision({ id: otherShape.id, entity: collider.ref });
      }
    });
  }

  private checkExternalCollisions = (self, other) => {
    const selfShape = Array.isArray(self.shape) ? self.shape[0] : self.shape;

    if (Array.isArray(other.shape)) {
      other.shape.forEach((otherShape) => {
        if (this.isColliding(selfShape, otherShape)) {
          self.ref.onCollision({ id: otherShape.id, entity: other.ref });
        }
      });
    } else {
      const otherShape = other.shape;
      if (this.isColliding(selfShape, otherShape)) {
        self.ref.onCollision({ id: otherShape.id, entity: other.ref });
      }
    }
  }

  private isColliding = (r1: Rect2D, r2: Rect2D) => {
    let hasHorizontalOverlap = false;
    let hasVerticalOverlap = false;

    if (
      (r1.x >= r2.x && r1.x <= r2.x + r2.width)
      || (r1.x <= r2.x && r1.x + r1.width >= r2.x)
    ) hasHorizontalOverlap = true;

    if (
      (r1.y >= r2.y && r1.y <= r2.y + r2.height)
      || (r1.y <= r2.y && r1.y + r1.height >= r2.y)
    ) hasVerticalOverlap = true;

    return hasHorizontalOverlap && hasVerticalOverlap;
  }
}

export default new Collision();
