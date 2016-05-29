var queueName = 'test';
var user = process.env.RABBIT_USER || 'root';
var pwd = process.env.RABBIT_PASSWORD || 'root';
var host = process.env.RABBIT_HOST || '192.168.99.101';
var rabbitUrl = 'amqp://' + user + ':' + pwd + '@' + host;
// var open = require('amqplib').connect('amqp://root:root@192.168.99.101');
var open = require('amqplib').connect(rabbitUrl);
var debug = require('debug')('dashboard-backend:server');

module.exports = function (io) {
// Consumer
  open.then((conn) => {

    var ok = conn.createChannel();
    ok = ok.then((ch) => {
      ch.assertQueue(queueName);

      // Consume message from rabbit queue
      ch.consume(queueName, function (msg) {
        if (msg !== null) {
          debug(msg.content.toString());
          ch.ack(msg);
          io.emit('push', {text: msg.content.toString(), when: JSON.stringify(new Date())});
          //socketService.emit('push' , {message : msg.content.toString()});
        }
      });
    });

    return ok;
  }).then(null, console.warn);
};


