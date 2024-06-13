import fs from "fs";
import path from "path";
import root from "./paths/root";
import register from "./paths/register";
import login from "./paths/login";
import newAccessTokenFromRefreshToken from "./paths/newAccessTokenFromRefreshToken";
import newRefreshToken from "./paths/newRefreshToken";
import verifyEmail from "./paths/verifyEmail";
import getAllUser from "./paths/getAllUser";
import getUserById from "./paths/getUserById";
import userDashboard from "./paths/userDashboard";
import editUserProfile from "./paths/editUserProfile";
import getAllPricing from "./paths/getAllPricing";
import getUserAPIKey from "./paths/getUserAPIKey";
import resetUserAPIKey from "./paths/resetUserAPIKey";
import subscribeToUserPacket from "./paths/subscribeToUserPacket";
import getExerciseDetailsByName from "./paths/getExerciseDetailsByName";
import getExerciseDetailByType from "./paths/getExerciseDetailByType";
import getExerciseDetailByMuscle from "./paths/getExerciseDetailByMuscle";
import getExerciseDetailByDifficulty from "./paths/getExerciseDetailByDifficulty";
import userPlanHandlers from "./paths/userPlanHandlers";
import userPlanByIDHandlers from "./paths/userPlanByIDHandlers";
import editUserPlanById from "./paths/editUserPlanById";
import startUserPlanById from "./paths/startUserPlanById";
import completeUserPlanById from "./paths/completeUserPlanById";
import addWorkoutToExercisePlan from "./paths/addWorkoutToExercisePlan";

const paths: any = {};
paths["/"] = root;
paths["/api/v1/auth/register"] = register;
paths["/api/v1/auth/login"] = login;
paths["/api/v1/auth/token"] = newAccessTokenFromRefreshToken;
paths["/api/v1/auth/refresh_token"] = newRefreshToken;
paths["/api/v1/auth/verify/{emailVerificationToken}"] = verifyEmail;
paths["/api/v1/users"] = getAllUser;
paths["/api/v1/users/{id}"] = getUserById;
paths["/api/v1/users/dashboard"] = userDashboard;
paths["/api/v1/users/profile"] = editUserProfile;
paths["/api/v1/pricing"] = getAllPricing;
paths["/api/v1/users/apikey"] = getUserAPIKey;
paths["/api/v1/users/apikey/reset"] = resetUserAPIKey;
paths["/api/v1/users/subscribe"] = subscribeToUserPacket;
paths["/api/v1/exercise/name"] = getExerciseDetailsByName;
paths["/api/v1/exercise/type"] = getExerciseDetailByType;
paths["/api/v1/exercise/muscle"] = getExerciseDetailByMuscle;
paths["/api/v1/exercise/difficulty"] = getExerciseDetailByDifficulty;
paths["/api/v1/users/plan"] = userPlanHandlers;
paths["/api/v1/users/plan/{id}"] = userPlanByIDHandlers;
paths["/api/v1/users/plan/edit/{id}"] = editUserPlanById;
paths["/api/v1/users/plan/start/{id}"] = startUserPlanById;
paths["/api/v1/users/plan/complete/{id}"] = completeUserPlanById;

paths["/api/v1/users/plan/{id}/workout/"] = addWorkoutToExercisePlan;

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Your API Title",
    description: "",
    version: "1.0.0",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
        name: "authorization",
      },
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "refreshToken", // Name of the cookie
      },
    },
  },
  security: {
    bearerAuth: [],
    cookieAuth: [],
  },
  paths: paths,
};
// console.log(swaggerDocument);
// const directoryExists = (dirPath: string) => {
//   try {
//     return fs.statSync(dirPath).isDirectory();
//   } catch (err) {
//     return false;
//   }
// };
// const logDir = path.join(__dirname, "swagger_log");
// if (!directoryExists(logDir)) {
//   fs.mkdirSync(logDir);
// }
// const swaggerJSON = JSON.stringify(swaggerDocument, null, 2);
// const logFilePath = path.join(logDir, "swagger.json");
// try {
//   fs.writeFileSync(logFilePath, swaggerJSON);
// } catch (error) {
//   console.error("Error writing file:", error);
// }

export default swaggerDocument;
//   components:
//   securitySchemes:
//     bearerAuth:            # arbitrary name for the security scheme
//       type: http
//       scheme: bearer
//       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
// # 2) Apply the security globally to all operations
// security:
//   - bearerAuth: []         # use the same name as above
