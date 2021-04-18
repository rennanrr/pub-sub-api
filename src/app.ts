import express from 'express';
import config from './api/config/config';
import expressConfig from "./api/config/express";
import routesConfig from './api/config/routes';
import worker from './api/services/worker';
import { createServer } from "http";
import { Server } from "socket.io";


const app = express();  
const io = new Server(4555, {
  cors: {
    origin: '*'
  }
});
const server = async () => {
  expressConfig(app);
  routesConfig(app);
  worker(io);

  return app.listen(config.apiPort, () => {
      console.log(`[Server] listening on port ${config.apiPort}`);
    });
}

export default server();