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
}
