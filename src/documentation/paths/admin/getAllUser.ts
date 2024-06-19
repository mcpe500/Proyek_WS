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
            example: {
              users: [
                {
                  deletedAt: null,
                  _id: "6671b525963879662c157957",
                  username: "Xander.Goyette0",
                  email: "Frida38@yahoo.com",
                  password: "$2b$10$7W8smgOgnV3VZ.C9qnINme5Ylptg9IaC9nj7hOGJNQp.83thqznnC",
                  fullName: "Dolores Wolff",
                  phone: "737.741.9099 x3832",
                  profilePicture: "src\\storage\\images\\profilePictures\\default_profile.png",
                  age: 35,
                  height: 164,
                  weight: 90,
                  healthInformation: "Comes tempus corporis adipiscor.",
                  balance: 100000,
                  isEmailVerified: true,
                  emailVerificationToken: null,
                  role: "USER",
                  __v: 0
                }
              ]
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
