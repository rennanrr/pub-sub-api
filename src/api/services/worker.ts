import config from '../config/config';
import { Server } from "socket.io";

class Worker {
  server: any;
  constructor() {
    this.init();
  }

  async init() {
    this.server = new Server(config.wsPort, {
      cors: {
        origin: '*'
      }
    });
  }

  async sendMessage(response: string) {
    console.log(`[Publisher] Sent a notification by socket.`)
    this.server.send(response);
  }
}

export default new Worker()