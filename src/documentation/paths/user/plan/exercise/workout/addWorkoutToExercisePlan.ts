export default {
  put: {
    tags: ["plans"],
    summary: "Add workout to exercise plan",
    description: "This endpoint adds a workout to a specific exercise plan.",
    operationId: "addWorkoutToExercisePlan",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "apiKey",
        in: "query",
        description: "User's API key",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "id",
        in: "path",
        required: true,
        description: "The ID of the exercise plan",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              exerciseId: {
                type: "string",
                description: "The ID of the exercise to add to the plan",
              },
              sets: {
                type: "number"
              },
              repetitions: {
                type: "number"
              }, 
              restBetweenSetsInSeconds: {
                type: "number"
              }
            },
            required: ["exerciseId", "sets", "repetitions", "restBetweenSetsInSeconds"],
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Exercise added to plan successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              success: {
                summary: "Success",
                value: {
                  message: "Exercise added to plan successfully",
                },
              },
            }
          },
        },
      },
      "400": {
        description: "Bad Request",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              userMismatch: {
                summary: "User Mismatch",
                value: {
                  message: "Not your plan",
                },
              },
              fieldError: {
                summary: "Field Error",
                value: {
                  message: "sets, repititions, and restBetweenSetsInSeconds must be a number",
                },
              },
              statusError: {
                summary: "Status invalid",
                value: {
                  message: "Plan has been started/completed/canceled",
                },
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
            examples: {
              unauthorized: {
                summary: "Unauthorized",
                value: {
                  message: "Unauthorized",
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
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              planNotFound: {
                summary: "Plan Not Found",
                value: {
                  message: "Plan not found",
                },
              },
              exerciseNotFound: {
                summary: "Exercise Not Found",
                value: {
                  message: "Exercise not found",
                },
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
                error: { type: "string" },
              },
            },
            examples: {
              internalError: {
                summary: "Internal Server Error",
                value: {
                  message: "Internal server error",
                },
              },
            },
          },
        },
      },
    },
  },
};
