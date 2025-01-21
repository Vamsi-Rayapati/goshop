import { Sequelize } from 'sequelize';
import config from '../config';

console.log(`DB config ${config.DB_HOST}`);
const sequelize = new Sequelize('shopping', config.DB_USER_NAME, config.DB_PASSWORD, {
  host: config.DB_HOST,
  port: parseInt(config.DB_PORT),
  dialect: 'mysql',
  dialectModule: require('mysql2'),
});

export default sequelize;
