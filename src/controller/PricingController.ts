import { Request, Response } from "express";
import Paket from "../models/static/Paket.model";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";

export const getAllPricingPackages = async (req: Request, res: Response) => {
  try {
    const pakets = await Paket.findAll();

    return res.status(RESPONSE_STATUS.SUCCESS).json(pakets);
  } catch (error) {
    console.error("Error retrieving pricing packages:", error);
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to retrieve pricing packages" });
  }
};
