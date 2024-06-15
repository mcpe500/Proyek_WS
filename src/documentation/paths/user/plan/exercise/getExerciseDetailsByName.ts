export default {
  get: {
    tags: ["exercise"],
    summary: "Get exercise details by name",
    description:
      "Retrieves information about an exercise based on the provided name query parameter.",
    parameters: [
      {
        name: "exercise",
        in: "query",
        description: "The name of the exercise to retrieve",
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
                  type: "object",
                  description: "The retrieved exercise data",
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
        description: "Exercise not found",
      },
      "500": {
        description: "Internal server error",
      },
    },
  },
};
