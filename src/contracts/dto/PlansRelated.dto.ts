import { Document } from "mongoose";

export interface IWorkoutPlans extends Document {
  userId: String;
}
