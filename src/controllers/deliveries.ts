import { Request, Response } from "express";
import { Delivery } from "../models/delivery";
import { calculatePrice } from "./helpers/price";
import { io } from "../..";
import { getClosestCouriers } from "./helpers/closestCouriers";

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

export const createDelivery = async (req: Request, res: Response) => {
  const closestCouriers = await getClosestCouriers(req.body.origin);

  //TODO: Crear un algoritmo que despues de cada cierto tiempo si el courier0 no aceptó, lo elimine del array y pasemos al siguiente

  try {
    const newDelivery = new Delivery({
      origin: req.body.origin,
      destination: req.body.destination,
      price: req.body.price,
      customer: req.params.userId,
      courier: closestCouriers[0].id,
    });

    const savedDelivery = await newDelivery.save();
    io.emit(closestCouriers[0].id, { courier: req.body.courier });

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
