"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
const root_1 = __importDefault(require("./paths/root"));
const register_1 = __importDefault(require("./paths/auth/register"));
const login_1 = __importDefault(require("./paths/auth/login"));
const newAccessTokenFromRefreshToken_1 = __importDefault(require("./paths/auth/newAccessTokenFromRefreshToken"));
const newRefreshToken_1 = __importDefault(require("./paths/auth/newRefreshToken"));
const verifyEmail_1 = __importDefault(require("./paths/auth/verifyEmail"));
const getAllUser_1 = __importDefault(require("./paths/admin/getAllUser"));
const topup_1 = __importDefault(require("./paths/user/topup"));
const userDashboard_1 = __importDefault(require("./paths/user/userDashboard"));
const editUserProfile_1 = __importDefault(require("./paths/user/editUserProfile"));
const getAllPricing_1 = __importDefault(require("./paths/public/getAllPricing"));
const getUserAPIKey_1 = __importDefault(require("./paths/user/getUserAPIKey"));
const resetUserAPIKey_1 = __importDefault(require("./paths/user/resetUserAPIKey"));
const subscribeToUserPacket_1 = __importDefault(require("./paths/user/subscribeToUserPacket"));
const renewSubscription_1 = __importDefault(require("./paths/user/renewSubscription"));
const userPlanHandlers_1 = __importDefault(require("./paths/user/plan/userPlanHandlers"));
const userPlanByIDHandlers_1 = __importDefault(require("./paths/user/plan/userPlanByIDHandlers"));
const editUserPlanById_1 = __importDefault(require("./paths/user/plan/editUserPlanById"));
const startUserPlanById_1 = __importDefault(require("./paths/user/plan/startUserPlanById"));
const completeUserPlanById_1 = __importDefault(require("./paths/user/plan/completeUserPlanById"));
const addWorkoutToExercisePlan_1 = __importDefault(require("./paths/user/plan/exercise/workout/addWorkoutToExercisePlan"));
const getNewsByTitle_1 = __importDefault(require("./paths/news/getNewsByTitle"));
const getAllGoals_1 = __importDefault(require("./paths/user/plan/exercise/goals/getAllGoals"));
const cancelPlanByUser_1 = __importDefault(require("./paths/user/plan/cancelPlanByUser"));
const adminDashboard_1 = __importDefault(require("./paths/admin/adminDashboard"));
const getAndDeleteUserProfile_1 = __importDefault(require("./paths/admin/getAndDeleteUserProfile"));
const getAndPostAndDeletePacket_1 = __importDefault(require("./paths/admin/getAndPostAndDeletePacket"));
const getExerciseByQuery_1 = __importDefault(require("./paths/user/plan/exercise/getExerciseByQuery"));
const getNewsFilterOrAllNews_1 = __importDefault(require("./paths/news/getNewsFilterOrAllNews"));
const getGoalByTitle_1 = __importDefault(require("./paths/user/plan/exercise/goals/getGoalByTitle"));
const getNearestGyms_1 = __importDefault(require("./paths/location/getNearestGyms"));
const getProfilePicture_1 = __importDefault(require("./paths/user/getProfilePicture"));
const getUserProfilePicture_1 = __importDefault(require("./paths/admin/getUserProfilePicture"));
const topupFromAdmin_1 = __importDefault(require("./paths/admin/topupFromAdmin"));
const { window } = new jsdom_1.JSDOM();
const $ = require("jquery")(window);
const paths = {};
paths["/"] = root_1.default;
paths["/api/v1/auth/register"] = register_1.default;
paths["/api/v1/auth/login"] = login_1.default;
paths["/api/v1/auth/token"] = newAccessTokenFromRefreshToken_1.default;
paths["/api/v1/auth/refresh_token"] = newRefreshToken_1.default;
paths["/api/v1/auth/verify/{emailVerificationToken}"] = verifyEmail_1.default;
paths["/api/v1/users/topup"] = topup_1.default;
paths["/api/v1/users/dashboard"] = userDashboard_1.default;
paths["/api/v1/users/profile-picture"] = getProfilePicture_1.default;
paths["/api/v1/users/profile"] = editUserProfile_1.default;
paths["/api/v1/pricing"] = getAllPricing_1.default;
paths["/api/v1/users/apikey"] = getUserAPIKey_1.default;
paths["/api/v1/users/apikey/reset"] = resetUserAPIKey_1.default;
paths["/api/v1/users/subscribe"] = subscribeToUserPacket_1.default;
paths["/api/v1/users/renew"] = renewSubscription_1.default;
paths["/api/v1/exercise"] = getExerciseByQuery_1.default;
paths["/api/v1/users/plan"] = userPlanHandlers_1.default;
paths["/api/v1/users/plan/{id}"] = userPlanByIDHandlers_1.default;
paths["/api/v1/users/plan/edit/{id}"] = editUserPlanById_1.default;
paths["/api/v1/users/plan/start/{id}"] = startUserPlanById_1.default;
paths["/api/v1/users/plan/complete/{id}"] = completeUserPlanById_1.default;
paths["/api/v1/users/plan/{id}/workout/"] = addWorkoutToExercisePlan_1.default;
paths["/api/v1/news"] = getNewsFilterOrAllNews_1.default;
paths["/api/v1/news/{title}"] = getNewsByTitle_1.default;
paths["/api/v1/exercise/goals"] = getAllGoals_1.default;
paths["/api/v1/exercise/goals/{title}"] = getGoalByTitle_1.default;
paths["/api/v1/users/plan/cancel/{id}"] = cancelPlanByUser_1.default;
paths["/api/v1/admin/users"] = getAllUser_1.default;
paths["/api/v1/admin/dashboard"] = adminDashboard_1.default; // GET
paths["/api/v1/admin/user/profile/{userID}"] = getAndDeleteUserProfile_1.default; // GET and DELETE
paths["/api/v1/admin/user/profile-picture/{userID}"] = getUserProfilePicture_1.default; // GET and DELETE
paths["/api/v1/admin/user/packet/{userID}"] = getAndPostAndDeletePacket_1.default; // GET and POST and DELETE
paths["/api/v1/admin/user/topup/{userID}"] = topupFromAdmin_1.default;
paths["/api/v1/gyms/nearest"] = getNearestGyms_1.default;
// paths["/api/v1/admin/dashboard"] = {}
// paths["/api/v1/admin/dashboard"] = {}
const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "We Fit",
        description: "We Fit is a fitness-oriented web service that helps users find nearby gyms, track their workouts, and stay motivated on their fitness journey. Whether you’re a seasoned athlete or just starting out, We Fit provides a seamless experience to help you achieve your fitness goals.",
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
            apiKeyAuth: {
                type: "http",
                // scheme: "bearer",
                // bearerFormat: "JWT",
                in: "query",
                name: "x-api-key",
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
exports.default = swaggerDocument;
//   components:
//   securitySchemes:
//     bearerAuth:            # arbitrary name for the security scheme
//       type: http
//       scheme: bearer
//       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
// # 2) Apply the security globally to all operations
// security:
//   - bearerAuth: []         # use the same name as above
