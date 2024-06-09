import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import { config as jwtConfig } from '../config/jwt_config.mjs';
import { User } from '../models/index.mjs';
import { generatePw } from '../utils/index.mjs';

const router = Router();

router.post('/', async (ctx, next) => {
	let _user = Object.assign({}, ctx.request.body);
	_user.password = generatePw(_user.password);
	console.log('user::', _user)
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
			user: { id: user.id, username: user.username, nickname: user.nickname },
			token
		};
	} catch (err) {
		ctx.body = {
			message: err.message || err,
			code: -1
		};
	}
});

export default router;