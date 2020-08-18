import GameEngine from './engine';

export default class BaseComponent {
  public name!: string;

  constructor() {
    GameEngine.registerComponent(this);
  }

  public destroy = () => {
    GameEngine.unregisterComponent(this);
  }
}
