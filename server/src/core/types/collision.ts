import { Entity } from './entity';
import { Rect2D, GenericFunction } from '.';

export type Collider = {
  id: string;
  mesh: Array<Rect2D>;
  entity: Entity;
  setMesh: (mesh: Array<Rect2D>) => void;
  destroy: GenericFunction;
}

export type RegisteredCollider = {
  id: string;
  mesh: Array<Rect2D>;
  entityId: string;
  onCollision?: OnCollision;
}

export type CollisionHandler = {
  size: number;
  registerCollider: (collider: Collider) => void;
  unregisterCollider: (colliderId: string) => void;
  evaluate: GenericFunction;
  updateMesh: (colliderId: string, mesh: Array<Rect2D>) => void;
}

export type OnCollision = (collision: string) => void;
