const express = require(`express`)
const router = express.Router()

const homeController = require('../../controller/home/HomeController');
const loggerConfig = require('../../../common/log/LoggerConfig');

router.get('/', async (req, resp) => {
    const result = homeController.index();
    resp.send(result)

    //记录日志
    loggerConfig.insertDb(req, resp, result)
    // resp.end();
})

module.exports = router;

