/**
 * 配置文件
 * @type {{}}
 */
module.exports ={
    /**
     * mysql
     */
    mysql:{
        host:'127.0.0.1',
        port:59666,
        database:'dev',
        username:'dev',
        password:'123456',
        //连接池
        pool:{
            max:5,
            min:0,
            acquire:30000,
            idle:10000
        },
        //sql日志打印
        logging:{
            enable:true
        },
        //字段定义 todo 未作整理
        define:{
            //关闭自动更新时间
            timestamps:false
        }
    },
    /**
     * redis
     */
    redis:{
        host:'127.0.0.1',
        port:6379,
        database:0,
        password:'123456',
        /**
         * 连接池
         */
        pool:{
            maxClient:30,
            keepAlive:3000
        }
    }
}
