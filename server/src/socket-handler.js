import Server from 'socket.io';
//const debug = require('debug')('dashboard-backend:socket');

export default function startServer(port, rabbitHandler, store) {

  const io = new Server().attach(port);

  store.subscribe(
    () => {
      console.log('SEND TO SOCKET', JSON.stringify(store.getState().toJS()));
      io.emit('dashboard', {
        content: {type: 'SET_STATE', payload: store.getState().toJS()},
        when: JSON.stringify(new Date())
      });
    }
  );

  io.on('connection', (socket) => {
    socket.emit('dashboard', {
      content: {type: 'SET_STATE', payload: store.getState().toJS()},
      when: JSON.stringify(new Date())
    });

//  socket.on('action', store.dispatch.bind(store));

    socket.on('dashboard', (data) => {
      //debug('receive-from-dashboard : ', data);
      rabbitHandler.sendToRabbit(data);
    });
  });

  return io;
}
