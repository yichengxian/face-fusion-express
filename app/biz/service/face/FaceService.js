const TencentCloudUtil = require('../../../common/util/TencentCloudUtil');
const BizException = require('../../../common/exception/BizException');
const BizResultCode = require('../../../common/api/BizResultCode');
const StringUtil = require('../../../common/util/StringUtil');
const TencentCloudSDKHttpException = require("tencentcloud-sdk-nodejs/tencentcloud/common/exception/tencent_cloud_sdk_exception");

/**
 * @author ycx
 * @description
 */
class FaceService {

    /**
     * 转换人脸
     * @param base64Img base64 的图片
     * @param gender 转换
     * @return {Promise<String>}
     */
    static async swapGender(base64Img, gender) {

        const url = await TencentCloudUtil.swapGenderPic(gender, base64Img, null, 'url');
        //如果返回的是一个异常对象
        if (url instanceof TencentCloudSDKHttpException){
            //异常抛出
            throw new BizException(BizResultCode.BIZ_FACE_TENCENT_ERROR,url.message)
        }

        //人脸获取异常
        if (StringUtil.isEmpty(url)) {
            throw new BizException(BizResultCode.BIZ_FACE_URL_NULL);
        }

        return url;
    }

    /**
     * 转换年龄
     * @param base64Img {String} base64 的图片
     * @param age {Number}年龄
     * @return {Promise<String>}
     * @constructor
     */
    static async changeAge(base64Img, age) {
        const url = await TencentCloudUtil.changeAgePic(age,base64Img,null,'url');
        //如果返回的是一个异常对象
        if (url instanceof TencentCloudSDKHttpException){
            //异常抛出
            throw new BizException(BizResultCode.BIZ_FACE_TENCENT_ERROR,url.message)
        }

        //人脸获取异常
        if (StringUtil.isEmpty(url)) {
            throw new BizException(BizResultCode.BIZ_FACE_URL_NULL);
        }

        return url;
    }

    /**
     * 人脸动漫化
     * @param disableGlobalEffec {Boolean}全局
     * @param base64Img {String} 图片base64
     * @return {Promise<String>}
     */
    static async faceCartoon( base64Img,disableGlobalEffec) {
        const url = await TencentCloudUtil.faceCartoonPic(disableGlobalEffec, base64Img, null, 'url');
        //如果返回的是一个异常对象
        if (url instanceof TencentCloudSDKHttpException){
            //异常抛出
            throw new BizException(BizResultCode.BIZ_FACE_TENCENT_ERROR,url.message)
        }

        //人脸获取异常
        if (StringUtil.isEmpty(url)) {
            throw new BizException(BizResultCode.BIZ_FACE_URL_NULL);
        }
        return url;
    }
}

module.exports = FaceService
