import { Schema } from "mongoose";

export const pointSchema = new Schema({
  coordinates: {
    type: [Number],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});
