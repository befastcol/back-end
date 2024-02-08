import { Request, Response } from "express";
import fetch from "node-fetch";
import { decodePolyline } from "./helpers/polyline";

export const getAutocompleteResults = async (req: Request, res: Response) => {
  const apiKey: string = process.env.GOOGLE_API_KEY || "";

  try {
    const { input, latitude, longitude } = req.query;

    if (!input || !latitude || !longitude) {
      return res
        .status(400)
        .json({ message: "Input, latitude, and longitude are required" });
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&location=${latitude},${longitude}&radius=25000&strictbounds=true&key=${apiKey}`;

    const response = await fetch(url);

    if (response.ok) {
      const data = (await response.json()) as any;
      res.status(200).json(data["predictions"]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRoutePoints = async (req: Request, res: Response) => {
  const apiKey: string = process.env.GOOGLE_API_KEY || "";

  const { origin, destination } = req.query;

  if (!origin || !destination)
    return res.status(400).json({ message: "Origin and destination required" });

  const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

  try {
    const response = await fetch(directionsUrl);

    if (response.ok) {
      const data = await response.json();

      if (data.routes != null && data.routes.length > 0) {
        const route = data.routes[0];
        const encodedPoly = route.overview_polyline.points;
        const polylinePoints = decodePolyline(encodedPoly);

        res.status(200).json(polylinePoints);
      } else {
        res.status(404).json({ message: "No routes found" });
      }
    } else {
      throw new Error("Failed to fetch directions");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLatLngByPlaceId = async (req: Request, res: Response) => {
  const { placeId } = req.query;
  const apiKey: string = process.env.GOOGLE_API_KEY || "";

  if (!placeId) return res.status(400).json({ message: "PlaceId is required" });

  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const locationData = data.result.geometry.location;
      res.status(200).json({ lat: locationData.lat, lng: locationData.lng });
    } else {
      throw new Error("Failed to fetch place details");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRoutePrice = async (req: Request, res: Response) => {
  const { distance, duration } = req.query;
  res.status(200);
};
