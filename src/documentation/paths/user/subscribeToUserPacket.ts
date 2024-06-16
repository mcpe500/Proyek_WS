export default {
  post: {
    tags: ["users"],
    summary: "Subscribe a user to a packet",
    description: "This endpoint subscribes a user to a packet.",
    operationId: "subscribePacket",
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
              paketId: { type: "string" },
              month: { type: "number" },
            },
            required: ["paketId", "month"],
          },
        },
      },
      required: true,
    },
    responses: {
      "201": {
        description: "Subscription created successfully",
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
