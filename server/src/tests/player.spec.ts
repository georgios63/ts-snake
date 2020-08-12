import { Player, Point } from '@/gamelib';

describe('Player class test suite', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player({
      coordinates: {
        headCoordinate: new Point(0, 2),
        tailCoordinate: new Point(0, 1),
      },
      baseSpeed: 250,
      speedMultiplier: 1,
    });
  });

  it('It moves!', () => {
    player.update(250);
    expect(player.snake.head).toEqual(new Point(0, 3));
  });
});
