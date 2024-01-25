import { Request, Response } from "express";
import { Delivery } from "../models/delivery";

export const getUserDeliveries = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userServices = await Delivery.find({ customer: userId });
    res.json(userServices);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCourierDeliveries = async (req: Request, res: Response) => {
  try {
    const courierId = req.params.courierId;
    const courierServices = await Delivery.find({ courier: courierId });
    res.json(courierServices);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createDelivery = async (req: Request, res: Response) => {
  try {
    const newDelivery = new Delivery({
      origin: req.body.origin,
      destination: req.body.destination,
      price: req.body.price,
      customer: req.params.userId,
    });

    await newDelivery.save();

    res.status(201).json(newDelivery);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error al crear la entrega", error: error.message });
  }
};
