export default {
  post: {
    tags: ["plans"],
    summary: "Start a specific user plan",
    description: "This endpoint starts a specific plan of a user.",
    operationId: "startPlan",
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
        description: "ID of the plan to start",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      "200": {
        description: "User plan started successfully",
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
              planStarted: {
                summary: "Plan already started",
                value: {
                  message: "Plan already started",
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
              notFound: {
                summary: "Plan Not Found",
                value: {
                  message: "Plan not found",
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
