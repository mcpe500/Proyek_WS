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
  topup,
} from "../controller/UserController";
import {
  validateAccessToken,
  validateAdmin,
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

const router = Router();

// Authentication Routes
router.post("/auth/register", validateBody(registerSchemaJoi), registerUser); // finished
router.post("/auth/login", validateBody(loginSchemaJoi), loginUser); // finished
router.post(
  "/auth/token",
  validateCookie(validationTokenSchemaJoi),
  generateNewAccessToken
); // finished
router.post(
  "/auth/refresh_token",
  validateCookie(validationTokenSchemaJoi),
  newRefreshToken
); // finished
router.get("/auth/verify/:emailVerificationToken", verifyEmail); // finished

// User Routes
router.put("/users/topup", [validateAccessToken], topup)
router.get("/users/dashboard", [validateAccessToken], getDashboard); // finished
router.put(
  "/users/profile",
  [validateAccessToken, validateBody(editProfileSchemaJoi)],
  editProfile
); // finished
router.get("/users/apikey", [validateAccessToken], getApiKey); // finished
router.put("/users/apikey/reset", [validateAccessToken], resetApiKey); // finished
router.post("/users/subscribe", [validateAccessToken], subscribePacket); // finished
router.post(
  "/users/plan",
  [validateAccessToken, validateBody(createUserPlanSchemaJoi)],
  createExercisePlan
); // finished
router.get("/users/plan", [validateAccessToken], getAllExercisePlanByUser); // waiting for review
router.get(
  "/users/plan/:id",
  [validateAccessToken],
  getExercisePlanDetailByUser
); // waiting for review

// Exercise Plan Routes
router.put("/users/plan/edit/:id", [validateAccessToken], editExercisePlan); // finished
router.post("/users/plan/start/:id", [validateAccessToken], startExercisePlan); // finished
router.put(
  "/users/plan/:id/workout/",
  [validateAccessToken],
  addWorkoutToExercisePlan
); // not yet done; TODO : Add Description
router.get(
  "/users/plan/:id/workout/",
  [validateAccessToken],
  exercisePlanDetails
); // not yet done; TODO : Add Description
router.post(
  "/users/plan/complete/:id",
  [validateAccessToken],
  completeExercisePlan
); // finished

router.put(
  "/users/plan/cancel/:id",
  [validateAccessToken],
  cancelExercisePlanByUser
); // finished

// Admin Routes
router.get("/users", [validateAccessToken, validateAdmin], getAllUser); // finished // admin can use this, add filtering to filter using query
router.get("/users/:id", [validateAccessToken, validateAdmin], getUser); // finished // admin can use this

// Pricing
router.get("/pricing", getAllPricingPackages);
router.get("/exercise", [validateAccessToken], getExercise);

// User Plan Routes
// router.put("/users/plan/edit", validateAccessToken, editPlan); // finished
// router.put("/users/plan/start", validateAccessToken, startPlan); // finished
// router.put("/users/plan/complete", validateAccessToken, completePlan); // finished
// router.get("/users/plan/:planId", validateAccessToken, getPlan); // finished
// router.put("/users/plan/exercise/:exercisePlanId", validateAccessToken, exercisePlan); // not yet done
// router.post("/users/plan/picture", validateAccessToken, picturePlan); // not yet done
// router.get("/users/plan/tracker", validateAccessToken, trackerPlan); // not yet done
// router.delete("/users/plan/:planId", validateAccessToken, deletePlan); // not yet done

export default router;
