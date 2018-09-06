'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env').default

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  STATIC: '"/"',
  BASE_API: '"http://i.ix-test.com:8080"',
  ...require("./theme.env")
})
