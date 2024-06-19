export default {
  put: {
    tags: ["plans"],
    summary: "Cancel an exercise plan by user",
    description: "This endpoint allows a user to cancel their exercise plan.",
    operationId: "cancelExercisePlanByUser",
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
        schema: {
          type: "string",
        },
        description: "The ID of the exercise plan to be cancelled.",
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                  },
                },
                required: ["_id"],
              },
            },
            required: ["user"],
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Plan has been cancelled successfully.",
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
            examples: {
              success: {
                summary: "Success",
                value: {
                  message: "Plan has been cancelled",
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
              invalidId: {
                summary: "Invalid ID",
                value: {
                  message: "Invalid ID",
                },
              },
              userMismatch: {
                summary: "User Mismatch",
                value: {
                  message: "Not your plan",
                },
              },
              statusError: {
                summary: "Status invalid",
                value: {
                  message: "Plan is already completed or cancelled",
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