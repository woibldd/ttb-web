'use strict'
module.exports = {
  NODE_ENV: '"production"',
  STATIC: JSON.stringify(process.env.STATIC),
  // BASE_API: '"http://i.ix-test.com:8080"',
  //BASE_API: '"https://i.ixex.io"',
  //BASE_API: '"https://i.ixex.pro"',
  BASE_API: '"https://i.ixxex.me"',
  ...require("./theme.env")
}
