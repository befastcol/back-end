import express from "express";
import {
  getUserDeliveries,
  getCourierDeliveries,
  createDelivery,
} from "../controllers/deliveryController";

const router = express.Router();

router.get("/:userId", getUserDeliveries);
router.get("/:courierId", getCourierDeliveries);

router.post("/create/:userId", createDelivery);

export default router;
