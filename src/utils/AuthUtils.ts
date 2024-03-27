import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../config/environment";

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export const verifyPassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
};

export const createAccessToken = (userId: string): string => {
    return jwt.sign({ userId }, ENV.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};

export const createRefreshToken = (userId: string): string => {
    return jwt.sign({ userId }, ENV.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
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
