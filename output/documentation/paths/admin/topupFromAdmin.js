"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    put: {
        tags: ["admin"],
        summary: "Update user balance",
        description: "This endpoint updates the balance of all users or a specific user.",
        operationId: "topupFromAdmin",
        parameters: [
            {
                name: "userID",
                in: "path",
                description: "ID of user to fetch",
                required: false,
                schema: {
                    type: "string",
                },
                example: ""
            },
        ],
        security: [
            {
                bearerAuth: [],
            },
        ],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            saldo: { type: "number" },
                        },
                        required: ["saldo"],
                    },
                },
            },
            required: true,
        },
        responses: {
            "200": {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                msg: { type: "string" },
                                username: { type: "string" },
                                full_name: { type: "string" },
                                newBalance: { type: "number" },
                            },
                        },
                        examples: {
                            specificUser: {
                                summary: "Balance updated for specific user",
                                value: {
                                    msg: "Balance updated successfully",
                                    username: "string1",
                                    full_name: "string",
                                    newBalance: 5000,
                                },
                            },
                            allUsers: {
                                summary: "Balance updated for all users",
                                value: {
                                    msg: "Balance updated for all users successfully",
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
                                msg: {
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
                                msg: {
                                    type: "string",
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
                                msg: {
                                    type: "string",
                                },
                            },
                        },
                    },
                },
            },
        },
    }
};
