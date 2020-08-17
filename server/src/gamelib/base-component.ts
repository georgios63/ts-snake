import GameEngine from './engine';

export default class BaseComponent {
  public name!: string;
  public update: (deltaTime: number) => void | null;

  constructor() {
    GameEngine.registerComponent(this);
  }
}
