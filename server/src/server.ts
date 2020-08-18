import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import uuid from 'uuid';
import { GameController } from '@/gamelib';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const gameController = new GameController(io);

io.on('connection', (socket) => {
  const { token } = socket.handshake.query;
  socket.on('action', (direction: { x: number; y: number }) => {
    gameController.onPlayerInput(token, direction);
  });
  socket.on('start', () => {
    gameController.createPlayer(token);
  });
});

server.listen(3000, () => console.log('Listening on port 3000...'));
