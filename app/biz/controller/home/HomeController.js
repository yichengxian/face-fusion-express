
const homeService = require('../../service/home/HomeService');

const BizResult = require('../../../common/api/BizResult');
/**
 * @author ycx
 * @description
 */
class HomeController{

    /**
     * index
     * @param req
     * @param resp
     */
    static index(){

        return BizResult.success(homeService.index());
    }

}
module.exports =HomeController
