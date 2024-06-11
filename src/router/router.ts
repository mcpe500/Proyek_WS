import { Request, Response, Router } from "express";
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
} from "../controller/UserController";
import { validateAccessToken } from "../middleware/AuthMiddleware";
import {
  accessRoutes,
  addRoutes,
  showBuiltInModules,
} from "../controller/RoutesController";
import { ROUTES } from "../contracts/enum/RoutesRelated.enum";
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
  getMuscle,
  getDifficulty,
  getType,
} from "../controller/ExerciseController";
import {
  completeExercisePlan,
  createExercisePlan,
  editExercisePlan,
  exercisePlanDetails,
  addWorkoutToExercisePlan,
  startExercisePlan,
  createPlan,
  editPlan,
  startPlan,
  completePlan,
  getPlan,
  exercisePlan,
  picturePlan,
  trackerPlan,
  deletePlan,
} from "../controller/UserPlanController";
import { createUserPlanSchemaJoi } from "../validators/Plans.validate";

const router = Router();

router.post("/auth/register", validateBody(registerSchemaJoi), registerUser);
router.post("/auth/login", validateBody(loginSchemaJoi), loginUser);

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

router.get("/users", getAllUser);
router.get("/users/dashboard", [validateAccessToken], getDashboard);
router.put(
  "/users/profile",
  [validateAccessToken, validateBody(editProfileSchemaJoi)],
  editProfile
);

router.get("/users/apikey", [validateAccessToken], getApiKey);
router.put("/users/apikey/reset", [validateAccessToken], resetApiKey);
router.post("/users/subscribe", [validateAccessToken], subscribePacket);

router.post(
  "/users/plan",
  [validateAccessToken, validateBody(createUserPlanSchemaJoi)],
  createExercisePlan
);

router.put("/users/plan/edit/:id", [validateAccessToken], editExercisePlan);
router.post("/users/plan/start/:id", [validateAccessToken], startExercisePlan);

// TODO
router.put(
  "/users/plan/:id/workout/",
  [validateAccessToken],
  addWorkoutToExercisePlan
);
router.get(
  "/users/plan/:id/workout/",
  [validateAccessToken],
  exercisePlanDetails
);
//

router.post(
  "/users/plan/complete/:id",
  [validateAccessToken],
  completeExercisePlan
);

router.get("/users/:id", getUser);

// Pricing
router.get("/pricing", getAllPricingPackages);
// router.put("/users/:id", updateUser);
// router.delete("/users/:id", deleteUser);

// router.post(ROUTES.ADD_ROUTES, addRoutes);
// router.post("/dynamic/:routes", accessRoutes)
// router.get(ROUTES.DYNAMIC_ROUTES, accessRoutes);
// router.get("/showBuiltInModules", showBuiltInModules);

// router.use(validateAccessToken); // Use the middleware to validate the access token for all routes below

router.get("/exercise/name", getExercise);
router.get("/exercise/type", getType);
router.get("/exercise/muscle", getMuscle);
router.get("/exercise/difficulty", getDifficulty);

router.post("/users/plan", validateAccessToken, createPlan);
router.put("/users/plan/edit", validateAccessToken, editPlan);
router.put("/users/plan/start", validateAccessToken, startPlan);
router.put("/users/plan/complete", validateAccessToken, completePlan);
router.get("/users/plan/:planId", validateAccessToken, getPlan);
router.put(
  "/users/plan/exercise/:exercisePlanId",
  validateAccessToken,
  exercisePlan
);
router.post("/users/plan/picture", validateAccessToken, picturePlan);
router.get("/users/plan/tracker", validateAccessToken, trackerPlan);
router.delete("/users/plan/:planId", validateAccessToken, deletePlan);

export default router;
