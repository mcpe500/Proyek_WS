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
        description: "Bad Request - Invalid request format or fields",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Invalid request format. Expected an array of subscriptions."
                }
              }
            },
            examples: {
              invalidRequest: {
                summary: "Invalid request format",
                value: {
                  message: "Invalid request format. Expected an array of subscriptions."
                }
              },
              missingFields: {
                summary: "Request fields not valid",
                value: {
                  message: "Request fields not valid"
                }
              },
              invalidMonths: {
                summary: "Invalid number of months",
                value: {
                  message: "Invalid number of months for paket: PAK001"
                }
              },
              restrictedPaket: {
                summary: "Restricted paket",
                value: {
                  message: "You can't subscribe to this paket: PAK001"
                },
              },
              notEnoughBalance: {
                summary: "Insufficient balance",
                value: {
                  message: "Not enough balance! Please top up first"
                }
              }

            }
          }
        }
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
      "404": {
        description: "User not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              userNotFound: {
                summary: "User not found",
                value: {
                  message: "User not found",
                },
              },
              paketNotFound: {
                summary: "Paket not found",
                value: {
                  message: "Paket not found: PAK002"
                }
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
