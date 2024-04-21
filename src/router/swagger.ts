const paths: any = {};
paths["/"] = {
  get: {
    summary: "Root endpoint",
    description: "Returns a Hello World message",
    responses: {
      "200": {
        description: "Successful operation",
        content: {
          "text/plain": {
            schema: {
              type: "string",
              example: "Hello World",
            },
          },
        },
      },
    },
  },
};
// paths["/api/v1/routes/{routes}"] = {
//   post: {
//     summary: "Add route",
//     description: "Adds a new route",
//     parameters: [
//       {
//         name: "routes",
//         in: "path",
//         required: true,
//         description: "Name of the route",
//         schema: {
//           type: "string",
//         },
//       },
//     ],
//     requestBody: {
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               responseValue: {
//                 type: "string",
//               },
//             },
//           },
//         },
//       },
//     },
//     responses: {
//       "200": {
//         description: "Successful operation",
//       },
//     },
//   },
// };
// paths["/api/v1/showBuiltInModules"] = {
//   get: {
//     summary: "Show built-in modules",
//     description: "Returns a list of built-in modules",
//     responses: {
//       "200": {
//         description: "Successful operation",
//         content: {
//           "application/json": {
//             schema: {
//               type: "object",
//               properties: {
//                 modules: {
//                   type: "array",
//                   items: {
//                     type: "string",
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };
// paths["/api/v1/dynamic/{routes}"] = {
//   get: {
//     summary: "Access dynamic route",
//     description: "Accesses a dynamic route",
//     parameters: [
//       {
//         name: "routes",
//         in: "path",
//         required: true,
//         description: "Name of the route",
//         schema: {
//           type: "string",
//         },
//       },
//     ],
//     responses: {
//       "200": {
//         description: "Successful operation",
//       },
//       default: {
//         description: "Endpoint doesn't exist",
//       },
//     },
//   },
// };
paths["/api/v1/auth/register"] = {
  post: {
    tags: ["auth"],
    summary: "Register a new user",
    description: "This endpoint registers a new user.",
    operationId: "registerUser",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              full_name: { type: "string" },
              username: { type: "string" },
              email: { type: "string", format: "email" },
              phone: { type: "string", pattern: "^[0-9]{10,15}$" },
              password: { type: "string" },
              age: { type: "integer" },
              gender: { type: "string" },
              height: { type: "number" },
              weight: { type: "number" },
              fitnessGoals: {
                type: "string",
                enum: [
                  "WEIGHT_LOSS",
                  "WEIGHT_GAIN",
                  "BODY_BUILDING",
                  "MUSCLE_GAIN",
                  "ENDURANCE_TRAINING",
                  "FLEXIBILITY_IMPROVEMENT",
                  "GENERAL_FITNESS",
                  "STRESS_RELIEF",
                ],
              },
              healthInformation: { type: "string" },
            },
            required: ["full_name", "username", "email", "phone", "password"],
          },
        },
      },
      required: true,
    },
    responses: {
      "201": {
        description: "User created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: { type: "string" },
                user: { type: "object" },
              },
            },
          },
        },
      },
      "400": {
        description: "Username already exists",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: { type: "string" },
              },
            },
          },
        },
      },
      "500": {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};
paths["/api/v1/auth/verify/{emailVerificationToken}"] = {
  get: {
    tags: ["auth"],
    summary: "Verify user's email",
    description:
      "This endpoint verifies a user's email using the email verification token.",
    operationId: "verifyEmail",
    parameters: [
      {
        name: "emailVerificationToken",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "The email verification token provided to the user.",
      },
    ],
    responses: {
      "200": {
        description: "Email verified successfully.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      "403": {
        description: "Invalid or expired email verification token.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      "404": {
        description: "User not found.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Your API Title",
    description: "",
    version: "1.0.0",
  },
  paths: paths,
};
export default swaggerDocument;
