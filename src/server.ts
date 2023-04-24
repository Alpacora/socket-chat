import express, { Router } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { buildMessage } from './helpers';


const app = express();
app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);
const io = new Server(server);

const messages = [];
const users = [];

io.on('connection', (socket) => {
  console.log(`a user connected ${socket.id}`);
  socket.emit('history', messages);
  socket.broadcast.emit('message', buildMessage(socket.id, 'a user connected'))

  socket.on('disconnect', () => {
    console.log(`A user ${socket.id} disconnected`);
    socket.broadcast.emit('message', buildMessage(socket.id, `desconectou da conversa`))
  });

  socket.on('message', ({ name, message }) => {
    console.log(`Received message from ${name}: ${message}`);
    const obj = buildMessage(name, message)
    socket.broadcast.emit('message', obj)
    messages.push(obj);
  })
})

server.listen(3000, () => console.log('Server Running on port 3000 🧨'));
