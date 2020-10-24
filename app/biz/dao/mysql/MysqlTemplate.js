const sequelizeConfig = require('./SequelizeConfig');

/**
 * mysql template
 *
 */
class MysqlTemplate {
    static #mysqlConn;

    /**
     * 初始化
     */
    static init() {
        this.#mysqlConn = sequelizeConfig.mysqlConn();
        sequelizeConfig.authenticate(this.#mysqlConn);
    }

    /**
     * model化
     * @param modelOptions {ModelOptions}
     */
    static model(modelOptions) {
        return modelOptions(this.#mysqlConn)
    }

}


module.exports = MysqlTemplate
