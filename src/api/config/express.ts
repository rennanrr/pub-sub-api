import { Router } from 'express';
import morgan from 'morgan';
import cors from '../../middlewares/cors';
import express from 'express';

const router = (app: Router) => {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cors);
};

export default router;