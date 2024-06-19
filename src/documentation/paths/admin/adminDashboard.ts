export default {
  get: {
    tags: ["admins"],
    summary: "Get admin dashboard",
    description: "This endpoint returns the admin dashboard data.",
    operationId: "getAdminDashboard",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                total_user: {
                  type: "number"
                },
                free_package_user: {
                  type: "number"
                },
                non_free_package_user: {
                  type: "number"
                },
                total_income: {
                  type: "number"
                },
                total_user_spend: {
                  type: "number"
                },
                total_transaction_amount: {
                  type: "number"
                }
              },
            },
            example: {
              total_user: 10,
              free_package_user: 11,
              non_free_package_user: 9,
              total_income: 10000000,
              total_user_spend: 6700000,
              total_transaction_amount: 7
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
                  message: "User role is not ADMIN",
                },
              }
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
