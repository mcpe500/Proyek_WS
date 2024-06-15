export default {
  get: {
    tags: ["admin"],
    summary: "Allow admin to get a user all users",
    description: "This endpoint returns every user's data",
    operationId: "getAllUser",
    responses: {
      "200": {
        description: "User returned successfully",
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
