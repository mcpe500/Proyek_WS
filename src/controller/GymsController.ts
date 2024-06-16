import { Request, Response } from "express";
import { GoogleMaps } from "../services/GoogleMapsService";

export const getNearestGyms = async (req: Request, res: Response) => {
  const { lat, lng } = req.query;

  const latitute = parseFloat(lat as string);
  const longitude = parseFloat(lng as string);

  const gyms = await GoogleMaps.getNearbyGyms(latitute, longitude);

  return res.status(200).json({ data: gyms });
};
