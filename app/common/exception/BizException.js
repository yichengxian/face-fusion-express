const BizResultCode = require('../api/BizResultCode');
const StringUtil = require('../util/StringUtil');

/**
 * 业务异常
 */
class BizException extends Error {

    code;

    msg;

    /**
     * 构造
     * @param bizResultCode {Code}
     * @param errMsg {String} 消息
     */
    constructor(bizResultCode, errMsg) {
        let msg = bizResultCode.desc
        if (StringUtil.isNotEmpty(errMsg)) {
            msg = errMsg;
        }
        super(msg);
        this.code = bizResultCode.code;
        this.msg = msg;
        this.name = 'BizException';
    }

    /**
     * 抛出业务失败，并且附带消息
     * @param errMsg {String}
     */
    static failMsg(errMsg) {
       return  new BizException(BizResultCode.FAILED, errMsg)
    }
}

module.exports = BizException
