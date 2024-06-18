"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationTokenSchemaJoi = exports.loginSchemaJoi = exports.editProfileSchemaJoi = exports.registerSchemaJoi = void 0;
const _1 = require(".");
const FitnessRelated_enum_1 = require("../contracts/enum/FitnessRelated.enum");
exports.registerSchemaJoi = _1.JoiExtended.object({
    username: _1.JoiExtended.string().required().messages({
        "any.required": "Username is required",
    }),
    email: _1.JoiExtended.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Email must be a valid email address",
    }),
    password: _1.JoiExtended.string().required().messages({
        "any.required": "Password is required",
    }),
    fullName: _1.JoiExtended.string().required().messages({
        "any.required": "Full name is required",
    }),
    phone: _1.JoiExtended.string()
        .pattern(/^[0-9]{10,15}$/)
        .required()
        .messages({
        "any.required": "Phone number is required",
        "string.pattern.base": "Phone number must be between 10 and 15 digits",
    }),
});
exports.editProfileSchemaJoi = _1.JoiExtended.object({
    old_password: _1.JoiExtended.string().optional().allow(""),
    new_password: _1.JoiExtended.string().optional().allow(""),
    confirm_password: _1.JoiExtended.string().optional().allow(""),
    fullName: _1.JoiExtended.string().optional().allow(""),
    phone: _1.JoiExtended.string()
        .optional()
        .allow("")
        .pattern(/^[0-9]{10,15}$/)
        .messages({
        "string.pattern.base": "Phone number must be between 10 and 15 digits",
    }),
    age: _1.JoiExtended.number().integer().positive().optional().allow("").messages({
        "number.base": "Age must be a number",
        "number.integer": "Age must be an integer",
        "number.positive": "Age must be a positive number",
    }),
    gender: _1.JoiExtended.string().optional().allow(""),
    height: _1.JoiExtended.number().positive().optional().allow("").messages({
        "number.base": "Height must be a number",
        "number.positive": "Height must be a positive number",
    }),
    weight: _1.JoiExtended.number().positive().optional().allow("").messages({
        "number.base": "Weight must be a number",
        "number.positive": "Weight must be a positive number",
    }),
    fitnessGoals: _1.JoiExtended.string()
        .valid(...Object.values(FitnessRelated_enum_1.FITNESS_GOALS))
        .optional()
        .allow("")
        .messages({
        "any.only": `Fitness goals must be one of ${Object.values(FitnessRelated_enum_1.FITNESS_GOALS)}`,
    }),
    healthInformation: _1.JoiExtended.string().optional().allow(""),
}).unknown();
exports.loginSchemaJoi = _1.JoiExtended.object({
    username: _1.JoiExtended.string().empty("").messages({
        "string.empty": "Username must not be empty",
    }),
    email: _1.JoiExtended.string().email().empty("").messages({
        "string.email": "Please enter a valid email address",
    }),
    password: _1.JoiExtended.string().required().messages({
        "any.required": "Password is a required field",
    }),
    rememberMe: _1.JoiExtended.boolean().optional(),
})
    .xor("username", "email")
    .messages({
    "object.missing": "Username or email is required for login",
});
exports.validationTokenSchemaJoi = _1.JoiExtended.object({
    refreshToken: _1.JoiExtended.string().required().messages({
        "string.base": "**refreshToken** must be a string",
        "string.empty": "**refreshToken** cannot be empty",
        "any.required": "**refreshToken** is a required field",
    }),
});
