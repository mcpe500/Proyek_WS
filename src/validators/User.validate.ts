import { Schema } from "joi";
import { JoiExtended } from ".";
import { FITNESS_GOALS } from "../contracts/enum/FitnessRelated.enum";

export const userSchemaJoi: Schema = JoiExtended.object({
  full_name: JoiExtended.string().required().messages({
    "any.required": "Full name is required",
  }),
  username: JoiExtended.string().required().messages({
    "any.required": "Username is required",
  }),
  email: JoiExtended.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  phone: JoiExtended.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "any.required": "Phone number is required",
      "string.pattern.base": "Phone number must be between 10 and 15 digits",
    }),
  password: JoiExtended.string().required().messages({
    "any.required": "Password is required",
  }),
  age: JoiExtended.number().integer().required().messages({
    "any.required": "Age is required",
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
  }),
  gender: JoiExtended.string().required().messages({
    "any.required": "Gender is required",
  }),
  height: JoiExtended.number().required().messages({
    "any.required": "Height is required",
    "number.base": "Height must be a number",
  }),
  weight: JoiExtended.number().required().messages({
    "any.required": "Weight is required",
    "number.base": "Weight must be a number",
  }),
  fitnessGoals: JoiExtended.string()
    .valid(...Object.values(FITNESS_GOALS))
    .required()
    .messages({
      "any.required": "Fitness goals are required",
      "any.only": `Fitness goals must be one of ${Object.values(
        FITNESS_GOALS
      )}`,
    }),
  healthInformation: JoiExtended.string().required().messages({
    "any.required": "Health information is required",
  }),
});

export const loginSchemaJoi = JoiExtended.object({
  username: JoiExtended.string().required().messages({
    "any.required": "Username is a required field",
  }),
  email: JoiExtended.string().email().required().messages({
    "any.required": "Email is a required field",
    "string.email": "Please enter a valid email address",
  }),
  password: JoiExtended.string().required().messages({
    "any.required": "Password is a required field",
  }),
});
