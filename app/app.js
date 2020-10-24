const express = require('express')
const glob = require('glob');
const cookieParser = require('cookie-parser');
//解决异步异常
require('express-async-errors');

//biz
const exceptionHandler = require('../app/common/exception/GlobalExceptionHandler');
const loggerConfig = require('../app/common/log/LoggerConfig');
const config = require('../config/config');
const BizException = require('../app/common/exception/BizException');
const BizResultCode = require('../app/common/api/BizResultCode');
const MysqlTemplate = require('../app/biz/dao/mysql/MysqlTemplate');
const TencentCloudUtil = require('../app/common/util/TencentCloudUtil');
const HttpConfig = require('../app/common/request/HttpConfig');
const NetUtil = require('../app/common/util/NetUtil');
const RedisConfig = require('../app/biz/dao/redis/RedisConfig');
//init 暂未做更多封装
MysqlTemplate.init();
TencentCloudUtil.initCredential();
RedisConfig.conn();

const app = express()
const port = config.server.port



//cookie
app.use(cookieParser());
// json
app.use(express.json({limit:config.server.bodyLimit}));
app.use(express.urlencoded({parameterLimit:config.server.bodyLimit,extended:false}));
//log
loggerConfig.logger(app);

//* 匹配所有 在注册路由之前拦截
app.use('*' ,async (req,res,next) =>HttpConfig.handler(req,res,next));


//自动注册路由
glob.sync(config.routerPath).forEach(file => {
    //注入路由文件
    const router = require('./' + file);
    app.use(config.server.contextPath, router);
});

// 404
app.use((req, res, next) => next(new BizException(BizResultCode.API_NOT_FOUNT)))

//异常适配器
app.use((err, req, resp, next) => exceptionHandler.handler(err, req, resp, next));
//监听
app.listen(port, () => {
    console.log(
        '\n----------------------------------------------------------\n\t'+
        'Application %s is running! Access URLs:\n\t'+
        'Local: \t\t http://localhost:%s%s\n\t'+
        'External: \t http://%s:%s%s\n'+
        '----------------------------------------------------------',
        config.appName,
        port,
        config.server.contextPath,
        NetUtil.getIPAddress(),
        port,
        config.server.contextPath,
    )
})


