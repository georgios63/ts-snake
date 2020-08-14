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
  // console.log('Client token:', token);
  socket.on('action', (data) => {
    gameController.updatePlayerDirection(data);
  });
});

server.listen(3000, () => console.log('Listening on port 3000...'));
