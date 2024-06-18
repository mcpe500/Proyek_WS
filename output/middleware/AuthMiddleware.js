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
exports.validateNotSignIn = exports.validateIsNotAdmin = exports.validateAdmin = exports.validateAccessToken = void 0;
const AuthUtils_1 = require("../utils/AuthUtils");
const ResponseRelated_enum_1 = require("../contracts/enum/ResponseRelated.enum");
const User_model_1 = require("../models/dynamic/User.model");
const validateAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.UNAUTHORIZED).send("Unauthorized");
    }
    const [prefix, accessToken] = token.split(" ");
    if (prefix != "Bearer") {
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.UNAUTHORIZED).send("Unauthorized");
    }
    try {
        const decodedToken = (0, AuthUtils_1.verifyAccessToken)(accessToken);
        if (!decodedToken) {
            return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.UNAUTHORIZED).send("Unauthorized");
        }
        const { username, email } = decodedToken;
        try {
            const user = yield User_model_1.User.findOne({ $or: [{ username }, { email }] });
            if (user) {
                req.user = user;
                next();
            }
            else {
                return res
                    .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
                    .json({ msg: "User not found" });
            }
        }
        catch (error) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
                .json({ msg: "Internal server error" });
        }
    }
    catch (error) {
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.UNAUTHORIZED).send("Unauthorized");
    }
});
exports.validateAccessToken = validateAccessToken;
const validateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    if (user && user.role != "ADMIN")
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.UNAUTHORIZED)
            .json({ msg: "User is not admin" });
    next();
});
exports.validateAdmin = validateAdmin;
const validateIsNotAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user && user.role == "ADMIN")
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.UNAUTHORIZED)
            .json({ msg: "Only Customers Are Allowed!" });
    next();
});
exports.validateIsNotAdmin = validateIsNotAdmin;
const validateNotSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (token) {
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.UNAUTHORIZED).send("Please Logout First!");
    }
    next();
});
exports.validateNotSignIn = validateNotSignIn;
