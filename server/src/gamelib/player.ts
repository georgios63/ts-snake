import { Rect2D } from './util';
import BaseComponent from './base-component';

export default class Player extends BaseComponent {
  public name = 'Player';

  private _snake: Array<Rect2D>;

  constructor(headPosition: Rect2D, tailPosition: Rect2D) {
    super();
    this._snake = [headPosition, tailPosition];
  }

  public update = (deltaTime: number) => {
    this.move(deltaTime);
  }

  private move = (deltaTime: number) => {
    const head = this._snake[0];
    head.x += deltaTime / 10;
    console.log(head.x);
  }
}

// eslint-disable-next-line no-new
new Player(new Rect2D(0, 0, 10, 10), new Rect2D(0, 0, 10, 10));
