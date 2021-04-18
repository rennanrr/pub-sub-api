import amqp from 'amqplib/callback_api';

const sendMessage = (msg: string) =>
  amqp.connect('amqp://localhost:5672', (err, connection) => {
    connection.createChannel((err, channel) => {
      var q = 'hello';
      channel.assertQueue(q, { durable: false });
      channel.sendToQueue(q, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });
  });

  export default { sendMessage }