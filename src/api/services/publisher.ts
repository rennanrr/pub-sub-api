import amqp from 'amqplib';
import config from '../config/config';

class Publisher {
  channel: any;

  constructor() {
    this.init();
  }
  
  async init() {
    try {
      const connection = await this.connectAmqp();
      const channel = await connection.createChannel();
      this.channel = channel;
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

  async publishMessage(data: {}) {
    const queue = 'Galley';
    this.channel.assertQueue(queue, { durable: false });
    const send = this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    if (send) console.log(`[Publisher] Sent message to queue ${queue}:`);
    else console.log(`[Publisher] Failed to sent message to queue ${queue}:`)
    console.log(data);
    return send
  }
}

export default new Publisher()