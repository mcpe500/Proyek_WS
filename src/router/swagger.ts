import path from "path";

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
              username: { type: "string" },
              email: { type: "string", format: "email" },
              password: { type: "string" },
              fullName: { type: "string" },
              phone: { type: "string", pattern: "^[0-9]{10,15}$" },
              //   age: { type: "integer" },
              //   gender: { type: "string" },
              //   height: { type: "number" },
              //   weight: { type: "number" },
              //   fitnessGoals: {
              //     type: "string",
              //     enum: [
              //       "WEIGHT_LOSS",
              //       "WEIGHT_GAIN",
              //       "BODY_BUILDING",
              //       "MUSCLE_GAIN",
              //       "ENDURANCE_TRAINING",
              //       "FLEXIBILITY_IMPROVEMENT",
              //       "GENERAL_FITNESS",
              //       "STRESS_RELIEF",
              //     ],
              //   },
              //   healthInformation: { type: "string" },
            },
            required: ["fullName", "username", "email", "phone", "password"],
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

paths["/api/v1/auth/login"] = {
  post: {
    tags: ["auth"],
    summary: "User login",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: { type: "string" },
              email: { type: "string", format: "email" },
              password: { type: "string" },
              rememberMe: { type: "boolean" },
            },
            required: ["username", "email", "password"],
          },
        },
      },
    },
    responses: {
      200: {
        description: "User logged in successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: { type: "string" },
                token: { type: "string" },
              },
            },
          },
        },
        // headers: {
        //   "Set-Cookie": {
        //     description: "The refreshToken cookie",
        //     schema: {
        //       type: "string",
        //     },
        //   },
        // },
        // cookie: {
        //   "refresh_token": {
        //     description: "The refreshToken cookie",
        //     schema: {
        //       type: "string",
        //     },
        //   },
        // },
        // cookies: {
        //   refresh_token: {
        //     description: "The refreshToken cookie",
        //     schema: {
        //       type: "string",
        //     },
        //   },
        // },
      },
      400: {
        description: "Invalid credentials or unverified email",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: { type: "string" },
                message: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};

paths["/api/v1/auth/token"] = {
  post: {
    tags: ["auth"],
    summary: "Generate a new access token using a refresh token",
    description:
      "This endpoint generates a new access token by validating the provided refresh token.",
    operationId: "generateNewAccessToken",
    requestBody: {
      description: "Refresh Token required to generate a new access token",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              refreshToken: {
                type: "string",
                description: "Valid refresh token from the user",
              },
            },
            required: ["refreshToken"],
          },
        },
      },
      required: true,
    },
    responses: {
      "200": {
        description: "Access token created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                  description: "Newly created access token for the user",
                },
              },
            },
          },
        },
      },
      "403": {
        description: "Invalid refresh token",
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
        description: "User not found",
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
paths["/api/v1/auth/refresh_token"] = {
  post: {
    tags: ["auth"],
    summary: "Generate a new refresh token",
    description:
      "This endpoint generates a new refresh token for authenticated users.",
    operationId: "newRefreshToken",
    requestBody: {
      description: "Refresh Token required to generate a new refresh token",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              refreshToken: {
                type: "string",
                description: "Valid refresh token from the user",
              },
            },
            required: ["refreshToken"],
          },
        },
      },
      required: true,
    },
    responses: {
      "200": {
        description: "New refresh token created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                refreshToken: {
                  type: "string",
                  description: "Newly created refresh token for the user",
                },
              },
            },
          },
        },
      },
      "403": {
        description: "Invalid refresh token",
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
        description: "User not found",
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
    security: [
      {
        cookieAuth: [],
      },
    ],
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

paths["/api/v1/users"] = {
  get: {
    tags: ["users"],
    summary: "Get a user all users",
    description: "This endpoint returns every user's data",
    operationId: "getAllUser",
    responses: {
      "200": {
        description: "User returned successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user: { type: "object" },
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

paths["/api/v1/users/{id}"] = {
  get: {
    tags: ["users"],
    summary: "Get a user by ID",
    description: "This endpoint returns a user by ID.",
    operationId: "getUser",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of user to return",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      "200": {
        description: "User found successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user: { type: "object" },
              },
            },
          },
        },
      },
      "400": {
        description: "Invalid user ID",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
          },
        },
      },
      "404": {
        description: "User not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
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

paths["/api/v1/users/dashboard"] = {
  get: {
    tags: ["users"],
    summary: "Get user dashboard",
    description: "This endpoint returns the user's dashboard.",
    operationId: "getDashboard",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        description: "User dashboard retrieved successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user: { type: "object" },
              },
            },
          },
        },
      },
      "401": {
        description: "Unauthorized",
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

paths["/api/v1/users/profile"] = {
  put: {
    tags: ["users"],
    summary: "Edit user profile",
    description: "This endpoint edits the user's profile.",
    operationId: "editProfile",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              old_password: { type: "string" },
              new_password: { type: "string" },
              confirm_password: { type: "string" },
              fullName: { type: "string" },
              phone: { type: "string", pattern: "^[0-9]{10,15}$" },
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
          },
        },
      },
    },
    responses: {
      "200": {
        description: "User profile updated successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user: { type: "object" },
              },
            },
          },
        },
      },
      "400": {
        description: "Bad request",
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
      "404": {
        description: "User not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
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

paths["/api/v1/pricing"] = {
  get: {
    tags: ["pricing"],
    summary: "Get all pricing packages",
    description: "Retrieves all pricing packages available.",
    responses: {
      "200": {
        description: "Successful response with pricing packages data",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/PricingPackage",
              },
            },
          },
        },
      },
    },
  },
};

paths["/api/v1/users/apikey"] = {
  get: {
    summary: "Get API key for a user",
    description: "Retrieves the API key associated with a user.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["users"],
    responses: {
      "200": {
        description: "Successful response with API key data",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                apiKey: {
                  type: "string",
                  description: "API key associated with the user",
                },
              },
            },
          },
        },
      },
      "404": {
        description: "Not Found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/NotFoundResponse",
            },
          },
        },
      },
      "401": {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UnauthorizedResponse",
            },
          },
        },
      },
      "500": {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
          },
        },
      },
    },
  },
};

paths["/api/v1/users/apikey/reset"] = {
  put: {
    summary: "Reset API key for a user",
    description: "Resets the API key associated with a user.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["users"],
    responses: {
      "200": {
        description: "Successful response with new API key data",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                apiKey: {
                  type: "string",
                  description: "New API key associated with the user",
                },
              },
            },
          },
        },
      },
      "404": {
        description: "Not Found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/NotFoundResponse",
            },
          },
        },
      },
      "401": {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UnauthorizedResponse",
            },
          },
        },
      },
      "500": {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
          },
        },
      },
    },
  },
};

paths["/api/v1/users/topup"] = {
    put: {
      tags: ["users"],
      summary: "Top up user balance",
      description: "This endpoint updates the user's balance by a specified amount.",
      operationId: "topupUserBalance",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                amount: { type: "number" },
              },
              required: ["amount"],
            },
          },
        },
        required: true,
      },
      responses: {
        "200": {
          description: "Balance updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid amount",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                },
              },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                },
              },
            },
          },
        },
        "404": {
          description: "User not found",
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
                  message: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  };  

paths["/api/v1/users/subscribe"] = {
    post: {
      tags: ["users"],
      summary: "Subscribe a user to a packet",
      description: "This endpoint subscribes a user to a packet.",
      operationId: "subscribePacket",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                paketId: { type: "string" },
              },
              required: ["paketId"]
            }
          }
        },
        required: true
      },
      responses: {
        "201": {
          description: "Subscription created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  subscription: { type: "object" }
                }
              }
            }
          }
        },
        "404": {
          description: "Packet not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" }
                }
              }
            }
          }
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  msg: { type: "string" }
                }
              }
            }
          }
        }
      }
    }
  };
  

paths["/api/v1/exercise/name"] = {
  get: {
    tags: ["exercise"],
    summary: "Get exercise details by name",
    description:
      "Retrieves information about an exercise based on the provided name query parameter.",
    parameters: [
      {
        name: "exercise",
        in: "query",
        description: "The name of the exercise to retrieve",
        required: false,
        type: "string",
      },
    ],
    responses: {
      "200": {
        description: "Successful operation",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                exercise: {
                  type: "object",
                  description: "The retrieved exercise data",
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Bad request (e.g., missing or invalid query parameter)",
      },
      "404": {
        description: "Exercise not found",
      },
      "500": {
        description: "Internal server error",
      },
    },
  },
};
paths["/api/v1/exercise/type"] = {
  get: {
    tags: ["exercise"],
    summary: "Get exercise details by type",
    description:
      "Retrieves information about exercises based on the provided type query parameter.",
    parameters: [
      {
        name: "type",
        in: "query",
        description:
          "The type of exercise to retrieve (e.g., chest, back, legs)",
        required: false,
        type: "string",
      },
    ],
    responses: {
      "200": {
        description: "Successful operation",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                exercise: {
                  type: "array",
                  description:
                    "An array of exercise data matching the specified type",
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Bad request (e.g., missing or invalid query parameter)",
      },
      "404": {
        description: "No exercises found for the specified type",
      },
      "500": {
        description: "Internal server error",
      },
    },
  },
};
paths["/api/v1/exercise/muscle"] = {
  get: {
    tags: ["exercise"],
    summary: "Get exercise details by muscle",
    description:
      "Retrieves information about exercises that target the provided muscle query parameter.",
    parameters: [
      {
        name: "muscle",
        in: "query",
        description:
          "The targeted muscle group of the exercise (e.g., chest, back, biceps)",
        required: false,
        type: "string",
      },
    ],
    responses: {
      "200": {
        description: "Successful operation",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                exercise: {
                  type: "array",
                  description:
                    "An array of exercise data targeting the specified muscle",
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Bad request (e.g., missing or invalid query parameter)",
      },
      "404": {
        description: "No exercises found for the specified muscle",
      },
      "500": {
        description: "Internal server error",
      },
    },
  },
};
paths["/api/v1/exercise/difficulty"] = {
  get: {
    tags: ["exercise"],
    summary: "Get exercise details by difficulty",
    description:
      "Retrieves information about exercises with the provided difficulty query parameter.",
    parameters: [
      {
        name: "difficulty",
        in: "query",
        description:
          "The difficulty level of the exercise (e.g., beginner, intermediate, advanced)",
        required: false,
        type: "string",
      },
    ],
    responses: {
      "200": {
        description: "Successful operation",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                exercise: {
                  type: "array",
                  description:
                    "An array of exercise data matching the specified difficulty",
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Bad request (e.g., missing or invalid query parameter)",
      },
      "404": {
        description: "No exercises found for the specified difficulty",
      },
      "500": {
        description: "Internal server error",
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
