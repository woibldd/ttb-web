const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const THEME = 'default'// process.env

function colorRgb (color) {
  let sColor = color.toLowerCase()
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    let sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    return 'RGB(' + sColorChange.join(',') + ')'
  }
  return sColor
}

module.exports = function () {
  const sassVar = fs.readFileSync(path.resolve(__dirname, `../css/${THEME}.scss`), 'utf-8')

  const sassObj = sassVar.match(/\$.+(?=;)/g)

  const styleVar = _.transform(sassObj, (result, n) => {
    const [key, val] = n.split(':')
    // 变量名转为驼峰
    const camelKey = key.replace(/-(\w)/g, x => x.slice(1).toUpperCase())
    Object.assign(result, {[camelKey]: val.trim()})
    return n
  }, {});

  ['$buy', '$sell'].forEach(
    o => {
      styleVar[`${o}RGB`] = colorRgb(styleVar[o])
    }
  )
  return styleVar
}
