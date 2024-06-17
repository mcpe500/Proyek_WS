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
            },
            required: ["exerciseId"],
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
                msg: { type: "string" },
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
      "404": {
        description: "Not Found",
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
                msg: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};
