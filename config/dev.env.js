'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env').default

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  STATIC: '"/"',
  //BASE_API: '"http://i.ix-test.com:8080"',
  // BASE_API: '"https://i.ixex.io"',
  BASE_API: '"https://i.ixxweb.com"',
  // BASE_API: '"https://i.fobit.net"',
  // BASE_API: '"https://i.qimenpaipan.com"',
  // BASE_API: '"https://i.nstarex.com"',
  ...require("./theme.env")
})
