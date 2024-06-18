"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ["auth"],
        summary: "Generate a new refresh token",
        description: "This endpoint generates a new refresh token for authenticated users.",
        operationId: "newRefreshToken",
        requestBody: {
            description: "Refresh Token required to generate a new refresh token",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            refreshToken: {
                                type: "string",
                                description: "Valid refresh token from the user",
                            },
                        },
                        required: ["refreshToken"],
                    },
                },
            },
            required: true,
        },
        responses: {
            "200": {
                description: "New refresh token created successfully",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                refreshToken: {
                                    type: "string",
                                    description: "Newly created refresh token for the user",
                                },
                            },
                        },
                    },
                },
            },
            "403": {
                description: "Invalid refresh token",
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
            "404": {
                description: "User not found",
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
        security: [
            {
                cookieAuth: [],
            },
        ],
    },
};
