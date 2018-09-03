import Vue from 'vue'
import config from '@/libs/config'
import _ from 'lodash'
import utils from './utils'
import api from './request'
import { state, actions } from '@/modules/store'

const Mock = () => import('./mock')

const service = {
  getBanners (data = {}) {
    data.platform = 0
    return request('banner/list', data)
  },
  forgot (data) {
    return request('password/forgot', data)
  },
  sendRecoverEmail () {
    return request('password/reactivate')
  },
  resetPassword (data) {
    return request('password/reset', data)
  },
  changePassword (data) {
    return request('password/modify', data)
  },
  getSmsCode (data) {
    if (data.task === 'register') {
      return request('sign/signup/code/resend', data)
    }
    return request('fa2/sms', data)
  },
  fa2 (data) {
    if (data.task === 'register') {
      return request('sign/signup/code', data)
    }
    return request('fa2/verify', data)
  },
  getUserInfo () {
    return getCache('session', () => request('sign/session'), 6e4)
  },
  activate (code) {
    rmCache('session')
    return request('sign/activate?auth=' + code)
  },
  presetPhone (data) {
    return request('sign/signup/code', data)
  },
  sendVerifyEmail () {
    return request('sign/reactivate')
  },
  login (data) {
    rmCache('session')
    if (data.email) {
      return request('sign/signin/email', data)
    }
    if (data.phone) {
      return request('sign/signin/phone', data)
    }
  },
  register (data) {
    rmCache('session')
    if (data.phone) {
      return request('sign/signup/phone', data)
    }
    return request('sign/signup', data)
  },
  signout () {
    rmCache('session')
    rmCache('balanceList')
    state.pro.currency = null
    state.pro.product = null
    return request('sign/signout')
  },
  getBalance () {
    return getCache('balanceList', () => request('balance/list'), 2e3)
  },
  createOrder (data) {
    return request('order/create', data)
  },
  removeOrder (data) {
    return request('order/remove', data)
  },
  removeOrderList (orderList) {
    return orderList.reduce(async function (preTask, order) {
      await preTask
      return request('order/remove', order)
    }, 0)
  },
  removeAllOrder () {
    return request('order/removeall')
  },
  queryOrder ({ id, finished }) {
    if (finished) {
      return getCache('orderQuery' + id, () => request('order/query', { order_id: id }))
    }
    return request('order/query', { order_id: id })
  },
  getOrderList (data) {
    return request('order/list', data)
  },
  orderActive (data) {
    return request('order/active', data)
  },
  orderClosed (data) {
    return request('order/closed', data)
  },
  orderHistory (data) {
    return request('order/history', data)
  },
  getQuote (data) {
    return request('quote/query', data)
  },
  getRegionList () {
    return getCache('regionList', () => request('region/list'))
  },
  getKycInfo (data) {
    return request('kyc/query', data)
  },
  updateKycInfo (data) {
    return request('kyc/update', data)
  },
  uploadKycPics (form) {
    const handler = new Vue()
    const upload = request('kyc/upload', form, {
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
    return request('pair/recommends')
  },
  getHomeNotice (slot) {
    return request('notice/list', { platform: 0, slot: slot })
  },
  async getPairInfo (data = {}) {
    // const res = await request('pair/list')
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
    return getCache('pairList', () => request('pair/list'))
  },
  getQuoteHandicap ({ pair, accuracy, offset, size }) {
    return quote(`handicap/${pair}`, { offset, accuracy, size })
  },
  getQuoteDeal ({ pair, size }) {
    return quote(`deal/${pair}`, { size })
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
    return request('google/begin')
  },
  bindGoogle (data) {
    return request('google/bind', data)
  },
  unbindGoogle () {
    return request('google/unbind')
  },
  setPhone (data) {
    return request('phone/begin', data)
  },
  bindPhone (data) {
    return request('phone/bind', data)
  },
  unbindPhone () {
    return request('phone/unbind')
  },
  getApiList () {
    return request('api/list')
  },
  getApiPermissions () {
    return request('api/permissions')
  },
  createApiKey (data) {
    return request('api/create', data)
  },
  confirmApiKey (data) {
    return request('api/create/confirm', data)
  },
  removeApiKey (data) {
    return request('api/remove', data)
  },
  getRate (name) {
    return getCache(name + 'FiatRate', () => request('currency/rate', { name }), 1e4)
  },
  getCoins () {
    return getCache('currencyList', () => request('currency/list'))
  },
  // 资产-转出页面请求转出地址，请求参数为 currency_name
  getWithdrawAddress (data) {
    return request('address/withdraw/list', data)
  },
  // 资产-转出页面-新增转出地址，请求参数为 currency_name:币名,label:自定义标签,address:地址值
  addWithdrawAddress (data) {
    return request('address/withdraw/create', data)
  },
  // 资产-转出页面-转出目标地址下拉列表-列表项删除按钮 请求参数为 地址id
  delWithwrawAddress (id) {
    return request('address/withdraw/remove', { id: id })
  },
  getDepositAddress (data) {
    return request('address/deposit/query', data)
  },
  getCollect () {
    return getCache('favoriteList', () => request('favorite/list'))
  },
  collect (data) {
    return request('favorite/create', data)
  },
  uncollect (data) {
    return request('favorite/remove', data)
  },
  getWithdrawInfo (currency) {
    return this.getBalanceInfo({ currency_name: currency })
  },
  getBalanceInfo (data) {
    return request('balance/query', data)
  },
  withdraw (data) {
    return request('withdraw/create', data)
  },
  confirmWithdraw (data) {
    return request('withdraw/confirm', data)
  },
  cancelWithdraw (data) {
    return request('withdraw/cancel', data)
  },
  getTransferStats () {
    return request('transfer/stats')
  },
  getTransferList (data) {
    return request('transfer/list', data)
  },
  geetestBegin () {
    return request('geetest/begin')
  },
  geetestVerify () {
    return request('geetest/verify')
  },
  getPresellLock () {
    return request('presell/query')
  },
  confirmPresellLock (data) {
    return request('presell/lock', data)
  },
  rmCache (key) {
    rmCache(key)
  },
  clearAll () {
    for (const key in cache) {
      rmCache(key)
    }
  },
  // // taxi api
  // getMiningData () {
  //   return request('statistics/tb')
  // },
  getMiningRefundData () {
    return request('statistics/refund')
  },
  // ram 交易
  getRamTrade (data) {
    return request('eosram/getEosRamList', data)
  },
  getRamTradeByUser (data) {
    return request('eosram/getEosRamListByUser', data)
  },
  getRamPrice () {
    return request('eosram/getEosRamPrice')
  },
  buyRam (data) {
    return request('eosram/buyEosRam', data)
  },
  sellRam (data) {
    return request('eosram/sellEosRam', data)
  },
  // eosforce
  getEoscVoteList (data) {
    return request('eosc/vote/list', data)
  },
  getEoscVoteBalance (data) {
    return request('eosc/balance', data)
  },
  getEoscVoteFee (data) {
    return request('eosc/fee', data)
  },
  eoscVoteCreate (data) {
    return request('eosc/vote/create', data)
  },
  eoscVoteRelease (data) {
    return request('eosc/vote/release', data)
  },
  eoscVoteTransfer (data) {
    return request('eosc/transfer', data)
  },
  eoscVoteTransferResult (data) {
    return request('eosc/transfer/status', data)
  },
  eoscVoteReward (data) {
    return request('eosc/vote/reward', data)
  },
  getEoscVoteActiveList () {
    return request('eosc/vote/active_list')
  },
  obtainFreeVotes (data) {
    return request('eosc/vote/obtain', data)
  },
  checkFreeVotes () {
    return request('eosc/vote/obtain')
  }
}

export async function fetch (url, body, options, method = 'post') {
  let mock = false
  mock = await Mock()
  if (mock && url.indexOf('api.thi') > 0) {
    const find = _.find(mock.list, item => { 
      return item.url && item.url.test(url)
    })
    if (find) {
      const res = await find.res(body)
      utils.log('Mock', url, body, res)
      return res
    }
  } else {
    if (mock.filter[url]) {
      const find = _.find(mock.list, item => item.url && item.url.test(url))
      if (find) {
        const res = await find.res(body)
        utils.log('Mock', url, body, res)
        return res
      }
    }
  }
  //  }
  try {
    let res
    if (method === 'get') {
      // url = url + '?' + _.map(_.keys(body), key => key + '=' + body[key]).join('&')
      res = await api.get(url, { params: body }, options)
    } else {
      res = await api.post(url, body, options)
    }
    const data = await res // .json()
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
export function request (url, body, options) {
  // if (process.env.NODE_ENV === 'development') {
  // return fetch('/beta-gate/' + url, body, options)
  // }
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
  service.reqeust = request
  service.quote = quote
}

export default service
