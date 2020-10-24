module.exports = {
    //运行环境
    active: 'dev',
    //路由正则 相对app.js的路径
    routerPath: 'biz/router/**/*.js',
    //服务器名称
    appName:'face-fusion',
    /**
     * 服务器
     */
    server: {
        port: 8080,
        contextPath: '/face',
        //上传body 最大大小 2m
        bodyLimit:2100000
    },
    //权限 这里应该需要设计到表中处理
    auth:{
        //开放路径白名单
        enable:[
            '/face',
            '/face/home'
        ]
    },
    /**
     * 日志
     * <a>https://segmentfault.com/a/1190000020218492</a>
     */
    morgan:{
        // 默认的选项 1,combined 2,common 3,default 4,short 5,tiny 6,dev
        name:'face',
        //日志打印格式
        format:'[:dateZh] -clientIp:[:clientIp] -method::method -uri::url -token::token -time::response-time ms',
        //日志存储目录必填
        logDir:'../../logs',
        //开启数据库存储
        enableDb:true,
        //开启文件存储
        enableFile:true,
    },
    /**
     * 腾讯云相关配置
     */
    tencentcloud:{
        secretId :'',
        secretKey:'',
        //区域
        region:'ap-guangzhou'
    }

}
