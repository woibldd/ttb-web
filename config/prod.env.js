'use strict'
module.exports = {
  NODE_ENV: '"production"',
  STATIC: JSON.stringify(process.env.STATIC),
  // BASE_API: '"http://i.ix-test.com:8080"',
  BASE_API: '"https://i.ixx.com/"',
  ...require("./theme.env")
}
