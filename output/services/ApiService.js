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
exports.Apis = void 0;
const axios_1 = __importDefault(require("axios"));
const environment_1 = require("../config/environment");
class ApiService {
    constructor(baseURL, headers = {}) {
        this.axiosInstance = axios_1.default.create({
            baseURL,
            headers,
        });
    }
    get(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, config = {}) {
            const response = yield this.axiosInstance.get(url, config);
            return response.data;
        });
    }
    post(url_1, data_1) {
        return __awaiter(this, arguments, void 0, function* (url, data, config = {}) {
            const response = yield this.axiosInstance.post(url, data, config);
            return response.data;
        });
    }
    put(url_1, data_1) {
        return __awaiter(this, arguments, void 0, function* (url, data, config = {}) {
            const response = yield this.axiosInstance.put(url, data, config);
            return response.data;
        });
    }
    patch(url_1, data_1) {
        return __awaiter(this, arguments, void 0, function* (url, data, config = {}) {
            const response = yield this.axiosInstance.patch(url, data, config);
            return response.data;
        });
    }
    delete(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, config = {}) {
            const response = yield this.axiosInstance.delete(url, config);
            return response.data;
        });
    }
}
exports.Apis = {
    API_NINJA_ApiService: new ApiService("https://api.api-ninjas.com/v1/exercises", {
        "X-Api-Key": environment_1.ENV.API_NINJAS_API_KEY,
    }),
};
