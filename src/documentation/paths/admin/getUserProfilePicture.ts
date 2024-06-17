export default {
  get: {
    tags: ["admin"],
    summary: "Get user profile picture",
    description: "This endpoint returns the profile picture of a specific user.",
    operationId: "getUserProfilePicture",
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
        description: "User profile picture retrieved successfully",
        content: {
          "image/png": {
            schema: {
              type: "string",
              format: "binary"
            },
            example: "User's profile picture"
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
}