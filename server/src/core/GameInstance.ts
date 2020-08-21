import { v4 as uuid } from 'uuid';
import {
  InstanceManager,
  EntityTree,
  Interval,
  CollisionHandler,
} from '.';
import { GameSettings } from './types';

export default class GameInstance {
  public id: string = uuid();

  public interval: Interval;
  public entities: EntityTree;
  public collision: CollisionHandler;

  public onIntervalTick?: (deltaTime: number) => void;

  constructor(settings: GameSettings) {
    this.initialize(settings);
  }

  protected initialize = (settings: GameSettings) => {
    this.interval = new Interval(settings.tickrate, this);
    this.entities = new EntityTree();
    this.collision = new CollisionHandler();

    InstanceManager.registerInstance(this);
  }
}
