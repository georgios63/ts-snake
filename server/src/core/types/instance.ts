import type { Interval, EntityTree, CollisionHandler } from '.';

export type GameSettings = {
  tickrate: number;
  [key: string]: any;
}

export type InstanceReference = {
  id: string;
  onIntervalTick?: (deltaTime: number) => void;
  interval: Interval;
  entities: EntityTree;
  collision: CollisionHandler;
  [key: string]: any;
}
