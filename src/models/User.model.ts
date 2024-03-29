import mongoose, { Schema } from "mongoose";
import { IUser } from "../contracts/dto/UserRelated.dto";
import { FITNESS_GOALS } from "../contracts/enum/FitnessRelated.enum";

const UserSchema: Schema = new Schema({
  full_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  fitnessGoals: {
    type: String,
    required: true,
    enum: Object.values(FITNESS_GOALS),
  },
  healthInformation: { type: String, required: true },
  refreshToken: { type: String },
});

export const User = mongoose.model<IUser>("User", UserSchema);
