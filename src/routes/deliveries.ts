import express from "express";
import {
  getUserDeliveries,
  getCourierDeliveries,
  createDelivery,
  deleteDelivery,
  getDelivery,
  getDeliveryPrice,
  getDeliveryCost,
  updateDelivery,
} from "../controllers/deliveries";

const router = express.Router();

router.get("/get/:deliveryId", getDelivery);
router.post("/create/:userId", createDelivery);
router.delete("/delete/:deliveryId", deleteDelivery);
router.put("/update/:deliveryId", updateDelivery);

router.get("/price", getDeliveryPrice);
router.get("/cost", getDeliveryCost);

// User deliveries history
router.get("/users/:userId", getUserDeliveries);
router.get("/couriers/:courierId", getCourierDeliveries);

export default router;
