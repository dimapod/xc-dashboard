var socket = require('socket.io');
var debug = require('debug')('dashboard-backend:socket');

module.exports = (server, rabbitHandler) => {
  var io = socket.listen(server);


  io.sockets.on('connection', (socket) => {
    /*
    var id = setInterval(() => {
      var msgTypeRoll = Math.random(1);
      if(msgTypeRoll>0.5){
        var dateMsg = JSON.stringify(new Date());
        socket.emit('time message', dateMsg);
      } else {
        var obstacleType = (msgTypeRoll>0.2)?'COW':(msgTypeRoll>0.1)?'PONEY':'UNICORN';
        socket.emit('dashboard', {content:JSON.stringify({type:'OBSTACLE_DETECTION', payload: {
          obstacle: true,
          obstacleType:obstacleType
        }})});
      }
    }, 5000);

    debug('socket.io connection open');

    socket.on('disconnect', () => {
      debug('socket.io connection close');
      clearInterval(id);
    });
    */

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
