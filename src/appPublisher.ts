import express from 'express';
import config from './api/config/config';
import expressConfig from "./api/config/express";
import routesConfig from './api/config/routes';

const app = express();
const server = async () => {
  expressConfig(app);
  routesConfig(app);
  return app.listen(config.apiPort, () => {
    console.log(`[Publisher] Rest API listening on port ${config.apiPort}`);
  });
}

export default server();