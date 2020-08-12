import Point from './point';
import Player from './player';

const tickrate = 128;

export default class GameController {
  private fieldWidth: number;
  private fieldHeight: number;
  private fruit: Point;
  private players: Array<Player>;
  private deltaTime: number;
  private lastTick: number;

  constructor() {
    this.fieldWidth = 20;
    this.fieldHeight = 10;
    this.lastTick = Date.now();
    this.init();
  }

  private init = () => {
    this.generatePlayers();
    this.generateFruit();
    this.tick();
  }

  private createPlayer = (headCoordinate, tailCoordinate) => new Player({
    baseSpeed: 500,
    getFruitCoordinate: this.getFruitCoordinate,
    headCoordinate,
    tailCoordinate,
  })

  private generatePlayers = () => {
    const p1 = this.createPlayer(
      new Point(3, 1),
      new Point(2, 1),
    );
    const p2 = this.createPlayer(
      new Point(3, this.fieldWidth - 1),
      new Point(2, this.fieldHeight - 2),
    );
    this.players = [p1, p2];
  }

  private generateFruit = () => {
    const fruit = {
      x: Math.floor(Math.random() * this.fieldWidth),
      y: Math.floor(Math.random() * this.fieldHeight),
    };

    this.fruit = new Point(fruit.x, fruit.y);

    this.players.forEach((player) => {
      player.snake.body.forEach((bodyPart) => {
        if (bodyPart.x === this.fruit.x && bodyPart.y === this.fruit.y) {
          this.generateFruit();
        }
      });
    });
  }

  private drawToTerminal = () => {
    console.clear();
    const arr: any = [];
    for (let i = 0; i < this.fieldHeight; i += 1) {
      arr.push([]);
    }

    arr.forEach((a) => {
      for (let i = 0; i < this.fieldWidth; i += 1) {
        a.push('_');
      }
    });

    arr[this.fruit.y][this.fruit.x] = 'F';
    this.players.forEach((player) => {
      player.snake.body.forEach((bodyPart) => {
        arr[bodyPart.y][bodyPart.x] = 'X';
      });
    });

    for (let i = 0; i < arr.length; i += 1) {
      const str = arr[i].reduce((s, v) => s + v);
      console.log(str);
    }
  }

  private tick = () => {
    this.deltaTime = Date.now() - this.lastTick;
    this.lastTick = Date.now();
    setTimeout(() => {
      this.update();
      this.tick();
    }, 1000 / tickrate);
  }

  private collision = (snakeHead) => {
    if (
      snakeHead.x < 0
      || snakeHead.y < 0
      || snakeHead.x >= this.fieldWidth
      || snakeHead.y >= this.fieldHeight
    ) return true;
    return false;
  }

  private checkFruit = (snakeHead) => {
    if (snakeHead.x === this.fruit.x && snakeHead.y === this.fruit.y) {
      this.generateFruit();
    }
  };

  private getFruitCoordinate = () => this.fruit;

  private update() {
    // update players
    this.players.forEach((player) => player.update(this.deltaTime));

    this.drawToTerminal();

    // check new position
    this.players.forEach((player) => {
      this.collision(player.snake.head);
      this.checkFruit(player.snake.head);
    });

    // after everything has been processed, send game data to player clients
  }
}

const gc = new GameController();
// [][][X][X][F][]
