import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../config/environment";

// Use a secret key from environment variables
// const SECRET_KEY = process.env.SECRET_KEY || 'your-default-secret-key';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password + ENV.SECRET_KEY, salt);
  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const match = await bcrypt.compare(password + ENV.SECRET_KEY, hashedPassword);
  return match;
};

export const createAccessToken = (
  payload: any,
  rememberMe: boolean
): string => {
  return jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET, {
    expiresIn: rememberMe
      ? ENV.REMEMBER_ME_ACCESS_TOKEN_AGE
      : ENV.ACCESS_TOKEN_AGE,
  });
};

export const createRefreshToken = (
  payload: any,
  rememberMe: boolean
): string => {
  return jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, {
    expiresIn: rememberMe
      ? ENV.REMEMBER_ME_REFRESH_TOKEN_AGE
      : ENV.REFRESH_TOKEN_AGE,
  });
};

export const verifyAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, ENV.ACCESS_TOKEN_SECRET);
  } catch (e) {
    return null;
  }
};

export const verifyRefreshToken = (token: string): any => {
  try {
    return jwt.verify(token, ENV.REFRESH_TOKEN_SECRET);
  } catch (e) {
    return null;
  }
};
