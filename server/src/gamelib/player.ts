import Point from './point';

interface PlayerArgs {
  baseSpeed: number,
  headCoordinate: Point,
  tailCoordinate: Point,
  getFruitCoordinate(): Point,
}

export default class Player {
  private _snake: Array<Point>;
  private direction: { x: number, y: number };
  private baseSpeed: number;
  private speedMultiplier: number;
  private timeExpired: number;
  private getFruitCoordinate: Function;

  constructor(options: PlayerArgs) {
    const {
      headCoordinate,
      tailCoordinate,
      baseSpeed,
      getFruitCoordinate,
    } = options;

    this.baseSpeed = baseSpeed;
    this.getFruitCoordinate = getFruitCoordinate;
    this.speedMultiplier = 1;
    this.timeExpired = 0;
    this._snake = this.createSnake(headCoordinate, tailCoordinate);
    this.direction = this.setInitialDirection(headCoordinate, tailCoordinate);
  }

  public update = (deltaTime: number) => {
    this.timeExpired += deltaTime;
    if (this.timeExpired >= this.baseSpeed) {
      this.timeExpired = 0;
      this.move();
    }
  }

  public get snake() {
    return {
      body: this._snake,
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
    const fruitCoordinate = this.getFruitCoordinate();
    const point = new Point(
      this.snake.head.x + this.direction.x,
      this.snake.head.y + this.direction.y,
    );

    this._snake.unshift(point);
    const tail = this._snake.pop()!;

    if (
      fruitCoordinate.x === this.snake.head.x
      && fruitCoordinate.y === this.snake.head.y
    ) {
      this._snake.push(tail);
    }
  }
}
