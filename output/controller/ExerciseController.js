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
exports.getGoalByTitle = exports.getAllGoals = exports.getExercise = void 0;
const ResponseRelated_enum_1 = require("../contracts/enum/ResponseRelated.enum");
const ApiService_1 = require("../services/ApiService");
const joi_1 = __importDefault(require("joi"));
const FitnessRelated_enum_1 = require("../contracts/enum/FitnessRelated.enum");
const getExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Extract body parameters
        const { exercise, type, muscle, difficulty } = req.query;
        // Extract page from body with default value of 0
        let page = (_a = req.query.page) !== null && _a !== void 0 ? _a : 0;
        // Define valid types and muscles for validation
        const validTypes = [
            "cardio",
            "olympic_weightlifting",
            "plyometrics",
            "powerlifting",
            "strength",
            "stretching",
            "strongman",
        ];
        const validMuscles = [
            "abdominals",
            "abductors",
            "adductors",
            "biceps",
            "calves",
            "chest",
            "forearms",
            "glutes",
            "hamstrings",
            "lats",
            "lower_back",
            "middle_back",
            "neck",
            "quadriceps",
            "traps",
            "triceps",
        ];
        const validDifficulty = ["beginner", "intermediate", "expert"];
        // Define schemas for validation
        const typeSchema = joi_1.default.string()
            .valid(...validTypes)
            .insensitive();
        const muscleSchema = joi_1.default.string()
            .valid(...validMuscles)
            .insensitive();
        const difficultySchema = joi_1.default.string()
            .valid(...validDifficulty)
            .insensitive();
        // Validate type, muscle, and difficulty
        if (type) {
            const { error } = typeSchema.validate(type);
            if (error) {
                const errorMessage = `Type not valid. Valid types are: ${validTypes.join(", ")}`;
                return res
                    .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
                    .json({ error: errorMessage });
            }
        }
        if (muscle) {
            const { error } = muscleSchema.validate(muscle);
            if (error) {
                const errorMessage = `Muscle not valid. Valid muscles are: ${validMuscles.join(", ")}`;
                return res
                    .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
                    .json({ error: errorMessage });
            }
        }
        if (difficulty) {
            const { error } = difficultySchema.validate(difficulty);
            if (error) {
                const errorMessage = `Difficulty not valid. Valid difficulty levels are: ${validDifficulty.join(", ")}`;
                return res
                    .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
                    .json({ error: errorMessage });
            }
        }
        // Build query parameters object
        const queryParams = {};
        if (exercise)
            queryParams.name = exercise;
        if (type)
            queryParams.type = type;
        if (muscle)
            queryParams.muscle = muscle;
        if (difficulty)
            queryParams.difficulty = difficulty;
        queryParams.offset = page;
        console.log("Query Parameters:", queryParams);
        // Make API call
        const response = yield ApiService_1.Apis.API_NINJA_ApiService.get("", {
            params: queryParams,
        });
        console.log("API Response:", response);
        // Check for empty response
        if (response.length < 1) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
                .json({ error: `Exercise Not Found!` });
        }
        // Return successful response
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({ exercise: response });
    }
    catch (error) {
        console.error("Request failed:", error);
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND).json({ error: error.message });
    }
});
exports.getExercise = getExercise;
const getAllGoals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const goalsBrief = Object.values(FitnessRelated_enum_1.FITNESS_GOALS).map((goal) => ({
            title: goal.title,
            description: goal.description,
        }));
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({ Goal_list: goalsBrief });
    }
    catch (error) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal server error" });
    }
});
exports.getAllGoals = getAllGoals;
const getGoalByTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const goalTitle = req.params.title.toLowerCase();
        const goal = Object.values(FitnessRelated_enum_1.FITNESS_GOALS).find((goal) => goal.title.toLowerCase() === goalTitle);
        if (goal) {
            return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({ Goal: goal });
        }
        else {
            res.status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND).json({ message: "Goal not found" });
        }
    }
    catch (error) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal server error" });
    }
});
exports.getGoalByTitle = getGoalByTitle;
