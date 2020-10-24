const os = require('os');
/**
 * @author ycx
 * 网络工具类
 */
class NetUtil {
    /**
     * @author ycx
     * @description 获取本地ip地址
     */
   static getIPAddress(){
        const interfaces = os.networkInterfaces();
        for (const devName in interfaces) {
            const iface = interfaces[devName];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }
}

module.exports = NetUtil
