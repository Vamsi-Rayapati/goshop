import express from 'express';
import logger from './middlewares/logger';
import AccountV1 from './api/v1';
import config from './config';
import sequelize from './db';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/error-handler';


// Config Express
const app = express();

// request middlewares
app.use(express.json());
app.use(logger);
app.use(cookieParser());

// route handlers
app.use('/account/api/v1', AccountV1);

// response middlewares
app.use(errorHandler);
async function init(): Promise<void> {

  await sequelize.sync();

  app.listen(config.PORT, () => {
    console.log(`Server is running at http://localhost:${config.PORT}`);
  });
}


init();
