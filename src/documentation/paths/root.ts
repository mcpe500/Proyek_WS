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
            example: {
              message: "This API Service is currently running",
            }
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
            example: {
              message: "Internal server error",
            },
          },
        },
      },
    },
  },
};
