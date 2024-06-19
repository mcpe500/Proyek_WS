export default {
  put: {
    tags: ["admin"],
    summary: "Update user balance",
    description: "This endpoint updates the balance of all users or a specific user.",
    operationId: "topupFromAdmin",
    parameters: [
      {
        name: "userID",
        in: "path",
        description: "ID of user to fetch",
        required: false,
        schema: {
          type: "string",
        },
        example: ""
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
              saldo: { type: "number" },
            },
            required: ["saldo"],
          },
        },
      },
      required: true,
    },
    responses: {
      "200": {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: { type: "string" },
                username: { type: "string" },
                full_name: { type: "string" },
                newBalance: { type: "number" },
              },
            },
            examples: {
              specificUser: {
                summary: "Balance updated for specific user",
                value: {
                  msg: "Balance updated successfully",
                  username: "string1",
                  full_name: "string",
                  newBalance: 5000,
                },
              },
              allUsers: {
                summary: "Balance updated for all users",
                value: {
                  msg: "Balance updated for all users successfully",
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
                message: {
                  type: "string",
                },
              },
            },
            examples: {
              invalidUser: {
                summary: "Invalid User",
                value: {
                  message: "User is customer",
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
                  message: "User role is not ADMIN",
                },
              }
            },
          },
        },
      },
      "404": {
        description: "User not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
            example: {
              userNotFound: {
                summary: "Not Found",
                value: {
                  message: "User not found",
                },
              },
            }
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
                message: {
                  type: "string",
                },
              },
            },
            examples: {
              error: {
                summary: "Internal server error",
                value: {
                  message: "Exercises added/updated failed.",
                },
              },
            },
          },
        },
      },
    },
  }
};
