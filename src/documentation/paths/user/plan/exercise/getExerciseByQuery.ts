export default {
  get: {
    summary: "Get Exercise",
    description: "Get exercise data based on various filters",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        in: "header",
        name: "authorization",
        required: true,
        schema: {
          type: "string",
        },
        description: "Bearer token for authentication",
      },
      {
        in: "body",
        name: "body",
        required: true,
        schema: {
          type: "object",
          properties: {
            exercise: {
              type: "string",
              description: "Exercise name",
            },
            type: {
              type: "string",
              enum: [
                "cardio",
                "olympic_weightlifting",
                "plyometrics",
                "powerlifting",
                "strength",
                "stretching",
                "strongman",
              ],
              description: "Exercise type",
            },
            muscle: {
              type: "string",
              enum: [
                "abdominals",
                "abductors",
                "adductors",
                "biceps",
                "calves",
                "chest",
                "forearms",
                "glutes",
                "hamstrings",
                "lats",
                "lower_back",
                "middle_back",
                "neck",
                "quadriceps",
                "traps",
                "triceps",
              ],
              description: "Target muscle",
            },
            difficulty: {
              type: "string",
              enum: ["beginner", "intermediate", "expert"],
              description: "Exercise difficulty level",
            },
            page: {
              type: "integer",
              default: 0,
              description: "Page number for pagination",
            },
          },
        },
      },
    ],
    responses: {
      "200": {
        description: "Successful response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                exercise: {
                  type: "array",
                  items: {
                    type: "object",
                  },
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
                error: {
                  type: "string",
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
                error: {
                  type: "string",
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
              type: "object",
              properties: {
                error: {
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
                error: {
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
