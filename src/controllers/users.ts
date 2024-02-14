import { Request, Response } from "express";

import { UserInterface } from "../interfaces/user";
import { User } from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, phone }: UserInterface = req.body;
    if (!phone) return res.status(400).json({ message: "Phone is required" });

    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(409).json({ _id: existingUser._id });

    const newUser = await new User({ name, phone }).save();
    res.status(201).json(newUser);
  } catch (_) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const body: UserInterface = req.body;
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(userId, body, { new: true });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserAsCourier = async (
  { params: { userId }, body }: Request,
  res: Response
) => {
  try {
    const { INE, driverLicense } = body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        role: "courier",
        INE: {
          front: INE.front,
          back: INE.back,
        },
        driverLicense: {
          front: driverLicense.front,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAcceptedCouriers = async (_: Request, res: Response) => {
  try {
    const couriers = await User.find({ role: "courier" });
    res.status(200).json(couriers);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPendingCouriers = async (_: Request, res: Response) => {
  try {
    const pendingCouriers = await User.find({
      role: "user",
      "INE.front": { $ne: null },
      "INE.back": { $ne: null },
      "driverLicense.front": { $ne: null },
    });
    res.status(200).json(pendingCouriers);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};