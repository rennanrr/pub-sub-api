import express, { Router } from 'express';
import ctrl from '../controllers/alert';

const router: Router = express.Router();

router.route('/alert').post(ctrl.publish);

export default router;  