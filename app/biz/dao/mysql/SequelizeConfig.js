const {Sequelize} = require('sequelize');
//转换配置文件
let config = require('../../../../config/config');
config = require('../../../../config/config.' + config.active);

/**
 * msql 定义的sequelize 配置
 * 暂未做抽离
 * <a>https://www.sequelize.com.cn/</a>
 */
class SequelizeConfig {

    /**
     * mysql 链接
     * @return {Sequelize | Model<any, string | string | number> | Transaction | BelongsTo<Model, Model>}
     */
   static mysqlConn() {
        const host = config.mysql.host;
        const username = config.mysql.username;
        const port = config.mysql.port;
        const database = config.mysql.database;
        const password = config.mysql.password;
        return new Sequelize(database, username, password, {
            host: host,
            port: port,
            //链接池配置 具体请看源码
            pool: {
                max: config.mysql.pool.max,
                min: config.mysql.pool.min,
                acquire: config.mysql.pool.acquire,
                idle: config.mysql.pool.idle,
            },
            //default 'mysql'
            dialect: "mysql",
            //日志
            logging:config.mysql.logging.enable,
            //
            define:{
                //关闭自动更新时间
                timestamps:false,
                //createdAt:
               // updatedAt:
            }
        });

    }

    /**
     * 关闭链接
     * @param sequelize {Sequelize}
     */
    static close(sequelize) {
        return sequelize.close();
    }

    /**
     * 验证链接
     * @param  sequelize {Sequelize}
     */
   static authenticate(sequelize) {
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (e) {
            console.error('Unable to connect to the database:', e);
        }
    }
}
module.exports = SequelizeConfig;
