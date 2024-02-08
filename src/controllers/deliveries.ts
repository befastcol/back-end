import { Request, Response } from "express";
import { Delivery } from "../models/delivery";
import { watchDeliveryChanges } from "./helpers/socketio";

export const getUserDeliveries = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userServices = await Delivery.find({ customer: userId }).sort({
      requestedDate: -1,
    });
    res.json(userServices);
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

    const savedDelivery = await newDelivery.save();

    watchDeliveryChanges(savedDelivery._id);

    res.status(201).json(savedDelivery);
  } catch (_) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteDelivery = async (req: Request, res: Response) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.deliveryId);
    if (!delivery) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ message: "Delivery deleted successfully" });
  } catch (_) {
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
