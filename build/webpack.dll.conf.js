const path = require('path');
const webpack = require('webpack');
 
module.exports = {
  entry: {
    vendor: ['vue/dist/vue.common.js',
            'vue',
            'vue-material',
            'vue-i18n',
            'vue-clipboard2',
            'vue-awesome-swiper',
            'vue-router',
            'vuex',
            'axios',
            'element-ui',
            'mint-ui',
            'lodash',
            '@sentry/browser', 
            'big.js',
            'pdfmake',
            'highcharts', 
            'copy-to-clipboard',
            'moment',
            'reconnecting-websocket', 
            'v-depth-chart',
            'wowjs'
           ]
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'       // vendor.dll.js中暴露出的全局变量名
  },
  plugins: [ 
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};