import { ROLE } from "../../../contracts/enum/UserRelated.enum";

export default {
    get: {
      tags: ["admin"],
      summary: "Allow admin to get all users",
      description: "This endpoint returns every user's data with optional filters",
      security: [
        {
          bearerAuth: [],
        },
      ],
      operationId: "getAllUser",
      parameters: [
        {
          name: "username",
          in: "query",
          description: "Filter by username (case-sensitive)",
          required: false,
          schema: {
            type: "string",
          },
        },
        {
          name: "email",
          in: "query",
          description: "Filter by email (case-sensitive)",
          required: false,
          schema: {
            type: "string",
          },
        },
        {
          name: "fullName",
          in: "query",
          description: "Filter by full name (case-sensitive)",
          required: false,
          schema: {
            type: "string",
          },
        },
        {
          name: "role",
          in: "query",
          description: "Filter by role",
          required: false,
          schema: {
            type: "string",
            enum: Object.values(ROLE),
          },
        },
      ],
      responses: {
        "200": {
          description: "Users returned successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  users: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        role: { type: "string" },
                        _id: { type: "string" },
                        username: { type: "string" },
                        email: { type: "string" },
                        phone: { type: "string" },
                        isEmailVerified: { type: "boolean" },
                        fullName: { type: "string" },
                        balance: { type: "number" },
                      },
                    },
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
  