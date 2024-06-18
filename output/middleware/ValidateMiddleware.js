"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCookie = exports.validateQuery = exports.validateParams = exports.validateBody = void 0;
const ResponseRelated_enum_1 = require("../contracts/enum/ResponseRelated.enum");
const validateBody = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.validateAsync(req.body);
            next();
        }
        catch (err) {
            res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
                .send({ error: err.details[0].message });
        }
    });
};
exports.validateBody = validateBody;
const validateParams = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.validateAsync(req.params);
            next();
        }
        catch (err) {
            res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
                .send({ error: err.details[0].message });
        }
    });
};
exports.validateParams = validateParams;
const validateQuery = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.validateAsync(req.query);
            next();
        }
        catch (err) {
            res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
                .send({ error: err.details[0].message });
        }
    });
};
exports.validateQuery = validateQuery;
const validateCookie = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.validateAsync(req.cookies);
            next();
        }
        catch (err) {
            res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
                .send({ error: err.details[0].message });
        }
    });
};
exports.validateCookie = validateCookie;
