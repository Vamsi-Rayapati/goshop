import dotenv from 'dotenv';
dotenv.config();



interface Config extends NodeJS.ProcessEnv {
    PORT: string
    DB_HOST:string
    DB_PORT:string
    DB_USER_NAME:string
    DB_PASSWORD:string
}

const config = process.env as Config;

export default config;