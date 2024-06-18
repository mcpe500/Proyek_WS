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
exports.getAllPricingPackages = void 0;
const Paket_model_1 = __importDefault(require("../models/static/Paket.model"));
const ResponseRelated_enum_1 = require("../contracts/enum/ResponseRelated.enum");
const getAllPricingPackages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("MASUK");
        const pakets = yield Paket_model_1.default.findAll();
        console.log(pakets);
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json(pakets);
    }
    catch (error) {
        console.error("Error retrieving pricing packages:", error);
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: "Failed to retrieve pricing packages" });
    }
});
exports.getAllPricingPackages = getAllPricingPackages;
