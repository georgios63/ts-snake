/* eslint-disable no-new */
import { GameInstance } from '@/core';
import { Entity, GameSettings } from '@/core/types';
import { Player, StaticCollider } from '.';

export default class TestInstance extends GameInstance {
  private entity: Map<string, Entity> = new Map();
  private timeoutId: NodeJS.Timeout;

  constructor(settings: GameSettings) {
    super(settings);

    const n = 10_000; // ? Number of dynamic entities

    // ? Dynamic Entities
    for (let i = 0; i < n; i += 1) {
      const player = new Player(this.id);
      this.entity.set(player.id, player);
    }

    // ? Static Collider Entities
    for (let i = 0; i < n * 20; i += 1) {
      const staticCollider = new StaticCollider(this.id);
      this.entity.set(staticCollider.id, staticCollider);
    }

    setTimeout(() => this.stop(), 20 * 1000);
  }

  public start = () => {
    this.interval.start();
    this.showStats();
  }

  public onIntervalTick = (deltaTime: number) => {
    this.entities.runUpdateSequence(deltaTime);
    // this.collision.evaluate();
  }

  public showStats = () => {
    this.interval.showAverages();
    this.timeoutId = setTimeout(() => this.showStats(), 1000);
  }

  private stop = () => {
    clearTimeout(this.timeoutId);
    console.log('Stopping...');
    console.log('Existing Entity count:', this.entities.size);
    console.log('Existing colliders count:', this.collision.size);
    this.interval.stop();
    this.entity.forEach((player) => player.destroy());
    console.log('Stopped!');
    console.log('Existing Entity count:', this.entities.size);
    console.log('Existing colliders count:', this.collision.size);
  }
}
