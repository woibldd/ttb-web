 
import {fetch, fetchQuota, quote, getCache, request} from '@/modules/api/api-base'

import config from '@/libs/config'
const proxy_q = config.quoteUrl

// function request ({url, method, params}) {
//   if (method === 'get') {
//     return fetchQuota(url, params, method, 'get')
//   } else {
//     return fetch(url, params, method)
//   }
// }

// 下单里的side side订单类型 1开多(买入开多) 2开空(卖出开空) 3平多(卖出平多) 4平空(买入平空)
// 持仓里的side side 1做多 2做空


export default {
  // 获取交易对列表 POST /blend/symbol/list
  getBlendSymbolList: query => request('/blend/symbol/list', query),
  async getBlendContractSymList() {
    const res = await getCache('blendPairList', () => request('blend/symbol/list'), 5e3) 
    if (res && res.data  && !res.data.items) {
      res.data = { items: res.data }
    }
    return res
  },
  // 合约信息 POST /blend/account/symbol/info
  getBlendSymbolInfo:data => request(`/blend/account/symbol/info`, data), 
// 资金费率历史 POST /blend/account/feerate/history
  getBlendFeeRateHistory:query => request('/blend/account/feerate/history',query), 
  // 用户余额(持仓) POST /blend/account/balance/list 
  getBlendBalanceList:(query) => {
    return getCache('blend-balance-list', () => request(`/blend/account/balance/list`, query), 1e3)
  },  
  // 设置杠杆倍数 POST /blend/account/leverage
  setBlendLeverage:query => request('/blend/account/leverage',query),

  // 设置杠杆倍数(预览) POST /blend/account/leverage_preview
  setBlendLeveragePreview:query => request('/blend/account/leverage_preview',query),

  // 修改保证金 POST /blend/account/transfer_margin
  setBlendTransferMargin:query => request('/blend/account/transfer_margin', query),

  // 下单 POST /blend/order
  submitBlendOrder:query => request('/blend/order',query),

  // 修改委托单价格或数量或触发价格 POST /blend/modify
  modifyBlendOrder:query => request('/blend/modify',query),

  // 撤单 POST /blend/remove
  cancelBlendOrder:query => request('/blend/remove',query),

  // 一键撤单 POST /blend/remove_all
  removeBlendAllOrder:query => request('/blend/remove_all',query),

  // 平仓 POST /blend/close
  closeBlendOrder:query => request('/blend/close', query),

  // 当前仓位,委托,止损委托,委托历史,已成交的数量 POST /blend/account/holding/amount 
  getBlendAllAmount:(query) => {
    return getCache('blend-all-amount', () => request('/blend/account/holding/amount',query), 1e3)
  },

  // 已平仓位 POST /blend/closedposition
  getBlendClosedpositionList:query => request('/blend/closedposition',query),

  // 当前委托 POST /blend/activeorders 
  getBlendActiveOrders:(query) => {
    return getCache('blend-active-orders', () => request(`/blend/activeorders`,query), 1e3)
  },

  // 止损委托 POST /blend/activetriggers
  getBlendActiveTriggers:query => request('/blend/activetriggers',query),

  // 委托历史 POST /blend/orderhistory
  getBlendOrderHistory:query => request('/blend/orderhistory', query),

  // 已成交 POST /blend/account/orderfills
  getBlendOrderFills:query => request('/blend/account/orderfills',query),

  // 交易历史 POST /blend/account/trade_history
  getBlendTradeHistory:query => request('/blend/account/trade_history',query),

  // 成交单详情 POST /blend/account/trade_info
  getBlendTradeInfo:query => request('/blend/account/trade_info', query),

  // 委托单详情 POST /blend/account/order_info
  getBlendOrderInfo:query => request('/blend/account/order_info', query),

  // getBlendFutureListByKey:(key, query) => request({
  //   url: `${proxy_q}deal/${key}`,
  //   method: 'get',
  //   params: query
  // }),
  getBlendFutureListByKey:({pair, size}) => quote(`deal/${pair}`, { size }) ,

  // 合约是否开通
  checkContractActive:(currency, isSimulation) => request(`/future/account/is_activated${isSimulation ? '_simulation' : ''}`,{currency}),

  // 已成交 POST /account/currency/rates 
  getRates:(query) => { 
    return getCache('blend-get-rate', () => request('/account/currency/rates', query), 1e3)
  },

  // user_id
  // order_id 订单id
  // name 合约名(EHTUSD,EOSUSD)
  // amount 数量(可为空)
  // price 价格(可为空)
  // trigger_price 触发价格(可为空)
  setBlendModify:data => request( `/blend/modify`, data ), 
  async getBlendBalanceByPair (symbol) { 
    if (!symbol || !symbol.symbol) {
      symbol = {
        symbol: 'USDT'
      }
    } 
    let result = await this.getBlendBalanceList() 
    if (!result.code) {
      console.log({data: result.data})
      let list = result.data
      let balance = list ? list.filter(l => symbol.symbol === l.currency)[0] || {} : {
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
  async getBlendContractPairInfo ({symbol}) {  
    const res = await this.getBlendContractSymList()
    if (!res.code) {
      const find = _.find(res.data.items, item => `${item.product}_${item.currency}` === symbol) 
      return {
        code: find ? 0 : 100001,
        data: find,
        message: find ? '' : utils.$i18n.t('sth_went_wrong')
      }
    }
    return res
  },
  // 盈亏币盈亏历史
  getBlendCloseRealized (params) {
    return request('blend/account/close_realized', params)
  },
  // 盈亏金本位历史走势
  getBlendCloseRealizedDays (params) {
    return getCache('c_blend_close_realized_days', () => request('blend/account/close_realized_days', params), 1e3)
  },
  getBlendContractSymInfo (params) {
    return request('blend/account/symbol/info', params)
  },
  // 金本位委托历史
  getBlendOrderhistory (params) {
    return getCache('c_blendOrderhistory', () => request('blend/orderhistory', params), 1e3)
  },
  getBlendTradeHistory (params) {
    return request('blend/account/trade_history', params)
  },
  // 金本位财务记录
  getBlendFundHistory (params) {
    return request('blend/account/fund/history', params)
  }, 
  getBlendFundFeeRateHistory (params) {
    return getCache('c_blend_feerate', () => request('blend/account/feerate/history', params), 1e3)
  }, 
}