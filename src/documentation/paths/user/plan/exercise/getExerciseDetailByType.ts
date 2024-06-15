export default {
  get: {
    tags: ["exercise"],
    summary: "Get exercise details by type",
    description:
      "Retrieves information about exercises based on the provided type query parameter.",
    parameters: [
      {
        name: "type",
        in: "query",
        description:
          "The type of exercise to retrieve (e.g., chest, back, legs)",
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
                    "An array of exercise data matching the specified type",
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
        description: "No exercises found for the specified type",
      },
      "500": {
        description: "Internal server error",
      },
    },
  },
};
