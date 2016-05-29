var socket = require('socket.io');
var debug = require('debug')('server-test:server');

module.exports = function (server) {
  var io = socket.listen(server);

  io.sockets.on('connection', function (socket) {
    debug('a user connected : ', socket.id);
    socket.on('push', function (data) {
      debug('Receive: ' + data);
    })
  });

  io.sockets.on('push', (data)=> {
    debug('receive : ', data);
  });

  return io;
};
