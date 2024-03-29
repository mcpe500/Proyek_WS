// import { bcrypt } from 'bcrypt';
import { Request, Response } from "express";
import {
  createAccessToken,
  createRefreshToken,
  hashPassword,
  verifyPassword,
  verifyRefreshToken,
} from "../utils/AuthUtils";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";
import { User } from "../models/User.model";

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
    });
    const savedUser = await newUser.save();
    return res
      .status(RESPONSE_STATUS.CREATED)
      .json({ msg: "User created successfully", user: savedUser });
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
