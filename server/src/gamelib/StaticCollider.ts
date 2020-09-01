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

    const p1 = new Shapes.Point(Math.random() * 1024, Math.random() * 720);
    const p2 = new Shapes.Point(p1.x + 30, p1.y + 30);

    this.mesh = [new Shapes.Rect2D(p1, p2)];
    this.collider = new Collider(this, this.mesh);
  }

  protected beforeDestroy = () => {
    if (this.collider) {
      this.collider.destroy();
    }
  }
}
