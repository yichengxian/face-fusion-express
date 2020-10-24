
const mysqlTemplate = require('../../dao/mysql/MysqlTemplate');

class HomeService {

    /**
     *
     * @return {string}
     */
    static index(){
        //
     /*   const basic  = mysqlTemplate.model(BasicArticle);

        const findAll = basic.findAll({}).then(
           res => console.log(res)
        );
*/
        return 'hello world 这是一个restful 的server';
    }
}

module.exports =HomeService
