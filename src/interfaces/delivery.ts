import { Document, Types } from "mongoose";

import { PointSchema } from "./utils/point";

export interface DeliveryInterface extends Document {
  requestedDate: Date;
  deliveredDate: Date;
  origin: PointSchema;
  destination: PointSchema;
  price: number;
  customer: Types.ObjectId;
  courier: Types.ObjectId;
  status: "pending" | "in_progress" | "completed";
  courierLocation: number[];
}
