import { Router } from "express";
import {
  editProfile,
  generateNewAccessToken,
  getAllUser,
  getDashboard,
  getUser,
  loginUser,
  newRefreshToken,
  registerUser,
  verifyEmail,
  getApiKey,
  resetApiKey,
  subscribePacket,
  renewSubscription,
  topup,
  adminDashboard,
  getUserProfile,
  deleteUserProfile,
  getUserPacket,
  addUserPacket,
  deleteUserPacket,
  addExercise,
  topupFromAdmin,
} from "../controller/UserController";
import {
  validateAccessToken,
  validateAdmin,
  validateNotSignIn,
} from "../middleware/AuthMiddleware";
import {
  validateBody,
  validateCookie,
  validateParams,
} from "../middleware/ValidateMiddleware";
import {
  editProfileSchemaJoi,
  loginSchemaJoi,
  registerSchemaJoi,
  validationTokenSchemaJoi,
} from "../validators/User.validate";
import { getAllPricingPackages } from "../controller/PricingController";
import {
  getExercise,
  getAllGoals,
  getGoalByTitle,
} from "../controller/ExerciseController";
import {
  completeExercisePlan,
  createExercisePlan,
  editExercisePlan,
  exercisePlanDetails,
  addWorkoutToExercisePlan,
  startExercisePlan,
  pictureExercisePlanByUser,
  trackerExercisePlanByUser,
  getAllExercisePlanByUser,
  getExercisePlanDetailByUser,
  cancelExercisePlanByUser,
} from "../controller/UserPlanController";
import { createUserPlanSchemaJoi } from "../validators/Plans.validate";
import { checkAndIncreaseAPIHit } from "../middleware/BusinessMiddleware";
import { getFilteredNews, getSpecificNews } from "../controller/NewsController";
import upload from "../middleware/Upload";

const router = Router();

// Authentication Routes
router.post(
  "/auth/register",
  validateBody(registerSchemaJoi),
  validateNotSignIn,
  registerUser
);
router.post(
  "/auth/login",
  validateBody(loginSchemaJoi),
  validateNotSignIn,
  loginUser
);
router.post(
  "/auth/token",
  validateCookie(validationTokenSchemaJoi),
  generateNewAccessToken
);
router.post(
  "/auth/refresh_token",
  validateCookie(validationTokenSchemaJoi),
  newRefreshToken
);
router.get("/auth/verify/:emailVerificationToken", verifyEmail);

// Admin Routes
router.get("/admin/users", [validateAccessToken, validateAdmin], getAllUser);
router.get("/admin/users/:id", [validateAccessToken, validateAdmin], getUser);
router.get(
  "/admin/dashboard",
  [validateAccessToken, validateAdmin],
  adminDashboard
);
router.get(
  "/admin/user/profile/:userID",
  [validateAccessToken, validateAdmin],
  getUserProfile
);
router.delete(
  "/admin/user/profile/:userID",
  [validateAccessToken, validateAdmin],
  deleteUserProfile
);
router.get(
  "/admin/user/packet/:userID",
  [validateAccessToken, validateAdmin],
  getUserPacket
);
router.post(
  "/admin/user/packet/:userID",
  [validateAccessToken, validateAdmin],
  addUserPacket
);
router.delete(
  "/admin/user/packet/:userID",
  [validateAccessToken, validateAdmin],
  deleteUserPacket
);
router.get(
  "/admin/exercise",
  [validateAccessToken, validateAdmin],
  addExercise
);
router.put(
  "/admin/user/topup/:userID?",
  [validateAccessToken, validateAdmin],
  topupFromAdmin
);

// User Routes
router.put("/users/topup", [validateAccessToken], topup);
router.get("/users/dashboard", [validateAccessToken], getDashboard);
router.put(
  "/users/profile",
  [validateAccessToken, validateBody(editProfileSchemaJoi), upload.single('profilePicture')],
  editProfile
);
router.get("/users/apikey", [validateAccessToken], getApiKey);
router.put(
  "/users/apikey/reset",
  [validateAccessToken, checkAndIncreaseAPIHit(1)],
  resetApiKey
);
router.post("/users/subscribe", [validateAccessToken], subscribePacket);
router.put("/users/renew", [validateAccessToken], renewSubscription);
router.post(
  "/users/plan",
  [
    validateAccessToken,
    validateBody(createUserPlanSchemaJoi),
    checkAndIncreaseAPIHit(1),
  ],
  createExercisePlan
);
router.get("/users/plan", [validateAccessToken, checkAndIncreaseAPIHit(1)], getAllExercisePlanByUser);
router.get(
  "/users/plan/:id",
  [validateAccessToken, checkAndIncreaseAPIHit(1)],
  getExercisePlanDetailByUser
);

// Exercise Plan Routes
router.put(
  "/users/plan/edit/:id",
  [validateAccessToken, checkAndIncreaseAPIHit(1)],
  editExercisePlan
);
router.post(
  "/users/plan/start/:id",
  [validateAccessToken, checkAndIncreaseAPIHit(1)],
  startExercisePlan
);
router.put(
  "/users/plan/:id/workout/",
  [validateAccessToken, checkAndIncreaseAPIHit(1)],
  addWorkoutToExercisePlan
);
router.get(
  "/users/plan/:id/workout/",
  [validateAccessToken, checkAndIncreaseAPIHit(1)],
  exercisePlanDetails
);
router.post(
  "/users/plan/complete/:id",
  [validateAccessToken, checkAndIncreaseAPIHit(1)],
  completeExercisePlan
);
router.put(
  "/users/plan/cancel/:id",
  [validateAccessToken],
  cancelExercisePlanByUser
);

// Pricing Routes
router.get("/pricing", getAllPricingPackages);

// Exercise Routes
router.get("/exercise", [validateAccessToken], getExercise);
router.get("/exercise/goals", [validateAccessToken], getAllGoals);
router.get("/exercise/goals/:title", [validateAccessToken], getGoalByTitle);

// News Routes
// router.get("/news", getAllNews);
router.get("/news", [validateAccessToken, checkAndIncreaseAPIHit(1)], getFilteredNews);
router.get("/news/:title", [validateAccessToken, checkAndIncreaseAPIHit(1)], getSpecificNews);

export default router;
