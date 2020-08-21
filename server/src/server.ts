import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import { TestInstance } from '@/gamelib';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const gameInstance = new TestInstance({ tickrate: 128 });
gameInstance.start();

io.on('connection', (socket) => {
  const { token } = socket.handshake.query;
  socket.on('action', (action: any) => {
    // action
  });
  socket.on('start', () => {
    // start game
  });
});

server.listen(3000, () => console.log('Listening on port 3000...'));
