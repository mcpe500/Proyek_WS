const dotenv = require("dotenv");

dotenv.config();

const config = {
  development: {
    username: "root",
    password: null,
    database: "database_development",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_STATIC_USERNAME,
    password: process.env.DB_STATIC_PASSWORD,
    database: process.env.DB_STATIC_DATABASE,
    host: process.env.DB_STATIC_HOST,
    dialect: process.env.DB_STATIC_DIALECT,
  },
};

module.exports = config;
