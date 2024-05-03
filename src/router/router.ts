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
  resetApiKey
} from "../controller/UserController";
import { validateAccessToken } from "../middleware/AuthMiddleware";
import {
  accessRoutes,
  addRoutes,
  showBuiltInModules,
} from "../controller/RoutesController";
import { ROUTES } from "../contracts/enum/RoutesRelated.enum";
import { validateBody, validateCookie } from "../middleware/ValidateMiddleware";
import {
  editProfileSchemaJoi,
  loginSchemaJoi,
  registerSchemaJoi,
  validationTokenSchemaJoi,
} from "../validators/User.validate";

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
router.get("/users/dashboard", validateAccessToken, getDashboard);
router.put(
  "/users/profile",
  [validateAccessToken, validateBody(editProfileSchemaJoi)],
  editProfile
);

router.get("/users/apikey",validateAccessToken ,getApiKey);
router.put("/users/apikey/reset", validateAccessToken, resetApiKey);


router.get("/users/:id", getUser);


// router.put("/users/:id", updateUser);
// router.delete("/users/:id", deleteUser);

// router.post(ROUTES.ADD_ROUTES, addRoutes);
// router.post("/dynamic/:routes", accessRoutes)
// router.get(ROUTES.DYNAMIC_ROUTES, accessRoutes);
// router.get("/showBuiltInModules", showBuiltInModules);

// router.use(validateAccessToken); // Use the middleware to validate the access token for all routes below

export default router;
