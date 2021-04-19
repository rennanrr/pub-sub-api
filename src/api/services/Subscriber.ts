import amqp from 'amqplib';
import config from '../config/config';
import Worker from '../controllers/Worker';

class Subscriber {
  channel: any;

  constructor() {
  }

  async init() {
    try {
      const connection = await this.connectAmqp();
      const channel = await connection.createChannel();
      this.channel = channel;
      this.listenQueueNotify();
    } catch (error) {
      console.log('[Subscriber] Was not possible to connect to RabbitMQ Server.');
      console.log(error);
      setTimeout(() => this.init(), 5000);
    }
  }

  async connectAmqp() {
    console.log(`[Subscriber] Connecting to ${config.rabbitMQ}...`)
    const connection = await amqp.connect(config.rabbitMQ);
    connection.on("error", (err: Error) => {
      if (err.message !== "Connection closing") {
        console.error("[Subscriber] connection error ", err.message);
      }
    });
    connection.on("close", () => {
      console.error(`[Subscriber] Connection with ${config.rabbitMQ} has close`);
      setTimeout(() => this.init(), 5000);
    });
    console.log(`[Subscriber] connected to ${config.rabbitMQ}!`);
    return connection;
  }

  async listenQueueNotify() {
    const queue = 'Galley';
    if (this.channel) {
      this.channel.assertQueue(queue, { durable: false });
      this.channel.prefetch(1);
      console.log(`[Subscriber] Listening queue ${queue} on ${config.rabbitMQ}`);

      this.channel.consume(queue, (message: amqp.Message) => {
        console.log(`[Subscriber] ${(new Date).toLocaleTimeString()} - Received a message from queue ${queue}:`);
        console.log(message?.content.toString());
        Worker.handleMessage(message);
      }, { noAck: true });
    }
    else this.init();
  }
}

export default new Subscriber()