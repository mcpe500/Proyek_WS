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
exports.Plans = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const PlansRelated_enum_1 = require("../../contracts/enum/PlansRelated.enum");
const FitnessRelated_enum_1 = require("../../contracts/enum/FitnessRelated.enum");
const FITNESS_GOAL_CODES = Object.values(FitnessRelated_enum_1.FITNESS_GOALS).map(goal => goal.code);
const PlansSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    goals: [
        {
            type: String,
            required: false,
            enum: FITNESS_GOAL_CODES,
        },
    ],
    durationInWeeks: { type: Number, required: true },
    frequencyPerWeek: { type: Number, required: true },
    restDaysPerWeek: { type: Number, required: true },
    intensity: { type: Number, required: true },
    exercises: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "ExercisePlan" }],
    nutritionPlan: { type: mongoose_1.Schema.Types.ObjectId, ref: "NutritionPlan" },
    createdBy: { type: String, required: true },
    createdDate: { type: Date, required: true, default: Date.now },
    status: {
        type: String,
        enum: Object.values(PlansRelated_enum_1.PlansStatus),
        default: PlansRelated_enum_1.PlansStatus.PENDING,
    },
});
exports.Plans = mongoose_1.default.model("Plans", PlansSchema);
