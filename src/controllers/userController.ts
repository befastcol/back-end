import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserInterface } from '../interfaces/UserInterface';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, phone }: UserInterface = req.body;

        if (!name || !phone) {
            res.status(400).json({ message: "Name and phone are required" });
            return;
        }

        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
            return;
        }

        const newUser = new User({ name, phone });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};
