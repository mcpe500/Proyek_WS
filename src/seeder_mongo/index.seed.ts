import mongoose from "mongoose";
import { closeMongoDB, connectMongoDB } from "../connection/connection";
import { User } from "../models/dynamic/User.model";
import { createSubscriptions } from "./subscription.seed";
import { createUsers } from "./user.seed";
import { Subscription } from "../models/dynamic/Subscription.model";
import { createTransactions } from "./transaction.seed";
import { IUser } from "../contracts/dto/UserRelated.dto";
import { Transaction } from "../models/dynamic/Transaction.model";

async function runSeed() {
  await connectMongoDB();
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    let { verifiedUsers, unverifiedUsers, adminUsers, superAdmin } =
      await createUsers(10);

    await User.insertMany(
      [...verifiedUsers, ...unverifiedUsers, ...adminUsers, superAdmin],
      { session }
    );
    const createdSuperAdmin = await User.findOne({
      email: "super@example.com",
    }).session(session);
    const verifiedUserEmails = verifiedUsers.map((user) => user.email);
    const createdVerifiedUsers = await User.find(
      {
        email: { $in: verifiedUserEmails },
      },
      null,
      { session }
    );
    const subscriptions = await createSubscriptions(createdVerifiedUsers, 7);

    const adminEmails = adminUsers.map((user) => user.email);
    const createdAdminUsers = await User.find(
      {
        email: { $in: adminEmails },
      },
      null,
      { session }
    );

    const transactions = await createTransactions(
      createdVerifiedUsers,
      subscriptions,
      createdSuperAdmin as IUser
    );
    await Subscription.insertMany(subscriptions, { session });
    await Transaction.insertMany(transactions, { session });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    console.error("Transaction aborted due to an error:", error);
  } finally {
    session.endSession();
    await closeMongoDB();
  }
}

runSeed();
