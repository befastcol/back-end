import { Document } from "mongoose";
import { DocumentInterface, PointInterface } from "./custom";

export interface UserInterface extends Document {
  name: string;
  phone: string;
  isDisabled: boolean;
  originLocation?: PointInterface;
  currentLocation?: PointInterface;
  documents: {
    INE: DocumentInterface;
    driverLicense: DocumentInterface;
  };
  role: "user" | "courier" | "admin";
  status: "active" | "inactive" | "busy";
  vehicle: "car" | "motorcycle" | "none";
}
