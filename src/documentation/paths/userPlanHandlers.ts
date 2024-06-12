export default {
  get: {
    tags: ["users"],
    summary: "Get all user plans",
    description: "This endpoint returns all the plans of a user.",
    operationId: "getAllPlans",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        description: "User plans retrieved successfully",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: { type: "object" },
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
  post: {
    tags: ["users"],
    summary: "Create a new exercise plan",
    description: "This endpoint creates a new exercise plan for a user.",
    operationId: "createExercisePlan",
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
              // Define the properties of the request body here
            },
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Exercise plan created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                plan: { type: "object" },
              },
            },
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
