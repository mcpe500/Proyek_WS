"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ["auth"],
        summary: "Verify user's email",
        description: "This endpoint verifies a user's email using the email verification token.",
        operationId: "verifyEmail",
        parameters: [
            {
                name: "emailVerificationToken",
                in: "path",
                required: true,
                schema: {
                    type: "string",
                },
                description: "The email verification token provided to the user.",
            },
        ],
        responses: {
            "200": {
                description: "Email verified successfully.",
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
            "403": {
                description: "Invalid or expired email verification token.",
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
                description: "User not found.",
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
