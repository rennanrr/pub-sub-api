import amqp from 'amqplib';
import config from '../config/config';

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

export default new Subscriber()