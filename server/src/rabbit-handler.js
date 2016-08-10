const exchangeName = 'xebiconExchange';
const user = process.env.RABBIT_USER || 'xebia';
const pwd = process.env.RABBIT_PASSWORD || 'xebia2015';
const host = process.env.RABBIT_HOST || 'localhost';
//const host = process.env.RABBIT_HOST || '52.28.106.238';
const rabbitUrl = 'amqp://' + user + ':' + pwd + '@' + host;
const open = require('amqplib').connect(rabbitUrl);
const debug = require('debug')('dashboard-backend:server');

let socketIO = null;

// Consumer Logic
const consumerCallback = (msg, store) => {
  if (msg && msg.content) {
    store.dispatch(JSON.parse(msg.content.toString()));
  }
};

// Publish / Subscribe Consumer
const pubSubConsumer = (conn, store) => {
  return conn.createChannel().then(ch => {
    return ch.assertExchange(exchangeName, 'fanout', {durable: true})
      .then(() => ch.assertQueue('', {exclusive: true}))
      .then(qok => ch.bindQueue(qok.queue, exchangeName, '').then(() => qok.queue))
      .then(queue => ch.consume(queue, msg => consumerCallback(msg, store)))
      .then(() => debug('[*] Waiting for logs. To exit press CTRL+C'));
  });
};

const publishSubProducer = (data) => {
  return open
    .then((conn) => {
      conn.createChannel().then((ch) => {
        return ch.assertExchange(exchangeName, 'fanout', {durable: true})
          .then(() => {
            ch.publish(exchangeName, '', new Buffer(data));
            return ch.close();
          });
      });
    })
    .then(null, console.warn);
};

export default {
  init: (io, store) => {
    socketIO = io;
    open
      .then(conn => pubSubConsumer(conn, store))
      .then(null, console.warn);
  },

  sendToRabbit: (data) => {
    publishSubProducer(data);
  }
};
