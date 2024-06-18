"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const environment_1 = require("./config/environment");
_1.default.listen(environment_1.ENV.PORT, () => console.log("Server is running at http://localhost:" + environment_1.ENV.PORT));
