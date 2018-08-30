import _ from 'lodash'
import Big from 'big.js'
import eventHub from './eventHub'
import consts from '@/libs/consts'

const preloadEl = document.querySelector('.page-preload')
const externalModule = {}
const localeName = {
  'en': 'English',
  'zh-CN': '简体中文',
  'zh-HK': '繁體中文',
  'ja': '日本語',
  'ko': '한국어',
  'tr': 'Türkçe',
  'ru': 'Pусский'
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
  isBeta: process.env.MODE === 'beta',
  isProd: process.env.NODE_ENV === 'production',
  getLocaleName (locale) {
    return localeName[locale] || 'Unknown'
  },
  getUrlParam (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r !== null) {
      return decodeURIComponent(r[2])
    }
    return null
  },
  getAppParam (name) {
    var reg = new RegExp('@' + name + '=([^@]*)(@|$)')
    var r = window.navigator.userAgent.match(reg)
    if (r !== null) {
      return decodeURIComponent(r[1])
    }
    return null
  },
  getDefaultLang () {
    // return 'zh-CN'
    const lang = navigator.language
    if (/^en(-|$)/.test(lang)) {
      return 'en'
    }
    if (/^zh(-|$)/.test(lang)) {
      return 'zh-CN'
    }
    if (/^zh-(HK|TW)/.test(lang)) {
      return 'zh-HK'
    }
    if (/^ja(-|$)/.test(lang)) {
      return 'ja'
    }
    if (/^ko(-|$)/.test(lang)) {
      return 'ko'
    }
    if (/^tr(-|$)/.test(lang)) {
      return 'tr'
    }
    if (/^ru(-|$)/.test(lang)) {
      return 'ru'
    }
    return 'en'
  },
  getGtLang (locale) {
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
  getDefaultTimezone () {
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
  getFiatMoneyByLocale (locale) {
    const map = {
      'zh-CN': 'CNY',
      'ja': 'JPY',
      'ko': 'KRW',
      'zh-HK': 'HKD',
      'en': 'USD'
    }
    return map[locale] || 'USD'
  },
  getFiatMoneySymbolByLocale (locale) {
    const map = {
      'zh-CN': '¥',
      'ja': 'JP¥',
      'ko': '₩',
      'zh-HK': 'HK$',
      'en': 'US$'
    }
    return map[locale] || 'US$'
  },
  getFiatMoneySymbolByFiat (fiat) {
    const map = {
      'CNY': '¥',
      'USD': 'US$',
      'HKD': 'HK$',
      'JPY': 'JP¥',
      'KRW': '₩',
      'SGD': 'SGD',
      'TWD': 'NT$',
      'EUR': '€',
      'GBP': '£'
    }
    return map[fiat] || fiat
  },
  preloadStart () {
    preloadEl.classList.add('show')
  },
  preloadError (msg) {
    preloadEl.classList.add('error')
    preloadEl.querySelector('._a').innerHTML = msg
  },
  preloadEnd () {
    preloadEl.classList.remove('show')
  },
  rand (n) {
    return Math.floor(Math.random() * (n + 1))
  },
  info (msg, id = msg) {
    return utils.alert(msg, id, 'info')
  },
  success (msg, id = msg) {
    return utils.alert(msg, id, 'success')
  },
  alert (msg, id = msg, style = 'danger') {
    return utils.notify({
      id,
      style,
      type: 0,
      title: msg
    })
  },
  confirm (options = {}) {
    options.style = options.style || 'danger'
    options.title = options.title || ''
    options.content = options.content || ''
    return new Promise((resolve) => {
      options.answer = resolve
      eventHub.$emit('app:confirmnotify', options)
    })
  },
  notify (options = {}) {
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
  getOffset (el) {
    const box = el.getBoundingClientRect()
    return {
      width: box.width,
      height: box.height,
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft
    }
  },
  sleep (t) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(t)
      }, t)
    })
  },
  async delay (promise, t = 500) {
    const [res] = await Promise.all([
      promise,
      utils.sleep(t)
    ])
    return res
  },
  generateToken (len = 16) {
    const source = '1234567890qwertyuiopasdfghjklzxcvbnm'
    let token = ''
    for (let i = 0; i < len; i += 1) {
      token += source[Math.floor(Math.random() * 36)]
    }
    return token
  },
  getDomain () {
    if (utils.domain) {
      return utils.domain
    }
    // 不支持 .com.cn 这种，
    const domain = document.domain.toLowerCase()
    const match = domain.match(/([a-z-_]+\.)?[a-z-_]+$/)
    utils.domain = match ? match[0] : domain
    return domain
  },
  setCookie (name, value, days) {
    utils.eraseCookie(name)
    let expires = ''
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/; domain=' + utils.getDomain()
  },
  getCookie (name) {
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
  eraseCookie (name) {
    document.cookie = name + '=; Max-Age=-99999999;'
    document.cookie = name + '=; Max-Age=-99999999; domain=' + utils.getDomain()
  },
  getCoinIcon (coin = '', color = 'b') {
    return utils.staticPath + 'static/currency/' + color + '_' + coin.toLowerCase() + '@2x.png'
  },
  getScript (source, key) {
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
      const onchange = function (_, isAbort) {
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
  preloadImage (src) {
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
  getExtModule (key) {
    // the library js should assign the [key] to window object
    const map = {
      'key': 'static/keymaster.js',
      'jQuery': 'static/jquery.min.js',
      'GoldenLayout': 'static/golden-layout/goldenlayout.min.js',
      'TradingView': 'static/charting_library/charting_library.min.js'
    }
    return map[key] ? utils.getScript(map[key], key) : null
  },
  leftpad (num) {
    return num < 10 ? '0' + num : '' + num
  },
  unixFormatter (unix, tpl) {
    return utils.dateFormatter(unix * 1000, tpl)
  },
  dateFormatter (ts, tpl = 'Y-M-D H:m:s') {
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
  toThousand (num = 0) {
    return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  },
  toBig (num) {
    return Big(num).toString()
  },
  toRound (num, scale = 20, rm = consts.ROUND_DOWN) {
    return Big(num).round(scale, rm).toString()
  },
  toFixed (num, scale = 8, rm = consts.ROUND_DOWN) {
    return Big(num).round(scale, rm).toFixed(scale)
  },
  toNum (num) {
    return +Big(num).toFixed(12)
  },
  unsign (num) {
    return num > 0 ? num : 0
  },
  getSign (num) {
    return Big(num).cmp(0)
  },
  getRouteMeta (route, metaKey) {
    const findMeta = _.findLast(route.matched, match => !_.isUndefined(match.meta[metaKey]))
    return findMeta && findMeta.meta[metaKey]
  },
  getPreviewImage (file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject
      }
      const reader = new FileReader()
      reader.onload = function (e) {
        resolve(e.target.result)
      }
      reader.onerror = function (err) {
        reject(err)
      }
      reader.readAsDataURL(file)
    })
  },
  log () {},
  logI () {},
  logW () {},
  logE () {},
  isMobile () {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  },
  isApp () {
    return /thinkbit(pro)?Web/i.test(navigator.userAgent)
  }
}

if (process.env.NODE_ENV === 'development') {
  utils.log = function () { console.log.apply(console, arguments) }
  utils.logI = function () { console.info.apply(console, arguments) }
  utils.logW = function () { console.warn.apply(console, arguments) }
  utils.logE = function () { console.error.apply(console, arguments) }
  window.utils = utils
}
export default utils