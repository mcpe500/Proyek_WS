"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRoute = void 0;
const convertRoute = (route) => {
    return route.replace(/:(\w+)/g, '{$1}');
};
exports.convertRoute = convertRoute;
