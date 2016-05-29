var socket = require('socket.io');
var debug = require('debug')('dashboard-backend:socket');

module.exports = (server) => {
  var io = socket.listen(server);

  io.sockets.on('connection', (socket) => {

    var id = setInterval(() => {
      var msg = JSON.stringify(new Date());
      socket.emit('time message', msg);
    }, 5000);

    debug('socket.io connection open');

    socket.on('disconnect', function () {
      debug('socket.io connection close');
      clearInterval(id);
    });

    socket.on('push', function (data) {
      debug('Receive: ' + data);
    })
  });

  io.sockets.on('push', (data)=> {
    debug('receive : ', data);
  });

  return io;
};
