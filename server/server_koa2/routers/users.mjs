import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import { config as jwtConfig } from '../config/jwt_config.mjs';
import { generatePw } from '../utils/index.mjs';
import { User } from '../models/index.mjs';

const router = Router();

router.get('/', async (ctx, next) => {
	try {
		let ret = await User.findAndCountAll({
			attributes: ['id', 'username', 'password', 'tel', 'email', 'permission', 'nickname']
			// attributes: {
			//     include: ['id', 'username', 'password', 'tel', 'email', 'permission', 'nickname'],
			//     exclude: ['created_at', 'update_timestamp', 'destroy_time']
			// }
		});
		ctx.body = ret;
	} catch (err) {
		ctx.body = err.message || err;
	}
});

/** 新增用户 */
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

router.put('/:id', async (ctx, next) => {
	try {
		await User.update(ctx.request.body, {
			where: {
				id: ctx.params.id
			}
		});
		ctx.body = ctx.request.body;
	} catch (err) {
		ctx.body = err.message || err;
	}
});

router.delete('/:id', async (ctx, next) => {
	try {
		await User.destroy({
			where: {
				id: ctx.params.id
			}
		});
		ctx.body = {
			'message': 'succeed'
		};
	} catch (err) {
		ctx.body = err.message || err;
	};
});

router.get('/permission/list', async (ctx, next) => {
	ctx.body = ['GUEST', 'ADMIN', 'OPERATOR'];
});

export default router;