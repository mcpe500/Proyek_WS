export default {
  get: {
    summary: "Root endpoint",
    description: "Returns a Hello World message",
    responses: {
      "200": {
        description: "Successful operation",
        content: {
          "text/plain": {
            schema: {
              type: "string",
              example: "Hello World",
            },
          },
        },
      },
    },
  },
};
