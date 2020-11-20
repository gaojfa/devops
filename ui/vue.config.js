// const fs = require('fs')


// const https = false
// apiUrl 真实数据接口地址
const apiUrl = 'http://172.17.13.48'

module.exports = {

  // 生产环境路径前缀
  publicPath: './',

  // 生产环境输出目录
  outputDir: 'dist', // 'dist/' + process.env.VUE_APP_NAME,

  // 开发环境web服务
  devServer: {
    host: '0.0.0.0',
    port: 9999,
    // https: https ? {
    //   key: fs.readFileSync('./nginx/ssl/nginx.key'),
    //   cert: fs.readFileSync('./nginx/ssl/nginx.crt')
    // } : false,

    // 开发环境热更新
    hot: true,
    watchOptions: {
      poll: false
    },

    // 开发环境gz压缩
    compress: true,

    // 开发环境在遮罩层报错
    overlay: {
      warnings: true,
      errors: true
    },

    // 开发环境后端api
    proxy: {
      '/cloudui/master/ws': {
        target: apiUrl + ':5091',
        secure: false,
        pathRewrite: { '^/cloudui/master/ws': '/masterl/ws' }
      }
    },

    // 开发环境安全响应头
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block'
      // 'Strict-Transport-Security': 'max-age=31536000; includeSubdomains',
    }
  },

  // 配置loader的参数
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  // 生产环境.map文件
  productionSourceMap: false,

  pages: {
    app: { entry: './src/entry/main.js', template: 'public/index.html', filename: 'index.html' }
  },

  chainWebpack: (config) => {
  // 移除预加载，用不上
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('preload-app')
    config.plugins.delete('prefetch-app')

    // url-loader加上ico格式
    config.module.rule('images').test(/\.(ico|png|jpe?g|gif|webp)(\?.*)?$/)
  },

  configureWebpack: (config) => {
    // config.entry = {
    //   app: entry // './src/entry/' + CMP_TPL_NAME + '/' + CMP_APP_NAME + '.js'
    // }

    if (process.env.NODE_ENV === 'production') {
    // 生产环境gz压缩
      const CompressionWebpackPlugin = require('compression-webpack-plugin')
      config.plugins.push(new CompressionWebpackPlugin({
        test: new RegExp('\\.(css|js)$'),
        threshold: 10240
      }))
    }
  }
}
