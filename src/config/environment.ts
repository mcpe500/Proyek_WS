import { EnvironmentStructure } from "../contracts/vo/EnvironmentRelated.vo";
import dotenv from "dotenv";

dotenv.config();

export const ENV: EnvironmentStructure = {
  PORT: parseInt(process.env.PORT || "3000"),
  SECRET_KEY: process.env.SECRET_KEY ?? "",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ?? "",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? "",
  EMAIL_VERIFICATION_TOKEN_SECRET:
    process.env.EMAIL_VERIFICATION_TOKEN_SECRET ?? "",
  REFRESH_TOKEN_AGE: process.env.REFRESH_TOKEN_AGE ?? "",
  ACCESS_TOKEN_AGE: process.env.ACCESS_TOKEN_AGE ?? "",
  REMEMBER_ME_REFRESH_TOKEN_AGE:
    process.env.REMEMBER_ME_REFRESH_TOKEN_AGE ?? "",
  REMEMBER_ME_ACCESS_TOKEN_AGE: process.env.REMEMBER_ME_ACCESS_TOKEN_AGE ?? "",
  EMAIL_VERIFICATION_AGE: process.env.EMAIL_VERIFICATION_AGE ?? "",
  MONGODB_URI: process.env.MONGODB_URI ?? "",
  DB_STATIC_DIALECT: process.env.DB_STATIC_DIALECT ?? "mysql",
  DB_STATIC_HOST: process.env.DB_STATIC_HOST ?? "localhost",
  DB_STATIC_PORT: parseInt(process.env.DB_STATIC_PORT ?? "3306"),
  DB_STATIC_USERNAME: process.env.DB_STATIC_USERNAME ?? "root",
  DB_STATIC_PASSWORD: process.env.DB_STATIC_PASSWORD ?? "",
  DB_STATIC_DATABASE: process.env.DB_STATIC_DATABASE ?? "db_name",
  API_NINJAS_API_KEY: process.env.API_NINJAS_API_KEY ?? "",
};

