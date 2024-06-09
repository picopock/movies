import Koa from 'koa';
import path from 'path';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import koaStatic from 'koa-static';
import jwt from 'koa-jwt';
import cors from '@koa/cors';
import koaNunjucks from 'koa-nunjucks-2';

import { config as jwtConfig } from './config/jwt_config.mjs';
import { logUtil } from './utils/index.mjs'
import router from './routers/index.mjs';

const app = new Koa();
const staticDir = path.join(import.meta.dirname, '../dist');

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
    path: [/^(?!\/api).*/, /^\/api\/login/, /^\/api\/register/, '/api/movie', /^\/api\/movie\/.*/] // 数据中的路径不需要要通过jwt验证
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
app.use(
  koaStatic(staticDir, {
    maxAge: 24 * 60 * 60 * 1000, // 1d
    gzip: true
  })
);

// 模板渲染
app.use(
  koaNunjucks({
    ext: 'html',
    path: path.join(import.meta.dirname, 'views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  })
);

// 路由入口
app.use(router.routes());
// .use(router.allowedMethods());

// 404 返回 index.html
app.use(async (ctx, next) => {
  if (ctx.status === 404 && ctx.method === 'GET' && !/^(?:\/api).*/.test(ctx.originalUrl)) {
    await ctx.render('index');
  } else {
    next();
  }
});

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

export { app };