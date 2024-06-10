import mongoose, { Model, Schema } from "mongoose";
import { IMeal } from "../../contracts/dto/PlansRelated.dto";

const MealSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
});

export const Meal: Model<IMeal> = mongoose.model<IMeal>("Meal", MealSchema);
