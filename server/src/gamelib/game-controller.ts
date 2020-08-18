import { Server } from 'socket.io';
import GameEngine from './engine';
import { Rect2D } from './util';
import Player from './player';

interface IPlayer {
  [key: string]: Player;
}

export default class GameController {
  private io: Server;
  private players: IPlayer = {};
  private fruit: Rect2D;

  constructor(io: Server) {
    GameEngine.registerComponent(this);
    this.io = io;
  }

  public afterUpdate = () => {
    const players = Object.values(this.players);
    if (players.length) {
      const playerPosition = players[0].position;
      this.io.emit('update', {
        player: playerPosition,
        fruit: this.fruit,
      });
    }
  }

  public createPlayer = (playerId: string) => {
    Object.values(this.players).forEach((player) => player.destroy());
    this.players = {};
    this.players[playerId] = new Player(50, 50, 75, 15);
    this.generateFruit();
  }

  public onPlayerInput = (playerId: string, direction: { x: number; y: number }) => {
    const player = this.players[playerId];
    if (player) {
      player.onDirectionalInput(direction);
    }
  }

  private hasInvalidFruitPosition = (fruit: Rect2D) => {
    let invalid = false;
    const players = Object.values(this.players);

    players.forEach((player) => {
      player.position.forEach((part) => {
        if (invalid) return;

        let xOverlaps = false;
        let yOverlaps = false;

        if (
          (fruit.x >= part.x && fruit.x <= part.x + part.width)
          || (fruit.x <= part.x && fruit.x + part.width >= part.x)
        ) xOverlaps = true;
        if (
          (fruit.y >= part.y && fruit.y <= part.y + part.height)
          || (fruit.y <= part.y && fruit.y + part.height >= part.y)
        ) yOverlaps = true;

        if (xOverlaps && yOverlaps) invalid = true;
      });
    });

    return invalid;
  }

  private generateFruit = () => {
    const players = Object.values(this.players);

    let fruit: Rect2D;
    if (players.length) {
      do {
        const width = 1024;
        const height = 768;
        fruit = new Rect2D(
          Math.floor((Math.random() * width - 16) + 8),
          Math.floor((Math.random() * height - 16) + 8),
          8,
          8,
        );
      } while (this.hasInvalidFruitPosition(fruit));

      this.fruit = fruit;
    }
  }
}
