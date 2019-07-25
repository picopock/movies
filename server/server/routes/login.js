import express from 'express';
import {User} from '../database/index';
let router = express.Router();

let findUser = (username, password) => {
    return User.findOne({
        where: {
            username: username,
            password: password
        },
        attributes: ['id', 'username']
    });
};

router.post('/login', (req, res, next) => {
    let user;
    findUser(req.body.username, req.body.password)
        .then(_user => {
            user = _user;
        });

    if(user !== null) {
        req.session.regenerate((err) => {
            if(err) {
                return res.json({ret_code: 2, ret_msg: err || "Login failed!"});
            }
            req.session.loginUser = user.username;
            res.json({ret_code: 0, ret_msg: '登录成功'});
        });
    } else {
        res.json({ret_code: 1, ret_msg: '账号或密码错误'})
    }
});

router.get('/logOut', (req, res, next) => {
    req.session.destroy((err) => {
        if(err) {
            res.json({ret_code: 2, ret_msg: '退出登陆失败'});
            return ;
        }

        res.clearCookie(req.session.loginUser);
        res.redirect(302, 'http://localhost:8088');
    });
});

router.get('/isLogin', (req, res, next) => {
    let user;
     findUser(req.body.username, req.body.password)
        .then(_user => {
            user = _user;
        });
    if(user !== null) {
        res.json({ret_code: 0, ret_msg: '已登录用户'})
    } else {
        res.json({ret_code: 2, ret_msg: '用户未登录'})
    }
});

export default router;