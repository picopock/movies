const Koa = require('koa');
const path = require('path');
const app = new Koa();
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const static = require('koa-static');
const jwt = require('koa-jwt');
const cors = require('@koa/cors');
const logUtil = require('./utils/log_util');
const jwtConfig = require('./config/jwt_config');
const router = require('./routers/route');
const koaNunjucks = require('koa-nunjucks-2');

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'] // parser will only parse when request type hits enableTypes, default is ['json', 'form'].
  })
);

app.use(
  json({
    pretty: true, // default to pretty response, default to true
    param: 'pretty', // optional query-string param for pretty responses, default to none
    spaces: 4 // JSON spaces, default to 2
  })
);

app.use(
  cors({
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'], // {String|Array} allowMethods `Access-Control-Allow-Methods`, default is 'GET,HEAD,PUT,POST,DELETE,PATCH'
    maxAge: 5 * 60
  })
);

// jwt
app.use(
  jwt({ secret: jwtConfig.secret }).unless({
    path: [/^(?!\/api).*/, /^\/api\/login/, /^\/api\/register/, /^\/api\/movie/] // 数据中的路径不需要要通过jwt验证
  })
);

// logger
app.use(async (ctx, next) => {
  // 响应开始时间
  const start = new Date();
  // 响应间隔时间
  var ms;
  try {
    // 开始进入到下一个中间件
    await next();
    ms = new Date() - start;
    // 记录响应日志
    logUtil.logResponse(ctx, ms);
  } catch (error) {
    ms = new Date() - start;
    // 记录异常日志
    logUtil.logError(ctx, error, ms);
  }
});

// 伺服静态资源
app.use(static(__dirname + '../dist'));
// 模板渲染
app.use(
  koaNunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  })
);

// 路由入口
app.use(router.routes());
// .use(router.allowedMethods());

// 404 重定向到/
// app.use(async (ctx, next) => {
// 	console.log(ctx.originalUrl);
// 	if(ctx.status === 404 && ctx.method === 'GET' && !/^(?:\/api).*/.test(ctx.originalUrl) ) {
// 		ctx.redirect('/');
// 	}
// 	next();
// })

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
