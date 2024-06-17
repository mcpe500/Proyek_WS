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
            type: "array",
            items: {
              type: "object",
              properties: {
                paketId: { type: "string" },
                month: { type: "number" },
              },
              required: ["paketId", "month"],
            },
          },
          example: [
            {
              paketId: "PAK002",
              month: 1
            },
            {
              paketId: "PAK003",
              month: 2
            }
          ],

        },
      },
      required: true,
    },
    responses: {
      "201": {
        description: "Subscriptions created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
                transaction: {
                  type: "object",
                  properties: {
                    transactionHeaderType: { type: "string" },
                    date: { type: "string", format: "date-time" },
                    total: { type: "number" },
                    userId: { type: "string" },
                    isAdmin: { type: "boolean" },
                  },
                },
                subscriptions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      transactionDetailType: { type: "string" },
                      paket_id: { type: "string" },
                      subscription_id: { type: "string" },
                      month: { type: "number" },
                      price: { type: "number" },
                      subtotal: { type: "number" },
                      message: { type: "string" },
                    },
                  },
                },
                remainingBalance: { type: "number" },
              },
            },
          },
        },
      },
      "400": {
        description: "Invalid number of months",
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
