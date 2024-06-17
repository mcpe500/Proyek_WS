import { faker } from "@faker-js/faker";
import { IUser } from "../contracts/dto/UserRelated.dto";
import { ISubscription } from "../contracts/dto/SubscriptionRelated.dto";
import { generateApiKey } from "../utils/AuthUtils";
import Paket from "../models/static/Paket.model";

const FREE_PACKAGE_ID = "free";
const FREE_API_HITS = 1000;
Paket.findOne({ where: { Paket_id: "PAK001" } });

const createFreeSubscription = async (user: IUser): Promise<ISubscription> => {
  const apiKey = await generateApiKey();
  const now = new Date();
  const endDate = new Date(now);
  endDate.setDate(endDate.getDate() + 30);

  return {
    userId: user._id,
    paketId: FREE_PACKAGE_ID,
    apiHit: FREE_API_HITS,
    startDate: now,
    endDate: endDate,
    isActive: true,
    apiKey,
    resetAt: now,
  } as ISubscription;
};

export const createSubscriptions = async (
  verifiedUsers: IUser[],
  amount: number
): Promise<ISubscription[]> => {
  const subscriptions: ISubscription[] = [];

  for (const user of verifiedUsers) {
    const freeSubscription = await createFreeSubscription(user);
    subscriptions.push(freeSubscription);
  }

  for (let i = 0; i < amount; i++) {}

  // Add logic to create additional subscriptions (if needed)

  return subscriptions;
};

// Example usage:
// const verifiedUsers: IUser[] = []; // Your verified users
// const amount = 10; // Number of additional subscriptions

// const allSubscriptions = await createSubscriptions(verifiedUsers, amount);
// console.log("All Subscriptions:", allSubscriptions);
