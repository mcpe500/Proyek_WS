"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const environment_1 = require("../config/environment");
exports.sequelize = new sequelize_1.Sequelize(environment_1.ENV.DB_STATIC_DATABASE, environment_1.ENV.DB_STATIC_USERNAME, environment_1.ENV.DB_STATIC_PASSWORD, {
    dialect: environment_1.ENV.DB_STATIC_DIALECT,
    host: environment_1.ENV.DB_STATIC_HOST,
    port: environment_1.ENV.DB_STATIC_PORT,
});
// Test the connection
exports.sequelize
    .authenticate()
    .then(() => {
    console.log("Database connection successful!");
})
    .catch((error) => {
    console.error("Unable to connect to the database:", error);
});
// Export the Sequelize instance
exports.default = exports.sequelize;
