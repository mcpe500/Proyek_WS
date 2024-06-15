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
                packet: { type: "object" },
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
                msg: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      "404": {
        description: "User or Packet not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: {
                  type: "string",
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
                msg: {
                  type: "string",
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
            type: "object",
            properties: {
              paket_id: { type: "string" },
            },
            required: ["paket_id"],
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
      "401": {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      "404": {
        description: "User or Packet not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: {
                  type: "string",
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
                msg: {
                  type: "string",
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
                msg: {
                  type: "string",
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
                msg: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      "404": {
        description: "User or Packet not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: {
                  type: "string",
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
                msg: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};
