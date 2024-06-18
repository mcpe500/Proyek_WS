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
exports.createSubscriptions = void 0;
const AuthUtils_1 = require("../utils/AuthUtils");
const Paket_model_1 = __importDefault(require("../models/static/Paket.model"));
let pakets = [];
const createFreeSubscription = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = yield (0, AuthUtils_1.generateApiKey)();
        const now = new Date();
        const endDate = new Date(now);
        endDate.setDate(endDate.getDate() + 30); // Set the actual end date based on your business logic
        return {
            userId: user._id,
            paketId: "PAK001",
            apiHit: 0,
            startDate: now,
            endDate: endDate,
            isActive: true,
            apiKey,
            resetAt: now,
        };
    }
    catch (error) {
        console.error("Error creating free subscription:", error);
        throw error; // Rethrow the error or handle it as needed
    }
});
const createOtherSubscription = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paket = pakets[Math.floor(Math.random() * pakets.length)];
        const apiKey = yield (0, AuthUtils_1.generateApiKey)();
        const now = new Date();
        const endDate = new Date(now);
        endDate.setDate(endDate.getDate() + 30); // Set the actual end date based on your business logic
        return {
            userId: user._id,
            paketId: paket.Paket_id,
            apiHit: 0,
            startDate: now,
            endDate: endDate,
            isActive: true,
            apiKey,
            resetAt: now,
        };
    }
    catch (error) {
        console.error("Error creating other subscription:", error);
        throw error; // Rethrow the error or handle it as needed
    }
});
const createSubscriptions = (verifiedUsers, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptions = [];
    pakets = yield Paket_model_1.default.findAll({});
    for (const user of verifiedUsers) {
        const freeSubscription = yield createFreeSubscription(user);
        subscriptions.push(freeSubscription);
    }
    if (amount <= verifiedUsers.length) {
        for (let i = 0; i < amount; i++) {
            const otherSubscription = yield createOtherSubscription(verifiedUsers[i]);
            subscriptions.push(otherSubscription);
        }
    }
    return subscriptions;
});
exports.createSubscriptions = createSubscriptions;
