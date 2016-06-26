var socket = require('socket.io');
var debug = require('debug')('dashboard-backend:socket');

module.exports = (server, rabbitHandler) => {
  var io = socket.listen(server);


  io.sockets.on('connection', (socket) => {

    var id = setInterval(() => {
      var msg = JSON.stringify(new Date());
      socket.emit('time message', msg);
    }, 5000);

    debug('socket.io connection open');

    socket.on('disconnect', () => {
      debug('socket.io connection close');
      clearInterval(id);
    });

    socket.on('train', (data) => {
      debug('Receive: ' + data);
    });

    socket.on('dashboard', (data)=>{
      debug('receive-from-dashboard : ', data);
      rabbitHandler.sendToRabbit(data);
    });
  });

  io.sockets.on('train', (data)=> {
    debug('receive : ', data);
  });

  rabbitHandler.init(io);

  return io;
};
