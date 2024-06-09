import Router from 'koa-router';

const router = Router();

router.get('/', async (ctx, next) => {
  ctx.cookies.set(
    'cid',
    'hello world',
    {
      domain: ctx.hostname,
      path: '/',
      maxAge: 10 * 60 * 1000,
      expires: new Date('2017-9-21'),
      httpOnly: true,
      overwrite: false
    }
  )
  await ctx.render('index');
});

export default router;
