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
  promoteToAdmin,
} from "../controller/UserController";
import {
  validateAccessToken,
  validateRole,
  validateNotSignIn,
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
import { checkAndIncreaseAPIHit } from "../middleware/BusinessMiddleware";
import { getFilteredNews, getSpecificNews } from "../controller/NewsController";
import { getNearestGyms } from "../controller/GymsController";
import { getGymsSchema } from "../validators/Maps.validate";
import upload from "../middleware/Upload";
import { ROLE } from "../contracts/enum/UserRelated.enum";
import {
  createPaket,
  deletePaket,
  updatePaket,
} from "../controller/PaketController";
import {
  paketCreateSchemaJoi,
  paketEditSchemaJoi,
} from "../validators/Paket.validate";

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
  "/auth/refresh-token",
  validateCookie(validationTokenSchemaJoi),
  newRefreshToken
);
router.get("/auth/verify/:emailVerificationToken", verifyEmail);

// SuperAdmin Routes
router.post(
  "/super-admin/packages",
  [
    validateAccessToken,
    validateRole(ROLE.SUPER_ADMIN),
    validateBody(paketCreateSchemaJoi),
  ],
  createPaket
);
router.put(
  "/super-admin/packages/:id",
  [
    validateAccessToken,
    validateRole(ROLE.SUPER_ADMIN),
    validateBody(paketEditSchemaJoi),
  ],
  updatePaket
);
router.delete(
  "/super-admin/packages/:id",
  [validateAccessToken, validateRole(ROLE.SUPER_ADMIN)],
  deletePaket
);
router.put(
  "/super-admin/users/:userID/promote",
  [validateAccessToken, validateRole(ROLE.SUPER_ADMIN)],
  promoteToAdmin
);

// Admin Routes
router.get(
  "/admin/users",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  getAllUser
);
router.get(
  "/admin/dashboard",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  adminDashboard
);
router.get(
  "/admin/users/:userID",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  getUserProfile
);
router.delete(
  "/admin/users/:userID",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  deleteUserProfile
);
router.get(
  "/admin/users/:userID/profile-picture",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  getUserProfilePicture
);
router.get(
  "/admin/users/:userID/packages",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  getUserPacket
);
router.post(
  "/admin/users/:userID/packages",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  addUserPacket
);
router.delete(
  "/admin/users/:userID/packages",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  deleteUserPacket
);
router.post(
  "/admin/exercises",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  addExercise
);
router.put(
  "/admin/user/topup/:userID?", 
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  topupFromAdmin
);

// User Routes
router.put(
  "/users/topup",
  [validateAccessToken, validateRole(ROLE.USER)],
  topup
);
router.get(
  "/users/dashboard",
  [validateAccessToken, validateRole(ROLE.USER)],
  getDashboard
);
router.get(
  "/users/profile-picture",
  [validateAccessToken, validateRole(ROLE.USER)],
  getProfPic
);
router.put(
  "/users/profile",
  [
    validateAccessToken,
    validateRole(ROLE.USER),
    validateBody(editProfileSchemaJoi), // Check if this works or not (Hansen)
    upload.single("profilePicture"),
  ],
  editProfile
);
router.get(
  "/users/api-key",
  [validateAccessToken, validateRole(ROLE.USER)],
  getApiKey
);
router.put(
  "/users/api-key/reset",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  resetApiKey
); // TODO : bikin ini pake ApiKey (Hansen)
router.post(
  "/users/subscription",
  [validateAccessToken, validateRole(ROLE.USER)],
  subscribePacket
);
router.put(
  "/users/subscription/renew",
  [validateAccessToken, validateRole(ROLE.USER)],
  renewSubscription
);
router.post(
  "/users/plans",
  [
    validateBody(createUserPlanSchemaJoi),
    validateAccessToken, // TODO : Check with hansen mungkin ini error (Should be fine, Hansen)
    validateRole(ROLE.USER),
    checkAndIncreaseAPIHit(1),
  ],
  createExercisePlan
); // TODO : bikin ini pake ApiKey (Hansen)
router.get(
  "/users/plans",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  getAllExercisePlanByUser
); // TODO : bikin ini pake ApiKey (Hansen)
router.get(
  "/users/plans/:id",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  getExercisePlanDetailByUser
); // TODO : bikin ini pake ApiKey (Hansen)

// Exercise Plan Routes
router.put(
  "/users/plans/:id",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  editExercisePlan
); // TODO : bikin ini pake ApiKey (Hansen)
router.post(
  "/users/plans/:id/start",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  startExercisePlan
); // TODO : bikin ini pake ApiKey (Hansen)
router.put(
  "/users/plans/:id/workout/",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  addWorkoutToExercisePlan
); // TODO : bikin ini pake ApiKey (Hansen)
router.get(
  "/users/plans/:id/workout/",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  exercisePlanDetails
); // TODO : bikin ini pake ApiKey (Hansen)
router.post(
  "/users/plans/complete/:id",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  completeExercisePlan
); // TODO : bikin ini pake ApiKey (Hansen)
router.put(
  "/users/plans/cancel/:id",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  cancelExercisePlanByUser
);

// Pricing Routes
router.get("/pricing/packages", getAllPricingPackages);

// Exercise Routes
router.get("/exercises", [validateAccessToken], getExercise);
router.get("/exercises/goals", [validateAccessToken], getAllGoals);
router.get("/exercises/goals/:title", [validateAccessToken], getGoalByTitle);

// News Routes
// router.get("/news", getAllNews);
router.get(
  "/news",
  [validateAccessToken, checkAndIncreaseAPIHit(1)],
  getFilteredNews
); // TODO : bikin ini pake ApiKey (Hansen)
router.get(
  "/news/:title",
  [validateAccessToken, checkAndIncreaseAPIHit(1)],
  getSpecificNews
); // TODO : bikin ini pake ApiKey (Hansen)

// Maps Routes
router.get(
  "/gyms/nearest",
  validateAccessToken,
  validateQuery(getGymsSchema),
  getNearestGyms
); // TODO : bikin ini pake ApiKey (Hansen) sama nambah ApiHit

export default router;
