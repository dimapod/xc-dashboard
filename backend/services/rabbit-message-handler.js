var queueName = 'xebicon';
var user = process.env.RABBIT_USER || 'xebia';
var pwd = process.env.RABBIT_PASSWORD || 'xebia2015';
var host = process.env.RABBIT_HOST || '52.28.106.238';
var rabbitUrl = 'amqp://' + user + ':' + pwd + '@' + host;
var open = require('amqplib').connect(rabbitUrl);
var debug = require('debug')('dashboard-backend:server');

module.exports = (io) => {
// Consumer
  open.then((conn) => {

    var ok = conn.createChannel();
    ok = ok.then((ch) => {
      ch.assertQueue(queueName);

      // Consume message from rabbit queue train
      ch.consume(queueName, (msg) => {
        if (msg !== null) {
          debug(msg);
          debug(msg.content.toString());
          ch.ack(msg);
          io.emit('dashboard', {content: msg.content.toString(), when: JSON.stringify(new Date())});
        }
      });
    });

    return ok;
  }).then(null, console.warn);
};


