import express from "express";
import {
  getUserDeliveries,
  getCourierDeliveries,
  createDelivery,
  deleteDelivery,
  getDelivery,
  getDeliveryPrice,
  updateDelivery,
} from "../controllers/deliveries";

const router = express.Router();

router.get("/:deliveryId", getDelivery);
router.get("/price", getDeliveryPrice);
router.post("/create/:userId", createDelivery);
router.delete("/delete/:deliveryId", deleteDelivery);
router.put("/update/:deliveryId", updateDelivery);

// User deliveries history
router.get("/users/:userId", getUserDeliveries);
router.get("/couriers/:courierId", getCourierDeliveries);

export default router;
