import { closeMongoDB, connectMongoDB } from "../connection/connection";
import { createSubscriptions } from "./subscription.seed";
import { createUsers } from "./user.seed";

async function runSeed() {
  await connectMongoDB();
  let { verifiedUsers, unverifiedUsers, adminUsers } = await createUsers(10);
  // create user first so can get the user id
  // verifiedUsers = 
  const subscriptions = await createSubscriptions(verifiedUsers, 10);
  console.log(verifiedUsers);
  console.log(unverifiedUsers);
  console.log(subscriptions);
  await closeMongoDB();
}

runSeed();
