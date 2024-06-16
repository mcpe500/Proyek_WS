export default {
  get: {
    tags: ["news"],
    summary: "Get all or filtered news articles",
    description:
      "This endpoint retrieves all news articles from the specified sources or filters them based on the provided query parameters.",
    operationId: "getFilteredNews",
    parameters: [
      {
        name: "title",
        in: "query",
        required: false,
        description: "The title to filter the news articles by.",
        schema: {
          type: "string"
        }
      }
    ],
    responses: {
      "200": {
        description: "A list of news articles, possibly filtered by title.",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  url: { type: "string" },
                  detail: { type: "string" },
                  type: { type: "string" },
                  writer: { type: "string" },
                  publishedDate: { type: "string" },
                },
              },
            },
          },
        },
      },
      "404": {
        description: "No articles found matching the criteria.",
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
