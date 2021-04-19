import amqp from 'amqplib';
import config from '../config/config';
import Worker from '../controllers/Worker';

class Subscriber {
  channel: any;

  constructor() {
    this.init();
  }

  async init() {
    const connection = await amqp.connect(config.rabbitMQ);
    const channel = await connection.createChannel();
    this.channel = channel;
  }

  async listenQueueNotify(exchange?: string) {
    const queue = 'Galley';
    if (!this.channel) await this.init();
    this.channel.assertQueue(queue, { durable: false });
    this.channel.prefetch(1);
    console.log(`[Subscriber] Listening queue ${queue}`);

    this.channel.consume(queue, (message: amqp.Message) => {
        console.log(`[Subscriber] ${(new Date).toLocaleTimeString()} - Received a message from queue ${queue}:`);
        console.log(message?.content.toString());
        Worker.handleMessage(message);
    }, { noAck: true });
  }
}

export default new Subscriber()