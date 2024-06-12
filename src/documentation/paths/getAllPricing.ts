export default {
  get: {
    tags: ["pricing"],
    summary: "Get all pricing packages",
    description: "Retrieves all pricing packages available.",
    responses: {
      "200": {
        description: "Successful response with pricing packages data",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/PricingPackage",
              },
            },
          },
        },
      },
    },
  },
};
