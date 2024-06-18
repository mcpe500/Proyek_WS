"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ["goals"],
        summary: "Get fitness goal by ID",
        description: "This endpoint retrieves a specific fitness goal by its ID.",
        operationId: "getGoalById",
        security: [
            {
                bearerAuth: [],
            },
        ],
        parameters: [
            {
                name: "title",
                in: "path",
                required: true,
                schema: {
                    type: "string",
                },
                description: "The ID of the fitness goal.",
            },
        ],
        responses: {
            "200": {
                description: "The requested fitness goal.",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                Goal: {
                                    type: "object",
                                    properties: {
                                        title: {
                                            type: "string",
                                        },
                                        description: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "404": {
                description: "Goal not found.",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                    },
                },
            },
            "500": {
                description: "Internal server error.",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: {
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
