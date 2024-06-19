export default {
  get: {
    tags: ["admin"],
    summary: "Get user packet",
    description: "This endpoint returns the packet of a specific user.",
    operationId: "getUserPacket",
    parameters: [
      {
        name: "userID",
        in: "path",
        description: "ID of user to fetch",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: { type: "string" },
                nama: { type: "string" },
                subscription_start: { type: "string", format: "date-time" },
                subscription_end: { type: "string", format: "date-time" },
                apiKey: { type: "string" },
                packet: { type: "object",
                  properties:{
                    Paket_id: { type: "string" },
                    Paket_name: { type: "string" },
                    Paket_description: { type: "string" },
                    Paket_limit: { type: "number" },
                    Paket_price: { type: "number" },
                    Paket_currency: { type: "string" },
                  }
                 },
              },
            },
            example: {
              username: "Verdie85",
              nama: "Viola Wintheiser-Zemlak",
              subscription_start: "2024-06-18T16:26:14.431Z",
              subscription_end: "2024-07-18T16:26:14.431Z",
              apiKey: "4352e706fcef209f9a174099e1e019b5bde43457ebf85dda30aec3e9de897f67",
              packet: {
                Paket_id: "PAK001",
                Paket_name: "Starter",
                Paket_description: "Free package with limited rate",
                Paket_Limit: 15,
                Paket_price: 0,
                Paket_price_currency: "IDR"
              }
            }
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
                  message: "User role is not ADMIN",
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
                message: {
                  type: "string",
                },
              },
            },
            examples: {
              userNotFound: {
                summary: "User Not Found",
                value: {
                  message: "User not found",
                },
              },
              subscriptionNotFound: {
                summary: "Subscription Not Found",
                value: {
                  message: "User doesn't have any subscription",
                },
              },
              paketNotFound: {
                summary: "Packet Not Found",
                value: {
                  message: "Packet not found",
                },
              },
            }
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
                message: {
                  type: "string",
                },
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
      },
    },
  },
  post: {
    tags: ["admin"],
    summary: "Add user packet",
    description: "This endpoint adds a packet to a specific user.",
    operationId: "addUserPacket",
    parameters: [
      {
        name: "userID",
        in: "path",
        description: "ID of user to add packet",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
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
                paket_id: { type: "string" },
                month: { type: "number" },
              },
              required: ["paket_id", "month"],
            },
          },
          example: [
            {
              paket_id: "PAK002",
              month: 1,
            },
            {
              paket_id: "PAK003",
              month: 2,
            },
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
                  message: "User role is not ADMIN",
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
                message: {
                  type: "string",
                },
              },
            },
            examples: {
              userNotFound: {
                summary: "User Not Found",
                value: {
                  message: "User not found",
                },
              },
              paketNotFound: {
                summary: "Packet Not Found",
                value: {
                  message: "Packet not found",
                },
              },
            }
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
                message: {
                  type: "string",
                },
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
      },
    },
  },
  delete: {
    tags: ["admin"],
    summary: "Delete user packet",
    description: "This endpoint deletes the packet of a specific user.",
    operationId: "deleteUserPacket",
    parameters: [
      {
        name: "userID",
        in: "path",
        description: "ID of user to delete packet",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        description: "Success",
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
                summary: "Delete Success",
                value: {
                  message: "Subscription deleted successfully",
                },
              },
            } 
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
                  message: "User role is not ADMIN",
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
                message: {
                  type: "string",
                },
              },
            },
            examples: {
              userNotFound: {
                summary: "User Not Found",
                value: {
                  message: "User not found",
                },
              },
              paketNotFound: {
                summary: "Packet Not Found",
                value: {
                  message: "Packet not found",
                },
              },
            }
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
                message: {
                  type: "string",
                },
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
      },
    },
  },
};
