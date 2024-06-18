"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGymsSchema = void 0;
const _1 = require(".");
exports.getGymsSchema = _1.JoiExtended.object({
    lat: _1.JoiExtended.number().required().messages({
        "any.required": "Latitude is a required field.",
        "number.base": "Latitude must be a number.",
    }),
    lng: _1.JoiExtended.number().required().messages({
        "any.required": "Longitude is a required field.",
        "number.base": "Longitude must be a number.",
    }),
});
