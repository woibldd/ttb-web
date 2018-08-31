'use strict'
module.exports = {
  NODE_ENV: '"production"',
  MODE: JSON.stringify(process.env.MODE),
  STATIC: JSON.stringify(process.env.STATIC),
  ...require("./theme.env")
}
