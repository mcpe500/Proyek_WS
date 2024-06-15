export default {
  get: {
    tags: ["admin"],
    summary: "Get a user by ID",
    description: "This endpoint returns a user by ID.",
    operationId: "getUser",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of user to return",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      "200": {
        description: "User found successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user: { type: "object" },
              },
            },
          },
        },
      },
      "400": {
        description: "Invalid user ID",
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
        description: "User not found",
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
                error: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};
