"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const TransactionRelated_enum_1 = require("../../contracts/enum/TransactionRelated.enum");
const TransactionSchema = new mongoose_1.Schema({
    header: {
        transactionHeaderType: {
            type: String,
            enum: Object.values(TransactionRelated_enum_1.TransactionHeaderType),
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        userId: {
            type: mongoose_1.Schema.Types.ObjectId,
            required: false,
        },
        adminId: {
            type: mongoose_1.Schema.Types.ObjectId,
            required: false,
        },
    },
    details: [
        {
            transactionDetailType: {
                type: String,
                enum: Object.values(TransactionRelated_enum_1.TransactionDetailType),
                required: true,
            },
            paket_id: String,
            subscription_id: String,
            month: Number,
            price: Number,
            subtotal: Number,
            message: String,
            userId: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: false,
            },
        },
    ],
});
exports.Transaction = mongoose_1.default.model("Transaction", TransactionSchema);
