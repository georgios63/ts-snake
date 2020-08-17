import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import uuid from 'uuid';
import '@/gamelib';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  const { token } = socket.handshake.query;
  // console.log('Client token:', token);
});

server.listen(3000, () => console.log('Listening on port 3000...'));
