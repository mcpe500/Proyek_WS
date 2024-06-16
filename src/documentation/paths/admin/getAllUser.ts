export default {
  get: {
    tags: ["admin"],
    summary: "Allow admin to get all users",
    description: "This endpoint returns every user's data",
    operationId: "getAllUser",
    responses: {
      "200": {
        description: "Users returned successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      role: { type: "string" },
                      _id: { type: "string" },
                      username: { type: "string" },
                      email: { type: "string" },
                      phone: { type: "string" },
                      isEmailVerified: { type: "boolean" },
                      fullName: { type: "string" },
                      balance: { type: "number" },
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
                msg: { type: "string" },
              },
            },
          },
        },
      },
      "404": {
        description: "No users found",
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
