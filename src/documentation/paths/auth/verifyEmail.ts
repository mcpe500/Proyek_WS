export default {
  get: {
    tags: ["auth"],
    summary: "Verify user's email",
    description:
      "This endpoint verifies a user's email using the email verification token.",
    operationId: "verifyEmail",
    parameters: [
      {
        name: "emailVerificationToken",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "The email verification token provided to the user.",
      },
    ],
    responses: {
      "200": {
        description: "Email verified successfully.",
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
                summary: "Email verified successfully",
                value: {
                  message: "Email verified successfully.",
                },
              },
            },
          },
        },
      },
      "403": {
        description: "Invalid or expired email verification token.",
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
                summary: "Invalid or expired email verification token",
                value: {
                  message: "Invalid email verification token or your email verification token has expired",
                },
              },
            },
          },
        },
      },
      "404": {
        description: "User not found.",
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
  },
};
