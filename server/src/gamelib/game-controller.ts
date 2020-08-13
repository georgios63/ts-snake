/* eslint-disable no-unused-expressions */
import Point from './point';
import Player from './player';
import events from './event-emitter';

const tickrate = 128;

export default class GameController {
  private fieldWidth: number;
  private fieldHeight: number;
  private fruit: Point;
  private players: Array<Player>;
  private deltaTime: number;
  private lastTick: number;
  private isRunning: boolean;

  constructor() {
    this.fieldWidth = 15;
    this.fieldHeight = 15;
    this.isRunning = true;
    this.lastTick = Date.now();
    this.init();
  }

  private init = () => {
    this.generatePlayers();
    this.generateFruit();
    this.tick();
  }

  private createPlayer = (headCoordinate: Point, tailCoordinate: Point) => new Player({
    baseSpeed: 150,
    getFruitCoordinate: this.getFruitCoordinate,
    headCoordinate,
    tailCoordinate,
  })

  private generatePlayers = () => {
    const p1 = this.createPlayer(
      new Point(3, 1),
      new Point(2, 1),
    );

    this.players = [p1];
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

  private tick = () => {
    this.deltaTime = Date.now() - this.lastTick;
    this.lastTick = Date.now();
    setTimeout(() => {
      this.update();
      this.tick();
    }, 1000 / tickrate);
  }

  private hasCollided = (snakeHead: Point) => {
    const boundaryCollision = this.checkBoundaryCollision(snakeHead);
    const playerCollision = this.checkPlayerCollision(snakeHead);
    if (boundaryCollision || playerCollision) {
      return true;
    }
    return false;
  }

  private checkPlayerCollision = (snakeHead: Point) => {
    let collided = false;

    this.players.forEach((player) => {
      player.snake.body.forEach((bodyPart) => {
        if (bodyPart.x === snakeHead.x && bodyPart.y === snakeHead.y) {
          collided = !collided && snakeHead !== bodyPart;
        }
      });
    });

    return collided;
  }

  private checkBoundaryCollision = (snakeHead: Point) => {
    if (
      snakeHead.x < 0
      || snakeHead.y < 0
      || snakeHead.x >= this.fieldWidth
      || snakeHead.y >= this.fieldHeight
    ) return true;
    return false;
  }

  private checkFruit = (snakeHead: Point) => {
    if (snakeHead.x === this.fruit.x && snakeHead.y === this.fruit.y) {
      this.generateFruit();
    }
  };

  private getFruitCoordinate = () => this.fruit;

  private update() {
    if (!this.isRunning) return;
    this.players.forEach((player) => player.update(this.deltaTime));

    this.players.forEach((player) => {
      if (!player.isAlive) return;

      const collided = this.hasCollided(player.snake.head);
      if (collided) {
        player.onCollision();
        return;
      }
      this.checkFruit(player.snake.head);
      // ! REMOVE LATER
      this.drawToTerminal();
    });

    // after everything has been processed, send game data to player clients
  }

  private drawToTerminal = () => {
    console.clear();
    const arr: any = [];
    for (let i = 0; i < this.fieldHeight; i += 1) {
      arr.push([]);
    }

    arr.forEach((a: Array<string>) => {
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
      const str = arr[i].reduce((s: any, v: any) => s + v);
      console.log(str);
    }
  }
}

const gc = new GameController();

// [_][_][_][B][B][_][_]
// [_][_][_][B][B][H][_]
// [_][_][_][B][O][_][_]
// [_][_][_][B][B][_][_]
// [_][_][_][_][B][_][_]
// [_][_][F][_][B][_][_]
// [_][_][_][_][B][_][_]

// [H][T][T][7]
// [1][2][3][4]
// [2][F][H][T]
// [_][10][11][12]
