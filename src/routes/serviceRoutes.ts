import express from 'express';
import { getUserServices, getCourierServices } from '../controllers/serviceController';

const router = express.Router();

router.get('/user/:userId/services', getUserServices);
router.get('/courier/:courierId/services', getCourierServices);

export default router;
