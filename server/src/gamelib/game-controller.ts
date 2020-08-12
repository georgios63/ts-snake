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
    const player = new Player({
      coordinates: {
        headCoordinate: new Point(0, 2),
        tailCoordinate: new Point(0, 1),
      },
      baseSpeed: 250,
      speedMultiplier: 1,
    });

    this.players = [];
    this.players.push(player);
    this.lastTick = Date.now();
    this.tick();
  }

  private tick() {
    this.deltaTime = Date.now() - this.lastTick;
    this.lastTick = Date.now();
    setTimeout(() => {
      this.update();
      this.tick();
    }, 1000 / tickrate);
  }

  private update() {
    // update players
    this.players.forEach((player) => player.update(this.deltaTime));

    // check new position

    // after everything has been processed, send game data to player clients
  }
}

const x = new GameController();

// [][][X][X][F][]
