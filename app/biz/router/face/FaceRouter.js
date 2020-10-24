const express = require(`express`)
const router = express.Router()

const faceController = require('../../controller/face/FaceController');

const loggerConfig = require('../../../common/log/LoggerConfig');

/**
 * 转化性别
 */
router.post('/swapGender', async (req, resp) => {
    const reqBody = req.body;
    const base64Img = reqBody.base64Img;
    const gender = reqBody.gender;

    const result = await faceController.swapGender(base64Img, Number(gender));

    resp.send(result);

    //记录日志
    loggerConfig.insertDb(req, resp, result)
    // resp.end();

})

/**
 * 转化年龄
 */
router.post('/changeAge', async (req, resp) => {
    const reqBody = req.body;
    const base64Img = reqBody.base64Img;
    const age = reqBody.age;

    const result = await faceController.changeAge(base64Img, Number(age));

    resp.send(result);
    //记录日志
    loggerConfig.insertDb(req, resp, result)
    // resp.end();
})

/**
 * 人脸动漫化
 */
router.post('/faceCartoon', async (req, resp) => {
    const reqBody = req.body;
    const base64Img = reqBody.base64Img;
    const disableGlobalEffec = reqBody.disableGlobalEffec;

    const result = await faceController.faceCartoon(base64Img, Number(disableGlobalEffec));

    resp.send(result);

    //记录日志
    loggerConfig.insertDb(req, resp, result)
    // resp.end();
})


module.exports = router;
