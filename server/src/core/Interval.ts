import type { InstanceReference } from './types';

export default class Interval {
  private isTicking = false;
  private tickrate: number
  private lastTick: number = Date.now();
  private timeoutId: NodeJS.Timeout;
  private instance: InstanceReference;

  // * Testing purposes
  private executionTimes: Array<number> = [];
  private deltaTimes: Array<number> = [];

  constructor(tickrate: number, instanceReference: InstanceReference) {
    this.tickrate = tickrate;
    this.instance = instanceReference;
  }

  public start = () => {
    this.isTicking = true;
    this.tick();
  }

  public stop = () => {
    this.isTicking = false;
    clearTimeout(this.timeoutId);
  }

  // * Testing purposes
  public showAverages = () => {
    const { executionTimes, deltaTimes } = this;
    const averageExecution = executionTimes.reduce((t, v) => t + v) / executionTimes.length;
    const averageDelta = deltaTimes.reduce((t, v) => t + v) / deltaTimes.length;

    console.log('\n======== TIMES ========');
    console.log('EXECUTION:', averageExecution.toFixed(2));
    console.log('DELTA:', averageDelta.toFixed(2));
    console.log('TICKRATE:', (1000 / averageDelta).toFixed(2));
    console.log('=======================\n');
  }

  private tick = () => {
    if (!this.isTicking) return;

    const { tickrate, lastTick } = this;
    const timePerTick = 1000 / tickrate;
    const current = Date.now();
    const deltaTime = current - lastTick;

    if (this.instance.onIntervalTick) {
      this.instance.onIntervalTick(deltaTime);
    }

    const executionTime = Date.now() - current;
    const offsetTime = Math.max(0, (deltaTime + executionTime) - timePerTick);
    const timeTillNextTick = Math.max(0, (timePerTick - offsetTime));

    // * Testing purposes
    this.executionTimes.push(executionTime);
    this.deltaTimes.push(deltaTime);
    if (this.executionTimes.length > 1000) this.executionTimes.shift();
    if (this.deltaTimes.length > 1000) this.deltaTimes.shift();

    this.lastTick = current;

    this.timeoutId = setTimeout(() => {
      this.tick();
    }, timeTillNextTick);
  }
}
