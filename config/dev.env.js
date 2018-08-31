'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env').default

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  STATIC: '"/"',
  ...require("./theme.env")
})
