import Point from './point';

interface PlayerArgs {
  baseSpeed: number,
  headCoordinate: Point,
  tailCoordinate: Point,
  getFruitCoordinate(): Point,
}

export default class Player {
  public isAlive : boolean;

  private _snake: Array<Point>;
  private direction: { x: number, y: number };
  private baseSpeed: number;
  private speedMultiplier: number;
  private timeExpired: number;
  private eatenFruits: number;
  private getFruitCoordinate: () => Point;

  constructor(options: PlayerArgs) {
    const {
      headCoordinate,
      tailCoordinate,
      baseSpeed,
      getFruitCoordinate,
    } = options;

    this.baseSpeed = baseSpeed;
    this.getFruitCoordinate = getFruitCoordinate;
    this.speedMultiplier = 5;
    this.timeExpired = 0;
    this.eatenFruits = 0;
    this.isAlive = true;

    this._snake = this.createSnake(headCoordinate, tailCoordinate);
    this.direction = this.setInitialDirection(headCoordinate, tailCoordinate);
  }

  public get snake() {
    return {
      body: this._snake,
      head: this._snake[0],
      length: this._snake.length,
    };
  }

  public update = (deltaTime: number) => {
    this.timeExpired += deltaTime;

    if (this.timeExpired >= this.baseSpeed - (this.speedMultiplier * this.eatenFruits)) {
      this.timeExpired = 0;
      this.move();
    }
  }

  public onCollision = () => {
    this.isAlive = false;
  }

  public setDirection = (direction: { x: number, y: number }) => {
    const point = new Point(
      this.snake.head.x + direction.x,
      this.snake.head.y + direction.y,
    );
    if (point.x === this._snake[1].x && point.y === this._snake[1].y) {
      return;
    }
    this.direction = direction;
  }

  private setInitialDirection = (headCoordinate: Point, tailCoordinate: Point) => {
    const propKey = headCoordinate.x === tailCoordinate.x ? 'y' : 'x';
    const direction = headCoordinate[propKey] < tailCoordinate[propKey] ? -1 : 1;

    return propKey === 'x'
      ? { x: direction, y: 0 }
      : { x: 0, y: direction };
  }

  private createSnake = (headCoordinate: Point, tailCoordinate: Point) => {
    const snake: Array<Point> = [headCoordinate, tailCoordinate];
    return snake;
  }

  private move = () => {
    if (!this.isAlive) return;

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
      this.eatenFruits += 1;
    }
  }
}
