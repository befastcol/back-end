import { Document } from "mongoose";
import { DocumentInterface, PointInterface } from "./custom";

export interface UserInterface extends Document {
  role: "user" | "courier" | "admin";
  name: string;
  phone: string;
  isDisabled: boolean;
  originLocation?: PointInterface;
  currentLocation?: PointInterface;
  documents: {
    INE: DocumentInterface;
    driverLicense: DocumentInterface;
  };
  status: "active" | "inactive" | "busy";
  vehicle: "car" | "motorcycle" | "none";
}
