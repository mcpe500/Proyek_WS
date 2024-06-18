"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ["auth"],
        summary: "Generate a new access token using a refresh token",
        description: "This endpoint generates a new access token by validating the provided refresh token.",
        operationId: "generateNewAccessToken",
        requestBody: {
            description: "Refresh Token required to generate a new access token",
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
                description: "Access token created successfully",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                accessToken: {
                                    type: "string",
                                    description: "Newly created access token for the user",
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
    },
};
