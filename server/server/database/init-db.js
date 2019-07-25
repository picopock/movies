import {sync, User, Session} from './index';

// sync();
User.sync({force: true})
    .then(() => {
        console.log('sync complete');
        process.exit(1);
    })
    .catch((err) => {
        console.log(err);
    });