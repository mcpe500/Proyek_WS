import mongoose, { Schema } from "mongoose";
import { IUser } from "../../contracts/dto/UserRelated.dto";
import { FITNESS_GOALS } from "../../contracts/enum/FitnessRelated.enum";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: false },
  gender: { type: String, required: false },
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
  fitnessGoals: {
    type: String,
    required: false,
    enum: Object.values(FITNESS_GOALS),
  },
  healthInformation: { type: String, required: false },
  refreshToken: { type: String, required: false },
  accessToken: { type: String, required: false },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String },
});

export const User = mongoose.model<IUser>("User", UserSchema);
