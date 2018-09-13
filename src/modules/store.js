import _ from 'lodash'
import utils from '@/modules/utils'
import service from '@/modules/service'
import Locals from '@/modules/locals'

const locales = process.env.THEME_ENV.locales

export const state = {
  enablePhoneSignup: true,
  router: null,
  locale: 'en',
  locales,
  progressing: [],
  loading: false,
  page: '',
  userStatus: -1, // 未知
  userInfo: null,
  loginBack: {name: 'home'}, // 默认登录返回页
  verifyEmail: '', // 注册、找回密码使用的邮箱
  assets: {
    ready: false,
    total: 0,
    list: [],
    err: ''
  },
  pro: {
    lock: false,
    layout: false,
    lastPrice: 0,
    bid: 0,
    ask: 0,
    bidVol: 0,
    askVol: 0,
    pair: '',
    pairTick: null,
    currency_name: '',
    product_name: '',
    currency: null,
    product: null,
    pairInfo: null,
    pairList: [],
    price: 0
  },
  rate: {
    TB: null,
    USDT: null,
    BTC: null,
    ETH: null,
    EOS: null
  },
  favorite: {
    loading: false,
    cache: null,
    list: [],
    ready: false
  },
  fiatMoney: '',
  fiatList: [],
  theme: process.env.THEME_ENV,
  fa2: {
    key: '',
    google: false,
    phone: false,
    task: ''
  }
}

export const local = new Locals('store', {
  pair: '',
  fiat: 'AUTO',
  upDown: 'gr',
  hideMoney: 0,
  orderbookMode: 'both',
  regionId: '',
  timezone: '',
  interval: '15',
  supportNum: 129,
  proOnFav: false,
  pairTableTab: 'USDT',
  everSignup: false,
  hideOthers: false
})

export const actions = {
  setFa2 (data) {
    state.fa2.key = data.key
    state.fa2.google = data.google
    state.fa2.phone = data.phone
    state.fa2.task = data.task || ''
  },
  clearFa2 () {
    state.fa2.task = ''
    state.fa2.key = ''
  },
  setPage (page) {
    state.page = page
  },
  setUserInfo (userInfo) {
    if (userInfo) {
      // 已登录
      state.userStatus = 1
      state.userInfo = userInfo
      local.everSignup = true
      window.zE && window.zE(function () {
        window.zE.identify({
          name: userInfo.email,
          email: userInfo.email
        })
      })
    } else {
      // 未登录
      state.userStatus = 0
      state.userInfo = null
      state.pro.currency = null
      state.pro.product = null
      actions.clearAssets()
      service.clearAll()
      actions.clearFavorite()
      window.zE && window.zE(function () {
        window.zE.identify({
          name: 'Guest',
          email: 'guest@ix.com'
        })
      })
    }
  },
  async updateSession () {
    let res = await service.getUserInfo()
    if (res.code < 0) {
      // 重试一次
      res = await service.getUserInfo()
    }
    if (res.code >= 0) {
      actions.setUserInfo(res.code ? null : res.data)
    }
    return res.code
  },
  resetStatus () {
    // 重置 userStatus，进入下一个路由会强制更新 session
    state.userStatus = -1
  },
  async fetchRate (base = 'USDT') {
    const res = await service.getRate(base)
    if (!res.code) {
      state.rate[base] = res.data
    } else if (!state.rate[base] && base === 'USDT') {
      state.rate[base] = {
        CNY: 6.4,
        USDT: 1
      }
    }
    state.fiatList = _.sortBy(_.keys(state.rate[base]), rate => {
      return {
        CNY: 1,
        USD: 2,
        HKD: 3,
        JPY: 4,
        KRW: 5,
        SGD: 6,
        TWD: 7,
        EUR: 8,
        GBP: 9
      }[rate] || 10
    })
  },
  requireLogin (route) {
    if (!state.userStatus >= 1) {
      actions.setLoginBack(route)
      state.router.push({
        name: 'login'
      })
      return false
    }
    return true
  },
  setLoginBack (route) {
    if (typeof route === 'string') {
      // maybe zendesk loginurl
      state.loginBack = route
    } else if (route) {
      state.loginBack = {
        path: route.fullPath
      }
    } else {
      state.loginBack = {name: 'home'}
    }
  },
  clearAssets () {
    state.assets.ready = false
    state.assets.total = 0
    state.assets.list = []
    state.assets.err = ''
  },
  async updateAssets () {
    const res = await service.getBalance()
    if (res.code) {
      if (!state.assets.ready) {
        state.assets.err = res.message
        state.assets.list = []
        state.assets.total = 0
        state.assets.ready = true
      }
      return false
    }
    state.assets.err = ''
    state.assets.list = res.data.items
    state.assets.total = _.reduce(res.data.items,
      (sum, item) => sum.plus(item.equality), utils.Big(0))
      .toFixed(8)
    state.assets.ready = true
  },
  clearFavorite () {
    state.favorite.loading = false
    state.favorite.ready = false
    state.favorite.list = []
  },
  async updateFavorite () {
    if (!state.favorite.cache) {
      state.favorite.cache = service.getCollect()
    }
    const res = await state.favorite.cache
    state.favorite.cache = null
    if (!res.code) {
      state.favorite.list = res.data.items
    }
    state.favorite.ready = true
  },
  addLocalFavorite (pairName) {
    if (!_.find(state.favorite.list, item => item.symbol === pairName)) {
      state.favorite.list.push({
        symbol: pairName
      })
    }
  },
  removeLocalFavorite (pairName) {
    const findIndex = _.findIndex(state.favorite.list, item => item.symbol === pairName)
    if (findIndex > -1) {
      state.favorite.list.splice(findIndex, 1)
    }
  },
  enableGoogle () {
    if (state.userInfo) {
      state.userInfo.google = true
    }
  },
  enablePhone () {
    if (state.userInfo) {
      state.userInfo.phone = true
    }
  },
  replaceName (msg) {
    const { exchangeName, companyName } = process.env.THEME_ENV
    const obj = {}
    for (const key in msg) {
      if (msg.hasOwnProperty(key)) {
        obj[key] = msg[key].replace('IX.COM', exchangeName).replace('IX', companyName)
      }
    }
    return {...msg, ...obj}
  },
  setZendeskLocale (locale) {
    window.zE && window.zE(function () {
      window.zE.setLocale(locale)
    })
  },
  setFiat (fiat = local.fiat) {
    local.fiat = fiat
    if (fiat === 'AUTO') {
      // set Fiat money
      state.fiatMoney = utils.getFiatMoneyByLocale(state.locale)
      state.fiatMoneySymbol = utils.getFiatMoneySymbolByLocale(state.locale)
    } else {
      state.fiatMoney = fiat
      state.fiatMoneySymbol = utils.getFiatMoneySymbolByFiat(fiat)
    }
  },
  async setLocale (locale) {
    if (!locale) {
      // 初始化时
      locale = utils.getUrlParam('lang') || utils.getCookie('lang') || utils.getDefaultLang()
      locale = locale.replace(/_/, '-') // 邮件模板会传 zh_CN zh_HK 过来
    }
    if (_.indexOf(state.locales, locale) === -1) {
      locale = 'en'
    }

    utils.setCookie('lang', locale, 1000)
    state.locale = locale

    actions.setZendeskLocale(locale)

    actions.setFiat()

    if (!utils.$i18n.messages[locale]) {
      try {
        const msg = await import(/* webpackChunkName: "lang-[request]" */ `@/libs/languages/${locale}.json`)

        utils.$i18n.setLocaleMessage(locale, actions.replaceName(msg))
      } catch (e) {
        utils.logE('I18n Failed')
      }
    }
    if (locale === state.locale) {
      utils.$i18n.locale = locale
    }
  },
  setTmp (key, value) {
    state.tmp[key] = value
  }
}

if (process.env.NODE_ENV !== 'production') {
  window.state = state
  window.local = local
  window.actions = actions
}
