import { EnvironmentStructure } from "../contracts/vo/EnvironmentRelated.vo";
import dotenv from "dotenv";

dotenv.config();

export const ENV: EnvironmentStructure = {
  PORT: parseInt(process.env.PORT || "3000"),
  SECRET_KEY: process.env.SECRET_KEY ?? "",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ?? "",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? "",
  REFRESH_TOKEN_AGE: process.env.REFRESH_TOKEN_AGE ?? "",
  ACCESS_TOKEN_AGE: process.env.ACCESS_TOKEN_AGE ?? "",
  REMEMBER_ME_REFRESH_TOKEN_AGE:
    process.env.REMEMBER_ME_REFRESH_TOKEN_AGE ?? "",
  REMEMBER_ME_ACCESS_TOKEN_AGE: process.env.REMEMBER_ME_ACCESS_TOKEN_AGE ?? "",
  MONGODB_URI: process.env.MONGODB_URI ?? "",
};
