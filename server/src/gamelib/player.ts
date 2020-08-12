import Point from './point';

interface PlayerArgs {
  coordinates: { headCoordinate: Point, tailCoordinate: Point },
  baseSpeed: number,
  speedMultiplier: number,
}

export default class Player {
  private _snake: Array<Point>;
  private direction: { x: number, y: number };
  private baseSpeed: number;
  private speedMultiplier: number;
  private timeExpired: number;

  constructor(options: PlayerArgs) {
    const { headCoordinate, tailCoordinate } = options.coordinates;
    this._snake = this.createSnake(headCoordinate, tailCoordinate);
    this.direction = this.setInitialDirection(headCoordinate, tailCoordinate);
  }

  public update = (deltaTime: number) => {
    this.move();
  }

  public get snake() {
    return {
      head: this._snake[0],
      length: this._snake.length,
    };
  }

  private setInitialDirection = (headCoordinate: Point, tailCoordinate: Point) => {
    const propKey = headCoordinate.x === tailCoordinate.x ? 'y' : 'x';
    const direction = headCoordinate[propKey] < tailCoordinate[propKey] ? -1 : 1;
    return propKey === 'x'
      ? { x: direction, y: 0 }
      : { x: 0, y: direction };
  }

  private createSnake = (headCoordinate: Point, tailCoordinate: Point) => {
    // TODO: add logic to create varying length snakes!
    const snake: Array<Point> = [headCoordinate, tailCoordinate];
    return snake;
  }

  private move = () => {
    const point = new Point(
      this._snake[0].x + this.direction.x,
      this._snake[0].y + this.direction.y,
    );
    this._snake.pop();
    this._snake.unshift(point);
  }
}
