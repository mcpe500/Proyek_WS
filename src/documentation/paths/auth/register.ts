export default {
  post: {
    tags: ["auth"],
    summary: "Register a new user",
    description: "This endpoint registers a new user.",
    operationId: "registerUser",
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
              username: { type: "string" },
              email: { type: "string", format: "email" },
              password: { type: "string" },
              fullName: { type: "string" },
              phone: { type: "string", pattern: "^[0-9]{10,15}$" },
            },
            required: ["username", "email", "password", "fullName", "phone"],
          },
        },
      },
      required: true,
    },
    responses: {
      "201": {
        description:
          "Register Successful, please verify your email within 24 hours!",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
                user: { type: "object" },
              },
            },
            examples: {
              success: {
                summary: "Register success",
                value: {
                  message: "Register Successful, please verify your email within 24 hours!",
                  user: {
                    username: "user123",
                    email: "user123@example.com",
                    fullName: "User",
                    phone: "1234567890123",
                    _id: "66719b74cbdc36cec79931d6"
                  }
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
              dupe: {
                summary: "Duplicate key",
                value: {
                  message: "Username or email already exists.",
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
