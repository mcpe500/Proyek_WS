export default {
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
