const tencentcloud = require("tencentcloud-sdk-nodejs");
const FtClient = tencentcloud.ft.v20200304.Client;
const models = tencentcloud.ft.v20200304.Models;
const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;
const config = require('../../../config/config');


/**
 * 腾讯云api调用工具类
 */
class TencentCloudUtil {
    static #cred;
    //
    static #ftEndpoint = 'ft.tencentcloudapi.com';

    /**
     * 初始化
     * @return {void}
     */
    static initCredential() {
        this.#cred = new Credential(config.tencentcloud.secretId, config.tencentcloud.secretKey);
        console.log('tencentcloud credential init.');
    }

    /**
     * 创建客户端
     * @param endpoint 请求区域对象
     * @param credential 链接对象
     */
    static #createClient(endpoint, credential) {
        let httpProfile = new HttpProfile();
        httpProfile.endpoint = endpoint;
        let clientProfile = new ClientProfile();
        clientProfile.httpProfile = httpProfile;
        return new FtClient(credential, config.tencentcloud.region, clientProfile);
    }

    /**
     * 转换年龄
     * @param age e.g. 18 年龄
     * @param image base64 对象 可选
     * @param url 图片地址 可选
     * @param rspImgType 返回图片格式 base64 或 url
     */
    static changeAgePic(age, image, url, rspImgType) {

        let client = this.#createClient(this.#ftEndpoint, this.#cred);

        let req = new models.ChangeAgePicRequest();

        const params = {
            "Image": image,
            "Url": url,
            "AgeInfos": [
                {
                    "Age": age
                }
            ],
            "RspImgType": rspImgType
        };

        req.from_json_string(JSON.stringify(params));

        return new Promise(resolve => {
            client.ChangeAgePic(req, (errMsg, resp) => {
                if (errMsg) {
                    //直接往外抛
                    console.error(errMsg);
                    resolve(errMsg);
                    return ;
                }
                //base64 数据
                if ('base64' === rspImgType) {
                    resolve(resp.ResultImage);
                } else {
                    resolve(resp.ResultUrl);
                }
            })
        });

    }

    /**
     * 转换性别
     * Gender 0 男边女 1 女变男
     * @param gender 0 男边女 1 女变男
     * @param image base64 对象 可选
     * @param url 图片地址 可选
     * @param rspImgType 返回图片格式 base64 或 url
     */
    static swapGenderPic(gender, image, url, rspImgType) {

        let client = this.#createClient(this.#ftEndpoint, this.#cred);

        let req = new models.SwapGenderPicRequest();

        let params = {
            "Image": image,
            "GenderInfos": [
                {
                    "Gender": gender
                }
            ],
            "Url": url,
            "RspImgType": url
        };
        req.from_json_string(JSON.stringify(params));

        return new Promise(resolve => {
            client.SwapGenderPic(req, function (errMsg, response) {
                if (errMsg) {
                    //直接往外抛
                    console.error(errMsg);
                    resolve(errMsg);
                    return ;
                }
                //base64 数据
                if ('base64' === rspImgType) {
                    resolve(response.ResultImage);

                } else {
                    resolve(response.ResultUrl);
                }
            });
        });
    }

    /**
     * 人脸动漫化
     * @param disableGlobalEffec 关闭全图动漫化，传入true（不分大小写）即关闭全图动漫化
     * @param image base64 图片
     * @param url url
     * @param rspImgType 返回类型
     */
    static faceCartoonPic(disableGlobalEffec, image, url, rspImgType) {

        let client = this.#createClient(this.#ftEndpoint, this.#cred);
        let req = new models.FaceCartoonPicRequest();
        let params = {
            "Image": image,
            "Url": url,
            "RspImgType": rspImgType,
            "DisableGlobalEffect": disableGlobalEffec
        };
        req.from_json_string(JSON.stringify(params));
        return new Promise(resolve => {
            client.FaceCartoonPic(req, function (errMsg, response) {
                if (errMsg) {
                    //直接往外抛
                    console.error(errMsg);
                    resolve(errMsg);
                    return ;
                }
                //base64 数据
                if ('base64' === rspImgType) {
                    resolve(response.ResultImage);

                } else {
                    resolve(response.ResultUrl);
                }
            })
        });
    }

}

module.exports = TencentCloudUtil

