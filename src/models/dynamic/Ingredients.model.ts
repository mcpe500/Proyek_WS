import mongoose, { Model, Schema } from "mongoose";
import { IIngredient } from "../../contracts/dto/PlansRelated.dto";

const IngredientSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
});

export const Ingredient: Model<IIngredient> = mongoose.model<IIngredient>(
  "Ingredient",
  IngredientSchema
);
