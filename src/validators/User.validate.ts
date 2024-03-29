import { Schema } from "joi";
import { JoiExtended } from ".";
import { FITNESS_GOALS } from "../contracts/enum/FitnessRelated.enum";

export const userSchemaJoi: Schema = JoiExtended.object({
  full_name: JoiExtended.string().required(),
  username: JoiExtended.string().required(),
  email: JoiExtended.string().email().required(),
  phone: JoiExtended.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  password: JoiExtended.string().required(),
  age: JoiExtended.number().integer().required(),
  gender: JoiExtended.string().required(),
  height: JoiExtended.number().required(),
  weight: JoiExtended.number().required(),
  fitnessGoals: JoiExtended.string()
    .valid(...Object.values(FITNESS_GOALS))
    .required(),
  healthInformation: JoiExtended.string().required(),
});

export const loginSchemaJoi = JoiExtended.object({
  username: JoiExtended.string().required(),
  email: JoiExtended.string().email().required(),
  password: JoiExtended.string().required(),
});
