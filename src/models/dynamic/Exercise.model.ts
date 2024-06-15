import mongoose, { Model, Schema } from "mongoose";
import { IExercise } from "../../contracts/dto/PlansRelated.dto";

const ExerciseSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  targeted_muscle: { type: String, required: true },
  equipmentRequired: [{ type: String, required: false }],
  description: { type: String, required: true },
});

export const Exercise: Model<IExercise> = mongoose.model<IExercise>(
  "Exercise",
  ExerciseSchema
);
