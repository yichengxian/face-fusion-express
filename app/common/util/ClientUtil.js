const StringUtil = require('./StringUtil');

/**
 * @author ycx
 * @description 客户端处理工具类
 */
class ClientUtil {

    /**
     * @author ycx
     * @description 获取客户端ip
     * @param req {Request}
     */
    static getClientIp(req) {
        let ip = req.header('X-Forwarded-For');
        if (StringUtil.isNotEmpty(ip) && new RegExp('unKnown', 'i').test(ip)) {
            //多次反向代理后会有多个ip值，第一个ip才是真实ip
            const index = ip.indexOf('.');
            if (-1 === index) {
                return ip.substring(0, index);
            } else {
                return ip;
            }
        }
        ip = req.header("X-Real-IP");

        if (StringUtil.isNotEmpty(ip) && new RegExp('unKnown', 'i').test(ip)) {
            return ip;
        }
        ip = req.ip || req._remoteAddress || (req.connection && req.connection.remoteAddress);

        return ip;
    }
}

module.exports = ClientUtil
