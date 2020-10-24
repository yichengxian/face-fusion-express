const morgan = require('morgan');
const config = require('../../../config/config');
const ClientUtil = require('../util/ClientUtil');
const FileStreamRotator = require('file-stream-rotator');
const fs = require('fs');
const path = require('path');
const CommonConstant = require('../constant/CommonConstant');
const mysqlTemplate = require('../../biz/dao/mysql/MysqlTemplate');
const reqLog = require('../../biz/dao/mysql/models/req_log');

/**
 * @author ycx
 * @description 日志配置类
 * <a>https://www.cnblogs.com/chyingp/p/node-learning-guide-express-morgan.html<a/>
 */
class LoggerConfig {

    /**
     *
     * @return {function(*=, *=, *): void}
     */
    static logger(app) {
        this.#token();

        //排除框架默认的选项
        switch (config.morgan.name) {
            case 'combined':
                break;
            case 'common':
                break;
            case 'default':
                break;
            case 'short':
                break;
            case 'tiny':
                break;
            case 'dev':
                break;
            default:
                morgan.format(config.morgan.name, config.morgan.format);
        }
        //
        if (config.morgan.enableFile) {
            app.use(morgan(config.morgan.name, {stream: this.#accessLogStream()}));
        }
        //控制台
        app.use(morgan(config.morgan.name))
    }

    /**
     * 自定义token
     */
    static #token() {
        //本地时间
        morgan.token('dateZh', () => new Date().toLocaleString());
        //获取客户端ip
        morgan.token('clientIp', (req, res) => ClientUtil.getClientIp(req));
        morgan.token('token', (req) => req.header(CommonConstant.TOKEN_KEY) || null)
    }

    /**
     * create a rotating write stream
     */
    static #accessLogStream() {
        //
        const logDir = path.join(__dirname, config.morgan.logDir)
        //创建日志目录
        fs.existsSync(logDir) || fs.mkdirSync(logDir);
        //文件格式 暂未做code 分离 具体请看源码
        const stream = FileStreamRotator.getStream({
            date_format: 'YYYY-MM-DD',
            filename: path.join(logDir, 'access-%DATE%.log'),
            //'daily', 'test', 'm', 'h', 'custom'
            frequency: 'daily',
            verbose: false,
            //size
        });
        return stream;
    }

    /**
     * err stream
     * @return {WriteStream}
     */
    static #errorLogStream() {
        const logDir = path.join(__dirname, config.morgan.logDir)
        //创建日志目录
        fs.existsSync(logDir) || fs.mkdirSync(logDir);
        const stream = FileStreamRotator.getStream({
            date_format: 'YYYY-MM-DD',
            filename: path.join(logDir, 'error-%DATE%.log'),
            frequency: 'daily',
            verbose: false
        });
        return stream;
    }

    /**
     *
     * @param req {Request}
     * @param err {Error}
     */
    static errLog(req, err) {
        const meta = '[' + new Date().toLocaleString() + ']-method:' + req.method + '-uri:' + req.url + '\r\n' + err.stack + '\r\n';
        this.#errorLogStream().write(meta)
        console.error(meta)
    }

    /**
     * 日志插入数据库 需要在router 配置相关接口
     * @param req
     * @param res
     * @param result
     */
    static insertDb(req, res, result) {
        //是否开启数据库存储
        if (!config.morgan.enableDb) {
            return ;
        }

        //用户ip
        const clientIp = ClientUtil.getClientIp(req);
        //请求方式
        const method = req.method;
        //响应时间
        let ms = (res._startAt[0] - req._startAt[0]) * 1e3 + (res._startAt[1] - req._startAt[1]) * 1e-6;
        const respTime = ms.toFixed(3);
        //url
        const url = req.originalUrl || req.url;
        //agent
        const userAgent = req.headers['user-agent'];

        //token
        const token = req.header(CommonConstant.TOKEN_KEY) || null;
        //请求参数
        const reqParams = 'GET' === method ? req.params : req.body;
        //响应参数
        const respResult = result;
        //长度
        const contentLength = res.getHeader('content-length')
        //插入数据库

        mysqlTemplate.model(reqLog).create({
            'time': new Date(),
            'method': method,
            'clientIp': clientIp,
            'respTime': respTime,
            'url': url,
            'status': res.statusCode,
            'userAgent': userAgent,
            'token': token,
            'params': reqParams,
            'resp': respResult,
            'contentLength': contentLength
        }).catch(err => {
            console.log(err)
        });

    }


}


module.exports = LoggerConfig
