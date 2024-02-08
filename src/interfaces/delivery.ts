import { Document, Types } from "mongoose";
import { PointInterface } from "./custom";

export interface DeliveryInterface extends Document {
  status: "pending" | "in_progress" | "completed";
  requestedDate: Date;
  deliveredDate: Date;
  origin: PointInterface;
  destination: PointInterface;
  courierLocation: PointInterface;
  customer: Types.ObjectId;
  courier: Types.ObjectId;
  price: number;
}
