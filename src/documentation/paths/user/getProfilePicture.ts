export default {
  get: {
    tags: ["users"],
    summary: "Get user profile picture",
    description: "This endpoint returns the user's profile picture.",
    operationId: "getProfilePicture",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        description: "User profile picture retrieved successfully",
        content: {
          "image/png": {
            schema: {
              type: "string",
              format: "binary"
            },
            example: "User's profile picture"
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
              wrongRole: {
                summary: "Wrong role",
                value: {
                  message: "User role is not customer",
                },
              }
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
            examples: {
              error: {
                summary: "Internal server error",
                value: {
                  message: "Internal server error",
                },
              },
            },
          },
        },
      }
    },
  },
};
