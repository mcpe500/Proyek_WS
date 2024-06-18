export default {
  put: {
    tags: ["super-admin"],
    summary: "Promote a user to admin",
    description: "This endpoint promotes a user to an admin role.",
    operationId: "promoteToAdmin",
    parameters: [
      {
        name: "userID",
        in: "path",
        description: "ID of the user to be promoted",
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
        description: "User promoted to admin successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            example: {
              message: "User JohnDoe promoted to admin successfully",
            },
          },
        },
      },
      "400": {
        description: "Bad Request - User role is not customer or other validation error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              invalidUserID: {
                summary: "Invalid user ID",
                value: {
                  message: "Invalid user ID",
                },
              },
              userNotCustomer: {
                summary: "User role is not customer",
                value: {
                  message: "User role is not customer",
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
                  message: "User role is not SUPER_USER",
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
                message: { type: "string" },
              },
            },
            examples: {
              userNotFound: {
                summary: "User not found",
                value: {
                  message: "User not found",
                },
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
