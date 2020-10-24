const StringUtil = require('../util/StringUtil');
const BizResult = require('../api/BizResult');
const CommonConstant = require('../constant/CommonConstant');
const config = require('../../../config/config');


/**
 * token 适配器
 */
class TokenHandler {

    /**
     * 校验用户
     * @param req {Request}
     * @param resp {Response}
     */
    static checkToken(req, resp) {

        let token = req.header(CommonConstant.TOKEN_KEY);
        let flag = StringUtil.isEmpty(token) && (-1 === config.auth.enable.indexOf(req.baseUrl));
        if (flag ) {
            resp.send(BizResult.tokenFailed());
        }
        //如果有用户表继续校验用户是否存在
        return flag;
    }
}

module.exports = TokenHandler
