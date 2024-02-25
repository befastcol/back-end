import mongoose, { Schema } from "mongoose";
import { UserInterface } from "../interfaces/user";
import { documentSchema, pointSchema } from "./custom";

const userSchema = new Schema<UserInterface>({
  name: {
    type: String,
    default: "",
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
  documents: {
    INE: {
      type: documentSchema,
      required: true,
      default: {
        front: "",
        back: "",
      },
    },
    driverLicense: {
      type: documentSchema,
      required: true,
      default: {
        front: "",
        back: "",
      },
    },
  },
  currentLocation: pointSchema,
  originLocation: pointSchema,
  isDisabled: {
    type: Boolean,
    required: true,
    default: false,
  },
  hasPayed: {
    type: Boolean,
    required: true,
    default: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive", "busy"],
    default: "inactive",
  },
  vehicle: {
    type: String,
    required: true,
    enum: ["car", "motorcycle"],
    default: "motorcycle",
  },
});

export const User = mongoose.model<UserInterface>("User", userSchema);
