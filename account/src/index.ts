import express from 'express';
import logger from './middlewares/logger';
import AccountV1 from './api/v1';
import config from './config';
import sequelize from './db';


// Config Express
const app = express();

// middlewares
app.use(express.json());
app.use(logger);


//routes
app.use('/account/api/v1', AccountV1);

// error handling 


async function init() {

  await sequelize.sync()

  app.listen(config.PORT, () => {
    console.log(`Server is running at http://localhost:${config.PORT}`);
  });
}


init();
