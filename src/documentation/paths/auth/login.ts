export default {
    post: {
      tags: ["auth"],
      summary: "Login a user",
      description: "This endpoint logs in a user.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      operationId: "loginUser",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: { type: "string", default: "string" },
                email: { type: "string", format: "email", default: "" },
                password: { type: "string" },
                rememberMe: { type: "boolean" },
              },
              anyOf: [{ required: ["username"] }, { required: ["email"] }],
              required: ["password"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Logged in successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  token: { type: "string" },
                },
              },
              examples: {
                success: {
                  summary: "Login successful",
                  value: {
                    message: "Logged in successfully",
                    token: "your-access-token"
                  }
                }
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
                invalidCredentials: {
                  summary: "Invalid credentials",
                  value: {
                    message: "Invalid credentials",
                  },
                },
                emailNotVerified: {
                  summary: "Email not verified",
                  value: {
                    message: "Please verify your email",
                  },
                },
                emailVerificationExpired: {
                  summary: "Email verification token expired",
                  value: {
                    message:
                      "Your email verification token has expired and as a result, your account has been deleted",
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
                },
              },
              examples: {
                error: {
                  summary: "Internal server error",
                  value: {
                    message: "Internal server error",
                  },
                }
              }
            },
          },
        },
      },
    },
  };
  