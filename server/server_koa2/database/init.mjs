import { Sequelize } from 'sequelize';
import { config } from './config.mjs';

console.log('init sequelize...');

const env = (process.env.NODE_ENV || 'development').trim();

const envConfig = config[env]

export const sequelize = new Sequelize(
  envConfig.database,
  envConfig.username,
  envConfig.password,
  {
    host: envConfig.host,
    port: envConfig.port,
    dialect: envConfig.dialect,
    pool: envConfig.pool,
    timezone: envConfig.timezone,
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