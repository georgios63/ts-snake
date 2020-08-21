import { GenericFunction } from '.';

export type Update = (deltaTime: number) => void;

export type Entity = {
  id: string;
  parentId: string | null;
  instanceId: string;
  destroy: GenericFunction;
  [key: string]: any;
}

export interface EntityTree {
  register: (entity: Entity) => void;
  unregister: (entityId: string) => void;
  registerHooks: (entityId: string, hooks: Hooks) => void;
  getEntity: (entityId: string) => Entity | null;
  getChildren: (entityId: string) => Array<Entity>;
  [key: string]: any;
}

export type Hooks = {
  update?: Update;
  beforeUpdate?: GenericFunction,
  afterUpdate?: GenericFunction,
}
