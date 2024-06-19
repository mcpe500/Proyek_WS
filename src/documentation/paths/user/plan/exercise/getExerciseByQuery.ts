export default {
  get: {
    tags: ["exercises"],
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
            examples: {
              invalidType: {
                summary: "Invalid Type",
                value: {
                  error: "Type not valid. Valid types are: cardio, olympic_weightlifting, plyometrics, powerlifting, strength, stretching, strongman",
                },
              },
              invalidMuscle: {
                summary: "Invalid Muscle",
                value: {
                  error: "Muscle not valid. Valid muscles are: abdominals, abductors, adductors, biceps, calves, chest, forearms, glutes, hamstrings, lats, lower_back, middle_back, neck, quadriceps, traps, triceps, shoulders",
                },
              },
              invalidDifficulty: {
                summary: "Invalid Difficulty",
                value: {
                  error: "Difficulty not valid. Valid difficulty levels are: beginner, intermediate, expert",
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
                message: {
                  type: "string",
                },
              },
            },
            examples: {
              unauthorized: {
                summary: "Unauthorized",
                value: {
                  message: "Unauthorized",
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
            examples: {
              notFound: {
                summary: "Exercise Not Found",
                value: {
                  error: "Exercise Not Found!",
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
