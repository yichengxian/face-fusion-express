const Code = require('./bean/Code')

/**
 * @author ycx
 * @description 业务异常通用code
 */
class BizResultCode {
    static SUCCESS = new Code(200, '成功');
    static FAILED = new Code(500, '失败');
    static VALIDATE_FAILED = new Code(400, '参数校验失败');
    static API_NOT_FOUNT = new Code(404, '接口不存在');
    static API_BUSY = new Code(700,'操作过于频繁')

    //业务
    //用户校验层 10-001
    static BIZ_TOKEN_NOT_FOUNT =new Code(10001,'token 不能为空');
    static BIZ_USER_NOT_FOUNT = new Code(10002, '用户不存在或已被禁用');


    //11人脸
    static BIZ_FACE_URL_NULL = new Code(11001,'转换人脸失败');

    static BIZ_FACE_TENCENT_ERROR = new Code(11002,"腾讯云人脸特效转换异常");

    static BIZ_FACE_BASE64_NOT_IMAGE= new Code(11003,"不是图片类型的base64");
}

module.exports = BizResultCode

