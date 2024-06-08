import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';
import path from 'path';
import morgan from 'morgan'

import { sequelize } from './database/index.mjs';
import routes from './routes/index.mjs';

const SequelizeStore = connectSessionSequelize(session.Store);
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'keyboard cat',
    store: new SequelizeStore({
        db: sequelize
    }),
    cookie: {
        maxAge: 5 * 60 * 1000
    },
    HttpOnly: true
}));
// app.use(express.static());

routes(app);

app.listen(app.get('port'), () => {
    console.log('server listening on port ' + app.get('port') + ' with pid ' + process.pid)
})