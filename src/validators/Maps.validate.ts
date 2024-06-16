import { JoiExtended } from ".";

export const getGymsSchema = JoiExtended.object({
  lat: JoiExtended.number().required().messages({
    "any.required": "Latitude is a required field.",
    "number.base": "Latitude must be a number.",
  }),
  lng: JoiExtended.number().required().messages({
    "any.required": "Longitude is a required field.",
    "number.base": "Longitude must be a number.",
  }),
});
