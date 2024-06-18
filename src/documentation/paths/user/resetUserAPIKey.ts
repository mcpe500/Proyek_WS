export default {
  put: {
    summary: "Reset API key for a user",
    description: "Resets the API key associated with a user.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["users"],
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
    ],
    responses: {
      "200": {
        description: "Successful response with new API key data",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                apiKey: {
                  type: "string",
                  description: "New API key associated with the user",
                },
              },
            },
            examples: {
              success: {
                summary: "API key reset successfully",
                value: {
                  apiKey: "new-generated-api-key",
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Bad Request - Invalid API key format",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              invalidFormat: {
                summary: "Invalid API key format",
                value: {
                  message: "Invalid API key format",
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
      "403": {
        description: "Forbidden - Subscription expired",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              subscriptionExpired: {
                summary: "Subscription expired",
                value: {
                  message: "Your subscription has expired",
                },
              },
            },
          },
        },
      },
      "404": {
        description: "Not Found - API key not found or Paket not found",
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
                summary: "API key not found",
                value: {
                  message: "Invalid API Key",
                },
              },
              paketNotFound: {
                summary: "Paket not found or invalid",
                value: {
                  message: "Paket not found or invalid",
                },
              },
            },
          },
        },
      },
      "429": {
        description: "Too Many Requests",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              toomanyrequest: {
                summary: "Api Hit Limit Reached",
                value: {
                  message: "Api Hit limit reached",
                },
              },
            },
          },
        },
      },
      "500": {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              internalError: {
                summary: "Internal server error",
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
