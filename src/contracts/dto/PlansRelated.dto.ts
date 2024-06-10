import { Document } from "mongoose";
import { PlansStatus } from "../enum/PlansRelated.enum";

export interface IExercise extends Document {
  name: string;
  description: string;
  sets: number;
  repetitions: number;
  restBetweenSetsInSeconds: number;
  equipmentRequired?: IEquipment[];
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
  id: string;
  name: string;
  description: string;
  goals: string[];
  durationInWeeks: number;
  frequencyPerWeek: number;
  restDaysPerWeek: number;
  intensity: string;
  exercises: IExercise[];
  nutritionPlan?: INutritionPlan;
  createdBy: string;
  createdDate: Date;
  status: PlansStatus;
}
