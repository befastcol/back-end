import express, { Request, Response } from 'express';
import { Service } from '../models/service';

const router = express.Router();

router.get('/user/:userId/services', async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const userServices = await Service.find({ customer: userId });
        res.json(userServices);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/courier/:courierId/services', async (req: Request, res: Response) => {
    try {
        const courierId = req.params.courierId;
        const courierServices = await Service.find({ courier: courierId });
        res.json(courierServices);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
