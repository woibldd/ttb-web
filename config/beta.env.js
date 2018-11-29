'use strict'
module.exports = {
  NODE_ENV: '"beta"',
  STATIC: JSON.stringify(process.env.STATIC),
  BASE_API: '"http://i.ix-test.com:8080/"',
  ...require("./theme.env")
}
