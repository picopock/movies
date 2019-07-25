export default {
    host: 'localhost',
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