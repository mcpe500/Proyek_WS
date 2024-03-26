import { EnvironmentStructure } from "../contracts/vo/EnvironmentRelated.vo";
import dotenv from 'dotenv';

dotenv.config();

export const ENV: EnvironmentStructure = {
    PORT: parseInt(process.env.PORT || "3000")
};