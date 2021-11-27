let proxyObj = {}

proxyObj['/api']={
    // websocket
    ws:false,
    // 目标地址
    target:'http://localhost:8081/api',
    // 发送请求头host 会被设置成 target
    changeOrigin: true,
    // 不重写请求地址
    pathRewrite:{
        '^/api':'/'
    }
}
module.exports = {
    devServer: {
        host:'localhost',
        port: '8080',
        proxy: proxyObj
    }
}
