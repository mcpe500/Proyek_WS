import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../config/environment";

import nodemailer, { SendMailOptions } from 'nodemailer';
import ejs from "ejs";
import path from "path";

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

export const generateEmailVerificationToken = (email: string) => {
  return jwt.sign({ email }, ENV.EMAIL_VERIFICATION_TOKEN_SECRET, {
    expiresIn: ENV.EMAIL_VERIFICATION_AGE,
  });
};

export const verifyEmailVerificationToken = (token: string) => {
  try {
    return jwt.verify(token, ENV.EMAIL_VERIFICATION_TOKEN_SECRET);
  } catch (e) {
    return null;
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-password",
    },
  });

  let mailOptions: SendMailOptions = {
    from: "your-email@gmail.com",
    to: email, // Use the email parameter
    subject: "Test Mail",
  };

  ejs.renderFile(
    path.join(__dirname, "/templates", "email-template.ejs"),
    { name: "Recipient", token: token }, // Pass the token to your template
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        mailOptions.html = data;
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Message sent: " + info.response);
          }
        });
      }
    }
  );
};
