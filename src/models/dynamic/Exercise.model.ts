import mongoose, { Model, Schema } from "mongoose";
import { IExercise } from "../../contracts/dto/PlansRelated.dto";

const ExerciseSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  sets: { type: Number, required: true },
  repetitions: { type: Number, required: true },
  restBetweenSetsInSeconds: { type: Number, required: true },
  equipmentRequired: [{ type: Schema.Types.ObjectId, ref: "Equipment" }],
});

export const Exercise: Model<IExercise> = mongoose.model<IExercise>(
  "Exercise",
  ExerciseSchema
);
