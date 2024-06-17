import { NextFunction, Request, Response } from "express";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";
import { Subscription } from "../models/dynamic/Subscription.model";
import Paket from "../models/static/Paket.model";

export const checkAndIncreaseAPIHit = (apiIncreaseCount: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    try {
      // Check for active subscription
      let activeSubscription = await Subscription.findOne({
        userId: user._id,
        isActive: true,
      });

      if (!activeSubscription) {
        return res
          .status(RESPONSE_STATUS.NOT_FOUND)
          .json({ msg: "Tidak ada paket yang aktif" });
      }

      // Check if the subscription has expired
      if (
        activeSubscription.endDate &&
        activeSubscription.endDate < new Date()
      ) {
        // set current subscription to inactive
        await activeSubscription.updateOne({ isActive: false });

        // set free subscription to active
        activeSubscription = await Subscription.findOneAndUpdate(
          {
            userId: user._id,
            paketId: "PAK001",
          },
          {
            $set: { isActive: true },
          },
          {
            new: true, // Return the updated document
            useFindAndModify: false, // Deprecation warning fix
          }
        );

        if (!activeSubscription) {
          return res
            .status(RESPONSE_STATUS.NOT_FOUND)
            .json({ msg: "Tidak ada paket yang aktif" });
        }
      }

      // Check API hit limit
      const paket = await Paket.findOne({
        where: {
          Paket_id: activeSubscription.paketId,
        },
      });

      if (!paket || !paket.Paket_Limit) {
        return res
          .status(RESPONSE_STATUS.BAD_REQUEST)
          .json({ msg: "Paket not found or invalid" });
      }

      // If resetAt is less than current time, reset API Hit
      if (
        !activeSubscription.resetAt ||
        activeSubscription.resetAt < new Date()
      ) {
        await activeSubscription.updateOne({
          apiHit: 0,
          resetAt: new Date(new Date().getTime() + 60 * 1000),
        });
      }

      // If API hit equals limit, display error
      if (activeSubscription.apiHit >= paket.Paket_Limit) {
        return res
          .status(RESPONSE_STATUS.BAD_REQUEST)
          .json({ msg: "API hit limit reached" });
      }

      // Increase API hit and proceed
      await activeSubscription.updateOne({
        $inc: { apiHit: apiIncreaseCount },
      });
      next();
    } catch (error) {
      console.error("Error in checkIncreaseAPIHit middleware:", error);
      return res
        .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
        .json({ msg: "Internal server error" });
    }
  };
};


export const checkAPIKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { apiKey } = req.body;
  const user = (req as any).user;

  if ( user.apiKey != apiKey ) {
    return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ msg: "Invalid API key" });
  }

  next();
}
