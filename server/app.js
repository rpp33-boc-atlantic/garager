const app = require('./index.js');
const port = require('../config.js').port;
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});

// sets up server for socket connection
socketIO.on('connection', ( socket ) => {

  socket.on('message', ( message ) => {
    socketIO.emit('message', message);
  });
});

server.listen(port, function() {
  console.log(`listening on port ${ port } at http://localhost:3000`);
});

module.exports = server;