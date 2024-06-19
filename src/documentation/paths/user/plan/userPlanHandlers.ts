import { FITNESS_GOALS } from "../../../../contracts/enum/FitnessRelated.enum";

export default {
  get: {
    tags: ["plans"],
    summary: "Get all user plans",
    description: "This endpoint returns all the plans of a user.",
    operationId: "getAllPlans",
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
    ],
    responses: {
      "200": {
        description: "User plans retrieved successfully",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  name: { type: "string" },
                  status: { type: "string" },
                  createdDate: { type: "string", format: "date-time" },
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
                message: { type: "string" },
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
      "500": {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
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
  post: {
    tags: ["plans"],
    summary: "Create a new exercise plan",
    description: "This endpoint creates a new exercise plan for a user.",
    operationId: "createExercisePlan",
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
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              goals: {
                type: "array",
                items: {
                  type: "string",
                  enum: Object.values(FITNESS_GOALS),
                },
                example: (Object.values(FITNESS_GOALS) as any).map(
                  (fg: any) => fg.code
                ),
              },
              durationInWeeks: { type: "number" },
              frequencyPerWeek: { type: "number" },
              restDaysPerWeek: { type: "number" },
              intensity: { type: "number" },
            },
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Exercise plan created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string", enum: ["Exercise plan created successfully"] },
                plan: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    goals: {
                      type: "array",
                      items: {
                        type: "string",
                        enum: Object.values(FITNESS_GOALS),
                      },
                    },
                    durationInWeeks: { type: "number" },
                    frequencyPerWeek: { type: "number" },
                    restDaysPerWeek: { type: "number" },
                    intensity: { type: "number" },
                    exercises: {
                      type: "array",
                      items: {
                        type: "object",
                      },
                    },
                    createdBy: { type: "string" },
                    status: { type: "string" },
                    _id: { type: "string" },
                    createdDate: { type: "string", format: "date-time" },
                    __v: { type: "number" },
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
                error: { type: "string" },
              },
            },
            examples: {
              InvalidGoals: {
                summary: "Invalid goals provided",
                value: {
                  error: "Goals must be one of WEIGHT_LOSS, WEIGHT_GAIN, BODY_BUILDING, MUSCLE_GAIN, ENDURANCE_TRAINING, FLEXIBILITY_IMPROVEMENT, GENERAL_FITNESS, STRESS_RELIEF"
                }
              },
                InvalidDurationInWeeks: {
                  summary: "Invalid duration in weeks",
                  value: {
                    error: "Duration in weeks must be a positive number"
                  }
              },
                InvalidFrequencyPerWeek: {
                  summary: "Invalid frequency per week",
                  value: {
                    error: "Frequency per week must be a positive number"
                  }
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
      "500": {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: { type: "string" },
                error: { type: "string" },
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
