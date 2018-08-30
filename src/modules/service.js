import Vue from 'vue'
import config from '@/libs/config'
import _ from 'lodash'
import utils from './utils'
import {state, actions} from '@/modules/store'

// const Mock = () => import('./mock')

const service = {
  getBanners (data = {}) {
    data.platform = 0
    return gate('banner/list', data)
  },
  forgot (data) {
    return gate('password/forgot', data)
  },
  sendRecoverEmail () {
    return gate('password/reactivate')
  },
  resetPassword (data) {
    return gate('password/reset', data)
  },
  changePassword (data) {
    return gate('password/modify', data)
  },
  getSmsCode (data) {
    if (data.task === 'register') {
      return gate('sign/signup/code/resend', data)
    }
    return gate('fa2/sms', data)
  },
  fa2 (data) {
    if (data.task === 'register') {
      return gate('sign/signup/code', data)
    }
    return gate('fa2/verify', data)
  },
  getUserInfo () {
    return getCache('session', () => gate('sign/session'), 6e4)
  },
  activate (code) {
    rmCache('session')
    return gate('sign/activate?auth=' + code)
  },
  presetPhone (data) {
    return gate('sign/signup/code', data)
  },
  sendVerifyEmail () {
    return gate('sign/reactivate')
  },
  login (data) {
    rmCache('session')
    if (data.email) {
      return gate('sign/signin/email', data)
    }
    if (data.phone) {
      return gate('sign/signin/phone', data)
    }
  },
  register (data) {
    rmCache('session')
    if (data.phone) {
      return gate('sign/signup/phone', data)
    }
    return gate('sign/signup', data)
  },
  signout () {
    rmCache('session')
    rmCache('balanceList')
    state.pro.currency = null
    state.pro.product = null
    return gate('sign/signout')
  },
  getBalance () {
    return getCache('balanceList', () => gate('balance/list'), 2e3)
  },
  createOrder (data) {
    return gate('order/create', data)
  },
  removeOrder (data) {
    return gate('order/remove', data)
  },
  removeOrderList (orderList) {
    return orderList.reduce(async function (preTask, order) {
      await preTask
      return gate('order/remove', order)
    }, 0)
  },
  removeAllOrder () {
    return gate('order/removeall')
  },
  queryOrder ({id, finished}) {
    if (finished) {
      return getCache('orderQuery' + id, () => gate('order/query', {order_id: id}))
    }
    return gate('order/query', {order_id: id})
  },
  getOrderList (data) {
    return gate('order/list', data)
  },
  orderActive (data) {
    return gate('order/active', data)
  },
  orderClosed (data) {
    return gate('order/closed', data)
  },
  orderHistory (data) {
    return gate('order/history', data)
  },
  getQuote (data) {
    return gate('quote/query', data)
  },
  getRegionList () {
    return getCache('regionList', () => gate('region/list'))
  },
  getKycInfo (data) {
    return gate('kyc/query', data)
  },
  updateKycInfo (data) {
    return gate('kyc/update', data)
  },
  uploadKycPics (form) {
    const handler = new Vue()
    const upload = gate('kyc/upload', form, {
      timeout: 0,
      uploadProgress (event) {
        handler.$emit('progress', event)
      }
    })
    upload.then((res) => {
      handler.$emit('end', res)
    })
    return handler
  },
  getRecommend () {
    return gate('pair/recommends')
  },
  getHomeNotice (slot) {
    return gate('notice/list', {platform: 0, slot: slot})
  },
  async getPairInfo (data = {}) {
    // const res = await gate('pair/list')
    const res = await this.getPairList()
    if (!res.code) {
      const find = _.find(res.data.items, item => item.name === data.pair_name)
      return {
        code: find ? 0 : 100001,
        data: find,
        message: find ? '' : utils.$i18n.t('sth_went_wrong')
      }
    }
    return res
  },
  getPairList () {
    return getCache('pairList', () => gate('pair/list'))
  },
  getQuoteHandicap ({pair, accuracy, offset, size}) {
    return quote(`handicap/${pair}`, {offset, accuracy, size})
  },
  getQuoteDeal ({pair, size}) {
    return quote(`deal/${pair}`, {size})
  },
  getQuoteHistory (data) {
    if (data.begin && data.end) {
      return quote(`history/millis/${data.pair}`, data)
    } else {
      return quote(`history/${data.pair}`, data)
    }
  },
  async getSupportedVerifys () {
    return ['google', 'message']
  },
  getGoogleKey () {
    return gate('google/begin')
  },
  bindGoogle (data) {
    return gate('google/bind', data)
  },
  unbindGoogle () {
    return gate('google/unbind')
  },
  setPhone (data) {
    return gate('phone/begin', data)
  },
  bindPhone (data) {
    return gate('phone/bind', data)
  },
  unbindPhone () {
    return gate('phone/unbind')
  },
  getApiList () {
    return gate('api/list')
  },
  getApiPermissions () {
    return gate('api/permissions')
  },
  createApiKey (data) {
    return gate('api/create', data)
  },
  confirmApiKey (data) {
    return gate('api/create/confirm', data)
  },
  removeApiKey (data) {
    return gate('api/remove', data)
  },
  getRate (name) {
    return getCache(name + 'FiatRate', () => gate('currency/rate', {name}), 1e4)
  },
  getCoins () {
    return getCache('currencyList', () => gate('currency/list'))
  },
  // 资产-转出页面请求转出地址，请求参数为 currency_name
  getWithdrawAddress (data) {
    return gate('address/withdraw/list', data)
  },
  // 资产-转出页面-新增转出地址，请求参数为 currency_name:币名,label:自定义标签,address:地址值
  addWithdrawAddress (data) {
    return gate('address/withdraw/create', data)
  },
  // 资产-转出页面-转出目标地址下拉列表-列表项删除按钮 请求参数为 地址id
  delWithwrawAddress (id) {
    return gate('address/withdraw/remove', {id: id})
  },
  getDepositAddress (data) {
    return gate('address/deposit/query', data)
  },
  getCollect () {
    return getCache('favoriteList', () => gate('favorite/list'))
  },
  collect (data) {
    return gate('favorite/create', data)
  },
  uncollect (data) {
    return gate('favorite/remove', data)
  },
  getWithdrawInfo (currency) {
    return this.getBalanceInfo({currency_name: currency})
  },
  getBalanceInfo (data) {
    return gate('balance/query', data)
  },
  withdraw (data) {
    return gate('withdraw/create', data)
  },
  confirmWithdraw (data) {
    return gate('withdraw/confirm', data)
  },
  cancelWithdraw (data) {
    return gate('withdraw/cancel', data)
  },
  getTransferStats () {
    return gate('transfer/stats')
  },
  getTransferList (data) {
    return gate('transfer/list', data)
  },
  geetestBegin () {
    return gate('geetest/begin')
  },
  geetestVerify () {
    return gate('geetest/verify')
  },
  getPresellLock () {
    return gate('presell/query')
  },
  confirmPresellLock (data) {
    return gate('presell/lock', data)
  },
  rmCache (key) {
    rmCache(key)
  },
  clearAll () {
    for (const key in cache) {
      rmCache(key)
    }
  },
  // taxi api
  getMiningData () {
    return gate('statistics/tb')
  },
  getMiningRefundData () {
    return gate('statistics/refund')
  },
  // ram 交易
  getRamTrade (data) {
    return gate('eosram/getEosRamList', data)
  },
  getRamTradeByUser (data) {
    return gate('eosram/getEosRamListByUser', data)
  },
  getRamPrice () {
    return gate('eosram/getEosRamPrice')
  },
  buyRam (data) {
    return gate('eosram/buyEosRam', data)
  },
  sellRam (data) {
    return gate('eosram/sellEosRam', data)
  },
  // eosforce
  getEoscVoteList (data) {
    return gate('eosc/vote/list', data)
  },
  getEoscVoteBalance (data) {
    return gate('eosc/balance', data)
  },
  getEoscVoteFee (data) {
    return gate('eosc/fee', data)
  },
  eoscVoteCreate (data) {
    return gate('eosc/vote/create', data)
  },
  eoscVoteRelease (data) {
    return gate('eosc/vote/release', data)
  },
  eoscVoteTransfer (data) {
    return gate('eosc/transfer', data)
  },
  eoscVoteTransferResult (data) {
    return gate('eosc/transfer/status', data)
  },
  eoscVoteReward (data) {
    return gate('eosc/vote/reward', data)
  },
  getEoscVoteActiveList () {
    return gate('eosc/vote/active_list')
  },
  obtainFreeVotes (data) {
    return gate('eosc/vote/obtain', data)
  },
  checkFreeVotes () {
    return gate('eosc/vote/obtain')
  }
}

export async function fetch (url, body, options, method = 'post') {
  /*
   * let mock = false
   * if (process.env.NODE_ENV === 'development') {
   *   mock = await Mock()
   *   if (mock && mock.filter[url]) {
   *     const find = _.find(mock.list, item => item.url && item.url.test(url))
   *     if (find) {
   *       const res = await find.res(body)
   *       utils.log('Mock', url, body, res)
   *       return res
   *     }
   *   }
   * }
   */
  try {
    let res
    if (method === 'get') {
      url = url + '?' + _.map(_.keys(body), key => key + '=' + body[key]).join('&')
      res = await Vue.http.get(url, options)
    } else {
      res = await Vue.http.post(url, body, options)
    }
    const data = await res.json()
    if (data.code === 1025 && state.userInfo) {
      // Session 失效
      actions.setUserInfo(null)
      if (utils.getRouteMeta(utils.$app.$route, 'auth')) {
        actions.setLoginBack(utils.$app.$route)
        utils.$app.$router.push({
          name: 'login'
        })
        return data
      }
    }
    if (data.status > 200) {
      data.code = data.status
    }
    if (data.code === 200) {
      data.code = 0
    }
    if (data.code && !data.message) {
      data.message = 'Error ' + data.code
    }
    return data
  } catch (err) {
    utils.logE(err)
    if (err.url && err.status === 0) {
      return {
        code: -1,
        message: utils.$app && utils.$app.$i18n.t('err_timeout'),
        data: null
      }
    }
    return {
      code: -2,
      message: utils.$app && utils.$app.$i18n.t('err_network'),
      data: null
    }
  }
}
export function gate (url, body, options) {
  if (process.env.NODE_ENV === 'development') {
    return fetch('/beta-gate/' + url, body, options)
  }
  return fetch('/gate/' + url, body, options)
}
function quote (url, body, options) {
  return fetch(config.quoteUrl + url, body, options, 'get')
}

const cache = {}
function getCache (key, promiseGetter, ttl = 0) {
  if (!cache[key] || (cache[key].expired && cache[key].expired < new Date())) {
    cache[key] = {
      promise: promiseGetter(),
      expired: ttl ? +new Date() + ttl : 0
    }
  }
  cache[key].promise.then((res) => {
    if (res.code < 0) {
      rmCache(key)
    }
  })
  return cache[key].promise
}
function rmCache (key) {
  utils.log('Remove Cache:', key)
  delete cache[key]
}

if (process.env.NODE_ENV !== 'production') {
  window.cache = cache
  window.service = service
  service.fetch = fetch
  service.gate = gate
  service.quote = quote
}

export default service
