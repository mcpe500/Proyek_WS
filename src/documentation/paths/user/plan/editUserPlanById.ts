export default {
  put: {
    tags: ["plans"],
    summary: "Edit a specific user plan",
    description: "This endpoint edits a specific plan of a user.",
    operationId: "editPlan",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "apiKey",
        in: "query",
        description: "User's API key",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "id",
        in: "path",
        description: "ID of the plan to edit",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              // Define the properties of the request body here
            },
          },
        },
      },
    },
    responses: {
      "200": {
        description: "User plan edited successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                plan: { type: "object" },
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
        description: "Plan not found",
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
                error: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};
