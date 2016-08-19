import express from "express";
import path from "path";
import makeStore from './src/store';
import startIO from './src/socket-handler';
import rabbitHandler from './src/rabbit-handler';
import deb from 'debug';

const debug = deb('dashboard-backend:server');

// Express
const app = express();
app.set('port', process.env.PORT || '8001');
app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
const server = app.listen(app.get('port'), function() {
  const port = server.address().port;
  debug(`[*] Magic happens on port ${port}. To exit press CTRL+C `);
});

// Redux Store
export const store = makeStore();

// Socket & Rabbit
const io = startIO(server, rabbitHandler, store);
rabbitHandler.init(io, store);
