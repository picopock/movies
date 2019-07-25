import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
let SequelizeStore = require('connect-session-sequelize')(session.Store);
import {sequelize} from './database/index';
import path from 'path';

import routes from './routes';

let app = express();

app.set('port', process.env.PORT || 3000);
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'keyboard cat',
    store: new SequelizeStore({
        db: sequelize
    }),
    cookie: {
        maxAge: 5*60*1000
    },
    HttpOnly: true
}));
// app.use(express.static());

routes(app);

app.listen(app.get('port'), () => {
    console.log('server listening on port ' + app.get('port') + ' with pid ' + process.pid)
})