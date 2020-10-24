const TokenHandler = require('./TokenHandler');
const redisTemplate = require('../../biz/dao/redis/RedisTemplate');
const BizException = require("../exception/BizException");
const BizResultCode = require("../api/BizResultCode");
const ClientUtil = require('../util/ClientUtil');
/**
 * @author ycx
 * @description 请求配置
 */
class HttpConfig {

    /**
     * http 请求配置
     * @author ycx
     * @param req {Request}
     * @param resp {Response}
     * @param next
     */
    static async handler(req,resp,next){
        //设置响应头
        resp.setHeader('Content-Type','application/json');

        //暂未做redis常量对象处理 1s 只让请求一次
        if (0=== (await redisTemplate.setNx('lock:'+req.url+ClientUtil.getClientIp(req), 'lock', 1))) {
            throw new BizException(BizResultCode.API_BUSY);
        }

        //如果带token 就继续往下走
        if (!TokenHandler.checkToken(req, resp)) {
            next();
        }

    }

}

module.exports =HttpConfig
