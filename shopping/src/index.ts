import express from 'express';
import cookieParser from 'cookie-parser';
import logger from './middlewares/logger';
import config from './config';
import sequelize from './db';
import errorHandler from './middlewares/error-handler';
import mainRouter from './api';
import formParser from './middlewares/form-parser';

// Config Express
const app = express();

// request middlewares
app.use(express.json());
app.use(logger);
app.use(cookieParser());
app.use(formParser);

// route handlers
app.use('/shopping/api/v1', mainRouter);

// response middlewares
app.use(errorHandler);
async function init(): Promise<void> {
  await sequelize.sync();

  app.listen(config.PORT, () => {
    console.log(`Server is running at http://localhost:${config.PORT}`);
  });
}

init().catch((err) => {
  console.error('Failed to initialize Express', err);
});
