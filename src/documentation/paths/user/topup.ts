export default {
  put: {
    tags: ["users"],
    summary: "Topup the user's balance",
    description: "This endpoint increases the user's balance.",
    operationId: "topup",
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
              amount: { type: "number" },
            },
            required: ["amount"],
          },
        },
      },
      required: true,
    },
    responses: {
      "200": {
        description: "Topup successful",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
                currentBalance: { type: "number" }
              },
            },
            examples: {
              success: {
                summary: "Topup successful",
                value: {
                  message: "Balance updated successfully.",
                  currentBalance: "Rp100000"
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Invalid topup amount",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              invalidAmount: {
                summary: "Invalid topup amount",
                value: {
                  message: "Invalid amount",
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
