import express, { Request, Response } from 'express';
import  Courier  from "../models/courier";
import { User } from '../models/user';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { userId, INE_front, INE_back, driverLicense } = req.body;

        if (!userId || !INE_front || !INE_back || !driverLicense) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingCourier = await Courier.findOne({ userId });
        if (existingCourier) {
            return res.status(409).json({ message: "User already registered as a courier" });
        }

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        const newCourier = new Courier({ userId, INE_front, INE_back, driverLicense });
        await newCourier.save();

        res.status(201).json(newCourier);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
