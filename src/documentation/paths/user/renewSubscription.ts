export default {
  put: {
    tags: ["users"],
    summary: "Renew a subscription",
    description: "This endpoint renews a user's subscription to a packet.",
    operationId: "renewSubscription",
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
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              month: { type: "number" },
            },
            required: ["month"],
          },
        },
      },
      required: true,
    },
    responses: {
      "200": {
        description: "Subscription successfully renewed",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                subscription: { type: "object" },
              },
            },
          },
        },
      },
      "400": {
        description: "Invalid number of month",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
          },
        },
      },
      "404": {
        description: "Packet not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
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
