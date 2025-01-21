import dotenv from 'dotenv';

dotenv.config();

interface Config extends NodeJS.ProcessEnv {
  PORT: string
  DB_HOST:string
  DB_PORT:string
  DB_USER_NAME:string
  DB_PASSWORD:string
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
}

const config = process.env as Config;

export default config;
