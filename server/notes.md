# Game Logic
-

- GameController <- Class
  - Field - 5x5
  - Update Loop
  - Players
    |- Player(1) - Class
      - Snake
        |- Snake - Class

Games: [
  {
    GameInstanceID: uuid,
    controller: new GameController(),
    players: {
      playerId: {
        number: 1,
        socket: socket-connection,
      }
    }
  },
  {
    GameInstanceID: uuid,
    controller: new GameController(),
    players: {
      playerId: {
        number: 1,
        socket: socket-connection,
      }
    }
  }
]

socket.io-client (browser):
press arrowUp - io.emit('change direction', { x: 0, y: -1 });


1. Client requests 'Create Game' (send client ID along with request)
2. Server creates game instance (assigns client ID to player#1)
// Creating:
  {
    GameInstanceID: uuid,
    controller: new GameController(),
    players: {
      playerId: {
        number: 1,
        socket: socket-connection,
      }
    }
  }
3.
