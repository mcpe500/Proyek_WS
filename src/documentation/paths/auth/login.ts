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
                msg: { type: "string" },
                token: { type: "string" },
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
      "500": {
        description: "Internal server error",
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
    },
  },
};
