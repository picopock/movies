const router = require('koa-router')();
const jwtConfig = require('../config/jwt_config');
const jwt = require('jsonwebtoken');
const User = require('../database/index').User;
const generatePw = require('../utils/pwHandler');

router.post('/', async(ctx, next) => {
	let _user = Object.assign({},ctx.request.body);
	_user.password = generatePw(_user.password);
	try {
		let user = await User.create(_user);
		const userToken = {
			id: user.id,
			username: user.username
		};
		const token = jwt.sign(userToken, jwtConfig.secret, {
			expiresIn: '1h'
		});
		ctx.body = {
			message: '新增用户成功',
            code: 1,
            user: {id: user.id, username: user.username, nickname: user.nickname},
			token
		};
	} catch (err) {
		ctx.body = {
			message: err.message || err,
			code: -1
		};
	}
});

module.exports = router;