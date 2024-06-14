export default {
  get: {
    tags: ["news"],
    summary: "Get all news articles",
    description:
      "This endpoint retrieves all news articles from the specified sources.",
    operationId: "getAllNews",
    responses: {
      "200": {
        description: "A list of news articles.",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  url: { type: "string" },
                  // Add other article properties as needed
                },
              },
            },
          },
        },
      },
      "500": {
        description: "An error occurred while extracting news.",
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
};
