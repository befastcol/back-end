import express from 'express';
import { registerCourier } from '../controllers/courierController';

const router = express.Router();

router.post('/register', registerCourier);

export default router;
