import { Request, Response } from "express";
import Paket from "../models/static/Paket.model";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";

export const createPaket = async (req: Request, res: Response) => {
  const { name, description, limit, price, currency } = req.body;

  try {
    const lastPaket = await Paket.findOne({
      attributes: ["Paket_id"],
      order: [["Paket_id", "DESC"]]
    })
    const lastPaketId = lastPaket ? parseInt(lastPaket.Paket_id.substring(3)) : 0
    const id = "PAK" + (lastPaketId + 1).toString().padStart(3, "0");

    const newPaket = await Paket.create({
      Paket_id: id,
      Paket_name: name,
      Paket_description: description,
      Paket_Limit: limit,
      Paket_price: price,
      Paket_price_currency: currency || undefined
    })

    return res.status(RESPONSE_STATUS.CREATED).json({
      message: "Paket created",
      paket: newPaket
    })
  } catch (error) {
    console.error(error);
    return res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
}

export const updatePaket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, limit, price, currency } = req.body;

  try {
    // Find the Paket by ID
    const paket = await Paket.findOne({ where: { Paket_id: id } });

    if (!paket) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "Paket not found" });
    }

    // Create an update object and add properties if they are provided
    const updateData: any = {};

    if (name) updateData.Paket_name = name;
    if (description) updateData.Paket_description = description;
    if (limit) updateData.Paket_Limit = limit;
    if (price) updateData.Paket_price = price;
    if (currency) updateData.Paket_price_currency = currency;

    // Update the Paket
    await paket.update(updateData);

    return res.status(RESPONSE_STATUS.SUCCESS).json({
      message: "Paket updated successfully",
      paket: paket
    });
  } catch (error) {
    console.error(error);
    return res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};


export const deletePaket = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Find the Paket by ID
    const paket = await Paket.findOne({ where: { Paket_id: id } });

    if (!paket) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "Paket not found" });
    }

    await paket.destroy();

    return res.status(RESPONSE_STATUS.SUCCESS).json({
      message: `Paket with id ${id} deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
}