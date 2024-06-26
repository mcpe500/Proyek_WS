import mongoose, { Schema } from "mongoose";
import { IUser } from "../../contracts/dto/UserRelated.dto";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  profilePicture: {
    type: String,
    default: "src\\storage\\images\\profilePictures\\default_profile.png",
  },
  age: { type: Number, required: false },
  gender: { type: String, required: false },
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
  healthInformation: { type: String, required: false },
  balance: { type: Number, default: 0 },
  refreshToken: { type: String, required: false },
  accessToken: { type: String, required: false },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String },
  role: { type: String, default: "USER" },
  deletedAt: { type: Date, default: null }
});

export const User = mongoose.model<IUser>("User", UserSchema);
