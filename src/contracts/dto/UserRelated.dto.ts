import { Document } from "mongoose";
import { FITNESS_GOALS } from "../enum/FitnessRelated.enum";

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  profilePictrait: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  fitnessGoals: typeof FITNESS_GOALS;
  healthInformation: string;
  balance: number;
  refreshToken: string;
  accessToken: string;
  isEmailVerified: boolean;
  emailVerificationToken: string;
  role: string;
}
