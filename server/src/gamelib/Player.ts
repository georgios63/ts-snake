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
    this.registerHooks();
    this.mesh = [new Shapes.Rect2D(50, 50, 75, 15)];
    this.collider = new Collider(this, this.mesh);
  }

  public update = (deltaTime: number) => {
    const x = 5 / deltaTime;
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
