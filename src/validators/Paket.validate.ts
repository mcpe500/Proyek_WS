import { JoiExtended } from ".";

export const paketCreateSchemaJoi = JoiExtended.object({
  idNumber: JoiExtended.number()
    .integer()
    .min(0)
    .max(999)
    .optional()
    .allow('')
    .messages({
        "number.base": `Id number should be a type of number`,
        "number.integer": `Id number should be an integer`,
        "number.min": `Id number should be greater than or equal to {#limit}`,
        "number.max": `Id number should be less than or equal to {#limit}`,
    }),
  name: JoiExtended.string()
    .required()
    .messages({
      "string.base": `Name should be a type of text`,
      "string.empty": `Name should not be empty`,
      "any.required": `Name is a required field`
    }),
  description: JoiExtended.string()
    .optional()
    .allow('')
    .messages({
      "string.base": `Description should be a type of text`
    }),
  limit: JoiExtended.number()
    .integer()
    .greater(0)
    .required()
    .messages({
      "number.base": `Limit should be a type of number`,
      "number.integer": `Limit should be an integer`,
      "number.greater": `Limit should be greater than {#limit}`,
      "any.required": `Limit is a required field`
    }),
  price: JoiExtended.number()
    .min(0)
    .required()
    .messages({
      "number.base": `Price should be a type of number`,
      "number.min": `Price should be more than or equal to {#limit}`,
      "any.required": `Price is a required field`
    }),
  currency: JoiExtended.string()
    .optional()
    .allow('')
    .default('IDR')
    .messages({
      "string.base": `Currency should be a type of text`
    })
});

export const paketEditSchemaJoi = JoiExtended.object({
  name: JoiExtended.string()
    .optional()
    .allow('')
    .messages({
      "string.base": `Name should be a type of text`
    }),
  description: JoiExtended.string()
    .optional()
    .allow('')
    .messages({
      "string.base": `Description should be a type of text`
    }),
  limit: JoiExtended.number()
    .integer()
    .greater(0)
    .optional()
    .allow(null)
    .messages({
      "number.base": `Limit should be a type of number`,
      "number.integer": `Limit should be an integer`,
      "number.greater": `Limit should be greater than {#limit}`
    }),
  price: JoiExtended.number()
    .min(0)
    .optional()
    .allow(null)
    .messages({
      "number.base": `Price should be a type of number`,
      "number.min": `Price should be more than or equal to {#limit}`
    }),
  currency: JoiExtended.string()
    .optional()
    .allow('')
    .messages({
      "string.base": `Currency should be a type of text`
    })
});
