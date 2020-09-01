import {
  Entity,
  Shapes,
  Collider,
  InstanceManager,
} from '@/core';

export default class Player extends Entity {
  private mesh: Array<Shapes.Rect2D>;
  private collider: Collider;

  constructor(instanceId: string, parentId?: string) {
    super(instanceId, parentId);

    const p1 = new Shapes.Point(Math.random() * 1024, Math.random() * 720);
    const p2 = new Shapes.Point(p1.x + 75, p1.y + 15);

    this.mesh = [new Shapes.Rect2D(p1, p2)];
    this.collider = new Collider(this, this.mesh);

    this.registerHooks();
  }

  public update = (deltaTime: number) => {
    const parent = this.getParent();
  }

  public onCollision = (entityId: string) => {
    const instance = InstanceManager.getInstance(this.instanceId)!;
    const entity = instance.entities.getEntity(entityId);
    // console.log('Collision detected:', entity);
  }

  protected beforeDestroy = () => {
    if (this.collider) {
      this.collider.destroy();
    }
  }
}
