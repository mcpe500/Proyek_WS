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
        in: "query",
        name: "exercise",
        schema: {
          type: "string",
        },
        description: "Exercise name",
      },
      {
        in: "query",
        name: "type",
        schema: {
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
        },
        description: "Exercise type",
      },
      {
        in: "query",
        name: "muscle",
        schema: {
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
            "shoulders",
          ],
        },
        description: "Target muscle",
      },
      {
        in: "query",
        name: "difficulty",
        schema: {
          type: "string",
          enum: ["beginner", "intermediate", "expert"],
        },
        description: "Exercise difficulty level",
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
                    properties: {
                      _id: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                        description: "Name of the exercise",
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
                        description: "Type of exercise",
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
                          "shoulders",
                        ],
                        description: "Target muscle",
                      },
                      difficulty: {
                        type: "string",
                        enum: [
                          "beginner",
                          "intermediate",
                          "expert",
                        ],
                        description: "Exercise difficulty",
                      },
                      equipmentRequired: {
                        type: "string",
                        description: "Equipment used",
                      },
                      instructions: {
                        type: "string",
                        description: "Instructions for the exercise",
                      },
                    },
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
