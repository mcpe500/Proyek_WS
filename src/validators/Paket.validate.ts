import { JoiExtended } from ".";
import Paket from "../models/static/Paket.model";

export const paketCreateSchemaJoi = JoiExtended.object({
  name: JoiExtended.string()
    .required()
    .messages({
      "string.base": `"Paket_name" should be a type of 'text'`,
      "any.required": `"Paket_name" is a required field`
    }),
  description: JoiExtended.string()
    .optional()
    .allow('')
    .messages({
      "string.base": `"Paket_description" should be a type of 'text'`
    }),
  limit: JoiExtended.number()
    .integer()
    .greater(0)
    .required()
    .messages({
      "number.base": `"Paket_Limit" should be a type of 'number'`,
      "number.integer": `"Paket_Limit" should be an integer`,
      "number.greater": `"Paket_Limit" should be greater than 0`,
      "any.required": `"Paket_Limit" is a required field`
    }),
  price: JoiExtended.number()
    .min(0)
    .required()
    .messages({
      "number.base": `"Paket_price" should be a type of 'number'`,
      "number.min": `"Paket_price" should be 0 or more`,
      "any.required": `"Paket_price" is a required field`
    }),
  currency: JoiExtended.string()
    .optional()
    .default('IDR')
    .messages({
      "string.base": `"Paket_price_currency" should be a type of 'text'`
    })
});

const paketExists = async (paketId: string) => {
  const paket = await Paket.findOne({ where: { Paket_id: paketId } });
  if (!paket) {
    throw new Error(`Paket with id ${paketId} does not exist`);
  }
};

export const paketEditSchemaJoi = JoiExtended.object({
  id: JoiExtended.string()
    .length(6)
    .required()
    .external(async (value: string) => {
      await paketExists(value);
    })
    .messages({
      "string.base": `"Paket_id" should be a type of 'text'`,
      "string.length": `"Paket_id" should be exactly {#limit} characters`,
      "any.required": `"Paket_id" is a required field`,
      "any.custom": `"Paket_id" does not exist`
    }),
  name: JoiExtended.string()
    .optional()
    .allow('')
    .messages({
      "string.base": `"Paket_name" should be a type of 'text'`
    }),
  description: JoiExtended.string()
    .optional()
    .allow('')
    .messages({
      "string.base": `"Paket_description" should be a type of 'text'`
    }),
  limit: JoiExtended.number()
    .integer()
    .greater(0)
    .optional()
    .allow(null)
    .messages({
      "number.base": `"Paket_Limit" should be a type of 'number'`,
      "number.integer": `"Paket_Limit" should be an integer`,
      "number.greater": `"Paket_Limit" should be greater than 0`
    }),
  price: JoiExtended.number()
    .min(0)
    .optional()
    .allow(null)
    .messages({
      "number.base": `"Paket_price" should be a type of 'number'`,
      "number.min": `"Paket_price" should be 0 or more`
    }),
  currency: JoiExtended.string()
    .optional()
    .allow('')
    .messages({
      "string.base": `"Paket_price_currency" should be a type of 'text'`
    })
});
