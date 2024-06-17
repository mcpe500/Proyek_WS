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
  