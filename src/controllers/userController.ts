import { Request, Response } from "express";

import { UserInterface } from "../interfaces/user";
import { User } from "../models/user";

export const createUser = async (req: Request, res: Response) => {
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
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(userId, { name }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
