export default {
  put: {
    tags: ["super-admin"],
    summary: "Update a Paket",
    description: "This endpoint updates an existing Paket.",
    operationId: "updatePaket",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of Paket to update",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
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
              name: { type: "string" },
              description: { type: "string" },
              limit: { type: "number" },
              price: { type: "number" },
              currency: { type: "string" },
            },
          },
          example: {
            name: "Updated Paket",
            description: "Updated description",
            limit: 100,
            price: 200000,
            currency: "IDR",
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Paket updated successfully",
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
      "404": {
        description: "Paket not found",
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
  delete: {
    tags: ["super-admin"],
    summary: "Delete a Paket",
    description: "This endpoint deletes an existing Paket.",
    operationId: "deletePaket",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of Paket to delete",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        description: "Paket deleted successfully",
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
      "404": {
        description: "Paket not found",
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
};
