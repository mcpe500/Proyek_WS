"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ENV = {
    PORT: parseInt(process.env.PORT || "3000"),
    BACKEND_API_URL: (_a = process.env.BACKEND_API_URL) !== null && _a !== void 0 ? _a : "",
    SECRET_KEY: (_b = process.env.SECRET_KEY) !== null && _b !== void 0 ? _b : "",
    REFRESH_TOKEN_SECRET: (_c = process.env.REFRESH_TOKEN_SECRET) !== null && _c !== void 0 ? _c : "",
    ACCESS_TOKEN_SECRET: (_d = process.env.ACCESS_TOKEN_SECRET) !== null && _d !== void 0 ? _d : "",
    EMAIL_VERIFICATION_TOKEN_SECRET: (_e = process.env.EMAIL_VERIFICATION_TOKEN_SECRET) !== null && _e !== void 0 ? _e : "",
    REFRESH_TOKEN_AGE: (_f = process.env.REFRESH_TOKEN_AGE) !== null && _f !== void 0 ? _f : "",
    ACCESS_TOKEN_AGE: (_g = process.env.ACCESS_TOKEN_AGE) !== null && _g !== void 0 ? _g : "",
    REMEMBER_ME_REFRESH_TOKEN_AGE: (_h = process.env.REMEMBER_ME_REFRESH_TOKEN_AGE) !== null && _h !== void 0 ? _h : "",
    REMEMBER_ME_ACCESS_TOKEN_AGE: (_j = process.env.REMEMBER_ME_ACCESS_TOKEN_AGE) !== null && _j !== void 0 ? _j : "",
    EMAIL_VERIFICATION_AGE: (_k = process.env.EMAIL_VERIFICATION_AGE) !== null && _k !== void 0 ? _k : "",
    MONGODB_URI: (_l = process.env.MONGODB_URI) !== null && _l !== void 0 ? _l : "",
    DB_STATIC_DIALECT: (_m = process.env.DB_STATIC_DIALECT) !== null && _m !== void 0 ? _m : "mysql",
    DB_STATIC_HOST: (_o = process.env.DB_STATIC_HOST) !== null && _o !== void 0 ? _o : "localhost",
    DB_STATIC_PORT: parseInt((_p = process.env.DB_STATIC_PORT) !== null && _p !== void 0 ? _p : "3306"),
    DB_STATIC_USERNAME: (_q = process.env.DB_STATIC_USERNAME) !== null && _q !== void 0 ? _q : "root",
    DB_STATIC_PASSWORD: (_r = process.env.DB_STATIC_PASSWORD) !== null && _r !== void 0 ? _r : "",
    DB_STATIC_DATABASE: (_s = process.env.DB_STATIC_DATABASE) !== null && _s !== void 0 ? _s : "db_name",
    API_NINJAS_API_KEY: (_t = process.env.API_NINJAS_API_KEY) !== null && _t !== void 0 ? _t : "",
    API_GOOGLE_PLACES_API_KEY: (_u = process.env.API_GOOGLE_PLACES_API_KEY) !== null && _u !== void 0 ? _u : "",
};
