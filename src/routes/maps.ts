import express from "express";
import {
  getAutocompleteResults,
  getRoutePoints,
  getLatLngByPlaceId,
  getRoutePrice,
} from "../controllers/maps";

const router = express.Router();

router.get("/autocomplete", getAutocompleteResults);
router.get("/polylines", getRoutePoints);
router.get("/placelatlng", getLatLngByPlaceId);
router.get("/price", getRoutePrice);

export default router;
