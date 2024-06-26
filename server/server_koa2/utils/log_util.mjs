import log4js from 'log4js';
import { config as log_config } from '../config/log_config.mjs';

// 加载配置文件
log4js.configure(log_config);

const logUtil = {};

const errorLogger = log4js.getLogger('errorLogger');
const resLogger = log4js.getLogger('resLogger');

// 封装错误日志
logUtil.logError = function (ctx, error, resTime) {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime));
    }
};

// 封装响应日志
logUtil.logResponse = function (ctx, resTime) {
    if (ctx) {
        resLogger.info(formatRes(ctx, resTime));
    }
};

// 格式化响应日志
const formatRes = function (ctx, resTime) {
    let logText = new String();
    // 响应日志开始
    logText += '\n' + '*************** response log start ***************' + '\n';
    // 添加请求日志
    logText += formatReqLog(ctx.request, resTime);
    // 响应状态码
    logText += 'response status: ' + ctx.status + '\n';
    // 响应内容
    logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n';
    // 响应日志结束
    logText += "*************** response log end ***************" + "\n";
    return logText;
}

const formatError = function (ctx, error, resTime) {
    let logText = new String();
    // 错误信息开始
    logText += '\n' + "*************** error log start ***************" + "\n";
    // 添加请求日志
    logText += formatReqLog(ctx.request, resTime);
    // 错误名称
    logText += 'error name: ' + error.name + '\n';
    // 错误信息
    logText += 'error message: ' + error.message + '\n';
    // 错误详情
    logText += 'error stack: ' + error.stack + '\n';
    // 错误信息结束
    logText += "*************** error log end ***************" + "\n";
    return logText;
}

// 格式化请求日志
const formatReqLog = function (req, resTime) {
    let logText = new String();
    const method = req.method;
    // 访问方法
    logText += 'request method: ' + method + '\n';
    // 请求原始地址
    logText += 'request originalUrl: ' + req.originalUrl + '\n';
    // 客户端IP
    logText += 'request client IP: ' + req.ip + '\n';
    // 请求参数
    if (method === 'GET') {
        logText += 'request query: ' + JSON.stringify(req.query) + '\n';
    } else {
        logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n';
    }
    // 服务器响应时间
    logText += 'response time: ' + resTime + '\n';
    return logText;
}

export { logUtil };

