import { Dialect, Sequelize } from "sequelize";
import { ENV } from "../config/environment";

export const sequelize = new Sequelize(
  ENV.DB_STATIC_DATABASE,
  ENV.DB_STATIC_USERNAME,
  ENV.DB_STATIC_PASSWORD,
  {
    dialect: ENV.DB_STATIC_DIALECT as Dialect,
    host: ENV.DB_STATIC_HOST,
    port: ENV.DB_STATIC_PORT,
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection successful!");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database:", error);
  });

// Export the Sequelize instance
export default sequelize;
