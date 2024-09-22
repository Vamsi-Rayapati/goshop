import express from 'express';
import cookieParser from 'cookie-parser';
import logger from './middlewares/logger';
import AuthV1 from './api/v1';
import config from './config';
import errorHandler from './middlewares/error-handler';

// Config Express
const app = express();

// request middlewares
app.use(express.json());
app.use(logger);
app.use(cookieParser());

// route handlers
app.use('/auth/api/v1', AuthV1);

// response middlewares
app.use(errorHandler);
async function init(): Promise<void> {
  app.listen(config.PORT, () => {
    console.log(`Server is running at http://localhost:${config.PORT}`);
  });
}

init();
