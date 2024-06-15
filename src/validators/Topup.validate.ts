import { Schema } from "joi";
import { JoiExtended } from ".";

export const topupSchema : Schema = JoiExtended.object({
    saldo: JoiExtended.number().positive().required().messages({
      'number.base': `"saldo" should be a type of number`,
      'number.positive': `"saldo" must be a positive number`,
      'any.required': `"saldo" is a required field`
    })
  });