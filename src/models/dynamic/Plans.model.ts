import mongoose, { Schema } from "mongoose";
import { IWorkoutPlans } from "../../contracts/dto/PlansRelated.dto";

const WorkoutPlansSchema: Schema = new Schema({
  userId: { type: String, ref: "User", required: true },
});

export const WorkoutPlans = mongoose.model<IWorkoutPlans>(
  "WorkoutPlans",
  WorkoutPlansSchema
);
