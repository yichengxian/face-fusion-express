const BizResult = require('../api/BizResult');
const loggerConfig = require('../log/LoggerConfig');
/**
 * @author ycx
 * @description 统一异常拦截
 */
class GlobalExceptionHandler {
    /**
     *
     * @param err 异常
     * @param req 请求
     * @param resp 响应
     * @param next
     */
    static handler(err, req, resp, next) {

        // set locals, only providing error in development
        resp.locals.message = err.message||err.msg;
        resp.locals.error = req.app.get('env') === 'development' ? err : {};


        if ('BizException' === err.name) {
            resp.send(BizResult.bizFail(err))
        } else {
            //记录异常日志
            loggerConfig.errLog(req,err);

            resp.send(BizResult.fail(err.message))
        }

        resp.end();
    }
}

module.exports = GlobalExceptionHandler
