var queueName = 'xebicon';
var user = process.env.RABBIT_USER || 'xebia';
var pwd = process.env.RABBIT_PASSWORD || 'xebia2015';
var host = process.env.RABBIT_HOST || '52.28.106.238';
var rabbitUrl = 'amqp://' + user + ':' + pwd + '@' + host;
// var open = require('amqplib').connect('amqp://root:root@192.168.99.101');
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
          //exemple of message : {"train":"01" ,"step": "pos_1_step_2"}
          //type = vote/train
          io.emit(msg.properties.type, {content: msg.content.toString(), when: JSON.stringify(new Date())});
        }
      });
    });

    return ok;
  }).then(null, console.warn);
};


