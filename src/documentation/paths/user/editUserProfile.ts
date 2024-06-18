export default {
  put: {
    tags: ["users"],
    summary: "Edit user profile",
    description: "This endpoint edits the user's profile.",
    operationId: "editProfile",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              old_password: { type: "string" },
              new_password: { type: "string" },
              confirm_password: { type: "string" },
              fullName: { type: "string" },
              phone: { type: "string", pattern: "^[0-9]{10,15}$" },
              age: { type: "integer" },
              gender: { type: "string" },
              height: { type: "number" },
              weight: { type: "number" },
              healthInformation: { type: "string" },
              profilePicture: {
                type: "string",
                format: "binary",
                description: "Profile picture file",
              },
            },
          },
        },
      },
    },
    responses: {
      "200": {
        description: "User profile updated successfully",
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
                summary: "Profile updated successfully",
                value: {
                  user: {
                    id: "user-id-123",
                    username: "john_doe",
                    fullName: "John Doe",
                    email: "john@example.com",
                    phone: "1234567890",
                    age: 30,
                    gender: "male",
                    height: 175.5,
                    weight: 70.3,
                    healthInformation: "None",
                    profilePicture: "path/to/profile/picture.jpg",
                    // other user details
                  },
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Bad request",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              oldPasswordIncorrect: {
                summary: "Old password incorrect",
                value: {
                  message: "old_password is incorrect",
                },
              },
              newPasswordEmpty: {
                summary: "New password empty",
                value: {
                  message: "new_password must not be empty",
                },
              },
              confirmPasswordMismatch: {
                summary: "Confirm password mismatch",
                value: {
                  message: "confirm_password does not match",
                },
              },
              invalidPhonePattern: {
                summary: "Invalid phone number pattern",
                value: {
                  message: "Phone number must be between 10 and 15 digits",
                },
              },
              invalidAge: {
                summary: "Invalid age",
                value: {
                  message: "Age must be an integer and a positive number",
                },
              },
              invalidHeight: {
                summary: "Invalid height",
                value: {
                  message: "Height must be a number and a positive value",
                },
              },
              invalidWeight: {
                summary: "Invalid weight",
                value: {
                  message: "Weight must be a number and a positive value",
                },
              },
              invalidFitnessGoals: {
                summary: "Invalid fitness goals",
                value: {
                  message: "Fitness goals must be one of [GOALS_VALUES]",
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
