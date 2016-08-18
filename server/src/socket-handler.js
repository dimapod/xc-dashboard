import Server from 'socket.io';
import ImmutableDiff from 'immutablediff';

//const debug = require('debug')('dashboard-backend:socket');

export default function startServer(port, rabbitHandler, store) {

  const io = new Server().attach(port);

  let oldStore = undefined;

  store.subscribe(
    () => {
      console.log('SEND TO SOCKET', JSON.stringify(store.getState().toJS()));
      io.emit('dashboard', {
        content: {type: 'SET_STATE', payload: store.getState().toJS()},
        when: JSON.stringify(new Date())
      });

      // DIFF is ready to use (in front add immutable patch to use it)
      // store and oldStore => diff
      // const diff = ImmutableDiff(oldStore, store.getState());
      // console.log('SEND TO SOCKET', JSON.stringify(diff));
      // io.emit('dashboard', {
      //   content: {type: 'UPDATE_STATE', payload:  JSON.stringify(diff)},
      //   when: JSON.stringify(new Date())
      // });
      //
      // oldStore = store.getState();
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
