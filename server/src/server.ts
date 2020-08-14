import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import cors from 'cors';
import uuid from 'uuid';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());

io.on('connection', (socket) => {
  const { token } = socket.handshake.query;
  console.log('Client token:', token);
});

server.listen(3000, () => console.log('Listening on port 3000...'));
