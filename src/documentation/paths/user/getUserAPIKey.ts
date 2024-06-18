export default {
  get: {
    summary: "Get API key for a user",
    description: "Retrieves the API key associated with a user.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["users"],
    responses: {
      "200": {
        description: "Successful response with API key data",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                apiKey: {
                  type: "string",
                  description: "API key associated with the user",
                },
              },
            },
            examples: {
              success: {
                summary: "Successfully get user's api keys",
                value: {
                  apiKeys: [
                    {
                      paketid: "PAK001",
                      apiKey: "24259a6d0917e8067e54a453eea13660decac5739bfe21e5fb87c9916cfe5aa7"
                    },
                    {
                      paketid: "PAK002",
                      apiKey: "49ffa984a76419bbed99cc746ba7298dc0dd7ea57238935486b04f6ff3312006"
                    },
                    {
                      paketid: "PAK003",
                      apiKey: "7137cb1765538231a1471cfe2cc2c73030dd1a97d93965b7c9b16ee306e57164"
                    }
                  ]
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
                  message: "User role is not customer",
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
              error: {
                summary: "Internal server error",
                value: {
                  message: "Internal server error",
                },
              },
            },
          },
        },
      }
    },
  },
};
