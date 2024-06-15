export default {
  get: {
    tags: ["exercise"],
    summary: "Get exercise details by muscle",
    description:
      "Retrieves information about exercises that target the provided muscle query parameter.",
    parameters: [
      {
        name: "muscle",
        in: "query",
        description:
          "The targeted muscle group of the exercise (e.g., chest, back, biceps)",
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
                    "An array of exercise data targeting the specified muscle",
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
        description: "No exercises found for the specified muscle",
      },
      "500": {
        description: "Internal server error",
      },
    },
  },
};
