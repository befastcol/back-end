import mongoose, { Schema } from "mongoose";
import { DeliveryInterface } from "../interfaces/delivery";
import { pointSchema } from "./custom";

const deliverySchema = new Schema<DeliveryInterface>({
  requestedDate: {
    type: Date,
    default: Date.now,
  },
  deliveredDate: {
    type: Date,
    default: null,
  },
  origin: {
    type: pointSchema,
    required: true,
  },
  destination: {
    type: pointSchema,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courier: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"],
    default: "pending",
  },
  courierLocation: {
    type: [Number],
    required: false,
  },
});

export const Delivery = mongoose.model<DeliveryInterface>(
  "Delivery",
  deliverySchema
);
