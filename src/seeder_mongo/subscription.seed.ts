import { faker } from "@faker-js/faker";
import {
  generateEmailVerificationToken,
  hashPassword,
} from "../utils/AuthUtils";
import { IUser } from "../contracts/dto/UserRelated.dto";

const createFreeSubscriptions = async (verifiedUsers: IUser[]) => {};
const createSubscription = async (amount: number) => {};

export async function createSubscriptions(
  verifiedUsers: IUser[],
  amount: number
) {
  const subscriptions = [];

  for (let i = 0; i < amount; i++) {}

  return subscriptions;
}
