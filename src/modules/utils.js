import _ from 'lodash'
import Big from 'big.js'
import eventHub from './eventHub'
import consts from '@/libs/consts'
// import pako from 'pako'
 
const preloadEl = document.querySelector('.page-loading')
const externalModule = {}
const localeName = {
  'zh-CN': '简体中文',
  'zh-HK': '繁體中文',
  'en': 'English',
  'ko': '한국어'
}

const utils = {
  $app: null,
  $fa2: null,
  $mobilefa2: null,
  $tvSocket: null,
  $i18n: null,
  domain: '',
  staticPath: process.env.STATIC,
  Big,
  isDev: process.env.NODE_ENV === 'development',
  // isBeta: process.env.MODE === 'beta',
  isProd: process.env.NODE_ENV === 'production',
  locales: localeName, 

  getLocaleName(locale) {
    return localeName[locale] || 'Unknown'
  },
  getUrlParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r !== null) {
      return decodeURIComponent(r[2])
    }
    return null
  },
  getAppParam(name) {
    var reg = new RegExp('@' + name + '=([^@]*)(@|$)')
    var r = window.navigator.userAgent.match(reg)
    if (r !== null) {
      return decodeURIComponent(r[1])
    }
    return null
  },
  getDefaultLang() {
    // return 'zh-CN'
    // const lang = navigator.language
    // if (/^en(-|$)/.test(lang)) {
    //   return 'en'
    // }
    // if (/^zh(-|$)/.test(lang)) {
    //   return 'zh-CN'
    // }
    // if (/^ko(-|$)/.test(lang)) {
    //   return 'ko'
    // }
    // if (/^zh-(HK|TW)/.test(lang)) {
    //   return 'zh-HK'
    // }
    return 'en'
  },
  getGtLang(locale) {
    if (locale === 'zh-CN') {
      return 'zh-cn'
    }
    if (locale === 'en' || locale === 'ja') {
      return locale
    }
    if (locale === 'zh-HK') {
      return 'zh-tw'
    }
    return 'en'
  },
  getStorageValue(key, field) {
    if ('localStorage' in window) {
      const item = window.localStorage.getItem(key)
      if (field) {
        return JSON.parse(item)[field]
      }
      return item
    }
    return ''
  },
  setStorageValue(key, str) {
    if ('localStorage' in window) {
      window.localStorage.setItem(key, str)
    }
  },
  setSessionStorageValue(key, str) {
    if ('sessionStorage' in window) {
      window.sessionStorage.setItem(key, str)
    }
  },
  getSessionStorageValue(key, field) {
    if ('sessionStorage' in window) {
      const item = window.sessionStorage.getItem(key)
      if (field) {
        return JSON.parse(item)[field]
      }
      return item
    }
    return ''
  },
  getDefaultTimezone() {
    const data = window.localStorage.getItem('tradingview.chartproperties')
    if (data) {
      try {
        const props = JSON.parse(data)
        if (props && props.timezone) {
          return props.timezone
        }
      } catch (e) {
        utils.logE(e)
      }
    }
    const offset = new Date().getTimezoneOffset() / (-60)
    switch (offset) {
      case 0:
        return 'utc'
      case 1:
        return 'Europe/London'
      case 2:
        return 'Europe/Paris'
      case 3:
        return 'Europe/Athens'
      case 4:
        return 'Asia/Dubai'
      case 5:
        return 'Asia/Ashkhabad'
      case 6:
        return 'Asia/Almaty'
      case 7:
        return 'Asia/Bangkok'
      case 8:
        return 'Asia/Shanghai'
      case 9:
        return 'Asia/Tokyo'
      case 10:
        return 'Australia/Sydney'
      case -10:
        return 'Pacific/Honolulu'
      case -7:
        return 'America/Los_Angeles'
      case -5:
        return 'America/Bogota'
      case -4:
        return 'America/Toronto'
      case -3:
        return 'America/Sao_Paulo'
      default:
        return ''
    }
  },
  getFiatMoneyByLocale(locale) {
    const map = {
      'zh-CN': 'CNY',
      'zh-HK': 'HKD',
      'ko': 'KRW',
      'en': 'USD'
    }
    return map[locale] || 'USD'
  },
  getFiatMoneySymbolByLocale(locale) {
    const map = {
      'zh-CN': '¥',
      'zh-HK': 'HK$',
      'ko': '₩',
      'en': '$'
    }
    return map[locale] || 'US$'
  },
  getFiatMoneySymbolByFiat(fiat) {
    const map = {
      'CNY': '¥',
      'USD': '$',
      'KRW': '₩',
      'HKD': 'HK$',
      'JPY': 'JP¥',
      'SGD': 'S$'
    }
    return map[fiat] || fiat
  },
  preloadStart() {
    preloadEl.classList.add('show')
  },
  preloadError(msg) {
    preloadEl.classList.add('error')
    preloadEl.querySelector('._a').innerHTML = msg
  },
  preloadEnd() {
    preloadEl.classList.remove('show')
  },
  rand(n) {
    return Math.floor(Math.random() * (n + 1))
  },
  info(msg, id = msg) {
    return utils.alert(msg, id, 'info')
  },
  success(msg, id = msg) {
    return utils.alert(msg, id, 'success')
  },
  danger(msg, id = msg) {
    return utils.alert(msg, id, 'danger')
  },
  warning(msg, id = msg) {
    return utils.alert(msg, id, 'warning')
  },
  alert(msg, id = msg, style = 'danger') {
    return utils.notify({
      id,
      style,
      type: 0,
      title: msg
    })
  },
  confirm(self, options = {}) {
    const {
      title,
      content,
      confirmBtnText,
      cancelBtnText,
      type,
      dangerouslyUseHTMLString
    } = options

    return new Promise((resolve, reject) => {
      self.$confirm(content, title, Object.assign({
        confirmButtonText: confirmBtnText || self.$i18n.t('confirm'),
        cancelButtonText: cancelBtnText || self.$i18n.t('cancel'),
        type: type || 'warning',
        dangerouslyUseHTMLString: dangerouslyUseHTMLString || false
      }, options)).then(() => {
        resolve(true)
      }).catch((e) => {
        resolve(false)
      })
    })
  },
  notify(options = {}) {
    if (!options.id) {
      options.id = _.uniqueId()
    }
    options.style = options.style || 'info'
    // options.type = options.type || 0
    options.title = options.title || ''
    options.content = options.content || ''
    options.duration = options.duration || 3000
    options.active = true
    return new Promise((resolve) => {
      options.answer = resolve
      eventHub.$emit('app:notify', options)
    })
  },
  getOffset(el) {
    const box = el.getBoundingClientRect()
    return {
      width: box.width,
      height: box.height,
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft
    }
  },
  sleep(t) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(t)
      }, t)
    })
  },
  async delay(promise, t = 500) {
    const [res] = await Promise.all([
      promise,
      utils.sleep(t)
    ])
    return res
  },
  generateToken(len = 16) {
    const source = '1234567890qwertyuiopasdfghjklzxcvbnm'
    let token = ''
    for (let i = 0; i < len; i += 1) {
      token += source[Math.floor(Math.random() * 36)]
    }
    return token
  },
  getDomain() {
    if (utils.domain) {
      return utils.domain
    }
    // 不支持 .com.cn 这种，
    const domain = document.domain.toLowerCase()
    const match = domain.match(/([a-z-_]+\.)?[a-z-_]+$/)
    utils.domain = match ? match[0] : domain
    return domain
  },
  setCookie(name, value, days) {
    utils.eraseCookie(name)
    let expires = ''
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/; domain=' + utils.getDomain()
  },
  getCookie(name) {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length)
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length)
      }
    }
    return null
  },
  eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;'
    document.cookie = name + '=; Max-Age=-99999999; domain=' + utils.getDomain()
  },
  getCoinIcon(coin = '', color = 'b') {
    return utils.staticPath + 'static/currency/' + color + '_' + coin.toLowerCase() + '@2x.png'
  },
  getScript(source, key) {
    if (key && externalModule[key]) {
      // 缓存机制
      return externalModule[key]
    }
    if (/^static/.test(source)) {
      source = utils.staticPath + source
    }
    const loader = new Promise((resolve, reject) => {
      let script = document.createElement('script')
      const prior = document.getElementsByTagName('script')[0]
      script.async = 1
      prior.parentNode.insertBefore(script, prior)
      const onchange = function(_, isAbort) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
          script.onload = null
          script.onreadystatechange = null
          script = undefined
          if (!isAbort) {
            resolve(window[key])
          }
        }
      }
      script.onreadystatechange = onchange
      script.onload = onchange
      script.onerror = reject
      script.src = source
    })
    if (key) {
      externalModule[key] = loader
    }
    return loader
  },
  preloadImage(src) {
    return new Promise((resolve) => {
      const image = new Image()
      image.onload = () => resolve(true)
      image.onerror = () => resolve(false)
      image.src = src
      if (image.complete) {
        resolve(true)
      }
    })
  },
  getExtModule(key) {
    // the library js should assign the [key] to window object
    const map = {
      'key': 'static/keymaster.js',
      'TradingView': 'static/charting_library/charting_library.min.js'
    }
    return map[key] ? utils.getScript(map[key], key) : null
  },
  leftpad(num) {
    return num < 10 ? '0' + num : '' + num
  },
  unixFormatter(unix, tpl) {
    return utils.dateFormatter(unix * 1000, tpl)
  },
  dateFormatter(ts, tpl = 'Y-M-D H:m:s') {
    if (typeof ts === 'string') {
      ts = parseInt(ts)
    }
    const date = new Date(ts)
    const dateObj = {
      Y: date.getFullYear(),
      M: utils.leftpad(date.getMonth() + 1),
      D: utils.leftpad(date.getDate()),
      H: utils.leftpad(date.getHours()),
      m: utils.leftpad(date.getMinutes()),
      s: utils.leftpad(date.getSeconds())
    }
    for (var key in dateObj) {
      tpl = tpl.replace(key, dateObj[key])
    }
    return tpl
  },
  toThousand(num = 0) {
    if (typeof num === 'undefined') {
      return 0
    }
    return (num || 0).toString().replace(/\d+/, function(n) {
      var len = n.length
      if (len % 3 === 0) {
        return n.replace(/(\d{3})/g, ',$1').slice(1)
      } else {
        return n.slice(0, len % 3) + n.slice(len % 3).replace(/(\d{3})/g, ',$1')
      }
    })
  },
  toBig(num) {
    if (typeof num === 'undefined') {
      return 0
    }
    return Big(num).toString()
  },
  toPretty(num) {
    if (isNaN(num)) {
      return ''
    }
    num = Big(num || 0)
    Big.RM = 0 // rm = 0,向下截取
    if (num < 1) {
      return num.toString()
    }
    if (num < 100) {
      // return num.toFixed(2)
      return num.round(3, 0).toFixed(3)
    }
    if (num < 1e3) {
      return num.round(3, 0).toFixed(3)
    }
    if (num < 1e6) {
      return num.div(1e3).toFixed(3) + 'K'
    }
    // if (num < 1e7) {
    //   return num.div(1e6).toFixed(3) + 'M'
    // }
    if (num < 1e9) {
      return num.div(1e6).toFixed(3) + 'M'
    }
    // if (num < 1e10) {
    //   return num.div(1e7).toFixed(3) + 'B'
    // }
    return num.div(1e9).toFixed(3) + 'B'
  },
  toRound(num, scale = 20, rm = consts.ROUND_DOWN) {
    if (typeof num === 'undefined') {
      return 0
    }
    if (isNaN(num)) {
      return 0
    }
    Big.NE = -16 // 当小数超过16位时使用科学计数法
    return Big(num).round(scale, rm).toString()
  },
  toFixed(num, scale = 8, rm = consts.ROUND_DOWN) {
    if (isNaN(Number(num))) {
      return 0
    }
    return Big(num).round(scale, rm).toFixed(scale)
  },
  toNum(num) {
    if (isNaN(Number(num))) {
      return 0
    }
    return +Big(num).toFixed(12)
  },
  unsign(num) {
    return num > 0 ? num : 0
  },
  getSign(num) {
    return Big(num).cmp(0)
  },
  getRouteMeta(route, metaKey) {
    const findMeta = _.findLast(route.matched, match => !_.isUndefined(match.meta[metaKey]))
    return findMeta && findMeta.meta[metaKey]
  },
  getPreviewImage(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject
      }
      const reader = new FileReader()
      reader.onload = function(e) {
        resolve(e.target.result)
      }
      reader.onerror = function(err) {
        reject(err)
      }
      reader.readAsDataURL(file)
    })
  },
  log() {},
  logI() {},
  logW() {},
  logE() {},
  isMobile() {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  },
  isIos() {
    return navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i)
  },
  isAndroid() {
    return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1
  },
  isWeiXin() {
    return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger' 
  }, 
  isTestnet() {
    return (
      location.hostname.indexOf("ixex.pro") >= 0 ||
      location.hostname.includes("localhost") ||
      location.hostname.includes("127.0.0.1")
    );
    // return true
  },
  /**
   * 脱敏
   * @param arguments 多个要脱敏数据
   */
  publicDesensitization() {
    // 先将内置的 arguments 转换为真正的数组
    const dataArr = Array.prototype.slice.apply(arguments)
    for (let i = 0; i < dataArr.length; i++) {
      let data = dataArr[i]
      if (typeof data !== 'string') {
        continue
      }
      // 正则判断返回相应数据
      if (/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(data) || /^(13[0-9]|16[0-9]|19[0-9]|147|15[0-9]|17[6-8]|18[0-9])\d{8}|17[0-9]\d{8}$/.test(data) || /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/.test(data)) {
        // 身份证号 || 手机号  ||  营业执照    前三后四
        data = data.substr(0, 3) + '****' + data.substr(-4)
      } else if (/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(data)) {
        // 邮箱号码  前二 后以 @ 分割
        data = data.substr(0, 2) + '****' + data.substr(data.indexOf('@'))
      } else if (/^\d{16}|\d{19}$/.test(data)) {
        // 银行卡号  后四位
        data = '****' + data.substr(-4)
      } else if (data.indexOf('公司') > -1) {
        // 企业名称  前二后四
        data = data.substr(0, 2) + '****' + data.substr(-4)
      } else if (/^\d{6,7}$/.test(data)) {
        data = data.substr(0, 2) + '**' + data.substr(-2)
      } else if (data.length === 2) {
        console.log(111)
      } else {
        const raw = dataArr[0]
        const len = dataArr[1] || 6
        if (raw) {
          data = data.substr(0, len) + '****'
        }
      }
      dataArr[i] = data
    }
    return dataArr
  },
  getBlockChainUrl(tx, type, chainName) {
    let url = ''
    switch (chainName) {
      case 'BTC':
        url = `https://blockchain.info/${type}/${tx}`
        break
      case 'ETH':
        url = `https://etherscan.io/${type}/${tx}`
        break
      case 'EOS':
        type = type === 'address' ? 'account' : type
        url = `https://eosflare.io/${type}/${tx}`
        break
      case 'OMNI':
        url = `https://omniexplorer.info/${type}/${tx}`
        break
    }
    return url
  },
  getComputedStyle(el, prop) {
    if (!el) return {}
    const styles = document.defaultView.getComputedStyle(el, null) || {}
    if (prop) {
      return styles[prop]
    }
    return styles
  },
  getGbLength(str) {
    if (!str) {
      return 0
    }
    if (typeof str !== 'string') {
      str += ''
    }
    return str.replace(/[^\x00-\xff]/g, 'xx').length
  },
  pretty(num, accuracy = 2) {
    num = Big(num || 0)
    if (num < 100) {
      return num.toFixed(accuracy)
    }
    if (num < 1e4) {
      return num.toFixed(0)
    }
    if (num < 1e6) {
      return num.div(1e3).toFixed(1) + ' K'
    }
    if (num < 1e7) {
      return num.div(1e6).toFixed(2) + ' M'
    }
    if (num < 1e9) {
      return num.div(1e6).toFixed(0) + ' M'
    }
    if (num < 1e10) {
      return num.div(1e9).toFixed(1) + ' B'
    }
    return num.div(1e9).toFixed(0) + ' B'
  },
  parseQueryString(url) {
    const result = {}
    if (url && url.indexOf('?') > -1) {
      const itemArr = url.split('?')[1].split('&')
      let arr, name, value
      for (let i = 0, l = itemArr.length; i < l; i++) {
        arr = itemArr[i].split('=')
        name = arr[0]
        value = arr[1]
        result[name] = value
      }
    }
    return result
  },
  getPeriod (interval) {
    return { 
      1: '1m',
      3: '3m',
      5: '5m',
      15: '15m',
      30: '30m',
      60: '1h',
      120: '2h',
      240: '4h',
      360: '6h',
      720: '12h', 
      'D': '1d',
      '1D': '1d',
      'W': '1w',
      '1W': '1w',
      'M': '1M',
      '1M': '1M'
    }[interval]
  },
  debounce (fn, t) {
    let delay = t || 500
    let timer
    return function () {
      let args = arguments
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, delay)
    }
  },
  getDevice () {
    return navigator.userAgent
  } 
}

if (process.env.NODE_ENV === 'development') {
  utils.log = function() { console.log.apply(console, arguments) }
  utils.logI = function() { console.info.apply(console, arguments) }
  utils.logW = function() { console.warn.apply(console, arguments) }
  utils.logE = function() { console.error.apply(console, arguments) }
  window.utils = utils
}
export default utils
