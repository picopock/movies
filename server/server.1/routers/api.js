const router = require('koa-router')();
const user = require('./users');
const login = require('./login');
const register = require('./register');
const movie = require('./movie');
const movies = require('./movies');

router.use('/register', register.routes(), register.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/movie', movie.routes(), movie.allowedMethods());
router.use('/movies', movies.routes(), movies.allowedMethods());

module.exports = router;