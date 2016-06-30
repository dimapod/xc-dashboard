var queueName = 'xebicon';
var exchangeName = 'xebiconExchange';
var user = process.env.RABBIT_USER || 'xebia';
var pwd = process.env.RABBIT_PASSWORD || 'xebia2015';
// var host = process.env.RABBIT_HOST || 'localhost';
var host = process.env.RABBIT_HOST || '52.28.106.238';
var rabbitUrl = 'amqp://' + user + ':' + pwd + '@' + host;
var open = require('amqplib').connect(rabbitUrl);
var debug = require('debug')('dashboard-backend:server');

var socketIO = null;

//Cosumer Logic -> Send message to from through socket
var consumerCallback = (msg)=> {
  if (msg !== null) {
    debug('receive from Rabbit : ', msg.content.toString());
    //ch.ack(msg);
    socketIO.emit('dashboard', {content: msg.content.toString(), when: JSON.stringify(new Date())});
  }
};

// Queue Consumer
var queueConsumer = (conn) => {

  var ok = conn.createChannel();
  ok = ok.then((ch) => {
    ch.assertQueue(queueName);

    // Consume message from rabbit queue train
    ch.consume(queueName, consumerCallback);
  });

  return ok;
};

// Publish/subscribe Consumer
var pubSubConsumer = (conn)=> {
  return conn.createChannel().then((ch)=>{
    var ok = ch.assertExchange(exchangeName, 'fanout', {durable: false});
    ok = ok.then(()=> {
      return ch.assertQueue('', {exclusive: true});
    });
    ok = ok.then((qok)=>{
      return ch.bindQueue(qok.queue, exchangeName, '').then(()=>{
        return qok.queue;
      });
    });
    ok = ok.then((queue)=>{
      // return ch.consume(queue, consumerCallback, {noAck: true});
      return ch.consume(queue, consumerCallback);
    });
    return ok.then(()=> {
      console.log(' [*] Waiting for logs. To exit press CTRL+C');
    });
  });
};

var publishSubProducer = (data)=>{
  return open.then((conn)=>{
    conn.createChannel().then((ch)=> {
      var ok = ch.assertExchange(exchangeName, 'fanout', {durable: false});

      return ok.then(()=>{
        ch.publish(exchangeName, '', new Buffer(data));
        return ch.close();
      });
    });
  }).then(null, console.warn);
};

var queueProducer = (data) => {
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

