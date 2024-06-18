"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const ValidateMiddleware_1 = require("../middleware/ValidateMiddleware");
const User_validate_1 = require("../validators/User.validate");
const PricingController_1 = require("../controller/PricingController");
const ExerciseController_1 = require("../controller/ExerciseController");
const UserPlanController_1 = require("../controller/UserPlanController");
const Plans_validate_1 = require("../validators/Plans.validate");
const BusinessMiddleware_1 = require("../middleware/BusinessMiddleware");
const NewsController_1 = require("../controller/NewsController");
const GymsController_1 = require("../controller/GymsController");
const Maps_validate_1 = require("../validators/Maps.validate");
const Upload_1 = __importDefault(require("../middleware/Upload"));
const router = (0, express_1.Router)();
// Authentication Routes
router.post("/auth/register", (0, ValidateMiddleware_1.validateBody)(User_validate_1.registerSchemaJoi), AuthMiddleware_1.validateNotSignIn, UserController_1.registerUser);
router.post("/auth/login", (0, ValidateMiddleware_1.validateBody)(User_validate_1.loginSchemaJoi), AuthMiddleware_1.validateNotSignIn, UserController_1.loginUser);
router.post("/auth/token", (0, ValidateMiddleware_1.validateCookie)(User_validate_1.validationTokenSchemaJoi), UserController_1.generateNewAccessToken);
router.post("/auth/refresh_token", (0, ValidateMiddleware_1.validateCookie)(User_validate_1.validationTokenSchemaJoi), UserController_1.newRefreshToken);
router.get("/auth/verify/:emailVerificationToken", UserController_1.verifyEmail);
// Admin Routes
router.get("/admin/users", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateAdmin], UserController_1.getAllUser);
router.get("/admin/dashboard", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateAdmin], UserController_1.adminDashboard);
router.get("/admin/user/profile/:userID", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateAdmin], UserController_1.getUserProfile);
router.delete("/admin/user/profile/:userID", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateAdmin], UserController_1.deleteUserProfile);
router.get("/admin/user/profile-picture/:userID", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateAdmin], UserController_1.getUserProfilePicture);
router.get("/admin/user/packet/:userID", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateAdmin], UserController_1.getUserPacket);
router.post("/admin/user/packet/:userID", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateAdmin], UserController_1.addUserPacket);
router.delete("/admin/user/packet/:userID", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateAdmin], UserController_1.deleteUserPacket);
router.get("/admin/exercise", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateAdmin], UserController_1.addExercise);
router.put("/admin/user/topup/:userID?", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateAdmin], UserController_1.topupFromAdmin);
// User Routes
router.put("/users/topup", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateIsNotAdmin], UserController_1.topup);
router.get("/users/dashboard", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateIsNotAdmin], UserController_1.getDashboard);
router.get("/users/profile-picture", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateIsNotAdmin], UserController_1.getProfPic);
router.put("/users/profile", [
    (0, ValidateMiddleware_1.validateBody)(User_validate_1.editProfileSchemaJoi), // Check if this works or not (Hansen)
    AuthMiddleware_1.validateAccessToken,
    AuthMiddleware_1.validateIsNotAdmin,
    Upload_1.default.single("profilePicture"),
], UserController_1.editProfile);
router.get("/users/apikey", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateIsNotAdmin], UserController_1.getApiKey);
router.put("/users/apikey/reset", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateIsNotAdmin, (0, BusinessMiddleware_1.checkAndIncreaseAPIHit)(1)], UserController_1.resetApiKey); // TODO : bikin ini pake ApiKey (Hansen)
router.post("/users/subscribe", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateIsNotAdmin], UserController_1.subscribePacket);
router.put("/users/renew", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateIsNotAdmin], UserController_1.renewSubscription);
router.post("/users/plan", [
    (0, ValidateMiddleware_1.validateBody)(Plans_validate_1.createUserPlanSchemaJoi),
    AuthMiddleware_1.validateAccessToken, // TODO : Check with hansen mungkin ini error (Should be fine, Hansen)
    AuthMiddleware_1.validateIsNotAdmin,
    (0, BusinessMiddleware_1.checkAndIncreaseAPIHit)(1),
], UserPlanController_1.createExercisePlan); // TODO : bikin ini pake ApiKey (Hansen)
router.get("/users/plan", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateIsNotAdmin, (0, BusinessMiddleware_1.checkAndIncreaseAPIHit)(1)], UserPlanController_1.getAllExercisePlanByUser); // TODO : bikin ini pake ApiKey (Hansen)
router.get("/users/plan/:id", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateIsNotAdmin, (0, BusinessMiddleware_1.checkAndIncreaseAPIHit)(1)], UserPlanController_1.getExercisePlanDetailByUser); // TODO : bikin ini pake ApiKey (Hansen)
// Exercise Plan Routes
router.put("/users/plan/edit/:id", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateIsNotAdmin, (0, BusinessMiddleware_1.checkAndIncreaseAPIHit)(1)], UserPlanController_1.editExercisePlan); // TODO : bikin ini pake ApiKey (Hansen)
router.post("/users/plan/start/:id", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateIsNotAdmin, (0, BusinessMiddleware_1.checkAndIncreaseAPIHit)(1)], UserPlanController_1.startExercisePlan); // TODO : bikin ini pake ApiKey (Hansen)
router.put("/users/plan/:id/workout/", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateIsNotAdmin, (0, BusinessMiddleware_1.checkAndIncreaseAPIHit)(1)], UserPlanController_1.addWorkoutToExercisePlan); // TODO : bikin ini pake ApiKey (Hansen)
router.get("/users/plan/:id/workout/", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateIsNotAdmin, (0, BusinessMiddleware_1.checkAndIncreaseAPIHit)(1)], UserPlanController_1.exercisePlanDetails); // TODO : bikin ini pake ApiKey (Hansen)
router.post("/users/plan/complete/:id", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateIsNotAdmin, (0, BusinessMiddleware_1.checkAndIncreaseAPIHit)(1)], UserPlanController_1.completeExercisePlan); // TODO : bikin ini pake ApiKey (Hansen)
router.put("/users/plan/cancel/:id", [AuthMiddleware_1.validateAccessToken, AuthMiddleware_1.validateIsNotAdmin, (0, BusinessMiddleware_1.checkAndIncreaseAPIHit)(1)], UserPlanController_1.cancelExercisePlanByUser);
// Pricing Routes
router.get("/pricing", PricingController_1.getAllPricingPackages);
// Exercise Routes
router.get("/exercise", [AuthMiddleware_1.validateAccessToken], ExerciseController_1.getExercise);
router.get("/exercise/goals", [AuthMiddleware_1.validateAccessToken], ExerciseController_1.getAllGoals);
router.get("/exercise/goals/:title", [AuthMiddleware_1.validateAccessToken], ExerciseController_1.getGoalByTitle);
// News Routes
// router.get("/news", getAllNews);
router.get("/news", [AuthMiddleware_1.validateAccessToken, (0, BusinessMiddleware_1.checkAndIncreaseAPIHit)(1)], NewsController_1.getFilteredNews); // TODO : bikin ini pake ApiKey (Hansen)
router.get("/news/:title", [AuthMiddleware_1.validateAccessToken, (0, BusinessMiddleware_1.checkAndIncreaseAPIHit)(1)], NewsController_1.getSpecificNews); // TODO : bikin ini pake ApiKey (Hansen)
// Maps Routes
router.get("/gyms/nearest", AuthMiddleware_1.validateAccessToken, (0, ValidateMiddleware_1.validateQuery)(Maps_validate_1.getGymsSchema), GymsController_1.getNearestGyms); // TODO : bikin ini pake ApiKey (Hansen) sama nambah ApiHit
exports.default = router;
