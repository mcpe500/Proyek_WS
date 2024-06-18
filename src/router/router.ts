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
import {
  checkAndIncreaseAPIHit
} from "../middleware/BusinessMiddleware";
import { getFilteredNews, getSpecificNews } from "../controller/NewsController";
import { getNearestGyms } from "../controller/GymsController";
import { getGymsSchema } from "../validators/Maps.validate";
import upload from "../middleware/Upload";
import { ROLE } from "../contracts/enum/UserRelated.enum";
import { createPaket, deletePaket, updatePaket } from "../controller/PaketController";
import { paketCreateSchemaJoi, paketEditSchemaJoi } from "../validators/Paket.validate";

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

// SuperAdmin Routes
router.post("/super-admin/paket", [validateAccessToken, validateRole(ROLE.SUPER_ADMIN), validateBody(paketCreateSchemaJoi)], createPaket);
router.put("/super-admin/paket/:id", [validateAccessToken, validateRole(ROLE.SUPER_ADMIN), validateBody(paketEditSchemaJoi)], updatePaket);
router.delete("/super-admin/paket/:id", [validateAccessToken, validateRole(ROLE.SUPER_ADMIN)], deletePaket);
router.put("/super-admin/promote/:userID", [validateAccessToken, validateRole(ROLE.SUPER_ADMIN)], promoteToAdmin);

// Admin Routes
router.get("/admin/users", [validateAccessToken, validateRole(ROLE.ADMIN)], getAllUser);
router.get(
  "/admin/dashboard",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  adminDashboard
);
router.get(
  "/admin/user/profile/:userID",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  getUserProfile
);
router.delete(
  "/admin/user/profile/:userID",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  deleteUserProfile
);
router.get(
  "/admin/user/profile-picture/:userID",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  getUserProfilePicture
);
router.get(
  "/admin/user/packet/:userID",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  getUserPacket
);
router.post(
  "/admin/user/packet/:userID",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  addUserPacket
);
router.delete(
  "/admin/user/packet/:userID",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  deleteUserPacket
);
router.post(
  "/admin/exercise",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  addExercise
);
router.put(
  "/admin/user/topup/:userID?",
  [validateAccessToken, validateRole(ROLE.ADMIN)],
  topupFromAdmin
);

// User Routes
router.put("/users/topup", [validateAccessToken, validateRole(ROLE.USER)], topup);
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
    validateBody(editProfileSchemaJoi), // Check if this works or not (Hansen)
    validateAccessToken,
    validateRole(ROLE.USER),
    upload.single("profilePicture"),
  ],
  editProfile
);
router.get(
  "/users/apikey",
  [validateAccessToken, validateRole(ROLE.USER)],
  getApiKey
);
router.put(
  "/users/apikey/reset",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  resetApiKey
); // TODO : bikin ini pake ApiKey (Hansen)
router.post(
  "/users/subscribe",
  [validateAccessToken, validateRole(ROLE.USER)],
  subscribePacket
);
router.put(
  "/users/renew",
  [validateAccessToken, validateRole(ROLE.USER)],
  renewSubscription
);
router.post(
  "/users/plan",
  [
    validateBody(createUserPlanSchemaJoi),
    validateAccessToken, // TODO : Check with hansen mungkin ini error (Should be fine, Hansen)
    validateRole(ROLE.USER),
    checkAndIncreaseAPIHit(1),
  ],
  createExercisePlan
); // TODO : bikin ini pake ApiKey (Hansen)
router.get(
  "/users/plan",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  getAllExercisePlanByUser
); // TODO : bikin ini pake ApiKey (Hansen)
router.get(
  "/users/plan/:id",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  getExercisePlanDetailByUser
); // TODO : bikin ini pake ApiKey (Hansen)

// Exercise Plan Routes
router.put(
  "/users/plan/edit/:id",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  editExercisePlan
); // TODO : bikin ini pake ApiKey (Hansen)
router.post(
  "/users/plan/start/:id",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  startExercisePlan
); // TODO : bikin ini pake ApiKey (Hansen)
router.put(
  "/users/plan/:id/workout/",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  addWorkoutToExercisePlan
); // TODO : bikin ini pake ApiKey (Hansen)
router.get(
  "/users/plan/:id/workout/",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  exercisePlanDetails
); // TODO : bikin ini pake ApiKey (Hansen)
router.post(
  "/users/plan/complete/:id",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
  completeExercisePlan
); // TODO : bikin ini pake ApiKey (Hansen)
router.put(
  "/users/plan/cancel/:id",
  [validateAccessToken, validateRole(ROLE.USER), checkAndIncreaseAPIHit(1)],
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
