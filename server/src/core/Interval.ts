/**
 * Intervals tick method loops
 * Passes time between each tick to the callback function
 * First time it ticks it should be 0?
 * It needs to be able to be stopped
 * It needs to be able to get started
 */

export default class Interval {
  private callback: Function;

  constructor(callback: Function) {
    this.callback = callback;
  }

  public start = () => {
    this.tick();
  }

  public tick = (lastUpdate: number = Date.now()) => {
    // Tick logic
    const now = Date.now();
    const deltaTime = now - lastUpdate;

    this.callback(deltaTime);

    // Loop
    setTimeout(() => {
      this.tick(now);
    }, 1000 / 128);
  }
}
