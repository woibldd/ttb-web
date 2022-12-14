/*
 * @Author: zlccy
 * @Date: 2019-09-17 12:02:20
 * @LastEditTime: 2019-09-17 12:02:20
 * @Description: file content
 */
'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const THEME_ENV = require(`../src/theme/js/default.js`)

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const fs = require('fs')
const dir = fs.readdirSync(resolve('src/projects'))
const projects = {
}

const page = process.env.PAGE

dir.forEach(dir => {
  if (page && dir !== page) {
    return
  }
  projects[dir] = {}
  projects[dir].entry = ['./src/projects/' + dir + '/' + dir + '.js']
  projects[dir].name = dir
  projects[dir].config = require('../src/projects/' + dir + '/_config.js')
  projects[dir].template = 'template.html'
})

module.exports = {
  projects: projects,
  dev: {
    THEME_ENV,
    // Paths
    arrowedHosts: [
      'ix.com',
      '.ix.com'
    ],
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/test': {
        target: 'https://i.ttb.plus/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^\/test': ''
        }
      }
    },

    // Various Dev Server settings
    host: process.env.HOST || '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    THEME_ENV,
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */ 
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
