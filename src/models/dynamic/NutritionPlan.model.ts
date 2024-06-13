import mongoose, { Model, Schema } from "mongoose";
import { INutritionPlan } from "../../contracts/dto/PlansRelated.dto";

const NutritionPlanSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  meals: [{ type: Schema.Types.ObjectId, ref: "Meal" }],
  createdBy: { type: String, required: true },
  createdDate: { type: Date, required: true, default: Date.now },
});

export const NutritionPlan: Model<INutritionPlan> =
  mongoose.model<INutritionPlan>("NutritionPlan", NutritionPlanSchema);
