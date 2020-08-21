import { v4 as uuid } from 'uuid';
import { InstanceManager, Shapes } from '.';
import { Entity } from './types';

export default class Collider {
  public id: string = uuid();
  public mesh: Array<Shapes.Rect2D>;
  public entity: Entity;

  public onCollision?: (entityId: string) => void;

  constructor(parentRef: Entity, mesh: Array<Shapes.Rect2D>) {
    this.entity = parentRef;
    this.mesh = mesh;
    this.register();
  }

  public setMesh = (mesh: Array<Shapes.Rect2D>) => {
    this.mesh = mesh;
    const instance = InstanceManager.getInstance(this.entity.instanceId)!;
    instance.collision.updateMesh(this.id, mesh);
  }

  public destroy = () => {
    const instance = InstanceManager.getInstance(this.entity.instanceId)!;
    instance.collision.unregisterCollider(this.id);
  }

  private register = () => {
    const instance = InstanceManager.getInstance(this.entity.instanceId)!;
    instance.collision.registerCollider(this);
  }
}
