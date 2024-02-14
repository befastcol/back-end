import mongoose, { Schema } from "mongoose";
import { UserInterface } from "../interfaces/user";
import { documentSchema, pointSchema } from "./custom";

const userSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "courier", "admin"],
    default: "user",
  },
  INE: documentSchema,
  driverLicense: documentSchema,
  location: {
    type: pointSchema,
  },
});

export const User = mongoose.model<UserInterface>("User", userSchema);
