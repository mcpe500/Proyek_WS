"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ["plans"],
        summary: "Start a specific user plan",
        description: "This endpoint starts a specific plan of a user.",
        operationId: "startPlan",
        security: [
            {
                bearerAuth: [],
            },
        ],
        parameters: [
            {
                name: "apiKey",
                in: "query",
                description: "User's API key",
                required: true,
                schema: {
                    type: "string",
                },
            },
            {
                name: "id",
                in: "path",
                description: "ID of the plan to start",
                required: true,
                schema: {
                    type: "string",
                },
            },
        ],
        responses: {
            "200": {
                description: "User plan started successfully",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                plan: { type: "object" },
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
            "404": {
                description: "Plan not found or already started",
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
                                error: { type: "string" },
                            },
                        },
                    },
                },
            },
        },
    },
};
