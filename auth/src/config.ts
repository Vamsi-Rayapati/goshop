import dotenv from 'dotenv';

dotenv.config();

interface Config extends NodeJS.ProcessEnv {
  PORT: string
  DB_HOST:string
  DB_PORT:string
  DB_USER_NAME:string
  DB_PASSWORD:string
  FA_CLIENT_ID: string;
  FA_SECRET: string;
  FA_URL: string;
  FA_API_KEY: string;
  FA_APP_ID: string;
  ACCOUNT_SERVICE_URL: string;
}

const config = process.env as Config;

export default config;
