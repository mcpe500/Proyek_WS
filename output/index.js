"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("./config/environment");
const router_1 = __importDefault(require("./router/router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const RoutesRelated_enum_1 = require("./contracts/enum/RoutesRelated.enum");
const cors_1 = __importDefault(require("cors"));
const swagger_1 = __importDefault(require("./documentation/swagger"));
const ResponseRelated_enum_1 = require("./contracts/enum/ResponseRelated.enum");
const connection_1 = require("./connection/connection");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// const swaggerUiAssetPath = require("swagger-ui-dist").getAbsoluteFSPath();
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// app.use("/swagger-ui", express.static(swaggerUiAssetPath));
(0, connection_1.connectMongoDB)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(RoutesRelated_enum_1.ROUTES.API_V1, router_1.default);
app.get(RoutesRelated_enum_1.ROUTES.ROOT, (req, res) => {
    return res
        .status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS)
        .send("This API Service is currently running");
});
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
//return a render ejs
app.get("/location", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // You can pass data to your EJS file if needed
        const data = {
            backend_url: `${environment_1.ENV.BACKEND_API_URL}:${environment_1.ENV.PORT}`,
            // other data...
        };
        // Render the 'location' EJS view file (assuming it exists in your views directory)
        res.render(path_1.default.join(__dirname, "templates", "get_location.ejs"), data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
}));
exports.default = app;
