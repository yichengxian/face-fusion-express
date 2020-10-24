const RedisConfig = require('./RedisConfig');

/**
 * redis template
 */
class RedisTemplate {


    /**
     * 调用redis set 命令
     * @param key
     * @param value
     * @param expire 秒
     * @return {void}
     */
    static set(key,value,expire){
        RedisConfig.getClient().set(key,value,'EX',expire)
    }

    /**
     * 调用redis get 命令
     * @param key
     * @return {Object}
     */
    static get(key){
       return  RedisConfig.getClient().get(key);
    }

    /**
     * 调用 redis expire 命令
     * @param key
     * todo
     */
    static expire(key,second){
        //暂无实现
        return RedisConfig.getClient().expire(key,second);
    }

    /**
     * 调用setNx 命令 并且设置失效时间
     * @param key
     * @param value
     * @param expire
     */
    static setNx(key,value,expire){

       return  RedisConfig.getClient().setnx(key,value).then( res =>{
           if (1 === res) {
               this.expire(key,expire);
           }
           return res;
       });
    }


}

module.exports =  RedisTemplate


