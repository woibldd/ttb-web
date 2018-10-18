import Vue from 'vue'
import config from '@/libs/config'
import _ from 'lodash'
import utils from './utils'
import api from './request'
import { quotaApi } from './request'
import { state, actions } from '@/modules/store'

const Mock = () => import('./mock')

const service = {
  getBanners (data = {}) {
    data.platform = data.platform || 1
    return request('/announcement/list', data)
  },
  resetPassword (data) {
    let uri = 'user/reset/password/email'
    if (data.by === 'phone') {
      uri = 'user/reset/password/phone'
    }
    return request(uri, data)
  },
  resetPaswordCode (data) {
    let uri = 'user/reset/password/email/code'
    if (data.by === 'phone') {
      uri = 'user/reset/password/phone/code'
    }
    return request(uri, data)
  },
  changePassword (data) {
    return request('user/modify/password', data)
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
    return getCache('session', () => request('user/session'), 6e4)
  },
  activate (code) {
    rmCache('session')
    return request('sign/activate?auth=' + code)
  },
  /**
   * 发送验证码
   * @param {*} data by lang phone email region
   */
  sendCode (data) {
    let url = `user/register/${data.by}/code`
    return request(url, data)
  },
  sendVerifyEmail () {
    return request('sign/reactivate')
  },
  login (data) {
    rmCache('session')
    if (data.email) {
      return request('user/login/email', data)
    }
    if (data.phone) {
      return request('user/login/phone', data)
    }
  },
  // 获取登录邮箱/手机验证码
  getLoginVerifyCode (param, type) {
    let url
    if (type === 'phone') {
      url = 'user/login/phone/code'
    } else {
      url = 'user/login/email/code'
    }
    return request(url, param)
  },
  // 验证登录验证码
  verifyLoginVerifyCode (param, type) {
    // 新版登录接口后面加2
    let url = '/user/login/' + type + '2'
    return request(url, param)
  },
  register (data) {
    rmCache('session')
    if (data.phone) {
      return request('user/register/phone', data)
    }
    return request('user/register/email', data)
  },
  signout () {
    rmCache('session')
    rmCache('balanceList')
    state.pro.currency = null
    state.pro.product = null
    return request('user/logout')
  },
  async getBalanceByPair (...currencys) {
    let result = await this.getBalance()
    let resp = []
    if (!result.code) {
      let list = result.data
      currencys.forEach(currency => {
        let balance = list.filter(l => currency === l.currency)[0] || {}
        resp.push(balance)
      })
    }
    return resp
  },
  getBalance () {
    return getCache('balanceList', () => request('account/balance/list'), 2e3)
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
    return request('order/active', data).then(res => {
      if (res.data) {
        if (res.data.length) {
          res.data = res.data.map(item => {
            item.side = item.side === 1 ? 'BUY' : 'SELL'
            item.type = item.type === 1 ? 'LIMIT' : 'MARKET'
            item.deal_amount = item.executed
            return item
          })
        }
        res.data = { items: res.data }
      }
      return res
    })
  },
  orderClosed (data) {
    return request('order/closed', data)
  },
  orderHistory (data) {
    return request('order/history', data).then(res => {
      if (res.data) {
        if (res.data.length) {
          res.data = res.data.map(item => {
            item.side = item.side === 1 ? 'BUY' : 'SELL'
            item.type = item.type === 1 ? 'LIMIT' : 'MARKET'
            item.deal_amount = item.executed
            item.status = item.state
            return item
          })
        }
        res.data = { items: res.data }
      }
      return res
    })
  },
  getQuote (data) {
    return request('quote/query', data)
  },
  getRegionList () {
    return getCache('regionList', () => Promise.resolve(require('./region.json')))
  },
  /**
   * 获取kyc接力btc总量
   */
  getKycRelayBtcRemain () {
    return request('user/kyc/relay/bonus')
  },
  /**
   * 获取当前用户kyc信息
   */
  getKycInfo () {
    return request('user/kyc')
  },
  /**
   * 最近kyc用户
   * @param list true 要list false 要item
   */
  getRecentlyKycList (list) {
    return list ? request('user/kyc/relay/list') : request('user/kyc/recent')
  },
  updateKycInfo (data) {
    return request('user/kyc2', data)
  },
  updateKyc1 (data) {
    return request('user/kyc1', data)
  },
  getOSSPolicy () {
    return request('user/kyc/oss/policy')
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
    const res = await this.getPairList()
    if (!res.code) {
      // if (res.data && res.data.length) {
      //   res.data = res.data.map (item => {
      //     item.amount_scale = parseInt(item.amount_scale, 10)
      //     item.price_scale = parseInt(item.price_scale, 10)
      //     return item
      //   })
      // }
      const find = _.find(res.data.items, item => item.name === data.symbol)

      return {
        code: find ? 0 : 100001,
        data: find,
        message: find ? '' : utils.$i18n.t('sth_went_wrong')
      }
    }
    return res
  },
  getPairList () {
    return getCache('pairList', () => request('order/symbol/list').then(res => {
      if (res && res.data) {
        res.data = res.data.map(item => {
          item.amount_scale = parseInt(item.amount_scale, 10)
          item.currency_scale = parseInt(item.price_scale, 10)
          item.price_scale = parseInt(item.price_scale, 10)
          item.product_name = item.name.split('_')[0]
          item.currency_name = item.name.split('_')[1]
          return item
        })
        res.data = { items: res.data }
        return res
      }
    }))
  },
  getQuoteOrderbook ({ pair, accuracy, offset, size }) {
    return quote(`orderbook/${pair}`, { offset, accuracy, size })
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
    return request('user/generate/google_key')
  },
  bindGoogleKey (data) {
    return request('/user/bind/google_key', data)
  },
  setPhone (data) {
    return request('phone/begin', data)
  },
  bindPhoneCode (data) {
    return request('user/bind/phone/code', data)
  },
  bindPhone (data) {
    return request('user/bind/phone', data)
  },
  bindEmailCode (data) {
    return request('user/bind/email/code', data)
  },
  bindEmail (data) {
    return request('user/bind/email', data)
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
  getRate (currency = 'USDT') {
    // return getCache(name + 'FiatRate', () => request('currency/query', { name }), 1e4)
    return getCache(currency + 'FiatRate', () => request('account/currency/rates', { currency }), 1e4)
  },
  getCoins () {
    return getCache('currencyList', () => request('account/currency/list'))
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
  getTransferStats () {
    return request('transfer/stats')
  },
  getTransferList (data) {
    return request('transfer/list', data)
  },
  /**
   * 获取内部转账历史
   * @param {page,size} data
   */
  getInternalHistory (data) {
    return request('account/balance/transfer/list', data)
  },
  /**
   * 获取推广返佣
   */
  getPromoteList (data) {
    return request('account/balance/promote/list', data)
  },
  rmCache (key) {
    rmCache(key)
  },
  clearAll () {
    for (const key in cache) {
      rmCache(key)
    }
  },
  /**
   * 邀请记录
   */
  getMyInviteList (data) {
    return request('user/invitation/list', data)
    // .then(resp => {
    //   resp.data = resp.data.concat(resp.data).concat(resp.data)
    //   return resp
    // })
  },
  getCommissionList (data) {
    return request('mine/invite/list', data)
  },
  /**
   * 登录历史
   */
  getLoginHistory () {
    return request('user/login/history')
  },

  /* -- 资金管理 start  -- */
  // 充币，提币
  getMyCoinAddress (param) {
    return request('account/address/query', param)
  },
  // 获取币种列表
  getAllCoinTypes (param) {
    return request('account/currency/list')
  },
  // 获取用户余额信息
  getAccountBalanceList () {
    return request('account/balance/list')
  },
  // 提币记录
  getWithdrawHistory () {
    return request('/account/withdraw/list')
  },
  // 充币记录
  getDepositHistory (param) {
    return request('/account/deposit/list', param)
  },

  // 发放奖励记录
  getRewardHistory (param) {
    return request('/account/candy/list', param)
  },

  // 获取添加过的地址列表
  getMyAddressList (param) {
    return request('/account/withdraw/address/list', param)
  },
  // 添加提币地址
  addCoinAddress (param) {
    return request('/account/withdraw/address/create', param)
  },
  // 删除提币地址
  deleteCoinAddress (param) {
    return request('/account/withdraw/address/delete', param)
  },
  // 获取提币邮箱/手机验证码
  getVerifyCode (param, type) {
    let url
    if (type === 'phone') {
      url = '/account/withdraw/phone/code'
    } else {
      url = '/account/withdraw/email/code'
    }
    return request(url, param)
  },
  // 发起提币
  confirmWithdraw (param) {
    return request('/account/withdraw/create', param)
  },
  // 取消提币
  cancelWithdraw (param) {
    return request('/account/withdraw/cancel', param)
  },
  /* -- 资金管理 end  -- */

  /* 挖矿 */
  getMineTotal (data) {
    return request('mine/exchange/total', data)
  },
  getPersonalTotal (data) {
    return getCache('mine_my_total', () => request('mine/exchange/me'), 1e4)
  },
  getInviteMineTotal (data) {
    return request('mine/invite/total', data)
  },
  getBonusMineTotal (data) {
    return request('bonus/btc/total', data)
  },
  getRelayTotal () {
    return request('relay/query')
  },

  // ix市场信息
  getIXMarket () {
    return request('/market/ix')
  },

  // 分红信息汇总
  getAllBonusInfo () {
    return request('/bonus/total')
  },

  /* 挖矿 end */

  /* 行情 */
  getDealHistory (pair, data) {
    return quote(`history/${pair}`, data)
  },

  /** 登录验证修改 */
  // 获取修改密码邮箱验证码 POST
  getCode4modifyEmailPassword (data) {
    return request('/user/modify/password/email/code', data)
  },
  // 获取修改密码手机验证码 POST /user/modify/password/phone/code
  getCode4modifyPhonePassword (data) {
    return request('/user/modify/password/phone/code', data)
  },
  // 修改密码 POST
  modifyPassword () {
    return request('/user/modify/password')
  },
  // 获取开关验证邮箱验证码 POST
  getCode4switchEmailVerify () {
    return request('/user/bind/switch/email/code')
  },
  // 获取开关验证手机验证码 POST
  getCode4switchPhoneVerify () {
    return request('/user/bind/switch/phone/code')
  },
  // 开关验证 POST
  switchBindAction (params) {
    return request('/user/bind/switch', params)
  },
  // 申请API 验证码
  getProfileApiCode (param, isEmail) {
    return request(isEmail ? 'user/api/email/code' : '/user/api/phone/code', param)
  },

  // 申请API POST /user/api/create
  createProfileApi (params) {
    return request('/user/api/create', params)
  },
  // 删除API POST /user/api/delete
  deleteProfileApi (params) {
    return request('/user/api/delete', params)
  },
  // 获取api列表
  getProfileApi () {
    return request('/user/api/list')
  },

  // 发起提币 POST /account/withdraw/create
  // 获取内部划转记录 POST /account/balance/transfer/list

  // 用户订单历史
  getOrderHistory (params) {
    return request('/order/history', params)
  },
  // 锁仓开始
  /**
   * 锁仓
   */
  balanceLock (data) {
    return request('account/balance/lock', data)
  },
  /**
   * 解锁
   */
  balanceUnLock (data) {
    return request('account/balance/unlock', data)
  },
  /**
   * 获取挖矿历史
   */
  getLockMineHistory () {
    return request('mine/exchange/ix/me/history')
  },
  // 我的ix余额
  getIxBalance () {
    return request('account/balance/ix')
  },
  // 我的算力
  getMyPower () {
    return request('mine/exchange/ix/me')
  },
  // 个人锁仓信息
  getMyLockTotal () {
    return request('mine/exchange/ix/me/total')
  },
  // 全网挖矿详细 基准算力等
  getLockMineTotal () {
    return request('mine/exchange/ix/total')
  }

}

export async function fetch (url, body, options, method = 'post') {
  // let mock = false
  // mock = await Mock()
  // if (mock && url.indexOf('quota.ix') > 0) {
  //   const find = _.find(mock.list, item => {
  //     return item.url && item.url.test(url)
  //   })
  //   if (find) {
  //     const res = await find.res(body)
  //     utils.log('Mock', url, body, res)
  //     return res
  //   }
  // } else {
  //   if (mock.filter[url]) {
  //     const find = _.find(mock.list, item => item.url && item.url.test(url))
  //     if (find) {
  //       const res = await find.res(body)
  //       utils.log('Mock', url, body, res)
  //       return res
  //     }
  //   }
  // }
  try {
    let res
    if (method === 'get') {
      res = await api.get(url, { params: body }, options)
    } else {
      res = await api.post(url, body, options)
    }
    const data = await res // .json()
    if (data.code === 401 && state.userInfo) {
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

    if (data.code == 200) {
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
export async function fetchQuota (url, body, options, method = 'post') {
  try {
    let res
    if (method === 'get') {
      res = await quotaApi.get(url, { params: body }, options)
    } else {
      res = await quotaApi.post(url, body, options)
    }
    const data = await res // .json()
    if (data.code === 401 && state.userInfo) {
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

    if (data.code == 200) {
      data.code = 0
    }
    if (data.code && !data.message) {
      data.message = 'Error ' + data.code
    }
    return data.data
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
  return fetch(url, body, options)
}
function quote (url, body, options) {
  return fetchQuota(config.quoteUrl + url, body, options, 'get')
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
  // utils.log('Remove Cache:', key)
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
