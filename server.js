const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  socket.on('enviar_mensaje', (data) => {
    io.to(data.destinatarioId).emit('recibir_mensaje', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Servidor de Scanto corriendo en puerto 3000');
});
