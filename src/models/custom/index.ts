import { Schema } from "mongoose";
import { DocumentInterface, PointInterface } from "../../interfaces/custom";

export const pointSchema = new Schema<PointInterface>({
  type: { type: String, default: "Point", enum: ["Point"] },
  coordinates: { type: [Number], required: true },
  title: String,
  subtitle: String,
});

pointSchema.index({ coordinates: "2dsphere" });

export const documentSchema = new Schema<DocumentInterface>({
  front: { type: String, default: null },
  back: { type: String, default: null },
});
