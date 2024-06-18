export default {
  post: {
    tags: ["super-admin"],
    summary: "Create a new Paket",
    description: "This endpoint creates a new Paket.",
    operationId: "createPaket",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              idNumber: { type: "number" },
              name: { type: "string" },
              description: { type: "string" },
              limit: { type: "number" },
              price: { type: "number" },
              currency: { type: "string" },
            },
            required: ["name", "limit", "price"],
          },
          example: {
            idNumber: 1,
            name: "Basic Paket",
            description: "Basic subscription paket",
            limit: 50,
            price: 100000,
            currency: "IDR",
          },
        },
      },
      required: true,
    },
    responses: {
      "201": {
        description: "Paket created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
                paket: {
                  type: "object",
                  properties: {
                    Paket_id: { type: "string" },
                    Paket_name: { type: "string" },
                    Paket_description: { type: "string" },
                    Paket_Limit: { type: "number" },
                    Paket_price: { type: "number" },
                    Paket_price_currency: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Validation error",
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
              },
            },
          },
        },
      },
    },
  },
}