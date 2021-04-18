import amqp from 'amqplib/callback_api';
import { Server } from 'socket.io';
const worker = (socketIO: Server) => {
  amqp.connect('amqp://localhost:5672', (err, connection) => {
    connection.createChannel((err, channel) => {
      var q = 'Galley';

      channel.assertQueue(q, { durable: false });
      channel.prefetch(1);
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
      channel.consume(q, function (msg) {
        if (msg) {
          const message: { string1: string, string2: string } = JSON.parse(msg.content.toString());
          socketIO.send(message.string1 + message.string2);
          console.log(`[${q}] Received %s ${msg.content.toString()}`);
        }
      }, { noAck: true });
    });
  });
}

export default worker