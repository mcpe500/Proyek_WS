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
            examples: {
              created: {
                summary: "Paket created successfully",
                value: {
                  message: "Paket created",
                  paket: {
                    Paket_id: "PAK001",
                    Paket_name: "Basic Paket",
                    Paket_description: "Basic subscription paket",
                    Paket_Limit: 50,
                    Paket_price: 100000,
                    Paket_price_currency: "IDR",
                  },
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Bad Request - Validation error or invalid input",
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
                  message: "Validation error: 'name' is required",
                },
              },
              invalidInput: {
                summary: "Invalid input",
                value: {
                  message: "Invalid input data format",
                },
              },
              duplicateId: {
                summary: "Duplicate Paket ID",
                value: {
                  message: "Paket with id PAK001 already exists",
                },
              },
              invalidIdNumber: {
                summary: "Invalid ID Number",
                value: {
                  message: "Id number should be a type of number",
                },
              },
              invalidLimit: {
                summary: "Invalid Limit",
                value: {
                  message: "Limit should be greater than 0",
                },
              },
              invalidPrice: {
                summary: "Invalid Price",
                value: {
                  message: "Price should be more than or equal to 0",
                },
              },
              missingRequiredFields: {
                summary: "Missing Required Fields",
                value: {
                  message: "Missing required field: name",
                },
              },
            },
          },
        },
      },
      "401": {
        description: "Unauthorized - Authentication failure",
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
                  message: "User role is not SUPER_USER",
                },
              }
            },
          },
        },
      },
      "500": {
        description: "Internal Server Error - Unexpected server error",
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
