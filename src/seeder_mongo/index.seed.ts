import { createSubscriptions } from "./subscription.seed";
import { createUsers } from "./user.seed";

async function runSeed() {
  const { verifiedUsers, unverifiedUsers, adminUsers } = await createUsers(10);
  const subscriptions = await createSubscriptions(verifiedUsers, 10);
  console.log(verifiedUsers);
  console.log(unverifiedUsers);
}

runSeed();
