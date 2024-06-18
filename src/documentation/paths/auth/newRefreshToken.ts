export default {
  post: {
    tags: ["auth"],
    summary: "Generate a new refresh token",
    description:
      "This endpoint generates a new refresh token for authenticated users.",
    operationId: "newRefreshToken",
    requestBody: {
      description: "Refresh Token required to generate a new refresh token",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              refreshToken: {
                type: "string",
                description: "Valid refresh token from the user",
              },
            },
            required: ["refreshToken"],
          },
        },
      },
      required: true,
    },
    responses: {
      "200": {
        description: "New refresh token created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                refreshToken: {
                  type: "string",
                  description: "Newly created refresh token for the user",
                },
              },
            },
            examples: {
              success: {
                summary: "New refresh token created successfully",
                value: {
                  message: "Refresh token generated successfully",
                  refreshToken: "your-new-refresh-token",
                },
              },
            },
          },
        },
      },
      "403": {
        description: "Invalid refresh token",
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
              invalidToken: {
                summary: "Invalid refresh token",
                value: {
                  message: "Invalid refresh token",
                },
              },
              tokenNotString: {
                summary: "Refresh token not a string",
                value: {
                  message: "**refreshToken** must be a string",
                },
              },
              tokenEmpty: {
                summary: "Refresh token empty",
                value: {
                  message: "**refreshToken** cannot be empty",
                },
              },
              tokenRequired: {
                summary: "Refresh token required",
                value: {
                  message: "**refreshToken** is a required field",
                },
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
                message: {
                  type: "string",
                },
              },
            },
            examples: {
              userNotFound: {
                summary: "User not found",
                value: {
                  message: "User not found",
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
};
