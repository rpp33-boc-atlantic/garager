const app = require('./index.js');
const port = require('../config.js').port;
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const socketIO = new Server(server);

socketIO.on('connection', ( socket ) => {
  console.log('a user connected');

  socket.on('message', ( message ) => {
    socketIO.emit('message', 'nice');
  });
});

server.listen(port, function() {
  console.log(`listening on port ${ port } at http://localhost:3000`);
});

module.exports = server;