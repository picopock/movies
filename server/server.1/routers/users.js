const router = require('koa-router')();
const jwtConfig = require('../config/jwt_config');
const jwt = require('jsonwebtoken');
const User = require('../database/index').User;

router.get('/', async(ctx, next) => {
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

router.put('/:id', async(ctx, next) => {
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

router.delete('/:id', async(ctx, next) => {
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

module.exports = router;