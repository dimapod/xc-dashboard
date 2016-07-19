const queueName = 'xebicon';
const exchangeName = 'xebiconExchange';
const user = process.env.RABBIT_USER || 'xebia';
const pwd = process.env.RABBIT_PASSWORD || 'xebia2015';
const host = process.env.RABBIT_HOST || '192.168.99.100';
//const host = process.env.RABBIT_HOST || '52.28.106.238';
const rabbitUrl = 'amqp://' + user + ':' + pwd + '@' + host;
const open = require('amqplib').connect(rabbitUrl);
const debug = require('debug')('dashboard-backend:server');
const store = global.store;

let socketIO = null;

//Cosumer Logic -> Send message to from through socket
const consumerCallback = (msg)=> {
  if (msg !== null) {
    debug('receive from Rabbit : ', msg.content.toString());
    //ch.ack(msg);
    // socketIO.emit('dashboard', {content: msg.content.toString(), when: JSON.stringify(new Date())});
    store.dispatch(msgHandler());
  }
};

// Queue Consumer
const queueConsumer = (conn) => {

  let ok = conn.createChannel();
  ok = ok.then((ch) => {
    ch.assertQueue(queueName);

    // Consume message from rabbit queue train
    ch.consume(queueName, consumerCallback);
  });

  return ok;
};

// Publish/subscribe Consumer
const pubSubConsumer = (conn)=> {
  return conn.createChannel().then((ch)=> {
    let ok = ch.assertExchange(exchangeName, 'fanout', {durable: false});
    ok = ok.then(()=> {
      return ch.assertQueue('', {exclusive: true});
    });
    ok = ok.then((qok)=> {
      return ch.bindQueue(qok.queue, exchangeName, '').then(()=> {
        return qok.queue;
      });
    });
    ok = ok.then((queue)=> {
      // return ch.consume(queue, consumerCallback, {noAck: true});
      return ch.consume(queue, consumerCallback);
    });
    return ok.then(()=> {
      console.log(' [*] Waiting for logs. To exit press CTRL+C');
    });
  });
};

const publishSubProducer = (data)=> {
  return open.then((conn)=> {
    conn.createChannel().then((ch)=> {
      const ok = ch.assertExchange(exchangeName, 'fanout', {durable: false});

      return ok.then(()=> {
        ch.publish(exchangeName, '', new Buffer(data));
        return ch.close();
      });
    });
  }).then(null, console.warn);
};

const queueProducer = (data) => {
  open.then((conn)=> {
    return conn.createChannel();
  }).then((ch)=> {
    return ch.assertQueue(queueName).then((ok)=> {
      debug('simulation : ', data);
      return ch.sendToQueue(queueName, new Buffer(data));
    });
  }).catch(console.warn);
};

module.exports = {
  init: (io)=> {
    socketIO = io;
    // Consumer
    open.then(pubSubConsumer).then(null, console.warn);
    // open.then(queueConsumer).then(null, console.warn);
  },

  sendToRabbit: (data)=> {
    publishSubProducer(data);
    /* uncomment if you want to use xebicon queue*/
    //queueProducer(data);
  }
};

