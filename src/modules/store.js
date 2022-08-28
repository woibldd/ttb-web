import _ from 'lodash'
import utils from '@/modules/utils'
import service from '@/modules/service'
import Locals from '@/modules/locals'
import store from '@/store.js'
const locales = process.env.THEME_ENV.locales
import { setSession } from '@/utils/auth'
export const state = {
  skin: 'dark',
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
  tabSelected: 'all', //币对列表
  downloadTool: true,
  site: 11,
  download: { 
    android: 'https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/ixx.apk',
    // ios: 'https://ssfdld.com?onpYQ',
    // ios: 'itms-services://?action=download-manifest&url=https://upgrade-app.oss-cn-hangzhou.aliyuncs.com/two/install-manifest.plist',
    ios: 'https://www.ndkfe.com/iX5qQ.html'
  },
  assets: {
    ready: false,
    total: 0,
    list: [],
    err: ''
  },
  pro: {
    side: 1,
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
    price: 0,
    close_time: 0,
    price_open: 0,
    showCountDown: false,
    isActivity: true,
    activityList: []
  },
  ct: {
    orderbookMode: 'both',
    pair: '',
    lastPrice: 0,
    bid: 0,
    ask: 0,
    bidVol: 0,
    askVol: 0,
    pairList: [],
    pairInfo: null,
    pairTick: null,
    indexTick: null,
    markTick: null,
    layout: false,
    product_name: '',
    currency_name: '',
    symbol: '',
    times: '10X',
    holding: null,
    currentDel: [],
    curCommitPrice: 0,
    orderFills: [],
    lastSide: 0,
    pairInfoList: {},
    holdingList: [],
    computeHoldingList: [],
    lastPriceList: {},
    markTickList: {},
    indexTickList: {},
    currentDelList: {},
    userSetting: {}
  },
  unit: {
    orderbookMode: 'both',
    pair: '',
    symbol: '',
    symbolInfoList: [],
    pairList: []
  },
  mix: {
    orderbookMode: 'both',
    pair: '',
    symbol: 'MIX_METH',
    symbolInfoList: [],
    pairList: []
  },
  rate: {
    IX: null,
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
  },
  otc: {
    currency: "USDT",
    legal_currency: "CNY", // CNY,SGD 
    showSide: 1, //1: 买，2：卖
    symbolList: [],
    userInfo: null,
    symbolInfo: null,
    currency_name: '',
    indexPrice: 0,
    bid: 0,
    ask: 0,
    fee: '0',
    fiatMoney:null,
    digitalMoney:null, 
    fiatCurrencies: [],
    digitalCurrencies: [],
    quote_id: null,
    valid_until: '',
    vallet_id: 'ixx'
  },
}

export const local = new Locals('store', {
  skin: 'dark',
  pair: '',
  fiat: 'AUTO',
  upDown: 'gr',
  hideMoney: 0,
  orderbookMode: 'both',
  regionId: '',
  timezone: '',
  interval: '15',
  intervalText: 4,
  unit:'',
  unitInterval: '15',
  unitIntervalText: 4,
  unitWidgetContent: null,
  mix:'',
  mixInterval: '15',
  mixIntervalText: 4,
  mixWidgetContent: null,
  blend:'',
  blendInterval: '15',
  blendIntervalText: 4,
  blendWidgetContent: null,
  supportNum: 129,
  proOnFav: false,
  pairTableTab: 'USDT',
  everSignup: false,
  hideOthers: false,
  hideCanceled: false,
  ixAlert: false,
  lineType : 1,
  stNeverShow: false,
  mixLineType: 1,
  unitLineType: 1,
  neverShowSgpHomeDialog: false,
  neverShowSgpTradingDialog: false, 
  tv: {},
  share_labels:[],
  share_shapes:[],
  depositAlert:{},
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
      utils.setStorageValue('user_info', JSON.stringify(userInfo))
      utils.setStorageValue('X-TOKEN', userInfo.token)
      window.zE && window.zE(function () {
        window.zE.identify({
          name: userInfo.email || userInfo.phone,
          email: userInfo.email || userInfo.phone
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
      utils.setStorageValue('X-TOKEN', '')
      window.zE && window.zE(function () {
        window.zE.identify({
          name: 'Please enter your name',
          email: ''
        })
      })
    }
  }, 
  async getKycLv () {
    if (state.userInfo) {
      let res = await service.getKycInfo();
      if (!res.code && !!res.data) {
        state.userInfo.lv = res.data.lv
      }
    }
  },
  getToken () {
    if (state.userInfo) {
      return state.userInfo.token || utils.getStorageValue('X-TOKEN')
    } else {
      return utils.getStorageValue('X-TOKEN') || undefined
    }
  },
  async updateSession () { 
    let res = await service.getUserInfo()
    if (res.code) {
      // 重试一次
      res = await service.getUserInfo()
    }
    
    if (res.code >= 0) {
      actions.setUserInfo(res.code ? null : res.data)
    }
    if (!res.code) {
      store.commit('SET_USERDATA',res.code ? null : res.data)
      setSession(res.data.session_id)
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
      state.rate = res.data
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
    // for (const key in msg) {
    //   if (msg.hasOwnProperty(key)) {
    //     obj[key] = msg[key].replace('IXX.COM', exchangeName).replace('IX', companyName)
    //   }
    // }
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
  setTitle (locale = 'en') {
    const { exchangeNameConfig, keywordsConfig, descriptionConfig } = process.env.THEME_ENV
    document.title = exchangeNameConfig[locale]
    // document.keywords = keywordsConfig[locale]
    // document.description = descriptionConfig[locale]
    const arr = [...document.head.getElementsByTagName('meta')]
    arr.forEach(node => {
      if (node.name === 'keywords')
        node.content = keywordsConfig[locale]
      if (node.name === 'description')
        node.content = descriptionConfig[locale]
    })
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

    store.commit('CHANGE_LANG', locale);
    utils.setCookie('lang', locale, 1000)
    state.locale = locale 
    actions.setZendeskLocale(locale) 
    actions.setFiat() 
    actions.setTitle(locale) 
    if (!utils.$i18n.messages[locale]) {
      try {
        const msg = await import(`@/libs/languages/${locale}.js`)
        const eleLocale = locale === 'zh-HK' ? 'zh-TW' : locale
        const element = await import(`element-ui/lib/locale/lang/${eleLocale}`) 
        utils.$i18n.setLocaleMessage(locale, {...msg.default, ...element.default })
      } catch (e) {
        utils.logE('load language failed')
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
