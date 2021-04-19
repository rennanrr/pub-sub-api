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
    }).on('connection',(client) => {console.log(`[Subscriber] Client connected with id ${client.id}`)});
    if (this.server) console.log(`[Subscriber] Ready for connections WS, on port ${config.wsPort}`);
    else console.log(`[Subscriber] WS failed, on port ${config.wsPort}`)
    
  }

  async sendMessage(response: string) {
    console.log(`[Publisher] Sent a notification by socket`)
    this.server.send(response);
  }
}

export default new Worker()