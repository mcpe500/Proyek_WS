import fs from "fs";
import path from "path";
import root from "./paths/root";
import register from "./paths/auth/register";
import login from "./paths/auth/login";
import newAccessTokenFromRefreshToken from "./paths/auth/newAccessTokenFromRefreshToken";
import newRefreshToken from "./paths/auth/newRefreshToken";
import verifyEmail from "./paths/auth/verifyEmail";
import getAllUser from "./paths/admin/getAllUser";
import getUserById from "./paths/admin/getUserById";
import userDashboard from "./paths/user/userDashboard";
import editUserProfile from "./paths/user/editUserProfile";
import getAllPricing from "./paths/public/getAllPricing";
import getUserAPIKey from "./paths/user/getUserAPIKey";
import resetUserAPIKey from "./paths/user/resetUserAPIKey";
import subscribeToUserPacket from "./paths/user/subscribeToUserPacket";
import renewSubscription from "./paths/user/renewSubscription";
import userPlanHandlers from "./paths/user/plan/userPlanHandlers";
import userPlanByIDHandlers from "./paths/user/plan/userPlanByIDHandlers";
import editUserPlanById from "./paths/user/plan/editUserPlanById";
import startUserPlanById from "./paths/user/plan/startUserPlanById";
import completeUserPlanById from "./paths/user/plan/completeUserPlanById";
import addWorkoutToExercisePlan from "./paths/user/plan/exercise/workout/addWorkoutToExercisePlan";
import getNewsByTitle from "./paths/news/getNewsByTitle";
import getAllGoals from "./paths/user/plan/exercise/goals/getAllGoals";
import cancelPlanByUser from "./paths/user/plan/cancelPlanByUser";
import adminDashboard from "./paths/admin/adminDashboard";
import getAndDeleteUserProfile from "./paths/admin/getAndDeleteUserProfile";
import getAndPostAndDeletePacket from "./paths/admin/getAndPostAndDeletePacket";
import getExerciseByQuery from "./paths/user/plan/exercise/getExerciseByQuery";
import getNewsFilterOrAllNews from "./paths/news/getNewsFilterOrAllNews";
import getGoalByTitle from "./paths/user/plan/exercise/goals/getGoalByTitle";
const paths: any = {};
paths["/"] = root;
paths["/api/v1/auth/register"] = register;
paths["/api/v1/auth/login"] = login;
paths["/api/v1/auth/token"] = newAccessTokenFromRefreshToken;
paths["/api/v1/auth/refresh_token"] = newRefreshToken;
paths["/api/v1/auth/verify/{emailVerificationToken}"] = verifyEmail;
paths["/api/v1/users/dashboard"] = userDashboard;
paths["/api/v1/users/profile"] = editUserProfile;
paths["/api/v1/pricing"] = getAllPricing;
paths["/api/v1/users/apikey"] = getUserAPIKey;
paths["/api/v1/users/apikey/reset"] = resetUserAPIKey;
paths["/api/v1/users/subscribe"] = subscribeToUserPacket;
paths["/api/v1/users/renew"] = renewSubscription;
paths["/api/v1/exercise"] = getExerciseByQuery;
paths["/api/v1/users/plan"] = userPlanHandlers;
paths["/api/v1/users/plan/{id}"] = userPlanByIDHandlers;
paths["/api/v1/users/plan/edit/{id}"] = editUserPlanById;
paths["/api/v1/users/plan/start/{id}"] = startUserPlanById;
paths["/api/v1/users/plan/complete/{id}"] = completeUserPlanById;

paths["/api/v1/users/plan/{id}/workout/"] = addWorkoutToExercisePlan;
paths["/api/v1/news"] = getNewsFilterOrAllNews;
paths["/api/v1/news/{title}"] = getNewsByTitle;
paths["/api/v1/exercise/goals"] = getAllGoals;
paths["/api/v1/exercise/goals/{title}"] = getGoalByTitle;
paths["/api/v1/users/plan/cancel/{id}"] = cancelPlanByUser;

paths["/api/v1/admin/users"] = getAllUser;
paths["/api/v1/admin/users/{id}"] = getUserById;
paths["/api/v1/admin/dashboard"] = adminDashboard; // GET
paths["/api/v1/admin/user/profile/{userID}"] = getAndDeleteUserProfile; // GET and DELETE
paths["/api/v1/admin/user/packet/{userID}"] = getAndPostAndDeletePacket; // GET and POST and DELETE
// paths["/api/v1/admin/dashboard"] = {}
// paths["/api/v1/admin/dashboard"] = {}
// paths["/api/v1/admin/dashboard"] = {}

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
        name: "refresh_token", // Name of the cookie
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
