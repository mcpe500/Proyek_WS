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
exports.cancelExercisePlanByUser = exports.trackerExercisePlanByUser = exports.pictureExercisePlanByUser = exports.getExercisePlanDetailByUser = exports.getAllExercisePlanByUser = exports.exercisePlanDetails = exports.addWorkoutToExercisePlan = exports.completeExercisePlan = exports.startExercisePlan = exports.editExercisePlan = exports.createExercisePlan = void 0;
const ResponseRelated_enum_1 = require("../contracts/enum/ResponseRelated.enum");
const Plans_model_1 = require("../models/dynamic/Plans.model");
const PlansRelated_enum_1 = require("../contracts/enum/PlansRelated.enum");
const User_model_1 = require("../models/dynamic/User.model");
const Exercise_model_1 = require("../models/dynamic/Exercise.model");
const mongoose_1 = __importDefault(require("mongoose"));
// Create Exercise Plan
const createExercisePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, goals, durationInWeeks, frequencyPerWeek, restDaysPerWeek, intensity, exercises, nutritionPlan, } = req.body;
    try {
        const newPlan = new Plans_model_1.Plans({
            name,
            description,
            goals,
            durationInWeeks,
            frequencyPerWeek,
            restDaysPerWeek,
            intensity,
            exercises,
            nutritionPlan,
            createdBy: req.user.username,
            status: PlansRelated_enum_1.PlansStatus.PENDING,
        });
        const savedPlan = yield newPlan.save();
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.CREATED).json({
            msg: "Exercise plan created successfully",
            plan: savedPlan,
        });
    }
    catch (error) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error", error });
    }
});
exports.createExercisePlan = createExercisePlan;
// /users/plan/edit
const editExercisePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user;
    const { name, description, goals, durationInWeeks, frequencyPerWeek, restDaysPerWeek, intensity, exercises, nutritionPlan, } = req.body;
    try {
        const plan = yield Plans_model_1.Plans.findById(id);
        if (!plan) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
                .json({ msg: "Plan not found" });
        }
        if (plan.createdBy != user.username) {
            return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND).json({ msg: "Not Your Plan" });
        }
        if (name)
            plan.name = name;
        if (description)
            plan.description = description;
        if (goals)
            plan.goals = goals;
        if (durationInWeeks)
            plan.durationInWeeks = durationInWeeks;
        if (frequencyPerWeek)
            plan.frequencyPerWeek = frequencyPerWeek;
        if (restDaysPerWeek)
            plan.restDaysPerWeek = restDaysPerWeek;
        if (intensity)
            plan.intensity = intensity;
        if (exercises)
            plan.exercises = exercises;
        if (nutritionPlan)
            plan.nutritionPlan = nutritionPlan;
        const updatedPlan = yield plan.save();
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({
            msg: "Exercise plan updated successfully",
            plan: updatedPlan,
        });
    }
    catch (error) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error", error });
    }
});
exports.editExercisePlan = editExercisePlan;
const startExercisePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user;
    try {
        const plan = yield Plans_model_1.Plans.findById(id);
        if (!plan) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
                .json({ msg: "Plan not found" });
        }
        if (plan.createdBy != user.username) {
            return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND).json({ msg: "Not Your Plan" });
        }
        // if there's an exercise
        if (plan.exercises.length < 1) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
                .json({ msg: "No exercise in the plan" });
        }
        if (plan.status == PlansRelated_enum_1.PlansStatus.STARTED) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
                .json({ msg: "Plan already started" });
        }
        plan.status = PlansRelated_enum_1.PlansStatus.STARTED;
        const updatedPlan = yield plan.save();
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({
            msg: "Exercise plan started successfully",
            plan: updatedPlan,
        });
    }
    catch (error) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error", error });
    }
});
exports.startExercisePlan = startExercisePlan;
const completeExercisePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user;
    try {
        const plan = yield Plans_model_1.Plans.findById(id);
        if (!plan) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
                .json({ msg: "Plan not found" });
        }
        if (plan.createdBy != user.username) {
            return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND).json({ msg: "Not Your Plan" });
        }
        plan.status = PlansRelated_enum_1.PlansStatus.COMPLETED;
        const updatedPlan = yield plan.save();
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND).json({
            msg: "Exercise plan completed successfully",
            plan: updatedPlan,
        });
    }
    catch (error) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error", error });
    }
});
exports.completeExercisePlan = completeExercisePlan;
const addWorkoutToExercisePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { exerciseId } = req.body;
    const user = req.user;
    const plan = yield Plans_model_1.Plans.findById(id);
    if (!plan) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
            .json({ msg: "Plan not found" });
    }
    if (plan.createdBy != user.username) {
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND).json({ msg: "Not Your Plan" });
    }
    const exercise = yield Exercise_model_1.ExercisePlan.findById(exerciseId);
    if (!exercise) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
            .json({ msg: "Exercise not found" });
    }
    plan.exercises.push(exercise);
    yield plan.save();
    return res
        .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
        .json({ msg: "Exercise added to plan successfully" });
});
exports.addWorkoutToExercisePlan = addWorkoutToExercisePlan;
const exercisePlanDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user;
    const plan = yield Plans_model_1.Plans.findById(id);
    if (!plan) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
            .json({ msg: "Plan not found" });
    }
    const userFromPlan = yield User_model_1.User.findById(plan.createdBy);
    if ((userFromPlan === null || userFromPlan === void 0 ? void 0 : userFromPlan._id) != user._id) {
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND).json({ msg: "Not Your Plan" });
    }
    return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND).json({ plan });
});
exports.exercisePlanDetails = exercisePlanDetails;
const getAllExercisePlanByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const plans = yield Plans_model_1.Plans.find({
        createdBy: user.username,
    }).select("_id, name createdDate status");
    try {
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({ plans: plans });
    }
    catch (error) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal server error" });
    }
});
exports.getAllExercisePlanByUser = getAllExercisePlanByUser;
const getExercisePlanDetailByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
            .json({ message: "Invalid ID" });
    }
    const plan = yield Plans_model_1.Plans.findById(id);
    if (!plan) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
            .json({ msg: "Plan not found" });
    }
    if (plan.createdBy != user.username) {
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND).json({ msg: "Not Your Plan" });
    }
    try {
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({ plan_detail: plan });
    }
    catch (error) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal server error" });
    }
});
exports.getExercisePlanDetailByUser = getExercisePlanDetailByUser;
const pictureExercisePlanByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.pictureExercisePlanByUser = pictureExercisePlanByUser;
const trackerExercisePlanByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.trackerExercisePlanByUser = trackerExercisePlanByUser;
const cancelExercisePlanByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
            .json({ message: "Invalid ID" });
    }
    const plan = yield Plans_model_1.Plans.findById(id);
    if (!plan) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
            .json({ msg: "Plan not found" });
    }
    if (plan.createdBy != user.username) {
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND).json({ msg: "Not Your Plan" });
    }
    if (plan.status !== "PENDING" && plan.status !== "STARTED") {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
            .json({ msg: "Plan status is already completed or cancelled" });
    }
    try {
        plan.status = PlansRelated_enum_1.PlansStatus.CANCELLED;
        yield plan.save();
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS)
            .json({ message: "Plan has been cancelled" });
    }
    catch (error) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal server error" });
    }
});
exports.cancelExercisePlanByUser = cancelExercisePlanByUser;
