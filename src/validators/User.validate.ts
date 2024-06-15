import { Schema } from "joi";
import { JoiExtended } from ".";
import { FITNESS_GOALS } from "../contracts/enum/FitnessRelated.enum";

export const registerSchemaJoi: Schema = JoiExtended.object({
  username: JoiExtended.string().required().messages({
    "any.required": "Username is required",
  }),
  email: JoiExtended.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  password: JoiExtended.string().required().messages({
    "any.required": "Password is required",
  }),
  fullName: JoiExtended.string().required().messages({
    "any.required": "Full name is required",
  }),
  phone: JoiExtended.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "any.required": "Phone number is required",
      "string.pattern.base": "Phone number must be between 10 and 15 digits",
    }),
});

export const editProfileSchemaJoi = JoiExtended.object({
  old_password: JoiExtended.string().optional().allow(""),
  new_password: JoiExtended.string().optional().allow(""),
  confirm_password: JoiExtended.string().optional().allow(""),
  fullName: JoiExtended.string().optional().allow(""),
  phone: JoiExtended.string()
    .optional()
    .allow("")
    .pattern(/^[0-9]{10,15}$/)
    .messages({
      "string.pattern.base": "Phone number must be between 10 and 15 digits",
    }),
  age: JoiExtended.number().integer().positive().optional().allow("").messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.positive": "Age must be a positive number",
  }),
  gender: JoiExtended.string().optional().allow(""),
  height: JoiExtended.number().positive().optional().allow("").messages({
    "number.base": "Height must be a number",
    "number.positive": "Height must be a positive number",
  }),
  weight: JoiExtended.number().positive().optional().allow("").messages({
    "number.base": "Weight must be a number",
    "number.positive": "Weight must be a positive number",
  }),
  fitnessGoals: JoiExtended.string()
    .valid(...Object.values(FITNESS_GOALS))
    .optional()
    .allow("")
    .messages({
      "any.only": `Fitness goals must be one of ${Object.values(
        FITNESS_GOALS
      )}`,
    }),
  healthInformation: JoiExtended.string().optional().allow(""),
}).unknown();

export const loginSchemaJoi = JoiExtended.object({
  username: JoiExtended.string().empty("").messages({
    "string.empty": "Username must not be empty",
  }),
  email: JoiExtended.string().email().empty("").messages({
    "string.email": "Please enter a valid email address",
  }),
  password: JoiExtended.string().required().messages({
    "any.required": "Password is a required field",
  }),
  rememberMe: JoiExtended.boolean().optional(),
})
  .xor("username", "email")
  .messages({
    "object.missing": "Username or email is required for login",
  });

export const validationTokenSchemaJoi = JoiExtended.object({
  refreshToken: JoiExtended.string().required().messages({
    "string.base": "**refreshToken** must be a string",
    "string.empty": "**refreshToken** cannot be empty",
    "any.required": "**refreshToken** is a required field",
  }),
});
