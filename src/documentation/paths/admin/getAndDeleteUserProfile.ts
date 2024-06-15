export default {
  get: {
    tags: ["admin"],
    summary: "Get user profile",
    description: "This endpoint returns the profile of a specific user.",
    operationId: "getUserProfile",
    parameters: [
      {
        name: "userID",
        in: "path",
        description: "ID of user to fetch",
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
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
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
                msg: {
                  type: "string",
                },
              },
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
                msg: {
                  type: "string",
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
                msg: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
  delete: {
    tags: ["admin"],
    summary: "Delete user profile",
    description: "This endpoint deletes the profile of a specific user.",
    operationId: "deleteUserProfile",
    parameters: [
      {
        name: "userID",
        in: "path",
        description: "ID of user to delete",
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
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: {
                  type: "string",
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
                msg: {
                  type: "string",
                },
              },
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
                msg: {
                  type: "string",
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
                msg: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};
