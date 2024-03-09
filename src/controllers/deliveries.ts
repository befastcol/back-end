import { Request, Response } from "express";
import { Delivery } from "../models/delivery";
import { calculatePrice } from "./helpers/price";
import { getClosestCouriers } from "./helpers/closestCouriers";
import { notifyCourier } from "./helpers/socketio";
import { getAvailableCouriersByCity } from "./users";
import { Types } from "mongoose";

export const getDeliveryPrice = async (req: Request, res: Response) => {
  try {
    const { distance, duration } = req.query;

    if (!distance && !duration)
      return res.status(400).json({ message: "Invalid query parameters" });

    const price = calculatePrice(Number(distance), Number(duration));
    res.status(200).json(price);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDeliveryCost = async (_: Request, res: Response) => {
  try {
    res.status(200).json(8);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createDelivery = async (req: Request, res: Response) => {
  const availableCouriers = await getAvailableCouriersByCity(
    req.body.origin.city
  );
  const closestCouriers = await getClosestCouriers(
    req.body.origin,
    availableCouriers
  );

  console.log({ availableCouriers, closestCouriers });

  try {
    const delivery = new Delivery({
      origin: req.body.origin,
      destination: req.body.destination,
      price: req.body.price,
      customer: req.params.userId,
    });

    const savedDelivery = await delivery.save();
    notifyCourier(closestCouriers, savedDelivery);

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

export const getDelivery = async (req: Request, res: Response) => {
  try {
    const deliveryId = req.params.deliveryId;
    const courierServices = await Delivery.findById(deliveryId);
    res.status(200).json(courierServices);
  } catch (_) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateDelivery = async (req: Request, res: Response) => {
  try {
    const deliveryId = req.params.deliveryId;
    const { status, courier } = req.body;

    if (!status && !courier) {
      return res
        .status(400)
        .json({ message: "Status and CourierId are required" });
    }

    const updatedDelivery = await Delivery.findByIdAndUpdate(
      deliveryId,
      { $set: { status, courier } },
      { new: true }
    );

    if (!updatedDelivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    res.status(200).json(updatedDelivery);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCourierDeliveries = async (req: Request, res: Response) => {
  try {
    const courierId = req.params.courierId;
    const courierServices = await Delivery.find({ courier: courierId });
    res.status(200).json(courierServices);
  } catch (_) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserDeliveries = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userServices = await Delivery.find({ customer: userId }).sort({
      requestedDate: -1,
    });
    res.status(200).json(userServices);
  } catch (_) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const acceptDelivery = async (data: {
  courierId: Types.ObjectId;
  status: "pending" | "in_progress" | "completed";
  deliveryId: Types.ObjectId;
}) => {
  try {
    const delivery = await Delivery.findById(data.deliveryId);
    if (!delivery) return;

    delivery.courier = data.courierId;
    delivery.status = data.status;

    await delivery.save();
  } catch (error: any) {
    console.error("Error updating delivery:", error.message);
  }
};
