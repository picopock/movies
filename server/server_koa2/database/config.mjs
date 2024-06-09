export const config = {
  production: {
    host: '10.0.0.17',
    port: 3306,
    username: 'movie',
    password: 'movie',
    database: 'movie',
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 1,
      idle: 10000
    },
    timezone: '+00:00'
  },
  development: {
    host: '10.0.0.17',
    port: 3306,
    username: 'movie',
    password: 'movie',
    database: 'movie',
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 1,
      idle: 10000
    },
    timezone: '+00:00'
  }
};
