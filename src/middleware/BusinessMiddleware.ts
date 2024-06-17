import { NextFunction, Request, Response } from "express";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";
import { Subscription } from "../models/dynamic/Subscription.model";
import Paket from "../models/static/Paket.model";

export const checkAndIncreaseAPIHit = (apiIncreaseCount: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { apiKey } = req.query;
    const user = (req as any).user;

    try {
      if (typeof apiKey !== 'string') {
        return res.status(400).json({ error: 'Invalid API key format' });
      }

      // Check for active subscription
      const activeSubscription = await Subscription.findOne({
        userId: user._id,
        apiKey: apiKey
      });

      if (!activeSubscription) {
        return res.status(RESPONSE_STATUS.NOT_FOUND).json({ msg: "Invalid API Key" });
      }

      // Check if the subscription has expired
      if (!activeSubscription.isActive || activeSubscription.endDate < new Date()) {
        await activeSubscription.updateOne({
          isActive: false
        });
        return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ msg: "Your subscription has expired" });
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
