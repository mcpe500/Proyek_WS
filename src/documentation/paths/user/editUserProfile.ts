export default {
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