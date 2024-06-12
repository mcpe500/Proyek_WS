export default {
  post: {
    tags: ["auth"],
    summary: "User login",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: { type: "string" },
              email: { type: "string", format: "email" },
              password: { type: "string" },
              rememberMe: { type: "boolean" },
            },
            required: ["username", "email", "password"],
          },
        },
      },
    },
    responses: {
      200: {
        description: "User logged in successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: { type: "string" },
                token: { type: "string" },
              },
            },
          },
        },
        // headers: {
        //   "Set-Cookie": {
        //     description: "The refreshToken cookie",
        //     schema: {
        //       type: "string",
        //     },
        //   },
        // },
        // cookie: {
        //   "refresh_token": {
        //     description: "The refreshToken cookie",
        //     schema: {
        //       type: "string",
        //     },
        //   },
        // },
        // cookies: {
        //   refresh_token: {
        //     description: "The refreshToken cookie",
        //     schema: {
        //       type: "string",
        //     },
        //   },
        // },
      },
      400: {
        description: "Invalid credentials or unverified email",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: { type: "string" },
                message: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};
