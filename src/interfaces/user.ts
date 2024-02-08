import { Document } from "mongoose";
import { DocumentInterface, PointInterface } from "./custom";

export interface UserInterface extends Document {
  role: "user" | "courier" | "admin";
  name: string;
  phone: string;
  location?: PointInterface;
  INE?: DocumentInterface;
  driverLicense?: DocumentInterface;
}
