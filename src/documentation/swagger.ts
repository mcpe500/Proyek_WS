import { JSDOM } from "jsdom";
import { SwaggerUIBundle } from "swagger-ui-dist";
import { SwaggerUIStandalonePreset } from "swagger-ui-dist";
import fs from "fs";
import path from "path";
import root from "./paths/root";
import register from "./paths/auth/register";
import login from "./paths/auth/login";
import newAccessTokenFromRefreshToken from "./paths/auth/newAccessTokenFromRefreshToken";
import newRefreshToken from "./paths/auth/newRefreshToken";
import verifyEmail from "./paths/auth/verifyEmail";
import getAllUser from "./paths/admin/getAllUser";
import topup from "./paths/user/topup";
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
import getNearestGyms from "./paths/location/getNearestGyms";
import getProfilePicture from "./paths/user/getProfilePicture";
import getUserProfilePicture from "./paths/admin/getUserProfilePicture";

const { window } = new JSDOM();
const $ = require("jquery")(window);

const paths: any = {};
paths["/"] = root;
paths["/api/v1/auth/register"] = register;
paths["/api/v1/auth/login"] = login;
paths["/api/v1/auth/token"] = newAccessTokenFromRefreshToken;
paths["/api/v1/auth/refresh_token"] = newRefreshToken;
paths["/api/v1/auth/verify/{emailVerificationToken}"] = verifyEmail;
paths["/api/v1/users/topup"] = topup;
paths["/api/v1/users/dashboard"] = userDashboard;
paths["/api/v1/users/profile-picture"] = getProfilePicture;
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
paths["/api/v1/admin/dashboard"] = adminDashboard; // GET
paths["/api/v1/admin/user/profile/{userID}"] = getAndDeleteUserProfile; // GET and DELETE
paths["/api/v1/admin/user/profile-picture/{userID}"] = getUserProfilePicture; // GET and DELETE
paths["/api/v1/admin/user/packet/{userID}"] = getAndPostAndDeletePacket; // GET and POST and DELETE

paths["/api/v1/gyms/nearest"] = getNearestGyms;
// paths["/api/v1/admin/dashboard"] = {}
// paths["/api/v1/admin/dashboard"] = {}

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "We Fit",
    description:
      "We Fit is a fitness-oriented web service that helps users find nearby gyms, track their workouts, and stay motivated on their fitness journey. Whether you’re a seasoned athlete or just starting out, We Fit provides a seamless experience to help you achieve your fitness goals.",
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

// Execute the Swagger UI setup within jQuery document ready function
// $(function () {
//   // Initialize Swagger UI with bundled resources
//   const ui = SwaggerUIBundle({
//     spec: swaggerDocument,
//     dom_id: "#swagger-ui",
//     presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
//     plugins: [
//       SwaggerUIBundle.plugins.DownloadUrl,
//       // Custom plugin to handle current location button
//       function (system: any) {
//         return {
//           components: {
//             // Define custom button component for current location
//             CurrentLocationButton: function (props: any) {
//               const { getComponent, specSelectors } = props;

//               // Function to handle current location button click
//               const onGetCurrentLocation = () => {
//                 // Check if Geolocation API is supported
//                 if (navigator.geolocation) {
//                   navigator.geolocation.getCurrentPosition(
//                     (position) => {
//                       const latitude = position.coords.latitude;
//                       const longitude = position.coords.longitude;
//                       const radius = 1000; // Example radius

//                       // Update Swagger UI with fetched location
//                       const params = new URLSearchParams(
//                         window.location.search
//                       );
//                       params.set("lat", latitude.toString());
//                       params.set("lng", longitude.toString());
//                       params.set("radius", radius.toString());
//                       const newUrl = `${
//                         window.location.pathname
//                       }?${params.toString()}`;
//                       window.history.replaceState({}, "", newUrl);

//                       // Reload the page to reflect the updated query parameters
//                       window.location.reload();
//                     },
//                     (error) => {
//                       console.error("Error fetching location:", error);
//                     }
//                   );
//                 } else {
//                   console.error(
//                     "Geolocation API is not supported by this browser."
//                   );
//                 }
//               };

//               return (
//                 // Render the button in JSX
//                 `<button onClick="(${onGetCurrentLocation.toString()})()">Get Current Location</button>`
//               );
//             },
//           },
//           wrapComponents: {
//             // Wrap operation with custom button
//             parameters: (Original: any, system: any) => {
//               const CurrentLocationButton = system.getComponent(
//                 "CurrentLocationButton"
//               );
//               return (props: any) => {
//                 const { name } = props;
//                 if (name === "x-sinap-get-current-location") {
//                   return `<CurrentLocationButton ${props} />`;
//                 }
//                 return `<Original ${props} />`;
//               };
//             },
//           },
//         };
//       },
//     ],
//   });

//   // Expose Swagger UI instance to global scope for debugging
//   (window as any).ui = ui;
// });
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
