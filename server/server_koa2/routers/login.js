const router = require('koa-router')();
const User = require('../database/index').User;
const jwtConfig = require('../config/jwt_config');
const util = require('util');
const jwt = require('jsonwebtoken');
const verify = util.promisify(jwt.verify); // 解密
const generatePw = require('../utils/pwHandler');

router.post('/', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  let user;
  try {
    user = await User.findOne({
      where: {
        username: username,
        password: generatePw(password)
      },
      attributes: ['id', 'username', 'nickname']
    });
  } catch (err) {
    ctx.body = {
      message: err.message,
      code: -1
    };
    return;
  }

  if (user !== null || user != undefined) {
    let userToken = {
      id: user.id,
      username: user.username,
      nickname: user.nickname
    };
    const token = jwt.sign(userToken, jwtConfig.secret, {
      expiresIn: '1h' // token 签名有效期为1小时
    });
    ctx.body = {
      message: '获取token成功',
      code: 1,
      user,
      token
    };
  } else {
    ctx.body = {
      message: '用户名或密码错误',
      code: -1
    };
  }
});

// router.get('/logOut', (req, res, next) => {
//     req.session.destroy((err) => {
//         if(err) {
//             res.json({ret_code: 2, ret_msg: '退出登陆失败'});
//             return ;
//         }

//         res.clearCookie(req.session.loginUser);
//         res.redirect(302, 'http://localhost:8088');
//     });
// });

// router.get('/isLogin', (req, res, next) => {
//     let user;
//      findUser(req.body.username, req.body.password)
//         .then(_user => {
//             user = _user;
//         });
//     if(user !== null) {
//         res.json({ret_code: 0, ret_msg: '已登录用户'})
//     } else {
//         res.json({ret_code: 2, ret_msg: '用户未登录'})
//     }
// });

router.get('/userInfo', async ctx => {
  const token = ctx.header.authorization; // 获取jwt
  let payload;
  if (token) {
    payload = await verify(token.split(' ')[1], jwtConfig.secret); // 解密， 获取payload
    ctx.body = {
      payload
    };
  } else {
    ctx.body = {
      message: 'token 错误',
      code: -1
    };
  }
});

module.exports = router;
