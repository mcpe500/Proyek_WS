import { FITNESS_GOALS } from "../enum/FitnessRelated.enum";

export interface IUser extends Document {
  full_name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  fitnessGoals: typeof FITNESS_GOALS;
  healthInformation: string;
  refreshToken: string;
}
