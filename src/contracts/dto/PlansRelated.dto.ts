import { Document } from "mongoose";
import { PlansStatus } from "../enum/PlansRelated.enum";

export interface IExercise extends Document {
  name: String,
    type: String,
    targeted_muscle: String,
    equipmentRequired: String,
    description: String
}

export interface IEquipment extends Document {
  name: string;
  description: string;
}

export interface INutritionPlan extends Document {
  id: string;
  name: string;
  description: string;
  meals: IMeal[];
  createdBy: string;
  createdDate: Date;
}

export interface IMeal extends Document {
  name: string;
  description: string;
  ingredients: IIngredient[];
}

export interface IIngredient extends Document {
  name: string;
  quantity: string;
}

export interface IPlans extends Document {
  name: string;
  description: string;
  goals: string[];
  durationInWeeks: number;
  frequencyPerWeek: number;
  restDaysPerWeek: number;
  intensity: number;
  exercises: IExercise[];
  nutritionPlan?: INutritionPlan;
  createdBy: string;
  createdDate: Date;
  status: PlansStatus;
}
