export default {
  get: {
    tags: ["pricing"],
    summary: "Get all pricing packages",
    description: "Retrieves all pricing packages available.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        description: "Successful response with pricing packages data",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  Paket_id: {
                    type: "string",
                    example: "PAK001",
                  },
                  Paket_name: {
                    type: "string",
                    example: "Starter",
                  },
                  Paket_description: {
                    type: "string",
                    example: "Free package with limited rate",
                  },
                  Paket_Limit: {
                    type: "integer",
                    example: 15,
                  },
                  Paket_price: {
                    type: "integer",
                    example: 0,
                  },
                  Paket_price_currency: {
                    type: "string",
                    example: "IDR",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
