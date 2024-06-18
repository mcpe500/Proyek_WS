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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = exports.verifyEmailVerificationToken = exports.generateEmailVerificationToken = exports.generateApiKey = exports.verifyRefreshToken = exports.verifyAccessToken = exports.createRefreshToken = exports.createAccessToken = exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../config/environment");
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const Subscription_model_1 = require("../models/dynamic/Subscription.model");
// Use a secret key from environment variables
// const SECRET_KEY = process.env.SECRET_KEY || 'your-default-secret-key';
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password + environment_1.ENV.SECRET_KEY, salt);
    return hashedPassword;
});
exports.hashPassword = hashPassword;
const verifyPassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const match = yield bcrypt_1.default.compare(password + environment_1.ENV.SECRET_KEY, hashedPassword);
    return match;
});
exports.verifyPassword = verifyPassword;
const createAccessToken = (payload, rememberMe) => {
    return jsonwebtoken_1.default.sign(payload, environment_1.ENV.ACCESS_TOKEN_SECRET, {
        expiresIn: rememberMe
            ? environment_1.ENV.REMEMBER_ME_ACCESS_TOKEN_AGE
            : environment_1.ENV.ACCESS_TOKEN_AGE,
    });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (payload, rememberMe) => {
    return jsonwebtoken_1.default.sign(payload, environment_1.ENV.REFRESH_TOKEN_SECRET, {
        expiresIn: rememberMe
            ? environment_1.ENV.REMEMBER_ME_REFRESH_TOKEN_AGE
            : environment_1.ENV.REFRESH_TOKEN_AGE,
    });
};
exports.createRefreshToken = createRefreshToken;
const verifyAccessToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, environment_1.ENV.ACCESS_TOKEN_SECRET);
    }
    catch (e) {
        return null;
    }
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, environment_1.ENV.REFRESH_TOKEN_SECRET);
    }
    catch (e) {
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
const generateApiKey = () => __awaiter(void 0, void 0, void 0, function* () {
    let apiKey = "";
    while (true) {
        apiKey = crypto_1.default.randomBytes(32).toString("hex");
        const temp = yield Subscription_model_1.Subscription.findOne({
            apiKey: apiKey,
        });
        if (!temp)
            break;
    }
    return apiKey;
});
exports.generateApiKey = generateApiKey;
const generateEmailVerificationToken = (email) => {
    return jsonwebtoken_1.default.sign({ email }, environment_1.ENV.EMAIL_VERIFICATION_TOKEN_SECRET, {
        expiresIn: environment_1.ENV.EMAIL_VERIFICATION_AGE,
    });
};
exports.generateEmailVerificationToken = generateEmailVerificationToken;
const verifyEmailVerificationToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, environment_1.ENV.EMAIL_VERIFICATION_TOKEN_SECRET);
    }
    catch (e) {
        return null;
    }
};
exports.verifyEmailVerificationToken = verifyEmailVerificationToken;
const sendVerificationEmail = (email, token, username) => __awaiter(void 0, void 0, void 0, function* () {
    let transporter = nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "cara.cassin54@ethereal.email",
            pass: "sa1eN3haQ3vpTAweud",
        },
    });
    let mailOptions = {
        from: "cara.cassin54@ethereal.email",
        to: email, // Use the email parameter
        subject: "Test Mail",
    };
    console.log(email, token, username);
    ejs_1.default.renderFile(path_1.default.join(__dirname, "../templates", "verification_email_template.ejs"), {
        name: username,
        token: `http://localhost:3000/api/v1/auth/verify/${token}`,
    }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            mailOptions.html = data;
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Message sent: " + info.response);
                }
            });
        }
    });
});
exports.sendVerificationEmail = sendVerificationEmail;
