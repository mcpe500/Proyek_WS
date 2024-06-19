import { Request, Response } from "express";
import { GoogleMaps } from "../services/GoogleMapsService";

export const getNearestGyms = async (req: Request, res: Response) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required." });
    }

    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lng as string);
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: "Invalid latitude or longitude." });
    }

    const gyms = await GoogleMaps.getNearbyGyms(latitude, longitude);

    return res.status(200).json({ data: gyms });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching gyms." });
  }
};
