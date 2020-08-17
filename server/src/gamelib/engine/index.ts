const tickrate = 128;

interface RegisteredComponent {
  update: (deltaTime: number) => void | null;
  [key: string]: any;
}

class GameEngine {
  private registeredComponents: Array<RegisteredComponent> = [];
  private lastTick: number = Date.now();

  constructor() {
    this.init();
  }

  public registerComponent = (component: RegisteredComponent) => {
    this.registeredComponents.push(component);
  }

  private init = () => {
    this.tick();
  }

  private tick = () => {
    const timePerTick = 1000 / tickrate;
    const current = Date.now();
    const deltaTime = current - this.lastTick;
    const timeTillNextTick = deltaTime > timePerTick
      ? Math.round(timePerTick - (deltaTime % timePerTick))
      : timePerTick;

    this.lastTick = current;

    this.callUpdateOnRegisteredComponents(deltaTime);

    setTimeout(() => {
      this.tick();
    }, timeTillNextTick);
  }

  private callUpdateOnRegisteredComponents = (deltaTime: number) => {
    this.registeredComponents.forEach((component) => {
      if (component.update) {
        component.update(deltaTime);
      }
    });
  }
}

export default new GameEngine();
