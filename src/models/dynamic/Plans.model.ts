import mongoose, { Schema, Model } from "mongoose";
import { IPlans } from "../../contracts/dto/PlansRelated.dto";
import { PlansStatus } from "../../contracts/enum/PlansRelated.enum";
import { FITNESS_GOALS } from "../../contracts/enum/FitnessRelated.enum";

const FITNESS_GOAL_CODES = Object.values(FITNESS_GOALS).map(goal => goal.code);

const PlansSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  goals: [
    {
      type: String,
      required: false,
      enum: FITNESS_GOAL_CODES,
    },
  ],
  durationInWeeks: { type: Number, required: true },
  frequencyPerWeek: { type: Number, required: true },
  restDaysPerWeek: { type: Number, required: true },
  intensity: { type: Number, required: true },
  exercises: [{ type: Schema.Types.ObjectId, ref: "ExercisePlan" }],
  nutritionPlan: { type: Schema.Types.ObjectId, ref: "NutritionPlan" },
  createdBy: { type: String, required: true },
  createdDate: { type: Date, required: true, default: Date.now },
  status: {
    type: String,
    enum: Object.values(PlansStatus),
    default: PlansStatus.PENDING,
  },
});

export const Plans: Model<IPlans> = mongoose.model<IPlans>(
  "Plans",
  PlansSchema
);
