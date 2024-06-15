export default {
  get: {
    tags: ["root"],
    summary: "Check API Service status",
    description: "This endpoint checks if the API Service is running.",
    operationId: "checkStatus",
    responses: {
      "200": {
        description: "API Service is running",
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
