var socket = require('socket.io');

module.exports = function (server) {
  var io = socket.listen(server);

  io.sockets.on('connection', function (socket) {
    console.log('a user connected : ', socket.id);
    socket.on('push', function (data) {
      console.log('receive : ', data);
    })
  });

  io.sockets.on('push', (data)=> {
    console.log('receive : ', data);
  });

  return io;
};
