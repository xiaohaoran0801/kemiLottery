const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    publicPath:'./',
    configureWebpack: config => {
        if (isProduction) {
             config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',// 使用gzip压缩
                test: new RegExp(
                    '\\.(js|css)$' // 压缩 js 与 css
                ),
                threshold: 5000,// 资源文件大于10240B=10kB时会被压缩
                minRatio: 0.8 // 最小压缩比达到0.8时才会被压缩
            })),
            config.plugins.push(new HtmlWebpackPlugin({
                filename:'index.html',
                template: './src/index.html'
            }))
            //这部分代码就是我们要从bundle中导出来的依赖
            config.externals = {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'element-ui': "ELEMENT",
                'axios':'axios',
            }
        }
    }
}
