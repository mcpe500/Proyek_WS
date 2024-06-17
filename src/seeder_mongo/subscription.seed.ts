import { faker } from "@faker-js/faker";
import { IUser } from "../contracts/dto/UserRelated.dto";
import { ISubscription } from "../contracts/dto/SubscriptionRelated.dto";
import { generateApiKey } from "../utils/AuthUtils";
import Paket from "../models/static/Paket.model";
import { IPaket } from "../contracts/dto/Paket.dto";

let pakets: IPaket[] = [];

const createFreeSubscription = async (user: IUser): Promise<ISubscription> => {
  try {
    const apiKey = await generateApiKey();
    const now = new Date();
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + 30); // Set the actual end date based on your business logic

    return {
      userId: user._id,
      paketId: "PAK001",
      apiHit: 0,
      startDate: now,
      endDate: endDate,
      isActive: true,
      apiKey,
      resetAt: now,
    } as ISubscription;
  } catch (error) {
    console.error("Error creating free subscription:", error);
    throw error; // Rethrow the error or handle it as needed
  }
};

const createOtherSubscription = async (user: IUser): Promise<ISubscription> => {
  try {
    const paket = pakets[Math.floor(Math.random() * pakets.length)];
    const apiKey = await generateApiKey();
    const now = new Date();
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + 30); // Set the actual end date based on your business logic
    
    return {
      userId: user._id,
      paketId: paket.Paket_id,
      apiHit: 0,
      startDate: now,
      endDate: endDate,
      isActive: true,
      apiKey,
      resetAt: now,
    } as ISubscription;
  } catch (error) {
    console.error("Error creating other subscription:", error);
    throw error; // Rethrow the error or handle it as needed
  }
};

export const createSubscriptions = async (
  verifiedUsers: IUser[],
  amount: number
): Promise<ISubscription[]> => {
  const subscriptions: ISubscription[] = [];
  pakets = await Paket.findAll({});

  for (const user of verifiedUsers) {
    const freeSubscription = await createFreeSubscription(user);
    subscriptions.push(freeSubscription);
  }

  if (amount <= verifiedUsers.length) {
    for (let i = 0; i < amount; i++) {
      const otherSubscription = await createOtherSubscription(verifiedUsers[i]);
      subscriptions.push(otherSubscription);
    }
  }

  return subscriptions;
};
