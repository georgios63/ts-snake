import { Entity } from '.';
import { Update, GenericFunction, Hooks } from './types';

type EntityItem = {
  ref: Entity,
  children: Map<string, string>;
  [key: string]: any;
}

export default class EntityTree {
  private entities: Map<string, EntityItem> = new Map();

  private updateListeners: Map<string, Update> = new Map();
  private beforeUpdateListeners: Map<string, GenericFunction> = new Map();
  private afterUpdateListeners: Map<string, GenericFunction> = new Map();

  public get size() {
    return this.entities.size;
  }

  public register = (entity: Entity) => {
    this.entities.set(entity.id, {
      ref: entity,
      children: new Map(),
    });

    const parent = entity.parentId ? this.entities.get(entity.parentId) : null;
    if (parent) {
      parent.children.set(entity.id, entity.id);
    }
  }

  public unregister = (entityId: string) => {
    const entity = this.entities.get(entityId);
    if (!entity) return;

    const { children, parentId } = entity;

    this.removeChildEntities(children);
    this.removeListeners(entityId);
    if (parentId) this.removeFromParentEntity(parentId, entityId);

    this.entities.delete(entityId);
  }

  public registerHooks = (entityId: string, hooks: Hooks) => {
    if (hooks.update) this.updateListeners.set(entityId, hooks.update);
    if (hooks.beforeUpdate) this.beforeUpdateListeners.set(entityId, hooks.beforeUpdate);
    if (hooks.afterUpdate) this.beforeUpdateListeners.set(entityId, hooks.afterUpdate);
  }

  public getEntity = (entityId: string) => {
    const entity = this.entities.get(entityId);
    return entity ? entity.ref : null;
  }

  public getChildren = (entityId: string) => {
    const entity = this.entities.get(entityId);
    if (!entity) return [];

    const children: Array<Entity> = [];
    entity.children.forEach((childId: string) => {
      const child = this.entities.get(childId);
      if (child) {
        children.push(child.ref);
      }
    });
    return children;
  }

  public runUpdateSequence = (deltaTime: number) => {
    this.beforeUpdateListeners.forEach((fn) => fn());
    this.updateListeners.forEach((fn) => fn(deltaTime));
    this.afterUpdateListeners.forEach((fn) => fn());
  }

  private removeChildEntities = (children: Map<string, string>) => {
    children.forEach((childId: string) => {
      const child = this.entities.get(childId);
      if (!child) return;
      child.ref.destroy();
    });
  }

  private removeFromParentEntity = (parentId: string, entityId: string) => {
    const parent = this.entities.get(parentId);
    if (!parent) return;
    parent.children.delete(entityId);
  }

  private removeListeners = (entityId: string) => {
    this.updateListeners.delete(entityId);
    this.beforeUpdateListeners.delete(entityId);
    this.afterUpdateListeners.delete(entityId);
  }
}
