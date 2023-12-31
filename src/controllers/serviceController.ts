import { Request, Response } from 'express';
import { Service } from '../models/service';

export const getUserServices = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId;
        const userServices = await Service.find({ customer: userId });
        res.json(userServices);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getCourierServices = async (req: Request, res: Response): Promise<void> => {
    try {
        const courierId = req.params.courierId;
        const courierServices = await Service.find({ courier: courierId });
        res.json(courierServices);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
