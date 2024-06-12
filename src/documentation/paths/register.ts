export default {
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