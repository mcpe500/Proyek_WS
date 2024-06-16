import mongoose, { Model, Schema } from "mongoose";
import { IExercise, IExercisePlan } from "../../contracts/dto/PlansRelated.dto";

const ExerciseSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  targeted_muscle: { type: String, required: true },
  equipmentRequired: [{ type: String, required: false }],
  description: { type: String, required: true },
});

const ExercisePlanSchema: Schema = new Schema({
  exercises: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      sets: { type: Number, required: true },
      repetitions: { type: Number, required: true },
      restBetweenSetsInSeconds: { type: Number, required: true },
      equipmentRequired: [
        {
          name: { type: String, required: true },
          description: { type: String, required: true }
        }
      ]
    }
  ]
});

export const Exercise: Model<IExercise> = mongoose.model<IExercise>(
  "Exercise",
  ExerciseSchema
);

export const ExercisePlan: Model<IExercisePlan> = mongoose.model<IExercisePlan>(
  "ExercisePlan",
  ExercisePlanSchema
);