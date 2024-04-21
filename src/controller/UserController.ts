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
import { User } from "../models/User.model";
import { JwtPayload } from "jsonwebtoken";

// const UserSchema: Schema = new Schema({
//   full_name: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   password: { type: String, required: true },
//   age: { type: Number, required: true },
//   gender: { type: String, required: true },
//   height: { type: Number, required: true },
//   weight: { type: Number, required: true },
//   fitnessGoals: {
//     type: String,
//     required: true,
//     enum: Object.values(FITNESS_GOALS),
//   },
//   healthInformation: { type: String, required: true },
//   refreshToken: { type: String },
//   isEmailVerified: { type: Boolean, default: false },
//   emailVerificationToken: { type: String },
// });

export const registerUser = async (req: Request, res: Response) => {
  const {
    full_name,
    username,
    email,
    password,
    phone,
    age,
    gender,
    height,
    weight,
    fitnessGoals,
    healthInformation,
  } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] }); //
    if (existingUser) {
      return res
        .status(RESPONSE_STATUS.BAD_REQUEST)
        .json({ msg: "Username already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const emailToken = generateEmailVerificationToken(email);

    const newUser = new User({
      full_name,
      username,
      email,
      phone,
      password: hashedPassword,
      age,
      gender,
      height,
      weight,
      fitnessGoals,
      healthInformation,
      isEmailVerified: false,
      emailVerificationToken: emailToken,
    });
    const savedUser = await newUser.save();
    await sendVerificationEmail(email, emailToken, username);
    return res.status(RESPONSE_STATUS.CREATED).json({
      msg: "Register Successful, please verify your email!",
      user: savedUser,
    });
  } catch (error) {
    return res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, email, password, rememberMe } = req.body;
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ msg: "Invalid credentials" });
  }
  if (!user.isEmailVerified) {
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

  await user.updateOne({ refreshToken });

  res.cookie("refresh_token", refreshToken, { httpOnly: true });

  return res.status(RESPONSE_STATUS.SUCCESS).json({
    msg: "Logged in successfully",
    token: accessToken,
  });
};

export const getUser = async (req: Request, res: Response) => {};

export const newRefreshToken = async (req: Request, res: Response) => {};

export const generateNewAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res
      .status(RESPONSE_STATUS.FORBIDDEN)
      .json({ message: "Refresh token is required" });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.userId);
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

    await user.updateOne({
      isEmailVerified: true,
      emailVerificationToken: null,
    });

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
