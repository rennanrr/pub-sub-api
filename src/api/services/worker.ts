import amqp from 'amqplib/callback_api';
import { socketIO } from '../../app';
const worker = (msg: string) =>
  amqp.connect('amqp://localhost:5672', (err, connection) => {
    connection.createChannel((err, channel) => {
      var q = 'hello';

        channel.assertQueue(q, { durable: false });
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        channel.consume(q, function (msg) {
          socketIO.on("connection", socket => {
            socket.send(msg?.content.toString());
          });
          console.log(" [x] Received %s", msg?.content.toString());
        }, { noAck: true });
    });
  });

  export default worker