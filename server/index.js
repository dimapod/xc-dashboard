import makeStore from './src/store';
import startServer from './src/socket-handler';
import rabbitHandler from './src/rabbit-handler';

const port = process.env.PORT || '8001';

export const store = makeStore();
const io = startServer(port, rabbitHandler, store);
rabbitHandler.init(io, store);
