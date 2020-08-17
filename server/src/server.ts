import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import uuid from 'uuid';
import { Player, Rect2D } from '@/gamelib';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  const { token } = socket.handshake.query;
  const player = new Player(new Rect2D(50, 50, 15, 15), () => {
    socket.emit('update', player.toJSON());
  });
  socket.on('action', (direction: { x: number; y: number }) => {
    player.setDirection(direction);
  });
});

server.listen(3000, () => console.log('Listening on port 3000...'));
