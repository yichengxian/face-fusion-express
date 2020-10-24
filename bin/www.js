//
const app = require('../app/app');
let config = require('../config/config');
const debug = require('debug')('face-fusion-express:server');
const http = require('http');

//读取配置文件
config = require('../config/config.' + config.active)

//默认端口3000
const port = config.server.port || 3000;
app.set('port', port);

app.get('/',((req, res) => res.send('hello world ')))

/**
 * Create HTTP server.
 */
app.listen(port,()=>{console.log('this port: %s',port)})
