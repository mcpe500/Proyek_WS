"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTES = void 0;
var ROUTES;
(function (ROUTES) {
    ROUTES["ROOT"] = "/";
    ROUTES["API_DOCS"] = "/api-docs";
    ROUTES["API_V1"] = "/api/v1";
    ROUTES["AUTH_REGISTER"] = "/auth/register";
    ROUTES["AUTH_LOGIN"] = "/auth/login";
    ROUTES["AUTH_TOKEN"] = "/auth/token";
    ROUTES["AUTH_REFRESH_TOKEN"] = "/auth/refresh_token";
    ROUTES["USERS_ID"] = "/users/:id";
    ROUTES["DYNAMIC_ROUTES"] = "/dynamic/*";
    ROUTES["ADD_ROUTES"] = "/routes/:routes";
})(ROUTES || (exports.ROUTES = ROUTES = {}));
