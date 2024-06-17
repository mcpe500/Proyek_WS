export default {
    put: {
      tags: ["plans"],
      summary: "Cancel an exercise plan by user",
      description: "This endpoint allows a user to cancel their exercise plan.",
      operationId: "cancelExercisePlanByUser",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the exercise plan to be cancelled.",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                    },
                  },
                  required: ["_id"],
                },
              },
              required: ["user"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Plan has been cancelled successfully.",
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
            },
          },
        },
        "400": {
          description: "Plan status is already completed or cancelled.",
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
          description: "Plan not found or not the user's plan.",
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
            },
          },
        },
      },
    },
  };