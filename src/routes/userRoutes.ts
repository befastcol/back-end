import express, { Request, Response } from 'express';
import { createUser } from '../controllers/userService';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (error: any) {
        console.error(error);
        if (error.message === "User already exists") {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ message: error.message || "Internal server error" });
    }
});

export default router;
