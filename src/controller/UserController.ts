// import { bcrypt } from 'bcrypt';
import { Request, Response } from "express";
import {
  createAccessToken,
  createRefreshToken,
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
import mongoose from "mongoose";
import crypto from "crypto";
import { Subscription } from "../models/dynamic/Subscription.model";
import { Exercise } from "../models/dynamic/Exercise.model";
import { Apis } from "../services/ApiService";
import { IExercise } from "../contracts/dto/PlansRelated.dto";

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
      fullName: savedUser.email,
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

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ message: "Invalid user ID" });
  }

  const user = await User.findById(id).select("-password");
  if (!user) {
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ message: "User not found" });
  }

  return res.status(RESPONSE_STATUS.SUCCESS).json({ user: user });
};

export const getAllUser = async (req: Request, res: Response) => {
  console.log("getAllUser");

  const user = await User.find();

  return res.status(RESPONSE_STATUS.SUCCESS).json({ user: user });
};

export const getDashboard = async (req: Request, res: Response) => {
  //   const { username, email } = req.body;
  //   const user = await User.findOne({ $or: [{ username }, { email }] });
  const { user } = req.body;
  return res.status(RESPONSE_STATUS.SUCCESS).json({ user: user });
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
  let { user } = req.body;

  if (!user) {
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ message: "User not found" });
  }

  if (old_password != "") {
    const isPasswordValid = await verifyPassword(old_password, user.password);
    if (!isPasswordValid) {
      return res
        .status(RESPONSE_STATUS.BAD_REQUEST)
        .json({ msg: "old_password is incorrect" });
    }

    if (new_password == "") {
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
  if (fullName != "") user.fullName = fullName;
  if (phone != "") user.phone = phone;
  if (age != "") user.age = age;
  if (gender != "") user.gender = gender;
  if (height != "") user.height = height;
  if (weight != "") user.weight = weight;
  if (healthInformation != "") user.healthInformation = healthInformation;

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
    console.log("decoded : ", decoded);
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
    let apiKey = "";
    while (true) {
      apiKey = crypto.randomBytes(32).toString("hex");
      const temp = await User.findOne({
        apiKey: apiKey,
      });
      if (!temp) break;
    }
    await user.updateOne({
      isEmailVerified: true,
      emailVerificationToken: null,
      apiKey,
    });

    const subscription = new Subscription({
      userId: user._id,
      paketId: "PAK001",
      endDate: new Date("9999-12-31T23:59:59.999Z"),
      resetAt: new Date(new Date().getTime() + 60 * 1000),
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

export const getApiKey = async (req: Request, res: Response) => {
  const { user } = req.body;
  try {
    // Jika pengguna ditemukan, kirimkan API key
    if (user.apiKey) {
      return res.status(RESPONSE_STATUS.SUCCESS).json({ apiKey: user.apiKey });
    } else {
      return res
        .status(RESPONSE_STATUS.NOT_FOUND)
        .json({ msg: "API key not found for this user" });
    }
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const resetApiKey = async (req: Request, res: Response) => {
  const { user } = req.body;
  try {
    let apiKey = "";
    while (true) {
      apiKey = crypto.randomBytes(32).toString("hex");
      const temp = await User.findOne({
        apiKey: apiKey,
      });
      if (!temp) break;
    }
    await user.updateOne({ apiKey });
    return res.status(RESPONSE_STATUS.SUCCESS).json({ apiKey: user.apiKey });
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

export const topup = async (req: Request, res: Response) => {
  const { amount, user } = req.body;

  if (amount <= 0) {
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ message: "Invalid amount" });
  }

  try {
    user.balance += amount;
    const updatedUser = await user.save();

    return res
      .status(RESPONSE_STATUS.SUCCESS)
      .json({ message: "Balance updated. Current balance: Rp" + user.balance });
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const subscribePacket = async (req: Request, res: Response) => {
  const { paketId, user } = req.body;

  const paket = await Paket.findOne({
    where: {
      Paket_id: paketId,
    },
  });

  if (!paket) {
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ message: "Paket not found" });
  }

  // check active subscription
  const activeSubscription = await Subscription.findOne({
    userId: user._id,
    isActive: true,
    endDate: { $gt: new Date() }, // Check if endDate is in the future
  });

  if (activeSubscription) {
    await activeSubscription.updateOne({
      isActive: false,
    });
  }

  // check balance
  if (user.balance < paket.Paket_price) {
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ message: "Not enough balance! Please topup first" });
  }

  // update balance
  try {
    user.balance -= paket.Paket_price;
    await user.save();
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }

  let endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1);
  endDate.setHours(23);
  endDate.setMinutes(59);
  endDate.setSeconds(59);

  //insert subscription
  const subscription = new Subscription({
    userId: user._id,
    paketId,
    endDate,
  });
  const newSubscription = await subscription.save();

  return res
    .status(RESPONSE_STATUS.CREATED)
    .json({ subscription: newSubscription });
};

// Mau 1. paket jadi …k per bulan unlimited tembak,
// [Free] rate limit 2 per 5 menit?
// [Paket 1] rate limit 20 per 10 detik 50k?
// [Paket 2] rate limit 50 per 10 detik 100k?
// [Paket 3] rate limit 150 per 10 detik 250k?
// [Enterprise] rate limit 1000 per detik 2000k?

//admin
export const adminDashboard = async (req: Request, res: Response) => {
  const { user } = req.body;
  return res.status(RESPONSE_STATUS.SUCCESS).json({ data: user });
};

export const getUserProfile = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const user = await User.findOne({ _id: userID });
  if (!user)
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ msg: "User not found" });
  return res.status(RESPONSE_STATUS.SUCCESS).json({ data: user });
};

export const deleteUserProfile = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const user = await User.findOne({ _id: userID });
  if (!user)
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ msg: "User not found" });
  const subscription = await Subscription.findOne({
    _id: userID,
    isActive: true,
  });
  if (subscription) await subscription.updateOne({ isActive: false });
  await User.deleteOne({ _id: user._id });
  return res
    .status(RESPONSE_STATUS.SUCCESS)
    .json({ msg: "User deleted successfully" });
};

export const getUserPacket = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const user = await User.findOne({ _id: userID });
  if (!user)
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ msg: "User not found" });
  const subscription = await Subscription.findOne({
    _id: userID,
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
  const { paket_id } = req.body;
  const user = await User.findOne({ _id: userID });
  if (!user)
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ msg: "User not found" });
  const subscription = await Subscription.findOne({
    _id: userID,
    isActive: true,
  });
  if (subscription) await subscription.updateOne({ isActive: false });
  let endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1);
  endDate.setHours(23);
  endDate.setMinutes(59);
  endDate.setSeconds(59);
  const packet = await Paket.findOne({ where: { Paket_id: paket_id } });
  if (!packet)
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ msg: "Packet not found" });
  const subs = new Subscription({
    userId: user._id,
    paketId: packet.Paket_id,
    endDate,
  });
  const newSubscription = await subs.save();

  return res
    .status(RESPONSE_STATUS.CREATED)
    .json({ subscription: newSubscription });
};

export const deleteUserPacket = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const user = await User.findOne({ _id: userID });
  if (!user)
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ msg: "User not found" });
  const subscription = await Subscription.findOne({
    _id: userID,
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
    const exercises: any[] = await Apis.API_NINJA_ApiService.get<any[]>("");

    for (const exercise of exercises) {
      // Check if the exercise already exists in the database
      const existingExercise = await Exercise.findOne({ name: exercise.name });

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

    res
      .status(RESPONSE_STATUS.SUCCESS)
      .json({ msg: "Exercises have been added/updated successfully." });
  } catch (error) {
    res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ msg: "Exercises added/updated failed." });
  }
};

export const topupFromAdmin = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const { saldo } = req.body;

  if (userID) {
    const user = await User.findOne({ _id: userID });
    if (!user)
      return res
        .status(RESPONSE_STATUS.NOT_FOUND)
        .json({ msg: "User not found" });
    user.balance += saldo;
    await user.save();

    return res.status(RESPONSE_STATUS.SUCCESS).json({
      msg: "Balance updated successfully",
      username: user.username,
      full_name: user.fullName,
      newBalance: user.balance,
    });
  } else {
    const users = await User.updateMany({}, { $inc: { balance: saldo } });
    return res
      .status(RESPONSE_STATUS.SUCCESS)
      .json({ msg: "Balance updated for all users successfully" });
  }
};
