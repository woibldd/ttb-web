
import {fetch, fetchQuota} from '@/modules/service'

import config from '@/libs/config'
const proxy_q = config.quoteUrl

function request ({url, method, params}) {
  if (method === 'get') {
    return fetchQuota(url, params, method, 'get')
  } else {
    return fetch(url, params, method)
  }
}

// 下单里的side side订单类型 1开多(买入开多) 2开空(卖出开空) 3平多(卖出平多) 4平空(买入平空)
// 持仓里的side side 1做多 2做空

// 获取交易对列表 POST /mix/symbol/list
export const getSymbolList = query => request({
  url: '/mix/symbol/list',
  method: 'post',
  params: query
})

// 合约信息 POST /mix/account/symbol/info
export const getSymbolInfo = data => request({
  url: `/mix/account/symbol/info`,
  method: 'post',
  data
})

// 资金费率历史 POST /mix/account/feerate/history
export const getFeeRateHistory = query => request({
  url: '/mix/account/feerate/history',
  method: 'post',
  params: query
})

// 用户余额(持仓) POST /mix/account/balance/list
export const getBalanceList = query => request({
  url: '/mix/account/balance/list',
  method: 'post',
  params: query
})

// 设置杠杆倍数 POST /mix/account/leverage
export const setLeverage = query => request({
  url: '/mix/account/leverage',
  method: 'post',
  params: query
})

// 设置杠杆倍数(预览) POST /mix/account/leverage_preview
export const setLeveragePreview = query => request({
  url: '/mix/account/leverage_preview',
  method: 'post',
  params: query
})

// 修改保证金 POST /mix/account/transfer_margin
export const setTransferMargin = query => request({
  url: '/mix/account/transfer_margin',
  method: 'post',
  params: query
})

// 下单 POST /mix/order
export const submitOrder = query => request({
  url: '/mix/order',
  method: 'post',
  params: query
})

// 修改委托单价格或数量或触发价格 POST /mix/modify
export const modifyOrder = query => request({
  url: '/mix/modify',
  method: 'post',
  params: query
})

// 撤单 POST /mix/remove
export const cancelOrder = query => request({
  url: '/mix/remove',
  method: 'post',
  params: query
})

// 一键撤单 POST /mix/remove_all
export const removeAllOrder = query => request({
  url: '/mix/remove_all',
  method: 'post',
  params: query
})

// 平仓 POST /mix/close
export const closeOrder = query => request({
  url: '/mix/close',
  method: 'post',
  params: query
})

// 当前仓位,委托,止损委托,委托历史,已成交的数量 POST /mix/account/holding/amount
export const getAllAmount = query => request({
  url: '/mix/account/holding/amount',
  method: 'post',
  params: query
})
// 已平仓位 POST /mix/closedposition
export const getClosedpositionList = query => request({
  url: '/mix/closedposition',
  method: 'post',
  params: query
})

// 当前委托 POST /mix/activeorders
export const getActiveOrders = query => request({
  url: '/mix/activeorders',
  method: 'post',
  params: query
})

// 止损委托 POST /mix/activetriggers
export const getActiveTriggers = query => request({
  url: '/mix/activetriggers',
  method: 'post',
  params: query
})

// 委托历史 POST /mix/orderhistory
export const getOrderHistory = query => request({
  url: '/mix/orderhistory',
  method: 'post',
  params: query
})

// 已成交 POST /mix/account/orderfills
export const getOrderFills = query => request({
  url: '/mix/account/orderfills',
  method: 'post',
  params: query
})

// 交易历史 POST /mix/account/trade_history
export const getTradeHistory = query => request({
  url: '/mix/account/trade_history',
  method: 'post',
  params: query
})

// 成交单详情 POST /mix/account/trade_info
export const getTradeInfo = query => request({
  url: '/mix/account/trade_info',
  method: 'post',
  params: query
})

// 委托单详情 POST /mix/account/order_info
export const getOrderInfo = query => request({
  url: '/mix/account/order_info',
  method: 'post',
  params: query
})

export const getFutureListByKey = (key, query) => request({
  url: `${proxy_q}deal/${key}`,
  method: 'get',
  params: query
})

// 合约是否开通
export const checkContractActive = (currency, isSimulation) => request({
  url: `/future/account/is_activated${isSimulation ? '_simulation' : ''}`,
  method: 'post',
  params: {currency}
})

// 已成交 POST /account/currency/rates
export const getRates = data => request({
  url: `/account/currency/rates`,
  method: 'post',
  params: data
})
