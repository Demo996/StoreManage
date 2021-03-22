module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.0.14:80', //要跨域的域名
                changeOrigin: true, //是否开启跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}