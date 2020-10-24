


const ioRedis = require('ioredis');


//转换配置文件
let config = require('../../../../config/config');
config = require('../../../../config/config.' + config.active);

/**
 * @author ycx
 * https://github.com/luin/ioredis/blob/HEAD/API.md
 * redis配置工具
 * todo 暂未做具体实施
 */
class RedisConfig {
    /**
     *连接接对象
     */
    static #ioRedisObj;

    /**
     * 初始化连接redis
     *
     */
   static conn(){
        const  host = config.redis.host;
        const port = config.redis.port;
        const database =config.redis.database;
        const password =config.redis.password;
       // const maxClient = config.redis.pool.maxClient;
        const keepAlive = config.redis.pool.keepAlive;
        this.#ioRedisObj = new ioRedis({
            host:host,
            port:port,
            password:password,
            db:database,
            keepAlive:keepAlive,
        })

    }

    /**
     * 获取redis 客户端对象
     */
    static getClient(){
       return this.#ioRedisObj;
    }

}

module.exports = RedisConfig

