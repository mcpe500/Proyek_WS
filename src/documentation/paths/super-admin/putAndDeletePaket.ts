export default {
  put: {
    tags: ["super-admin"],
    summary: "Update Paket details",
    description: "This endpoint updates details of a Paket.",
    operationId: "updatePaket",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of the Paket to be updated",
        required: true,
        schema: {
          type: "string",
        },
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
            example: {
              name: "Updated Paket",
              description: "Updated subscription paket",
              limit: 100,
              price: 150000,
              currency: "USD",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
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
            examples: {
              success: {
                summary: "Paket updated successfully",
                value: {
                  message: "Paket updated successfully",
                  paket: {
                    Paket_id: "PAK001",
                    Paket_name: "Updated Paket",
                    Paket_description: "Updated subscription paket",
                    Paket_Limit: 100,
                    Paket_price: 150000,
                    Paket_price_currency: "USD",
                  },
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Bad Request",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              validationError: {
                summary: "Validation error",
                value: {
                  message: "Limit should be greater than 0",
                },
              },
              invalidInput: {
                summary: "Invalid input",
                value: {
                  message: "Invalid input data format",
                },
              },
              invalidId: {
                summary: "Invalid Paket ID",
                value: {
                  message: "Paket not found",
                },
              },
              missingName: {
                summary: "Missing name",
                value: {
                  message: "Name is a required field",
                },
              },
              invalidCurrency: {
                summary: "Invalid currency",
                value: {
                  message: "Currency should be a type of text",
                },
              },
              negativePrice: {
                summary: "Negative price",
                value: {
                  message: "Price should be more than or equal to 0",
                },
              },
              nonIntegerLimit: {
                summary: "Non-integer limit",
                value: {
                  message: "Limit should be an integer",
                },
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
                message: { type: "string" },
              },
            },
            examples: {
              unauthorized: {
                summary: "Unauthorized",
                value: {
                  message: "Unauthorized",
                },
              },
              wrongRole: {
                summary: "Wrong role",
                value: {
                  message: "User role is not SUPER_ADMIN",
                },
              }
            },
          },
        },
      },
      "404": {
        description: "Not Found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              notFound: {
                summary: "Paket not found",
                value: {
                  message: "Paket not found",
                },
              },
            },
          },
        },
      },
      "500": {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              internalServerError: {
                summary: "Internal server error",
                value: {
                  message: "Internal server error",
                },
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
            examples: {
              success: {
                summary: "Paket deleted successfully",
                value: {
                  message: "Paket with id PAK999 deleted successfully",
                },
              },
            }
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
                message: { type: "string" },
              },
            },
            examples: {
              unauthorized: {
                summary: "Unauthorized",
                value: {
                  message: "Unauthorized",
                },
              },
              wrongRole: {
                summary: "Wrong role",
                value: {
                  message: "User role is not SUPER_ADMIN",
                },
              }
            },
          },
        },
      },
      "404": {
        description: "Not Found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              notFound: {
                summary: "Paket not found",
                value: {
                  message: "Paket not found",
                },
              },
            },
          },
        },
      },
      "500": {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              internalServerError: {
                summary: "Internal server error",
                value: {
                  message: "Internal server error",
                },
              },
            },
          },
        },
      },
    },
  },
};
