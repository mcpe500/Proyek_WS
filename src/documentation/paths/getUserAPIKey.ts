export default {
  get: {
    summary: "Get API key for a user",
    description: "Retrieves the API key associated with a user.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["users"],
    responses: {
      "200": {
        description: "Successful response with API key data",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                apiKey: {
                  type: "string",
                  description: "API key associated with the user",
                },
              },
            },
          },
        },
      },
      "404": {
        description: "Not Found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/NotFoundResponse",
            },
          },
        },
      },
      "401": {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UnauthorizedResponse",
            },
          },
        },
      },
      "500": {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
          },
        },
      },
    },
  },
};
