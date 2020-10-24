const GenderConstant = require('../../../common/constant/GenderConstant');
const BizResult = require('../../../common/api/BizResult');
const FlagConstant = require('../../../common/constant/FlagConstant');
const faceService = require('../../service/face/FaceService');
const BizException = require("../../../common/exception/BizException");
const BizResultCode = require("../../../common/api/BizResultCode");

/**
 * 脸部控制层
 */
class FaceController {

    /**
     * 转换性别
     * @param base64Img {String} base64 图片
     * @param gender {Number} 选择转换方向，0：男变女，1：女变男。
     */
    static async swapGender(base64Img, gender) {

        if (undefined === base64Img) {
            return BizResult.validateFailed('base64Img');
        }
        //如果不是图片
        if (!('data:image'===base64Img.substring(0,10))){
            throw new BizException(BizResultCode.BIZ_FACE_BASE64_NOT_IMAGE);
        }

        if (GenderConstant.MALE !== gender && GenderConstant.FEMALE !== gender) {
            return BizResult.validateFailed('gender');
        }

        //
        const data = await faceService.swapGender(base64Img, gender);

        return BizResult.success(data);
    }

    /**
     * 转化年龄
     * @param base64Img {String} base64 图片
     * @param age {Number} 转换年龄
     */
    static async changeAge(base64Img, age) {

        if (undefined === base64Img) {
            return BizResult.validateFailed('base64Img');
        }
        //如果不是图片
        if (!('data:image'===base64Img.substring(0,10))){
            throw new BizException(BizResultCode.BIZ_FACE_BASE64_NOT_IMAGE);
        }

        //如果不是数字或者不是整数
        if (Number.isNaN(age)|| !Number.isInteger(age)){
            return BizResult.validateFailed('age');
        }
        const data = await faceService.changeAge(base64Img, age);

        return BizResult.success(data);
    }

    /**
     * 人脸动漫画
     * @param base64Img {String} base64 图片
     * @param disableGlobalEffec {Number} 是否关闭全局动漫化
     */
    static async faceCartoon(base64Img,disableGlobalEffec){
        //
        if (undefined === base64Img) {
            return BizResult.validateFailed('base64Img');
        }

        //如果不是图片
        if (!('data:image'===base64Img.substring(0,10))){
            throw new BizException(BizResultCode.BIZ_FACE_BASE64_NOT_IMAGE);
        }
        const flag = FlagConstant.numToFlag(disableGlobalEffec);
        //如果转化不了
        if (null === flag){
            return BizResult.validateFailed('disableGlobalEffec');
        }
        const data = await faceService.faceCartoon(base64Img,flag.bool);

        return BizResult.success(data);
    }

}

module.exports = FaceController
