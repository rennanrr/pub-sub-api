import express from 'express';
import config from './api/config/config';
import expressConfig from "./api/config/express";
import routesConfig from './api/config/routes';
import SocketIO from 'socket.io';

const app = express();
export const socketIO = new SocketIO.Server(4555, {
  cors: {
  origin: '*'
}});
const server = async () => {
  expressConfig(app);
  routesConfig(app);

  return app.listen(config.apiPort, () => {
      console.log(`[Server] listening on port ${config.apiPort}`);
    });
}

export default server();