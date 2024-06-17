import { faker } from "@faker-js/faker";
import {
  generateApiKey,
  generateEmailVerificationToken,
  hashPassword,
} from "../utils/AuthUtils";
import { IUser } from "../contracts/dto/UserRelated.dto";
import { ISubscription } from "../contracts/dto/SubscriptionRelated.dto";

const createFreeSubscriptions = async (verifiedUsers: IUser[]) => {
  const subscriptions: ISubscription[] = [];
  for (let i = 0; i < verifiedUsers.length; i++) {
    const subscription: ISubscription = {
      userId: verifiedUsers[i]._id,
      paketId: "free",
      apiHit: 1000,
      startDate: new Date(),
      endDate: new Date(),
      isActive: true,
      apiKey: await generateApiKey(),
      resetAt: new Date(),
    };
    subscriptions.push(subscription);
  }

  return subscriptions;
};
const createSubscription = async (amount: number) => {};

export async function createSubscriptions(
  verifiedUsers: IUser[],
  amount: number
) {
  const subscriptions: ISubscription[] = [];
  await createFreeSubscriptions(verifiedUsers);

  for (let i = 0; i < amount; i++) {
    // const subscription = await createSubscription(verifiedUsers, amount);
    // subscriptions.push(subscription);
  }

  return subscriptions;
}
