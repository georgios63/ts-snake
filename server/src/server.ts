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
  console.log('Client connected - token:', socket.handshake.query.token);
  socket.on('custom-message', (message: string) => {
    console.log('Message from client:', message);
    io.emit('message-response', 'Thanks for your message, client!');
  });
});

server.listen(3000, () => console.log('Listening on port 3000...'));
