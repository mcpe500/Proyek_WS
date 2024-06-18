export default {
    post: {
      tags: ["admin"],
      summary: "Add or update exercises",
      description: "This endpoint fetches exercises from an external API and adds/updates them in the database.",
      operationId: "addExercise",
      parameters: [
        {
          name: "offset",
          in: "query",
          description: "Offset for pagination, must be a non-negative integer.",
          required: true,
          schema: {
            type: "integer",
            example: 0
          }
        },
        {
          name: "limit_per_ten",
          in: "query",
          description: "Limit per ten, must be a non-negative integer.",
          required: true,
          schema: {
            type: "integer",
            example: 10
          }
        }
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
                  msg: { type: "string" },
                },
              },
              examples: {
                success: {
                  summary: "Exercises added/updated successfully",
                  value: {
                    msg: "Exercises have been added/updated successfully.",
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Bad Request",
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
              examples: {
                invalidParameters: {
                  summary: "Invalid parameters",
                  value: {
                    msg: "Offset and limit must be non-negative integers.",
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
        "500": {
          description: "Internal Server Error",
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
              examples: {
                error: {
                  summary: "Internal server error",
                  value: {
                    msg: "Exercises added/updated failed.",
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  