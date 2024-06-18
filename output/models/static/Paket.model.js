"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Paket.ts
const sequelize_1 = require("sequelize");
const connectionStatic_1 = __importDefault(require("../../connection/connectionStatic"));
class Paket extends sequelize_1.Model {
}
Paket.init({
    Paket_id: {
        type: sequelize_1.DataTypes.CHAR(6),
        primaryKey: true,
    },
    Paket_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Paket_description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    Paket_Limit: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Paket_price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    Paket_price_currency: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "IDR",
    },
}, {
    sequelize: connectionStatic_1.default,
    modelName: "Paket",
    tableName: "pakets",
    timestamps: false,
});
exports.default = Paket;
