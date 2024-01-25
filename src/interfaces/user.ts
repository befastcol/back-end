import { Document } from "mongoose";

import { DocumentDetails } from "./utils/document";

export interface UserInterface extends Document {
  name: string;
  phone: string;
  role: "user" | "courier" | "admin";
  INE?: DocumentDetails;
  driverLicense?: DocumentDetails;
}
