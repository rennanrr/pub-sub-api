import { NextFunction, Request, Response, Router } from 'express';
import publish from '../routes/publisher';
//import * as packageJson from '../../../package.json';

const API_V1 = '/api/v1';

const routes = (app: Router) => {
  app.use(API_V1, publish);
}

export default routes;
