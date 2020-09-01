import {
  Collider,
  RegisteredCollider,
  Rect2D,
} from './types';

export default class CollisionHandler {
  private registeredColliders: Map<string, RegisteredCollider> = new Map();
  private activeColliders: Map<string, RegisteredCollider> = new Map();

  // * Testing purposes
  public iterations = 0;

  public get size() {
    return this.registeredColliders.size;
  }

  public registerCollider = (collider: Collider) => {
    const colliderInfo = {
      id: collider.id,
      mesh: collider.mesh,
      entityId: collider.entity.id,
      onCollision: collider.entity.onCollision,
    };

    this.registeredColliders.set(collider.id, colliderInfo);
    if (collider.entity.onCollision) {
      this.activeColliders.set(collider.id, colliderInfo);
    }
  }

  public unregisterCollider = (colliderId: string) => {
    this.registeredColliders.delete(colliderId);
    this.activeColliders.delete(colliderId);
  }

  public evaluate = () => {
    this.iterations = 0;
    this.activeColliders.forEach((collider) => {
      this.checkCollision(collider);
    });
  }

  public updateMesh = (colliderId: string, mesh: Array<Rect2D>) => {
    const collider = this.registeredColliders.get(colliderId);
    if (collider) {
      collider.mesh = mesh;
    }
  }

  private checkCollision = (collider: RegisteredCollider) => {
    this.registeredColliders.forEach((externalCollider) => {
      if (externalCollider === collider) return;
      this.iterations += 1;

      // *  for loops appears to perform better than a forEach loop
      for (let i = 0; i < collider.mesh.length; i += 1) {
        for (let j = 0; j < externalCollider.mesh.length; j += 1) {
          const rect1 = collider.mesh[i];
          const rect2 = externalCollider.mesh[j];
          if (this.isColliding(rect1, rect2)) {
            collider.onCollision!(externalCollider.entityId);
            return;
          }
        }
      }
    });
  }

  private isColliding = (r1: Rect2D, r2: Rect2D) => {
    if (r1.x.max < r2.x.min || r2.x.min < r1.x.min) return false;
    if (r1.y.max < r2.y.min || r2.y.min < r1.y.max) return false;
    return true;
  }
}
