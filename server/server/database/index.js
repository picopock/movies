import Sequelize from 'sequelize';
import config from './config';

import _Movie from '../models/Movie';
import _Link from '../models/Link';
import _User from '../models/User';
import _Session from '../models/Session';

console.log('init sequelize...');

let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    pool: config.pool,
    timezone: config.timezone,
    define: {
        engine: 'InnoDB',   // default： InnoDB
    }
});

let Movie = sequelize.import('movie', _Movie);

let User = sequelize.import('user', _User);

let Link = sequelize.import('link', _Link);

Movie.Links = Movie.hasMany(Link, {onDelete: 'cascade'});

let Session = sequelize.import('session', _Session);

let sync = () => {
    if(process.env.NODE_ENV !== 'production') {
        /**
         * sequelize.sync()                 // sync all models that aren't already in the database
         * sequelize.sync({force: true})    // Force sync all models
         */
        return sequelize.sync({force: true})
            .then(() => {
                console.log('sync complete');
                process.exit(1);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        throw new Errow('Can not sync when NODE_ENV is set to \'production\'.');
    }
};

let drop = () => {
    if(process.env.NODE_ENV !== 'production') {
        return sequelize.drop()
            .then(() => {
                console.log('drop complete');
                process.exit(1);
            })
            .catch((err) => {
                console.log(err.message || err);
            })
    } else {
        throw new Error('Can not drop when NODE_ENV is set to \'production\'.');
    }
};


export {Movie, User, Link, Session, sequelize, sync, drop};