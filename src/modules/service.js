import Vue from 'vue'
import config from '@/libs/config'
import _ from 'lodash'
import utils from './utils'
import api from './request'
import { quotaApi } from './request'
import { state, actions } from '@/modules/store'

// const Mock = () => import('./mock')

const service = {
  getRates(params){
    return request('/account/currency/rates', params)
  },
  getBanners(data = {}) {
    data.platform = data.platform || 1
    return request('announcement/list', data)
  },
  hasNewBanner() {
    return request('announcement/has_new')
  },
  resetPassword(data) {
    let uri = 'user/reset/password/email'
    if (data.by === 'phone') {
      uri = 'user/reset/password/phone'
    }
    return request(uri, data)
  },
  resetPaswordCode(data) {
    let uri = 'user/reset/password/email/code'
    if (data.by === 'phone') {
      uri = 'user/reset/password/phone/code'
    }
    return request(uri, data)
  },
  changePassword(data) {
    return request('user/modify/password', data)
  },
  getSmsCode(data) {
    if (data.task === 'register') {
      return request('sign/signup/code/resend', data)
    }
    return request('fa2/sms', data)
  },
  fa2(data) {
    if (data.task === 'register') {
      return request('sign/signup/code', data)
    }
    return request('fa2/verify', data)
  },
  getUserInfo() {
    return getCache('session', () => request('user/session'), 6e4)
  },
  activate(code) {
    rmCache('session')
    return request('sign/activate?auth=' + code)
  },
  /**
   * 发送验证码
   * @param {*} data by lang phone email region
   */
  sendCode(data) {
    const url = `user/register/${data.by}/code`
    return request(url, data)
  },
  sendVerifyEmail() {
    return request('sign/reactivate')
  },
  login(data) {
    rmCache('session')
    if (data.email) {
      return request('user/login/email', data)
    }
    if (data.phone) {
      return request('user/login/phone', data)
    }
  },
  // 获取登录邮箱/手机验证码
  getLoginVerifyCode(param, type) {
    let url
    if (type === 'phone') {
      url = 'user/login/phone/code'
    } else {
      url = 'user/login/email/code'
    }
    return request(url, param)
  },
  // 验证登录验证码
  verifyLoginVerifyCode(param, type) {
    // 新版登录接口后面加2
    const url = '/user/login/' + type + '2'
    return request(url, param)
  },
  register(data) {
    rmCache('session')
    if (data.phone) {
      return request('user/register/phone', data)
    }
    return request('user/register/email', data)
  },
  signout() {
    rmCache('session')
    rmCache('balanceList')
    state.pro.currency = null
    state.pro.product = null
    return request('user/logout')
  },
  async getBalanceByPair(...currencys) {
    const result = await this.getBalance()
    const resp = []
    if (!result.code) {
      const list = result.data
      currencys.forEach(currency => {
        const balance = list.filter(l => currency === l.currency)[0] || {}
        resp.push(balance)
      })
    }
    return resp
  },
  getBalance() {
    return getCache('balanceList', () => request('account/balance/list'), 2e3)
  },
  createOrder(data) {
    return request('order/create', data)
  },
  removeOrder(data) {
    return request('order/remove', data)
  },
  removeOrderList(orderList) {
    return orderList.reduce(async function(preTask, order) {
      await preTask
      return request('order/remove', order)
    }, 0)
  },
  removeAllOrder() {
    return request('order/remove_all', { site: 2 })
  },
  queryOrder({ id, finished }) {
    if (finished) {
      return getCache('orderQuery' + id, () => request('order/query', { order_id: id }))
    }
    return request('order/query', { order_id: id })
  },
  getOrderList(data) {
    return request('/api/agent/nodes/state', data)
  },
  orderActive(data) {
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
  orderClosed(data) {
    return request('order/closed', data)
  },
  orderHistory(data) {
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
  getQuote(data) {
    return request('quote/query', data)
  },
  getRegionList() {
    return getCache('regionList', () => Promise.resolve(require('./region.json')))
  },
  /**
   * 获取kyc接力btc总量
   */
  getKycRelayBtcRemain() {
    return request('user/kyc/relay/bonus')
  },
  /**
   * 获取当前用户kyc信息
   */
  getKycInfo() {
    return request('user/kyc')
  },
  /**
   * 最近kyc用户
   * @param list true 要list false 要item
   */
  getRecentlyKycList(list) {
    return list ? request('user/kyc/relay/list') : request('user/kyc/recent')
  },
  updateKycInfo(data) {
    return request('user/kyc2', data)
  },
  updateKyc1(data) {
    return request('user/kyc1', data)
  },
  getOSSPolicy() {
    return request('user/kyc/oss/policy')
  },
  uploadKycPics(form) {
    const handler = new Vue()
    const upload = request('kyc/upload', form, {
      timeout: 0,
      uploadProgress(event) {
        handler.$emit('progress', event)
      }
    })
    upload.then((res) => {
      handler.$emit('end', res)
    })
    return handler
  },
  getFaceToken(params) {
    return request('user/kyc/face/token', params)
  },
  faceComplete(params) {
    return request('user/kyc/face/complete', params)
  },
  findPage(params) {
    return request('api/moneyManage/findPage', params)
  },
  manageRecord(params) {
    return request('/api/manageRecord/buy', params)
  },
  manageResopetate(params) {
    return request('/api/manageRecord/opetate', params)
  },
  getRecommend() {
    return request('pair/recommends')
  },
  getHomeNotice(slot) {
    return request('notice/list', { platform: 0, slot: slot })
  },
  async getPairInfo(data = {}) {
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
  getPairList() {
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
  getQuoteOrderbook({ pair, accuracy, offset, size }) {
    return quote(`orderbook/${pair}`, { offset, accuracy, size })
  },
  getQuoteDeal({ pair, size }) {
    return quote(`deal/${pair}`, { size })
  },
  getQuoteHistory(data) {
    if (data.begin && data.end) {
      return quote(`history/millis/${data.pair}`, data)
    } else {
      return quote(`history/${data.pair}`, data)
    }
  },
  async getSupportedVerifys() {
    return ['google', 'message']
  },
  getGoogleKey() {
    return request('user/generate/google_key')
  },
  bindGoogleKey(data) {
    return request('/user/bind/google_key', data)
  },
  setPhone(data) {
    return request('phone/begin', data)
  },
  bindPhoneCode(data) {
    return request('user/bind/phone/code', data)
  },
  bindPhone(data) {
    return request('user/bind/phone', data)
  },
  bindEmailCode(data) {
    return request('user/bind/email/code', data)
  },
  bindEmail(data) {
    return request('user/bind/email', data)
  },
  getApiList() {
    return request('api/list')
  },
  getApiPermissions() {
    return request('api/permissions')
  },
  createApiKey(data) {
    return request('api/create', data)
  },
  confirmApiKey(data) {
    return request('api/create/confirm', data)
  },
  removeApiKey(data) {
    return request('api/remove', data)
  },
  getRate(currency = 'USDT') {
    // return getCache(name + 'FiatRate', () => request('currency/query', { name }), 1e4)
    return getCache(currency + 'FiatRate', () => request('account/currency/rates', { currency }), 1e4)
  },
  getAllRate() {
    return getCache('ALLFiatRate', () => request('account/currency/rates'), 1e4)
  },
  getCoins() {
    return getCache('currencyList', () => request('account/currency/list'))
  },
  // 资产-转出页面请求转出地址，请求参数为 currency_name
  getWithdrawAddress(data) {
    return request('address/withdraw/list', data)
  },
  // 资产-转出页面-新增转出地址，请求参数为 currency_name:币名,label:自定义标签,address:地址值
  addWithdrawAddress(data) {
    return request('address/withdraw/create', data)
  },
  // 资产-转出页面-转出目标地址下拉列表-列表项删除按钮 请求参数为 地址id
  delWithwrawAddress(id) {
    return request('address/withdraw/remove', { id: id })
  },
  getDepositAddress(data) {
    return request('address/deposit/query', data)
  },
  getCollect() {
    return getCache('favoriteList', () => request('favorite/list'))
  },
  collect(data) {
    return request('favorite/create', data)
  },
  uncollect(data) {
    return request('favorite/remove', data)
  },
  getTransferStats() {
    return request('transfer/stats')
  },
  getTransferList(data) {
    return request('transfer/list', data)
  },
  /**
   * 获取内部转账历史
   * @param {page,size} data
   */
  getInternalHistory(data) {
    return request('account/balance/transfer/list', data)
  },
  //  撤销订单
  Cancellationoforders(data) {
    return request('/account/withdraw/cancel', data)
  },
  /**
   * 获取推广返佣
   */
  getPromoteList(data) {
    return request('account/balance/promote/list', data)
  },
  rmCache(key) {
    rmCache(key)
  },
  clearAll() {
    for (const key in cache) {
      rmCache(key)
    }
  },
  /**
   * 邀请记录
   */
  getMyInviteList(data) {
    return request('user/invitation/list', data)
    // .then(resp => {
    //   resp.data = resp.data.concat(resp.data).concat(resp.data)
    //   return resp
    // })
  },
  getCommissionList(data) {
    return request('mine/invite/list', data)
  },
  /**
   * 登录历史
   */
  getLoginHistory() {
    return request('user/login/history')
  },

  /* -- 资金管理 start  -- */
  // 充币，提币
  getMyCoinAddress(param) {
    return request('account/address/query', param)
  },
  // 获取币种列表
  getAllCoinTypes(param) {
    return request('account/currency/list')
  },
  // 获取用户余额信息
  getAccountBalanceList() {
    return request('account/balance/list')
  },
  // 提币记录
  getWithdrawHistory(param) {
    return request('/account/withdraw/list', param)
  },
  // 充币记录
  getDepositHistory(param) {
    return request('/account/deposit/list', param)
  },

  // 发放奖励记录
  getRewardHistory(param) {
    return request('/account/candy/list', param)
  },

  // 获取添加过的地址列表
  getMyAddressList(param) {
    return request('/account/withdraw/address/list', param)
  },
  // 添加提币地址
  addCoinAddress(param) {
    return request('/account/withdraw/address/create', param)
  },
  // 删除提币地址
  deleteCoinAddress(param) {
    return request('/account/withdraw/address/delete', param)
  },
  // 获取提币邮箱/手机验证码
  getVerifyCode(param, type) {
    let url
    if (type === 'phone') {
      url = '/account/withdraw/phone/code'
    } else {
      url = '/account/withdraw/email/code'
    }
    return request(url, param)
  },
  // 发起提币
  confirmWithdraw(param) {
    // return request('/account/withdraw/create', param)
    return getCache('withdraw_create', () => request('/account/withdraw/create', param), 2e3)
  },
  // 取消提币
  cancelWithdraw(param) {
    return request('/account/withdraw/cancel', param)
  },
  //   一键买币
  canbullWithdraw(param) {
    return request('/otcactive//keyByCoins', param)
  },
  /* -- 资金管理 end  -- */

  /* 挖矿 */
  getMineTotal(data) {
    return request('mine/exchange/total', data)
  },
  getPersonalTotal(data) {
    return getCache('mine_my_total', () => request('mine/exchange/me'), 1e4)
  },
  getInviteMineTotal(data) {
    return request('mine/invite/total', data)
  },
  getBonusMineTotal(data) {
    return request('bonus/btc/total', data)
  },
  getRelayTotal() {
    return request('relay/query')
  },

  // ix市场信息
  getIXMarket() {
    return request('/market/ix')
  },

  // 分红信息汇总
  getAllBonusInfo() {
    return request('/bonus/total')
  },

  // Sp 活动
  spPageInfo(params) {
    return request('/future/activity/sp_info', params)
  },
  rushToBuy(params) {
    return request('/future/activity/buy_sp', params)
  },
  /* 挖矿 end */
  //  用户个人设置
  MessageSettings(params) {
    return request('/future/account/notify_switch', params)
  },
  /* 行情 */
  getDealHistory(pair, data) {
    return quote(`history/${pair}`, data)
  },

  /** 登录验证修改 */
  // 获取修改密码邮箱验证码 POST
  getCode4modifyEmailPassword(data) {
    return request('/user/modify/password/email/code', data)
  },
  // 获取修改密码手机验证码 POST /user/modify/password/phone/code
  getCode4modifyPhonePassword(data) {
    return request('/user/modify/password/phone/code', data)
  },
  // 修改密码 POST
  modifyPassword() {
    return request('/user/modify/password')
  },
  // 获取开关验证邮箱验证码 POST
  getCode4switchEmailVerify() {
    return request('/user/bind/switch/email/code')
  },
  // 获取开关验证手机验证码 POST
  getCode4switchPhoneVerify() {
    return request('/user/bind/switch/phone/code')
  },
  // 开关验证 POST
  switchBindAction(params) {
    return request('/user/bind/switch', params)
  },
  // 申请API 验证码
  getProfileApiCode(param, isEmail) {
    return request(isEmail ? 'user/api/email/code' : '/user/api/phone/code', param)
  },

  // 申请API POST /user/api/create
  createProfileApi(params) {
    return request('/user/api/create', params)
  },
  // 删除API POST /user/api/delete
  deleteProfileApi(params) {
    return request('/user/api/delete', params)
  },
  // 获取api列表
  getProfileApi() {
    return request('/user/api/list')
  },

  // 发起提币 POST /account/withdraw/create
  // 获取内部划转记录 POST /account/balance/transfer/list

  // 用户订单历史
  getOrderHistory(params) {
    return request('/order/history', params)
  },
  // /**
  //  * 获取用户交易模式
  //  */
  // getUserExchangeMode() {
  //   return request('order/mode/get')
  // },
  // /**
  //  * 设置用户交易模式
  //  * @param {*} params
  //  */
  // setUserExchangeMode(params) {
  //   return request('order/mode/set', params)
  // },
  // 锁仓开始
  /**
   * 锁仓
   */
  balanceLock(data) {
    return request('account/balance/lock', data)
  },
  /**
   * 解锁
   */
  balanceUnLock(data) {
    return request('account/balance/unlock', data)
  },
  /**
   * 获取挖矿历史
   */
  getLockMineHistory() {
    return request('mine/exchange/ix/me/history')
  },
  // 我的ix余额
  getIxBalance() {
    return request('account/balance/ix')
  },
  // 我的算力
  getMyPower() {
    return request('mine/exchange/ix/me')
  },
  // 个人锁仓信息
  getMyLockTotal() {
    return request('mine/exchange/ix/me/total')
  },
  // 全网挖矿详细 基准算力等
  getLockMineTotal() {
    return request('mine/exchange/ix/total')
  },
  getMyInviteSummary() {
    return request('bonus/invite/me')
  },
  // 挖矿大赛
  // 报名
  enrollMineMatch() {
    return request('mine/game/join')
  },
  // 奖池金额
  getMatchRewardPool() {
    return request('mine/game/pool')
  },
  // 挖矿排名
  getMatchRewardRank() {
    return request('mine/game/rank')
  },
  // 我的挖矿信息
  getMyMatchTotal() {
    return request('mine/game/me')
  },
  // 最近挖矿列表
  getRecentMatchList() {
    return request('mine/game/join/list')
  },
  // 全民竞猜 历史回顾
  getGuessHistory() {
    return request('game/bet/history')
  },
  // 全民竞猜 当前期
  getGuessCurrent() {
    return request('game/bet/current')
  },
  // 全民竞猜 上一期
  getGuessLast() {
    return request('game/bet/last')
  },
  // 我的竞猜历史
  getGuessMine() {
    return request('game/bet/me')
  },
  // 投注
  doGuess(data) {
    return request('game/bet/bet', data)
  },
  //  价格公示（最近一期） 获取比特币的开盘,收盘价格
  getAllPlatformBtcPrice() {
    return request('game/bet/btc/price')
  },
  getPieceCurrent() {
    return request('mine/chip/current')
  },
  doExchangePiece() {
    return request('mine/chip/exchange')
  },
  doExchangePiece() {
    return request('mine/chip/exchange')
  },
  getCurrentIxPrice() {
    return request('mine/ix/price')
  },
  getMillionInfo() {
    return request('million/data')
  },
  getMillionInfoMine() {
    return request('million/me')
  },
  getMillionReward(params) {
    return request('million/reward', params)
  },
  startMillion() {
    return request('million/start')
  },
  // 开启/关闭手续费抵扣
  setFeeDiscount(params) {
    return request('fee/discount/switch', params)
  },
  // 查询当前手续费开关状态
  getFeeDiscountStatus() {
    return request('fee/discount/get')
  },
  // 我的订单 > 币币交易
  getBiBiOrders(params) {
    return request('fee/transaction/history', params)
  },
  // ix累计抵扣
  getIxTotalDiscount() {
    return request('fee/discount/total')
  },

  // contract 接口
  getContractSymList() {
    return getCache('cpairList', () => request('contract/symbol/list').then(res => {
      if (res && res.data) {
        res.data = res.data.map(item => {
          item.amount_scale = parseInt(item.amount_scale, 10)
          item.currency_scale = parseInt(item.price_scale, 10) || 0
          item.price_scale = parseInt(item.price_scale, 10) || 2
          item.fee_rate = item.fee_rate || 0
          if (item.currency === 'BTCUSD') {
            item.value_scale = 4
            item.accuracy = item.accuracy || 5
          } else {
            item.value_scale = 8
            item.accuracy = item.accuracy || 1
          }
          // item.value_scale = parseInt(item.value_scale, 10) || 4
          if (item.name.indexOf('FUTURE_') < 0) {
            item.name = `FUTURE_${item.name.replace('_', '')}`
          }

          // USD
          item.currency_name = item.name.substr(-3)
          // BTCUSD
          item.symbol = item.name.split('_')[1]
          // BTC
          item.product_name = item.symbol.substr(0, 3)
          return item
        })
        res.data = { items: res.data }
        return res
      }
    }))
  },
  async getContractPairInfo({ symbol }) {
    const res = await this.getContractSymList()
    if (!res.code) {
      // if (res.data && res.data.length) {
      //   res.data = res.data.map (item => {
      //     item.amount_scale = parseInt(item.amount_scale, 10)
      //     item.price_scale = parseInt(item.price_scale, 10)
      //     return item
      //   })
      // }
      const find = _.find(res.data.items, item => item.name === symbol)

      return {
        code: find ? 0 : 100001,
        data: find,
        message: find ? '' : utils.$i18n.t('sth_went_wrong')
      }
    }
    return res
  },
  getContractSymInfo(params) {
    return request('future/account/symbol/info', params)
  },
  getContractBalanceList() {
    return getCache('contractBalance', () => request('future/account/balance/list'), 1e3)
  },
  async getContractBalanceByPair(symbol) {
    if (!symbol || !symbol.symbol) {
      symbol = {
        symbol: 'BTCUSD'
      }
    } else {
      symbol.symbol = symbol.symbol + 'USD'
    }
    const result = await service.getContractBalanceList()
    // let resp = []
    if (!result.code) {
      const list = result.data
      const balance = list ? list.filter(l => symbol.symbol === l.currency)[0] || {} : {
        available: '0',
        holding: '0',
        available_balance: '0',
        leverage: 100
      }
      return {
        code: 0,
        data: balance
      }
    }
    return null
  },
  changePromiseFund(params) {
    return request('future/account/transfer_margin', params)
  },
  setRiskLimit(params) {
    return request('contract/risklimit/set', params)
  },
  getRiskLimit(params) {
    return request('contract/risklimit/get', params)
  },
  transferContractFund(params) {
    return request('future/account/transfer', params)
  },
  orderContract(params) {
    return getCache('c_orderContract', () => request('contract/order', params), 1e3)
  },
  orderContractClose(params) {
    return request('contract/close', params)
  },

  // 仓位
  // getContractHolding (params) {
  //   return request('contract/holding', params)
  // },
  // 已平仓table
  getClosedposition(params) {
    return request('contract/closedposition', params)
  },
  // 当前委托
  getActiveorders(params) {
    return getCache('c_activeList', () => request('contract/activeorders', params), 1e3)
  },
  // 止损委托
  getStoplossOrder(params) {
    return getCache('c_stoploss', () => request('contract/activetriggers', params), 1e3)
  },
  // 委托历史
  getOrderhistory(params) {
    return getCache('c_orderhisotry', () => request('contract/orderhistory', params), 1e3)
  },
  // 已成交
  getOrderfills(params) {
    return getCache('c_orderfill', () => request('future/account/orderfills', params), 1e3)
  },
  // 已成交列表
  getOrderfillList(params) {
    return getCache('c_orderfilllist', () => request('future/account/orderfills', params), 1e3)
  },
  // 我的资产,contract专用
  // 交易历史
  getContractTradeHistory(params) {
    return request('future/account/trade_history', params)
  },
  // 财务记录
  getContractFundHistory(params) {
    return request('future/account/fund/history', params)
  },
  // 资金费率历史
  getFundFeeRateHistory(params) {
    return request('future/account/feerate/history', params)
  },
  // 保险基金
  getEnsuranceFund(params) {
    return request('future/account/ensurance', params)
  },
  // 合约是否开通
  checkContractActive(currency, isSimulation) {
    return request(`/future/account/is_activated${isSimulation ? '_simulation' : ''}`, {
      currency
    })
  },
  // 激活合约
  activeContract(currency, isSimulation) {
    return request(`future/account/activate${isSimulation ? '_simulation' : ''}`, {
      currency
    })
  },
  // 设置杠杆倍数
  setContractlever(params) {
    return request('future/account/leverage', params)
  },
  previewContractlever(params) {
    return request('future/account/leverage_preview', params)
  },
  //   撤销合约
  revertContract(params) {
    return request('contract/remove', params)
  },
  cancelAllContractOrder(params) {
    return request('contract/remove_all', params)
  },

  // 创建战队
  createTeam(params) {
    return request('future/activity/team_create', params)
  },
  // 报名参赛交易大赛
  enrollMatch(params) {
    return request('future/activity/enter_for', params)
  },
  // 交易大赛排行榜
  getRankList(params) {
    return getCache('c_ranklist', () => request('future/activity/rank_list', params), 1e3)
  },

  // 自选列表
  getOptionalList(params) {
    // site (int 非必须,默认1) 1-ix 2-ixx
    return getCache('c_optional', () => request('account/currency/optionalList', params), 1e3)
  },
  // 增加自选
  addOptional(params) {
    // site (int 非必须,默认1) 1-ix 2-ixx
    // id 币对id
    return request('account/currency/optional/add', params)
  },
  // 删除自选
  delOptional(params) {
    // site (int 非必须,默认1) 1-ix 2-ixx
    // id 币对id
    return request('account/currency/optional/del', params)
  },
  // 查询最低价
  minactive(params) {
    return request('/otc/active/find/minactive', params)
  },
  // 一键买币(按金额购买CNY)
  bycoins(params) {
    return getCache('c_otc_bycoins', () => request('/otc/active/key/bycoins', params), 2e3)
  },
  // 一键买币(按数量购买)
  byamount(params) {
    // return request('/otc/active/key/byamount', params)
    return getCache('c_otc_byamount', () => request('/otc/active/key/byamount', params), 2e3)
  },
  // POST /otc/active/key/sell/coins
  sellCoins(params) {
    return request('/otc/active/key/sell/coins', params)
  },
  // 一键卖币(按数量出售) POST /otc/active/key/sell/amount
  sellAmount(params) {
    return request('/otc/active/key/sell/amount', params)
  },
  // 获取币对信息
  getCurrencyList(params) {
    return request('future/account/currency_list', params)
  },

  /**
   * 用户可用余额
   * @param {
   * user_id} params
   */
  getOtcBalance(params) {
    return getCache('c_otc_balance', () => request('otc/account/balance/list', params), 1e3)
  },

  async getOtcBalanceByPair(symbol) {
    if (!symbol || !symbol.symbol) {
      symbol = {
        symbol: 'BTC'
      }
    }
    const result = await service.getOtcBalance()
    console.log(result)
    // let resp = []
    if (!result.code) {
      const list = result.data
      const balance = list ? list.filter(l => symbol.symbol === l.currency)[0] || {} : {
        available: '0',
        holding: '0',
        available_balance: '0',
        leverage: 100
      }
      return {
        code: 0,
        data: balance
      }
    }
    return null
  },
  //* ************************  OTC 接口  ************************//
  /**
   * 查询是否满足交易条件
   * @param {
   * user_id} params
   * kyc_level 0-未认证 1-绑定手机 2-绑定本人实名银行卡 3-身份认证
   */
  isQualified(params) {
    return request('otc/account/is_qualified', params)
  },
  /**
   * 用户可用余额
   * @param {
   * user_id} params
   */
  getOtcBalance(params) {
    return getCache('c_otc_balance', () => request('otc/account/balance/list', params), 1e3)
  },

  async getOtctBalanceByPair(symbol) {
    if (!symbol || !symbol.symbol) {
      symbol = {
        symbol: 'BTC'
      }
    }
    const result = await service.getOtcBalance()
    console.log(result)
    // let resp = []
    if (!result.code) {
      const list = result.data
      const balance = list ? list.filter(l => symbol.symbol === l.currency)[0] || {} : {
        available: '0',
        holding: '0',
        available_balance: '0',
        leverage: 100
      }
      return {
        code: 0,
        data: balance
      }
    }
    return null
  },
  /**
   * 委托单列表
   * @param {
   * currency,
   * side,
   * page ,
   * size  } params
   * currency 币种
   * page 页码
   * size 页面条数
   */
  getOtcOrderList(params) {
    return request('otc/account/orderlist', params)
  },
  /**
   * 成交单详情
   * @param {
   * trans_id,
   * user_id } params
   */
  getOtcOrderInfo(params) {
    return getCache('c_otc_orderinfo', () => request('otc/account/orderinfo', params), 1e3)
  },
  /**
   * 我的委托单列表
   * @param {
   * user_id,
   * page,
   * size } params
   */
  getOtcActivefills(params) {
    return getCache('c_otc_activefills', () => request('otc/account/activefills', params), 1e3)
  },
  /**
   * 已取消订单
   * @param {
   * user_id,
   * page,
   * size,
   * side ,
   * currency} params
   * side (非必须,默认0) 0-全部 1-购买 2-出售
   * currency(非必须,默认全部)
   */
  getOtcRemovefills(params) {
    return getCache('c_otc_removefills', () => request('otc/account/removefills', params), 1e3)
  },
  balancefills(params) {
    return request('otc/account/balancefills', params)
  },
  // 划转记录
  getBalanceList(param) {
    return request('/account/balance/finance/list', param)
  },
  /**
   * 已完成订单
   * user_id 用户id
   * page 页码
   * size 页面条数
   * side (非必须,默认0) 0-全部 1-购买 2-出售
   * currency(非必须,默认全部)
   */
  getDonefills(params) {
    return getCache('c_otc_donefills', () => request('otc/account/donefills', params), 1e3)
  },
  /**
   * 未完成订单
   * @param {
   * user_id,
   * page,
   * size,
   * side,
   * currency } params
   */
  getUnDonefills(params) {
    return getCache('c_otc_undonefills', () => request('otc/account/unDonefills', params), 1e3)
  },
  /**
   * 用户信息
   * @param {
   * user_id} params
   */
  getOtcUserinfo(params) {
    return getCache('c_otc_userinfo', () => request('otc/account/userinfo', params), 1e3)
  },
  /**
   * 支付方式列表
   * @param {
   * user_id,
   * currency}
   */
  getOtcCollection(params) {
    return getCache('c_otc_collection', () => request('otc/account/collection/list', params), 1e3)
  },
  /**
   * 支付方式添加
   * @param {
   * user_id ,
   * payment_type ,
   * name,
   * currency,
   * deposit_bank,
   * sub_branch,
   * card_number,
   * alipay_account,
   * weChat_account,
   * collection_img} params
   * payment_type 收款方式 1-银行卡 2-支付宝 3-微信支付
   */
  addOtcCollection(params) {
    return getCache('c_otc_collection_add', () => request('otc/account/collection/add', params), 2e3)
  },
  orderBind(params) {
    return request('otc/order/bind', params)
  },
  orderUnbind(params) {
    return request('otc/order/unbind', params)
  },
  /**
   * 支付方式删除
   * @param {
   * collection_id } params
   */
  delOtcCollection(params) {
    return request('otc/account/collection/del', params)
  },
  /**
   * 发布委托单
   * @param {
   * user_id,
   * currency,
   * side,
   * type,
   * float_rate,
   * price,
   * amount,
   * total,
   * kyc_level,
   * register_time,
   * remark,
   * site} params
   * type 1固定价格 2浮动价格
   * remark 备注
   * site (非必须 ,默认1)1-个人 2-商户
   */
  createOtcOrder(params) {
    return getCache('c_otc_createOrder', () => request('otc/order/create', params), 1e3)
    // return request('otc/order/create', params)
  },
  /**
   * 发布成交单
   * @param {
   * user_id,
   * active_id,
   * side,
   * amount,
   * total } params
   * active_id 委托单ID
   */
  createOtcTransaction(params) {
    return getCache('c_otc_transaction', () => request('otc/order/transaction', params), 1e3)
    // return request('otc/order/transaction', params)
  },
  /**
   * 我已付款
   * @param {user_id, trans_id, collection_id} params
   * trans_id  成交单id
   * collection_id 收款方式id
   */
  otcOrderPaymentDone(params) {
    return request('otc/order/paymentDone', params)
  },
  /**
   * 我已放币
   * @param {
   * user_id,
   * trans_id } params
   * trans_id 成交单id
   */
  otcOrderIssueDone(params) {
    return request('otc/order/issueDone', params)
  },
  /**
   * 撤销订单
   * @param {
   * user_id,
   * type,
   * trans_id } params
   * type 1-委托单 2-成交单
   * trans_id 委托单/成交单id
   */
  otcOrderRemove(params) {
    return request('otc/order/remove', params)
  },
  /**
   * 全部订单操作
   * @param {
   * user_id,
   * type} params
   * type 1-委托单全部撤销 2-委托单全部开始 3-委托单全部暂停
   */
  otcOrderOperateAll(params) {
    return request('otc/order/operateAll', params)
  },
  /**
   * 申述
   * @param {
   *  user_id,
   *  trans_id} params
   * trans_id 成交单id
   */
  otcAppeal(params) {
    return request('otc/order/appeal', params)
  },
  /**
   * 取消申述
   * @param {
   *  user_id,
   *  trans_id} params
   * trans_id 成交单id
   */
  otcUnAppeal(params) {
    return request('otc/order/unAppeal', params)
  },
  /**
   * 交易对详情
   */
  otcSymbolList() {
    return getCache('c_otc_symbol_list', () => request('otc/account/symbol/list'), 5e3)
  },
  // 获取余额（总账户）
  getAccountWalletList() {
    return getCache('c_wallet_list', () => request('account/wallet/list'), 1e3)
  },
  async getwalletBalanceByPair(symbol) {
    if (!symbol || !symbol.symbol) {
      symbol = {
        symbol: 'BTC'
      }
    }
    const result = await service.getAccountWalletList()
    if (!result.code) {
      const list = result.data
      const balance = list ? list.filter(l => symbol.symbol === l.currency)[0] || {} : {
        available: '0',
        holding: '0',
        available_balance: '0',
        leverage: 100
      }
      return {
        code: 0,
        data: balance
      }
    }
  },
  // 节点认购
  nodesBuy(params) {
    return getCache('c_nodes_buy', () => request('api/agent/nodes/pre', params), 1e3)
    // return fetch('http://staging.ixex.pro:93/api/agent/nodes/pre', params)
  },
  // 节点返佣
  nodeReturn(params) {
    return getCache('c_node_return', () => request('future/activity/node/list', params), 1e3)
  },
  //获取游戏code  一个小时获取一次，再次获取后上一次作废，如不重新获取，上一次的code一直有效
  createCode(params) {
    // return fetch('http://47.244.186.74:2100/oauth2/createcode.do', params) 
    // return getCache('c_game_code', () => request('future/activity/oauth2/createcode.do', params), 1e3)
    return getCache('c_game_code', () => request('/create_code_get_uri', params), 1e3)
  } , 
  //游戏记录查询
  gameTradeList(params) {
    return request('future/activity/gameTrade/list', params)
  }, 

}

export async function fetch(url, body, options, method = 'post') {
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
    const data = res // .json()
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

export async function fetchQuota(url, body, options, method = 'post') {
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

export function request(url, body, options) {
  // if (process.env.NODE_ENV === 'development') {
  // return fetch('/beta-gate/' + url, body, options)
  // }
  return fetch(url, body, options)
}

function quote(url, body, options) {
  return fetchQuota(config.quoteUrl + url, body, options, 'get')
}

const cache = {}

function getCache(key, promiseGetter, ttl = 0) {
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

function rmCache(key) {
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
