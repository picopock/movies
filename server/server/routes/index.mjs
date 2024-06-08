// import home from './home.mjs';
import movie from './movie.mjs';
import user from './user.mjs';
import login from './login.mjs';

export default (app) => {
    app.disable('x-powered-by');

    app.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:8088');
        res.header('Access-Control-Allow-Headers', 'X-Request-With, Content-Type, Accept, Origin, withCredentials');
        res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-MAX-AGE', 300);
        // res.header('Content-Type', 'application/json;charset=utf-8');

        next();
    });

    // // 验证登录状态
    // app.all('*', (req, res, next) => {
    //     let loginUser = req.session.loginUser;
    //     let isLogined = !!loginUser;

    //     isLogined ? next() : res.json({ret_code: 3, ret_msg: '用户未登录'});
    // });

    // app.use('/', home);
    app.use('/api', login);
    app.use('/api/movie', movie);
    app.use('/api/user', user);

    app.use((req, res) => {
        res.status(404).json({ status: 404, message: 'Not Found' });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({ status: 500, message: err.message });
    })
}