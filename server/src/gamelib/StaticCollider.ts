import {
  Entity,
  Shapes,
  Collider,
} from '@/core';

export default class StaticCollider extends Entity {
  private mesh: Array<Shapes.Rect2D>;
  private collider: Collider;

  constructor(instanceId: string, parentId?: string) {
    super(instanceId, parentId);
    this.mesh = [new Shapes.Rect2D(50, 50, 75, 15)];
    this.collider = new Collider(this, this.mesh);
  }

  protected beforeDestroy = () => {
    if (this.collider) {
      this.collider.destroy();
    }
  }
}
