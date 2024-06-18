"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    put: {
        summary: "Reset API key for a user",
        description: "Resets the API key associated with a user.",
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: ["users"],
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
        ],
        responses: {
            "200": {
                description: "Successful response with new API key data",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                apiKey: {
                                    type: "string",
                                    description: "New API key associated with the user",
                                },
                            },
                        },
                    },
                },
            },
            "404": {
                description: "Not Found",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/NotFoundResponse",
                        },
                    },
                },
            },
            "401": {
                description: "Unauthorized",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UnauthorizedResponse",
                        },
                    },
                },
            },
            "500": {
                description: "Internal Server Error",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ErrorResponse",
                        },
                    },
                },
            },
        },
    },
};
