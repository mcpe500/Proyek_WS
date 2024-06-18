export default {
  get: {
    tags: ["users"],
    summary: "Get user dashboard",
    description: "This endpoint returns the user's dashboard.",
    operationId: "getDashboard",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        description: "User dashboard retrieved successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user: { type: "object" },
              },
            },
            examples: {
              success: {
                summary: "Dashboard retrieved",
                value: {
                  user: {
                    _id: "666a9d5d1c4b41bd910365ba",
                    username: "user",
                    email: "user@example.com",
                    password: "$2b$10$nm6vbBMvtdvO5B5lFKh4tuBx2dfyGHeOHy116uQRCWzeSobbbinry",
                    fullName: "User",
                    phone: "006764541326",
                    balance: 1000000,
                    isEmailVerified: true,
                    emailVerificationToken: null,
                    role: "USER",
                    profilePicture: "src\\storage\\images\\profilePictures\\666a9d5d1c4b41bd910365ba.png",
                    age: 21,
                    gender: "male",
                    healthInformation: "none",
                    height: 180,
                    weight: 50
                  }
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
