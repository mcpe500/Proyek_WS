"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ["admin"],
        summary: "Get admin dashboard",
        description: "This endpoint returns the admin dashboard data.",
        operationId: "getAdminDashboard",
        security: [
            {
                bearerAuth: [],
            },
        ],
        responses: {
            "200": {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                total_user: {
                                    type: "number"
                                },
                                free_package_user: {
                                    type: "number"
                                },
                                non_free_package_user: {
                                    type: "number"
                                }
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
    },
};
