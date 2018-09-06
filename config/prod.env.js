'use strict'
module.exports = {
  NODE_ENV: '"production"',
  MODE: JSON.stringify(process.env.MODE),
  STATIC: JSON.stringify(process.env.STATIC),
  BASE_API: '"http://i.ix-test.com:8080"',
  ...require("./theme.env")
}
