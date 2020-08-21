import { v4 as uuid } from 'uuid';
import GameEngine from './engine';

export default class BaseComponent {
  public name!: string;
  public id = uuid();

  constructor() {
    GameEngine.registerComponent(this);
  }

  public destroy = () => {
    GameEngine.unregisterComponent(this);
  }
}
