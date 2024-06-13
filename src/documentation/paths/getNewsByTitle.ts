export default {
  get: {
    tags: ["news"],
    summary: "Get specific news article",
    description:
      "This endpoint retrieves a specific news article based on the title parameter.",
    operationId: "getSpecificNews",
    parameters: [
      {
        name: "title",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "The title of the news article to retrieve.",
      },
    ],
    responses: {
      "200": {
        description: "Details of the specific news article.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                content: { type: "string" },
                nextRecommendation: { type: "string" },
                previousRecommendation: { type: "string" },
                writer: { type: "string" },
                publishedDate: { type: "string" },
              },
            },
          },
        },
      },
      "404": {
        description: "Article not found.",
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
        description: "An error occurred while extracting the specific news.",
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
