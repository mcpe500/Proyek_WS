import { Router } from "express";
import {
  editProfile,
  generateNewAccessToken,
  getAllUser,
  getDashboard,
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
  getProfPic,
  getUserProfilePicture,
} from "../controller/UserController";
import {
  validateAccessToken,
  validateAdmin,
  validateNotSignIn,
  validateIsNotAdmin,
} from "../middleware/AuthMiddleware";
import {
  validateBody,
  validateCookie,
  validateParams,
  validateQuery,
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
import {
  checkAndIncreaseAPIHit,
  checkAPIKey,
} from "../middleware/BusinessMiddleware";
import { getFilteredNews, getSpecificNews } from "../controller/NewsController";
import { getNearestGyms } from "../controller/GymsController";
import { getGymsSchema } from "../validators/Maps.validate";
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
  "/admin/user/profile-picture/:userID",
  [validateAccessToken, validateAdmin],
  getUserProfilePicture
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
router.put("/users/topup", [validateAccessToken, validateIsNotAdmin], topup);
router.get(
  "/users/dashboard",
  [validateAccessToken, validateIsNotAdmin],
  getDashboard
);
router.get(
  "/users/profile-picture",
  [validateAccessToken, validateIsNotAdmin],
  getProfPic
);
router.put(
  "/users/profile",
  [
    validateBody(editProfileSchemaJoi), // Check if this works or not (Hansen)
    validateAccessToken,
    validateIsNotAdmin,
    upload.single("profilePicture"),
  ],
  editProfile
);
router.get(
  "/users/apikey",
  [validateAccessToken, validateIsNotAdmin],
  getApiKey
);
router.put(
  "/users/apikey/reset",
  [validateAccessToken, validateIsNotAdmin, checkAPIKey, checkAndIncreaseAPIHit(1)],
  resetApiKey
); // TODO : bikin ini pake ApiKey (Hansen)
router.post(
  "/users/subscribe",
  [validateAccessToken, validateIsNotAdmin],
  subscribePacket
);
router.put(
  "/users/renew",
  [validateAccessToken, validateIsNotAdmin],
  renewSubscription
);
router.post(
  "/users/plan",
  [
    validateBody(createUserPlanSchemaJoi),
    validateAccessToken, // TODO : Check with hansen mungkin ini error (Should be fine, Hansen)
    validateIsNotAdmin,
    checkAPIKey,
    checkAndIncreaseAPIHit(1),
  ],
  createExercisePlan
); // TODO : bikin ini pake ApiKey (Hansen)
router.get(
  "/users/plan",
  [validateAccessToken, validateIsNotAdmin, checkAPIKey, checkAndIncreaseAPIHit(1)],
  getAllExercisePlanByUser
); // TODO : bikin ini pake ApiKey (Hansen)
router.get(
  "/users/plan/:id",
  [validateAccessToken, validateIsNotAdmin, checkAPIKey, checkAndIncreaseAPIHit(1)],
  getExercisePlanDetailByUser
); // TODO : bikin ini pake ApiKey (Hansen)

// Exercise Plan Routes
router.put(
  "/users/plan/edit/:id",
  [validateAccessToken, validateIsNotAdmin, checkAPIKey, checkAndIncreaseAPIHit(1)],
  editExercisePlan
); // TODO : bikin ini pake ApiKey (Hansen)
router.post(
  "/users/plan/start/:id",
  [validateAccessToken, validateIsNotAdmin, checkAPIKey, checkAndIncreaseAPIHit(1)],
  startExercisePlan
); // TODO : bikin ini pake ApiKey (Hansen)
router.put(
  "/users/plan/:id/workout/",
  [validateAccessToken, validateIsNotAdmin, checkAPIKey, checkAndIncreaseAPIHit(1)],
  addWorkoutToExercisePlan
); // TODO : bikin ini pake ApiKey (Hansen)
router.get(
  "/users/plan/:id/workout/",
  [validateAccessToken, validateIsNotAdmin, checkAPIKey, checkAndIncreaseAPIHit(1)],
  exercisePlanDetails
); // TODO : bikin ini pake ApiKey (Hansen)
router.post(
  "/users/plan/complete/:id",
  [validateAccessToken, validateIsNotAdmin, checkAPIKey, checkAndIncreaseAPIHit(1)],
  completeExercisePlan
); // TODO : bikin ini pake ApiKey (Hansen)
router.put(
  "/users/plan/cancel/:id",
  [validateAccessToken, validateIsNotAdmin],
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
router.get(
  "/news",
  [validateAccessToken, checkAPIKey, checkAndIncreaseAPIHit(1)],
  getFilteredNews
); // TODO : bikin ini pake ApiKey (Hansen)
router.get(
  "/news/:title",
  [validateAccessToken, checkAPIKey, checkAndIncreaseAPIHit(1)],
  getSpecificNews
); // TODO : bikin ini pake ApiKey (Hansen)

// Maps Routes
router.get(
  "/gyms/nearest",
  validateAccessToken,
  validateQuery(getGymsSchema),
  checkAPIKey,
  getNearestGyms
); // TODO : bikin ini pake ApiKey (Hansen) sama nambah ApiHit

export default router;
