import Point from './point';

export default class Snake {
  private body: Array<Point>;
  private direction: { x: number, y: number };

  constructor(headCoordinate: Point, tailCoordinate: Point) {
    this.body = this.createBody(headCoordinate, tailCoordinate);
    this.direction = this.setInitializeDirection(headCoordinate, tailCoordinate);
  }

  public get head() {
    return this.body[0];
  }

  public get length() {
    return this.body.length;
  }

  public update = () => {
    this.move();
  }

  private setInitializeDirection = (headCoordinate: Point, tailCoordinate: Point) => {
    const propKey = headCoordinate.x === tailCoordinate.x ? 'y' : 'x';
    const dir = headCoordinate[propKey] < tailCoordinate[propKey] ? -1 : 1;
    return propKey === 'x'
      ? { x: dir, y: 0 }
      : { x: 0, y: dir };
  }

  private createBody = (headCoordinate: Point, tailCoordinate: Point) => {
    // TODO: add logic to create varying length snakes!
    const body: Array<Point> = [headCoordinate, tailCoordinate];
    return body;
  }

  private move = () => {
    const point = new Point(
      this.head.x + this.direction.x,
      this.head.y + this.direction.y,
    );
    this.body.pop();
    this.body.unshift(point);
  }
}

/**
 * [O][O][O][O][O]
 * [X][O][O][O][O]
 * [X][O][O][O][O]
 * [O][O][O][O][O]
 * [O][O][O][O][O]
 */
