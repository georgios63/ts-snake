/* eslint-disable no-console */
import express from 'express';
import socketio from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

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
