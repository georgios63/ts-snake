import { v4 as uuid } from 'uuid';
import { InstanceManager, Shapes } from '.';
import type { Entity, Box } from './types';

export default class Collider {
  public id: string = uuid();
  public mesh: Array<Shapes.Rect2D>;
  public entity: Entity;
  public box: Box;

  public onCollision?: (entityId: string) => void;

  constructor(parentRef: Entity, mesh: Array<Shapes.Rect2D>) {
    this.entity = parentRef;
    this.mesh = mesh;
    this.box = this.generateBox();
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

  private generateBox() {
    const box = { x: {}, y: {} } as Box;

    return this.mesh.reduce((acc, rect) => {
      if (acc.x.min == null || rect.x.min < acc.x.min) acc.x.min = rect.x.min;
      if (acc.y.min == null || rect.y.min < acc.y.min) acc.y.min = rect.y.min;

      if (acc.x.max == null || rect.x.max > acc.x.max) acc.x.max = rect.x.max;
      if (acc.y.max == null || rect.y.max > acc.y.max) acc.y.max = rect.y.max;

      return acc;
    }, box);
  }
}
