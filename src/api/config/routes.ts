import { NextFunction, Request, Response, Router } from 'express';
import alert from '../routes/alert';
//import * as packageJson from '../../../package.json';

const API_V1 = '/api/v1';

const routes = (app: Router) => {
  app.use(API_V1, alert);
}

export default routes;
