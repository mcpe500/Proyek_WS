export default {
  get: {
    tags: ["exercises"],
    summary: "Get all fitness goals",
    description: "This endpoint retrieves a list of all fitness goals.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    operationId: "getAllGoals",
    responses: {
      "200": {
        description: "A list of fitness goals.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                Goal_list: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "500": {
        description: "Internal server error.",
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
              internalError: {
                summary: "Internal Server Error",
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
