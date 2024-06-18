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
                  createdDate: { type: "string", format: "date-time" },
                  status: { type: "string" },
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
                message: { type: "string" },
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
                msg: { type: "string" },
                plan: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
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
                    createdBy: { type: "string" },
                    status: { type: "string" },
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
          },
        },
      },
    },
  },
};
