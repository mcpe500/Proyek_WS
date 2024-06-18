"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ["news"],
        summary: "Get specific news article",
        description: "This endpoint retrieves a specific news article based on the title parameter and returns it as a PDF.",
        operationId: "getSpecificNews",
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
                name: "title",
                in: "path",
                required: true,
                schema: {
                    type: "string",
                },
                description: "The title of the news article to retrieve.",
            },
        ],
        responses: {
            "200": {
                description: "PDF of the specific news article.",
                content: {
                    "application/pdf": {
                        schema: {
                            type: "string",
                            format: "binary",
                        },
                    },
                },
            },
            "404": {
                description: "Article not found.",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: { type: "string" },
                            },
                        },
                    },
                },
            },
            "500": {
                description: "An error occurred while extracting the specific news.",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: { type: "string" },
                            },
                        },
                    },
                },
            },
        },
    },
};
