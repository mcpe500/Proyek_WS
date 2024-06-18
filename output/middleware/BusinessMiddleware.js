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
exports.checkAndIncreaseAPIHit = void 0;
const ResponseRelated_enum_1 = require("../contracts/enum/ResponseRelated.enum");
const Subscription_model_1 = require("../models/dynamic/Subscription.model");
const Paket_model_1 = __importDefault(require("../models/static/Paket.model"));
const checkAndIncreaseAPIHit = (apiIncreaseCount) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { apiKey } = req.query;
        const user = req.user;
        try {
            if (typeof apiKey !== 'string') {
                return res.status(400).json({ error: 'Invalid API key format' });
            }
            // Check for active subscription
            const activeSubscription = yield Subscription_model_1.Subscription.findOne({
                userId: user._id,
                apiKey: apiKey
            });
            if (!activeSubscription) {
                return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND).json({ msg: "Invalid API Key" });
            }
            // Check if the subscription has expired
            if (!activeSubscription.isActive || activeSubscription.endDate < new Date()) {
                yield activeSubscription.updateOne({
                    isActive: false
                });
                return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST).json({ msg: "Your subscription has expired" });
            }
            // Check API hit limit
            const paket = yield Paket_model_1.default.findOne({
                where: {
                    Paket_id: activeSubscription.paketId,
                },
            });
            if (!paket || !paket.Paket_Limit) {
                return res
                    .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
                    .json({ msg: "Paket not found or invalid" });
            }
            // If resetAt is less than current time, reset API Hit
            if (!activeSubscription.resetAt ||
                activeSubscription.resetAt < new Date()) {
                yield activeSubscription.updateOne({
                    apiHit: 0,
                    resetAt: new Date(new Date().getTime() + 60 * 1000),
                });
            }
            // If API hit equals limit, display error
            if (activeSubscription.apiHit >= paket.Paket_Limit) {
                return res
                    .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
                    .json({ msg: "API hit limit reached" });
            }
            // Increase API hit and proceed
            yield activeSubscription.updateOne({
                $inc: { apiHit: apiIncreaseCount },
            });
            next();
        }
        catch (error) {
            console.error("Error in checkIncreaseAPIHit middleware:", error);
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
                .json({ msg: "Internal server error" });
        }
    });
};
exports.checkAndIncreaseAPIHit = checkAndIncreaseAPIHit;
