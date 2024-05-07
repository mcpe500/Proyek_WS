export interface EnvironmentStructure {
  PORT: number;
  SECRET_KEY: string;
  REFRESH_TOKEN_SECRET: string;
  ACCESS_TOKEN_SECRET: string;
  EMAIL_VERIFICATION_TOKEN_SECRET: string;
  REFRESH_TOKEN_AGE: string;
  ACCESS_TOKEN_AGE: string;
  EMAIL_VERIFICATION_AGE: string;
  REMEMBER_ME_REFRESH_TOKEN_AGE: string;
  REMEMBER_ME_ACCESS_TOKEN_AGE: string;
  MONGODB_URI: string;

  DB_STATIC_DIALECT: string;
  DB_STATIC_HOST: string;
  DB_STATIC_PORT: number;
  DB_STATIC_USERNAME: string;
  DB_STATIC_PASSWORD: string;
  DB_STATIC_DATABASE: string;

  API_NINJAS_API_KEY: string;
}
