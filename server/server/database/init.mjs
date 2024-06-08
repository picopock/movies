import { Sequelize } from 'sequelize';
import config from './config.mjs';

console.log('init sequelize...');

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    pool: config.pool,
    timezone: config.timezone,
    define: {
      engine: 'InnoDB',   // default： InnoDB
    }
  }
);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}