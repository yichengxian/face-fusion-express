const BizResultCode = require('./BizResultCode');

/**
 * @author ycx
 * @description 统一返回结果
 */
class BizResult {
    code;
    msg;
    data;

    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    /**
     * 成功
     * @param data
     * @return {BizResult}
     */
    static success(data) {
        return new BizResult(BizResultCode.SUCCESS.code, BizResultCode.SUCCESS.desc, data);
    }

    /**
     * 失败
     */
    static fail(errData) {
        return new BizResult(BizResultCode.FAILED.code, BizResultCode.FAILED.desc, errData);
    }

    /**
     * 参数校验失败
     */
    static validateFailed(param) {
        return new BizResult(BizResultCode.VALIDATE_FAILED.code, BizResultCode.VALIDATE_FAILED.desc, param);
    }

    /**
     * token 校验异常
     * @return {BizResult}
     */
    static tokenFailed() {
        return new BizResult(BizResultCode.BIZ_USER_NOT_FOUNT.code, BizResultCode.BIZ_USER_NOT_FOUNT.desc);
    }

    /**
     * 用户异常
     */
    static userFailed(){
        //xxx
    }

    /**
     * 拦截到的业务异常
     * @param bizException
     */
    static bizFail(bizException) {
        return new BizResult(bizException.code, bizException.msg, null);
    }


}

module.exports = BizResult




