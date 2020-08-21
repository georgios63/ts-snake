import { v4 as uuid } from 'uuid';
import { InstanceManager } from '.';
import type {
  Update,
  GenericFunction,
} from './types';

export default class Entity {
  public id: string = uuid();
  public parentId: string | null;
  public instanceId: string;

  // * Methods that subclasses may implement
  protected update?: Update;
  protected beforeUpdate?: GenericFunction;
  protected afterUpdate?: GenericFunction;
  protected beforeDestroy?: GenericFunction;

  constructor(instanceId: string, parentId?: string) {
    this.instanceId = instanceId;
    this.parentId = parentId || null;

    this.register();
  }

  public getParent = () => {
    if (!this.parentId) return null;
    const instance = InstanceManager.getInstance(this.instanceId)!;
    return instance.entities.getEntity(this.parentId);
  }

  public getChildren = () => {
    const instance = InstanceManager.getInstance(this.instanceId)!;
    return instance.entities.getChildren(this.id);
  }

  public destroy = () => {
    if (this.beforeDestroy) this.beforeDestroy();

    const instance = InstanceManager.getInstance(this.instanceId)!;
    instance.entities.unregister(this.id);
  }

  private register = () => {
    const instance = InstanceManager.getInstance(this.instanceId)!;
    instance.entities.register(this);
  }

  protected registerHooks = () => {
    const instance = InstanceManager.getInstance(this.instanceId)!;
    instance.entities.registerHooks(this.id, {
      update: this.update,
      beforeUpdate: this.beforeUpdate,
      afterUpdate: this.afterUpdate,
    });
  }
}
