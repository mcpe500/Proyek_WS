// import { bcrypt } from 'bcrypt';
import { Request, Response } from "express";
import {
  createAccessToken,
  createRefreshToken,
  generateApiKey,
  generateEmailVerificationToken,
  hashPassword,
  sendVerificationEmail,
  verifyEmailVerificationToken,
  verifyPassword,
  verifyRefreshToken,
} from "../utils/AuthUtils";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";
import { User } from "../models/dynamic/User.model";
import Paket from "../models/static/Paket.model";
import { JwtPayload } from "jsonwebtoken";

import crypto from "crypto";
import { Subscription } from "../models/dynamic/Subscription.model";
import { Exercise } from "../models/dynamic/Exercise.model";
import { Apis } from "../services/ApiService";
import { IExercise } from "../contracts/dto/PlansRelated.dto";
import {
  TransactionDetailType,
  TransactionHeaderType,
} from "../contracts/enum/TransactionRelated.enum";
import { Transaction } from "../models/dynamic/Transaction.model";
import {
  ITransaction,
  ITransactionSubscriptionDetail,
  ITransactionTopUpDetail,
  ITransationHeaderAdmin,
  ITransationHeaderUser,
} from "../contracts/dto/TransactionRelated.dto";
import { topupSchema } from "../validators/Topup.validate";
import mongoose from "mongoose";
import { ROLE } from "../contracts/enum/UserRelated.enum";

// const UserSchema: Schema = new Schema({
//   fullName: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   password: { type: String, required: true },
//   age: { type: Number, required: true },
//   gender: { type: String, required: true },
//   height: { type: Number, required: true },
//   weight: { type: Number, required: true },
//   healthInformation: { type: String, required: true },
//   refreshToken: { type: String },
//   isEmailVerified: { type: Boolean, default: false },
//   emailVerificationToken: { type: String },
// });

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, fullName, phone } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] }); //
    if (existingUser) {
      return res
        .status(RESPONSE_STATUS.BAD_REQUEST)
        .json({ msg: "Username or email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const emailToken = generateEmailVerificationToken(email);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      phone,
      isEmailVerified: false,
      emailVerificationToken: emailToken,
    });
    const savedUser = await newUser.save();
    const respone = {
      username: savedUser.username,
      email: savedUser.email,
      fullName: savedUser.fullName,
      phone: savedUser.phone,
      _id: savedUser._id,
    };
    await sendVerificationEmail(email, emailToken, username);
    return res.status(RESPONSE_STATUS.CREATED).json({
      msg: "Register Successful, please verify your email within 24 hours!",
      user: respone,
    });
  } catch (error) {
    return res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, email, password, rememberMe } = req.body;
  // console.log(req.body);
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ msg: "Invalid credentials" });
  }
  if (!user.isEmailVerified) {
    if (!verifyEmailVerificationToken(user.emailVerificationToken)) {
      await User.deleteOne({ _id: user._id });

      return res.status(RESPONSE_STATUS.BAD_REQUEST).send({
        message:
          "Your email verification token has expired and as a result, your account has been deleted",
      });
    }
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .send({ message: "Please verify your email" });
  }
  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ msg: "Invalid credentials" });
  }
  const dataToToken = {
    username: username,
    email: email,
  };
  const accessToken = createAccessToken(dataToToken, rememberMe);
  const refreshToken = createRefreshToken(dataToToken, rememberMe);

  await user.updateOne({
    refreshToken: refreshToken,
    accessToken: accessToken,
  });

  res.cookie("refreshToken", refreshToken, { httpOnly: true });
  return res.status(RESPONSE_STATUS.SUCCESS).json({
    msg: "Logged in successfully",
    token: accessToken,
  });
};

export const getDashboard = async (req: Request, res: Response) => {
  //   const { username, email } = req.body;
  //   const user = await User.findOne({ $or: [{ username }, { email }] });
  const user = (req as any).user;
  return res.status(RESPONSE_STATUS.SUCCESS).json({ user: user });
};

export const getProfPic = async (req: Request, res: Response) => {
  const user = (req as any).user;
  return res.sendFile(user.profilePicture, { root: "." });
};

export const editProfile = async (req: Request, res: Response) => {
  const {
    old_password,
    new_password,
    confirm_password,
    fullName,
    phone,
    age,
    gender,
    height,
    weight,
    healthInformation,
  } = req.body;
  const user = (req as any).user;
  // console.log(user);

  if (!user) {
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ message: "User not found" });
  }

  if (old_password && old_password != "") {
    const isPasswordValid = await verifyPassword(old_password, user.password);
    if (!isPasswordValid) {
      return res
        .status(RESPONSE_STATUS.BAD_REQUEST)
        .json({ msg: "old_password is incorrect" });
    }

    if (new_password && new_password == "") {
      return res
        .status(RESPONSE_STATUS.BAD_REQUEST)
        .json({ msg: "new_password must not be empty" });
    }
    if (new_password != confirm_password) {
      return res
        .status(RESPONSE_STATUS.BAD_REQUEST)
        .json({ msg: "confirm_password does not match" });
    }
    const hashedPassword = await hashPassword(new_password);

    // Update password
    user.password = hashedPassword;
  }

  // Update other fields if they are not empty
  if (fullName && fullName != "") user.fullName = fullName;
  if (phone && phone != "") user.phone = phone;
  if (age && age != "") user.age = age;
  if (gender && gender != "") user.gender = gender;
  if (height && height != "") user.height = height;
  if (weight && weight != "") user.weight = weight;
  if (healthInformation && healthInformation != "")
    user.healthInformation = healthInformation;
  if (req.file) user.profilePicture = req.file.path;

  // Save the updated user
  await user.save();

  return res.status(RESPONSE_STATUS.SUCCESS).json({ user: user });
};

export const newRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findOne({
      $or: [{ username: decoded.username }, { email: decoded.email }],
    });
    if (!user) {
      return res
        .status(RESPONSE_STATUS.NOT_FOUND)
        .json({ message: "User not found" });
    }
    const dataToToken = {
      username: user.username,
      email: user.email,
    };
    const newRefreshToken = createRefreshToken(dataToToken, false);
    await user.updateOne({ refreshToken: newRefreshToken });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    return res
      .status(RESPONSE_STATUS.SUCCESS)
      .json({ message: "Refresh token generated successfully" });
  } catch (err) {
    return res
      .status(RESPONSE_STATUS.FORBIDDEN)
      .json({ message: "Invalid refresh token" });
  }
};

export const generateNewAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    const decoded = verifyRefreshToken(refreshToken);
    // console.log("decoded : ", decoded);
    const user = await User.findOne({
      $or: [{ username: decoded.username }, { email: decoded.email }],
    });
    // console.log(user);
    if (!user) {
      return res
        .status(RESPONSE_STATUS.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const dataToToken = {
      username: user.username,
      email: user.email,
    };
    const accessToken = createAccessToken(dataToToken, false);
    await user.updateOne({ accessToken: accessToken });
    return res.status(RESPONSE_STATUS.SUCCESS).json({ accessToken });
  } catch (err) {
    return res
      .status(RESPONSE_STATUS.FORBIDDEN)
      .json({ message: "Invalid refresh token" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { emailVerificationToken } = req.params;
  try {
    const decoded: JwtPayload | null = verifyEmailVerificationToken(
      emailVerificationToken
    ) as JwtPayload;

    const user = await User.findOne({
      emailVerificationToken: emailVerificationToken,
    });

    if (user?.email != decoded?.email) {
      return res
        .status(RESPONSE_STATUS.FORBIDDEN)
        .json({ message: "Invalid email verification token" });
    }

    if (!user) {
      return res
        .status(RESPONSE_STATUS.NOT_FOUND)
        .json({ message: "User not found" });
    }
    // TODO : (Make sure it works)Bikin ngasi ApiKey waktu subscribe, sama Api Key masuk ke subscription udh bukan di user (DONE, Hansen)

    let apiKey = await generateApiKey();
    await user.updateOne({
      isEmailVerified: true,
      emailVerificationToken: null,
    });

    const subscription = new Subscription({
      userId: user._id,
      paketId: "PAK001",
      endDate: new Date("9999-12-31T23:59:59.999Z"),
      resetAt: new Date(new Date().getTime() + 60 * 1000),
      apiKey: apiKey,
    });
    await subscription.save();

    return res
      .status(RESPONSE_STATUS.SUCCESS)
      .send({ message: "Email verified" });
  } catch (err) {
    return res.status(RESPONSE_STATUS.FORBIDDEN).json({
      message:
        "Invalid email verification token or your email verification token has expired",
    });
  }
};

// TODO bikin ini response nya, list of ApiKey dari subscribe yg usernya lagi login (DONE, Hansen)
export const getApiKey = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const subscriptions = await Subscription.find({ userId: user._id });
    if (!subscriptions.length) {
      return res
        .status(RESPONSE_STATUS.NOT_FOUND)
        .json({ msg: "No subscriptions found for this user" });
    }

    const activeSubscriptions = subscriptions.filter(
      (subscription) => subscription.isActive
    );
    const apiKeys = activeSubscriptions.map((subscription) => ({
      paketid: subscription.paketId,
      apiKey: subscription.apiKey,
    }));

    if (apiKeys.length) {
      return res.status(RESPONSE_STATUS.SUCCESS).json({ apiKeys });
    } else {
      return res
        .status(RESPONSE_STATUS.NOT_FOUND)
        .json({ msg: "No active API keys found for this user" });
    }
  } catch (error) {
    console.error("Error fetching API keys:", error);
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

// TODO bikin ini supaya ngereset apikey dari subscription (DONE, Hansen)
export const resetApiKey = async (req: Request, res: Response) => {
  const user = (req as any).user;
  try {
    let newApiKey = await generateApiKey();
    const updatedSubscribe = await Subscription.findOneAndUpdate(
      { userId: user._id },
      { $set: { apiKey: newApiKey } },
      { new: true, useFindAndModify: false } // Returns the updated document
    );
    return res
      .status(RESPONSE_STATUS.SUCCESS)
      .json({ apiKey: (updatedSubscribe as any).apiKey });
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const topup = async (req: Request, res: Response) => {
  const { amount } = req.body;
  const user = (req as any).user;

  if (!amount || amount <= 0) {
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ message: "Invalid amount" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const transactionHeader: ITransationHeaderUser = {
      transactionHeaderType: TransactionHeaderType.TOPUP,
      date: new Date(),
      total: amount,
      userId: user._id,
    };

    const transactionDetails: ITransactionTopUpDetail[] = [
      {
        transactionDetailType: TransactionDetailType.USER_TOPUP,
        subtotal: amount,
        message: `User: ${user.username}, does action = ${TransactionDetailType.USER_TOPUP} with amount = ${amount}`,
      },
    ];

    const transaction: ITransaction = {
      header: transactionHeader,
      details: transactionDetails,
    };
    await Transaction.create([transaction], { session });
    user.balance += amount;
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(RESPONSE_STATUS.SUCCESS).json({
      message: "Balance updated successfully.",
      currentBalance: user.balance,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

// TODO bikin ini supaya ada api key nya
export const subscribePacket = async (req: Request, res: Response) => {
  const subscriptions = req.body; // This should be an array of { paketId, month }
  const user = (req as any).user;

  if (!Array.isArray(subscriptions)) {
    return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
      message: "Invalid request format. Expected an array of subscriptions.",
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const transactionDetails = [];

    for (const sub of subscriptions) {
      const { paketId, month } = sub;

      if (!paketId || !month) {
        throw {
          status: RESPONSE_STATUS.BAD_REQUEST,
          message: `Request fields not valid`,
        };
      }

      const paket = await Paket.findOne({
        where: {
          Paket_id: paketId,
        },
      });

      if (!paket) {
        throw {
          status: RESPONSE_STATUS.NOT_FOUND,
          message: `Paket not found: ${paketId}`,
        };
      }

      if (paketId === "PAK001") {
        throw {
          status: RESPONSE_STATUS.BAD_REQUEST,
          message: `You can't subscribe to this paket: ${paketId}`,
        };
      }

      if (month < 1) {
        throw {
          status: RESPONSE_STATUS.BAD_REQUEST,
          message: `Invalid number of months for paket: ${paketId}`,
        };
      }

      // Check balance
      const totalCost = paket.Paket_price * parseInt(month);
      if (user.balance < totalCost) {
        throw {
          status: RESPONSE_STATUS.BAD_REQUEST,
          message: "Not enough balance! Please top up first",
        };
      }

      // Update balance
      user.balance -= totalCost;
      await user.save({ session });

      let endDate = new Date();
      endDate.setMonth(endDate.getMonth() + parseInt(month));
      endDate.setDate(endDate.getDate() - 1);
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);

      // Insert subscription
      const apiKey = await generateApiKey();
      const subscription = new Subscription({
        userId: user._id,
        paketId,
        endDate,
        apiKey,
        resetAt: new Date(new Date().getTime() + 60 * 1000),
      });
      await subscription.save({ session });

      transactionDetails.push({
        transactionDetailType: TransactionDetailType.USER_SUBSCRIBE,
        paket_id: paketId,
        subscription_id: subscription._id,
        month: month,
        price: paket.Paket_price,
        subtotal: totalCost,
        message: `User: ${user.username} bought a subscription to ${paket.Paket_name} for ${month} month(s) at Rp${paket.Paket_price} per month.`,
      });
    }

    // Insert transaction log
    const transaction = new Transaction({
      header: {
        transactionHeaderType: TransactionHeaderType.SUBSCRIBE,
        date: new Date(),
        total: transactionDetails.reduce(
          (acc, detail) => acc + detail.subtotal,
          0
        ),
        userId: user._id,
      },
      details: transactionDetails,
    });
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(RESPONSE_STATUS.CREATED).json({
      message: "All subscriptions created successfully",
      transaction: transaction.header,
      subscriptions: transactionDetails,
      remainingBalance: `Rp${user.balance}`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    // Ensure the error has status and message properties
    const status =
      (error as any).status || RESPONSE_STATUS.INTERNAL_SERVER_ERROR;
    const errorMessage = (error as any).message || "Internal server error";

    return res.status(status).json({ message: errorMessage });
  }
};

export const renewSubscription = async (req: Request, res: Response) => {
  const { apiKey } = req.query;
  const { month } = req.body;
  const user = (req as any).user;

  if (month < 1) {
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ message: "Invalid number of months" });
  }

  if (typeof apiKey !== "string") {
    return res.status(400).json({ error: "Invalid API key format" });
  }

  // Check active subscription
  const activeSubscription = await Subscription.findOne({
    userId: user._id,
    apiKey: apiKey,
  });

  if (!activeSubscription) {
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ message: "No active subscription found" });
  }

  if (!activeSubscription.isActive || activeSubscription.endDate < new Date()) {
    await activeSubscription.updateOne({
      isActive: false,
    });
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ msg: "Your subscription has expired" });
  }

  if (activeSubscription.paketId == "PAK001") {
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ message: "This paket can't be renewed" });
  }

  const paket = await Paket.findOne({
    where: {
      Paket_id: activeSubscription.paketId,
    },
  });

  if (!paket) {
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ message: "Invalid paket" });
  }

  // Check balance
  const totalCost = paket.Paket_price * parseInt(month);
  if (user.balance < totalCost) {
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ message: "Not enough balance! Please top up first" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Update balance
    user.balance -= totalCost;
    await user.save({ session });

    // Update subscription endDate
    let endDate = new Date(activeSubscription.endDate);
    endDate.setMonth(endDate.getMonth() + parseInt(month));

    activeSubscription.endDate = endDate;
    await activeSubscription.save({ session });

    // Prepare transaction details
    const transactionDetails = {
      transactionDetailType: TransactionDetailType.USER_RENEW,
      paket_id: activeSubscription.paketId,
      subscription_id: activeSubscription._id,
      month: month,
      price: paket.Paket_price,
      subtotal: totalCost,
      message: `User: ${user.username} renewed subscription to ${paket.Paket_name} for ${month} month(s) at Rp${paket.Paket_price} per month.`,
    };

    // Insert transaction log
    const transaction = new Transaction({
      header: {
        transactionHeaderType: TransactionHeaderType.SUBSCRIBE,
        date: new Date(),
        total: totalCost,
        userId: user._id,
      },
      details: [transactionDetails],
    });
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(RESPONSE_STATUS.SUCCESS).json({
      message: "Subscription renewed successfully",
      transaction: transaction,
      subscription: activeSubscription,
      remainingBalance: `Rp${user.balance}`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

//admin
export const getAllUser = async (req: Request, res: Response) => {
  const { username, email, fullName, role } = req.query;

  // Construct the query object
  const query: any = {};

  if (typeof username === "string") {
    query.username = { $regex: new RegExp(username) }; // Case-sensitive
  }
  if (typeof email === "string") {
    query.email = { $regex: new RegExp(email) }; // Case-sensitive
  }
  if (typeof fullName === "string") {
    query.fullName = { $regex: new RegExp(fullName) }; // Case-sensitive
  }
  if (typeof role === "string") {
    query.role = role;
  }

  try {
    const users = await User.find(query);
    return res.status(RESPONSE_STATUS.SUCCESS).json({ users });
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to fetch users" });
  }
};

export const adminDashboard = async (req: Request, res: Response) => {
  // const { user } = req as any; // TODO : CHECK IF NECESSARY
  const users = await User.find({
    role: { $eq: ROLE.USER },
    isEmailVerified: true,
  }).exec();
  const transactions = await Transaction.find({ header: { adminId: null } });
  // transaction through top up
  const totalIncome = transactions.reduce(
    (acc, transaction) =>
      acc +
      transaction.details.reduce(
        (acc, detail) =>
          detail.transactionDetailType === TransactionDetailType.USER_TOPUP
            ? acc + detail.subtotal
            : acc,
        0
      ),
    0
  );
  //transaction through subscription
  const totalSpend = transactions.reduce(
    (acc, transaction) =>
      acc +
      transaction.details.reduce(
        (acc, detail) =>
          detail.transactionDetailType ===
            TransactionDetailType.USER_SUBSCRIBE ||
          detail.transactionDetailType === TransactionDetailType.USER_RENEW
            ? acc + detail.subtotal
            : acc,
        0
      ),
    0
  );
  const totalTransactionAmount =
    transactions == null
      ? 0
      : transactions.reduce(
          (acc, transaction) => acc + transaction.header.total,
          0
        );
  const subscription = await Subscription.find({ isActive: true }).exec();
  return res.status(RESPONSE_STATUS.SUCCESS).json({
    total_user: users.length,
    free_package_user: subscription.filter((item) => item.paketId == "PAK001")
      .length,
    non_free_package_user: subscription.filter(
      (item) => item.paketId != "PAK001"
    ).length,
    total_income: totalIncome,
    total_user_spend: totalSpend,
    total_transaction_amount: totalTransactionAmount,
  });
};

export const getUserProfile = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const user = await User.findOne({ _id: userID });
  if (!user)
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ msg: "User not found" });
  return res.status(RESPONSE_STATUS.SUCCESS).json({
    username: user.username,
    full_name: user.fullName,
    email: user.email,
    phone: user.phone,
    balance: user.balance,
  });
};

export const getUserProfilePicture = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const user = await User.findOne({ _id: userID });
  if (!user)
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ msg: "User not found" });
  return res.sendFile(user.profilePicture, { root: "." });
};

export const deleteUserProfile = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const user = await User.findOne({ _id: userID });
  if (!user)
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ msg: "User not found" });
  const subscription = await Subscription.findOne({
    userId: userID,
    isActive: true,
  });
  if (subscription) await subscription.updateOne({ isActive: false });
  await User.deleteOne({ _id: user._id });
  return res
    .status(RESPONSE_STATUS.SUCCESS)
    .json({ msg: `User "${user.username}" deleted successfully` });
};

export const getUserPacket = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const user = await User.findOne({ _id: userID });
  if (!user)
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ msg: "User not found" });
  const subscription = await Subscription.findOne({
    userId: userID,
    isActive: true,
  });
  if (!subscription)
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ msg: "User doesn't have any subscription" });
  const packet = await Paket.findOne({
    where: { Paket_id: subscription.paketId },
  });
  if (!packet)
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ msg: "Packet not found" });
  return res.status(RESPONSE_STATUS.SUCCESS).json({
    username: user.username,
    nama: user.fullName,
    subscription_start: subscription.startDate,
    subscription_end: subscription.endDate,
    packet: packet,
  });
};

export const addUserPacket = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const admin = (req as any).user;
  const subscriptions = req.body; // This should be an array of { paket_id, month }

  if (!Array.isArray(subscriptions)) {
    return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
      message: "Invalid request format. Expected an array of subscriptions.",
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const users =
      userID === "ALL"
        ? await User.find({ isEmailVerified: true, role: ROLE.USER })
        : [await User.findOne({ _id: userID })];

    if (users.length === 0 || users[0] === null) {
      return res
        .status(RESPONSE_STATUS.NOT_FOUND)
        .json({ msg: "User not found" });
    }

    const transactionDetails = [];

    for (const user of users) {
      for (const sub of subscriptions) {
        const { paket_id, month } = sub;

        if (!paket_id || month === undefined) {
          throw {
            status: RESPONSE_STATUS.BAD_REQUEST,
            message: `Request fields not valid`,
          };
        }

        if (month < 1) {
          throw {
            status: RESPONSE_STATUS.BAD_REQUEST,
            message: `Invalid number of months for paket: ${paket_id}`,
          };
        }

        const paket = await Paket.findOne({
          where: {
            Paket_id: paket_id,
          },
        });

        if (!paket) {
          throw {
            status: RESPONSE_STATUS.NOT_FOUND,
            message: `Paket not found: ${paket_id}`,
          };
        }

        // Deactivate current active subscription if it exists
        const activeSubscription = await Subscription.findOne({
          userId: userID,
          isActive: true,
        });
        if (activeSubscription) {
          await activeSubscription.updateOne({ isActive: false });
        }

        let endDate = new Date();
        endDate.setMonth(endDate.getMonth() + month);
        endDate.setDate(endDate.getDate() - 1);
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);

        const apiKey = await generateApiKey();

        // Create new subscription
        const subs = new Subscription({
          userId: user?._id,
          paketId: paket_id,
          endDate,
          apiKey,
          resetAt: new Date(new Date().getTime() + 60 * 1000),
        });
        const newSubscription = await subs.save({ session });

        transactionDetails.push({
          transactionDetailType: TransactionDetailType.ADMIN_SUBSCRIBE,
          paket_id: paket.Paket_id,
          subscription_id: newSubscription._id,
          month: month,
          price: paket.Paket_price,
          subtotal: paket.Paket_price * month,
          message: `Admin: ${admin.username}, gave ${user?.username} a subscription to ${paket.Paket_name} for ${month} month(s) at Rp${paket.Paket_price} per month.`,
        });
      }

      // Insert transaction log
      const transaction = new Transaction({
        header: {
          transactionHeaderType: TransactionHeaderType.SUBSCRIBE,
          date: new Date(),
          total: transactionDetails.reduce(
            (acc, detail) => acc + detail.subtotal,
            0
          ),
          userId: user?._id,
          adminId: admin._id,
        },
        details: transactionDetails,
      });
      await transaction.save({ session });

      await session.commitTransaction();
      session.endSession();

      return res.status(RESPONSE_STATUS.CREATED).json({
        message: "All subscriptions created successfully",
        transaction: transaction.header,
        subscriptions: transactionDetails,
      });
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    // Ensure the error has status and message properties
    const status =
      (error as any).status || RESPONSE_STATUS.INTERNAL_SERVER_ERROR;
    const errorMessage = (error as any).message || "Internal server error";

    return res.status(status).json({ message: errorMessage });
  }
};

export const deleteUserPacket = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const user = await User.findOne({ _id: userID });
  if (!user)
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ msg: "User not found" });
  const subscription = await Subscription.findOne({
    userId: userID,
    isActive: true,
  });
  if (!subscription)
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ msg: "User doesn't have any subscription" });
  await subscription.updateOne({ isActive: false });
  return res
    .status(RESPONSE_STATUS.SUCCESS)
    .json({ msg: "Subscription deleted successfully" });
};

export const addExercise = async (req: Request, res: Response) => {
  try {
    // Fetch data from external API
    // const exercises: any[] = await Apis.API_NINJA_ApiService.get<any[]>("");
    const { offset, limit_per_ten } = req.query;

    // Make API call
    const parsedOffset = Math.floor(Number(offset));
    const parsedLimit = Math.floor(Number(limit_per_ten));

    if (
      isNaN(parsedOffset) ||
      isNaN(parsedLimit) ||
      parsedLimit < 0 ||
      parsedOffset < 0
    ) {
      return res
        .status(RESPONSE_STATUS.BAD_REQUEST)
        .json({ msg: "Offset and limit must be non-negative integers." });
    }

    const queryParams: any = {};
    for (let i = parsedOffset; i < parsedOffset + parsedLimit; i++) {
      queryParams.offset = i * 10;
      let exercises: any[] = await Apis.API_NINJA_ApiService.get("", {
        params: queryParams,
      });
      for (const exercise of exercises) {
        // Check if the exercise already exists in the database
        const existingExercise = await Exercise.findOne({
          name: exercise.name,
        });

        // If the exercise does not exist, insert it into the database
        if (!existingExercise) {
          const newExercise = new Exercise({
            name: exercise.name,
            type: exercise.type,
            targeted_muscle: exercise.muscle,
            equipmentRequired: exercise.equipment ? exercise.equipment : "-",
            description: exercise.instructions,
          });
          await newExercise.save();
        }
      }
    }

    return res
      .status(RESPONSE_STATUS.SUCCESS)
      .json({ msg: "Exercises have been added/updated successfully." });
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ msg: "Exercises added/updated failed." });
  }
};

export const topupFromAdmin = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const { saldo } = req.body;
  const admin = (req as any).user;

  if (!saldo) {
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ msg: "Saldo is required" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const schema = topupSchema;
    await schema.validateAsync({ saldo });
    if (userID && mongoose.Types.ObjectId.isValid(userID)) {
      const user = await User.findById(userID).session(session);
      if (!user) {
        throw new Error("User not found");
      }
      if (user.role === ROLE.ADMIN) {
        throw new Error("User is admin");
      }

      user.balance += saldo;
      await user.save({ session });

      const transactionHeader: ITransationHeaderAdmin = {
        transactionHeaderType: TransactionHeaderType.TOPUP,
        date: new Date(),
        total: saldo,
        userId: user._id,
        adminId: admin._id,
      };

      const transactionDetails: ITransactionTopUpDetail[] = [
        {
          transactionDetailType: TransactionDetailType.ADMIN_TOPUP,
          subtotal: saldo,
          message: `Admin ${admin.fullName} topped up user ${user.fullName} with saldo ${saldo}`,
        },
      ];

      const transaction: ITransaction = {
        header: transactionHeader,
        details: transactionDetails,
      };

      await Transaction.create([transaction], { session });

      await session.commitTransaction();
      session.endSession();

      return res.status(RESPONSE_STATUS.SUCCESS).json({
        msg: "Balance updated successfully",
        username: user.username,
        full_name: user.fullName,
        newBalance: user.balance,
      });
    } else if (userID === "ALL") {
      const users = await User.find({
        role: ROLE.USER,
        isEmailVerified: true,
      }).session(session);

      const bulkOps = users.map((user) => ({
        updateOne: {
          filter: { _id: user._id },
          update: { $inc: { balance: saldo } },
        },
      }));

      await User.bulkWrite(bulkOps, { session });
      const transactionHeader: ITransationHeaderAdmin = {
        transactionHeaderType: TransactionHeaderType.TOPUP,
        date: new Date(),
        total: saldo,
        adminId: admin._id,
      };
      const transactionDetails: ITransactionTopUpDetail[] = users.map(
        (user) => ({
          transactionDetailType: TransactionDetailType.ADMIN_TOPUP,
          subtotal: saldo,
          userId: user._id,
          message: `Admin ${admin.fullName} topped up user ${user.fullName} with saldo ${saldo}`,
        })
      );

      const transaction: ITransaction = {
        header: transactionHeader,
        details: transactionDetails,
      };

      await Transaction.create([transaction], { session });

      await session.commitTransaction();
      session.endSession();

      return res.status(RESPONSE_STATUS.SUCCESS).json({
        msg: "Balance updated for all users successfully",
      });
    } else {
      throw new Error("Invalid userID");
    }
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    const errorMsg =
      error instanceof Error ? error.message : "Internal Server Error";
    const status =
      error.message === "User not found"
        ? RESPONSE_STATUS.NOT_FOUND
        : RESPONSE_STATUS.BAD_REQUEST;

    return res.status(status).json({ msg: errorMsg });
  }
};


export const promoteToAdmin = async (req: Request, res: Response) => {
  const { userID } = req.params;

  try {
    if (userID && !mongoose.Types.ObjectId.isValid(userID)) { 
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Invalid user ID" });
    }

    const user = await User.findOne({ _id: userID, isEmailVerified: true });

    if (!user) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "User not found" });
    }

    if (user.role !== ROLE.USER) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "User role is not customer" });
    }

    user.role = ROLE.ADMIN;
    await user.save();

    return res.status(RESPONSE_STATUS.SUCCESS).json({ message: `User ${user.username} promoted to admin successfully` });
  } catch (error) {
    console.error(error);
    return res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};
