import express from "express";
import {
  getUserDeliveries,
  getCourierDeliveries,
  createDelivery,
  deleteDelivery,
} from "../controllers/deliveries";

const router = express.Router();

router.post("/create/:userId", createDelivery);
router.delete("delete/:deliveryId", deleteDelivery);

// User deliveries history
router.get("/:userId", getUserDeliveries);
router.get("/:courierId", getCourierDeliveries);

export default router;
