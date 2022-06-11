const app = require('./index.js');
const port = require('../config.js').port;
const controller = require('./controllers/messages.controllers.js');
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
    const socketMessage = { ...message };
    socketMessage['user_id'] = message.userId;
    socketIO.emit('message', socketMessage);
    controller.messages.post(message);
  });
});

server.listen(port, function() {
  console.log(`listening on port ${ port } at http://localhost:3000`);
});

module.exports = server;