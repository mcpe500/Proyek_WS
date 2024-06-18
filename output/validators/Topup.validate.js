"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topupSchema = void 0;
const _1 = require(".");
exports.topupSchema = _1.JoiExtended.object({
    saldo: _1.JoiExtended.number().positive().required().messages({
        'number.base': `"saldo" should be a type of number`,
        'number.positive': `"saldo" must be a positive number`,
        'any.required': `"saldo" is a required field`
    })
});
