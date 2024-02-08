import { Schema } from "mongoose";
import {
  DocumentInterface,
  LatLng,
  PointInterface,
} from "../../interfaces/custom";

export const pointSchema = new Schema<PointInterface>({
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

export const latLngSchema = new Schema<LatLng>({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

export const documentSchema = new Schema<DocumentInterface>({
  front: { type: String, default: null },
  back: { type: String, default: null },
});
