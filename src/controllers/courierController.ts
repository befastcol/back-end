import { Request, Response } from "express";

import { User } from "../models/user";

export const registerCourier = async (
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
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};
