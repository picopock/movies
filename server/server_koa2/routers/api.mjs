import Router from 'koa-router';
import user from './users.mjs';
import login from './login.mjs';
import register from './register.mjs';
import movie from './movie.mjs';
import movies from './movies.mjs';

const router = Router();

router.use('/register', register.routes(), register.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/movie', movie.routes(), movie.allowedMethods());
router.use('/movies', movies.routes(), movies.allowedMethods());

export default router;