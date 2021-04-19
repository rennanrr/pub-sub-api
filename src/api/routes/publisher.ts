import express, { Router } from 'express';
import ctrl from '../controllers/publisher';

const router: Router = express.Router();

router.route('/publish').post(ctrl.publish);

export default router;  