export default {
  get: {
    tags: ["exercise"],
    summary: "Get exercise details by difficulty",
    description:
      "Retrieves information about exercises with the provided difficulty query parameter.",
    parameters: [
      {
        name: "difficulty",
        in: "query",
        description:
          "The difficulty level of the exercise (e.g., beginner, intermediate, advanced)",
        required: false,
        type: "string",
      },
    ],
    responses: {
      "200": {
        description: "Successful operation",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                exercise: {
                  type: "array",
                  description:
                    "An array of exercise data matching the specified difficulty",
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Bad request (e.g., missing or invalid query parameter)",
      },
      "404": {
        description: "No exercises found for the specified difficulty",
      },
      "500": {
        description: "Internal server error",
      },
    },
  },
};
