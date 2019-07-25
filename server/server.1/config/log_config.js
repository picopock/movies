const path = require('path');

let logConfig = {
    // 日志根目录
    baseLogPath: path.resolve(__dirname, '../logs'),
    // 日志保存时间(day)
    daysToKeep: 7,
    // 编码
    encoding: 'utf-8',
    // 错误日志目录
    errorPath: '/error',
    // 错误日志文件名
    errorFileName: 'error',
    // 响应日志目录
    responsePath: '/response',
    // 响应日志文件名
    responseFileName: 'response',
};

// 错误日志输出完整路径
logConfig.errorLogPath = logConfig.baseLogPath + logConfig.errorPath + '/' + logConfig.errorFileName;
// 响应日志输出完整路径
logConfig.responseLogPath = logConfig.baseLogPath + logConfig.responsePath + '/' + logConfig.responseFileName;

module.exports = {
    "appenders": {
        "out": {
            "type": "console"
        },
        "errorLogger": {
            "type": "dateFile",
            "filename": logConfig.errorLogPath,
            "alwaysIncludePattern": true,
            "pattern": '-yyyy-MM-dd.log',
            "daysToKeep": logConfig.daysToKeep,
            "encoding": logConfig.encoding
        },
        "resLogger": {
            "type": "dateFile",
            "filename": logConfig.responseLogPath,
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd.log",
            "daysToKeep": logConfig.daysToKeep,
            "encoding": logConfig.encoding
        }
    },
    "categories": {
        "default": {
            "appenders": ["out"],
            "level": "info"
        },
        "errorLogger": {
            "appenders": ["errorLogger"],
            "level": "error"
        },
        "resLogger": {
            "appenders": ["resLogger"],
            "level": "info"
        }
    }
};