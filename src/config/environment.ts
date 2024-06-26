import { EnvironmentStructure } from "../contracts/vo/EnvironmentRelated.vo";
import dotenv from "dotenv";

dotenv.config();

export const ENV: EnvironmentStructure = {
  PORT: parseInt(process.env.PORT || "3000"),
  BACKEND_API_URL: process.env.BACKEND_API_URL ?? "",
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
  EMAIL_HOST: process.env.EMAIL_HOST ?? "smtp.ethereal.email",
  EMAIL_PORT: Number(process.env.EMAIL_PORT) ?? 587,
  EMAIL_USER: process.env.EMAIL_USER ?? "cara.cassin54@ethereal.email",
  EMAIL_PASS: process.env.EMAIL_PASS ?? "sa1eN3haQ3vpTAweud",
  API_NINJAS_API_KEY: process.env.API_NINJAS_API_KEY ?? "",
  API_GOOGLE_PLACES_API_KEY: process.env.API_GOOGLE_PLACES_API_KEY ?? "",
};
