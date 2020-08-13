
// import request from '../utils/request'
// import {fetch, fetchQuota} from '@/modules/service'
import {fetch, fetchQuota, getCache, quote} from '@/modules/api/api-base'

import config from '@/libs/config'
const proxy_q = config.quoteUrl

function request ({url, method, params}) {
  if (method === 'get') {
    return fetchQuota(url, params, method, 'get')
  } else {
    return fetch(url, params, method)
  }
}

// const proxy_q = process.env.NODE_ENV === 'development' ? process.env.VUE_APP_PROXY_Q : process.env.VUE_APP_BASE_API_Q
// const proxy_q = process.env.VUE_APP_PROXY_Q
export const getFutureDictionaryList = query => request({
  url: '/unit/symbol/list',
  method: 'post',
  params: query
})
// export const getFutureListByKey = (key, query) => request({
//   url: `${proxy_q}deal/${key}`,
//   method: 'get',
//   params: query
// })

export const getFutureListByKey = (key, query) => {
  return quote(`deal/${key}`, query)
}

// export const getBars = (key, query) => request({
//   url: `${proxy_q}deal/FUTURE_${key}USD`,
//   method: 'get',
//   params: query
// })
export const getBars = (key, query) => {
  return quote(`deal/FUTURE_${key}USD`, query)
}
 

// export const getSymbolList = () => request({
//   url: `${proxy_q}market/pairs`,
//   method: 'get'
// })
export const getHistoryByPeriodOrPairs = (params = { period: '1m', pairs: 'ETH_BTC,EOS_BTC,UNKNOWN' }) => {
  return quote(`market/histories`,params)
} 
// export const getHistoryByPeriodOrPairs = (params = { period: '1m', pairs: 'ETH_BTC,EOS_BTC,UNKNOWN' }) =>{ return quote(`market/histories`,params)}
export const getDishDataByPairs = (params = { pairs: 'ETH_BTC,EOS_BTC,UNKNOWN' }) => { 
  return quote( `market/tickers`,params)
}
export const getSymbolQuote = symbol => {
  return quote(`ticker/${symbol}`)
}
export const getHistoryBySymbol = (symbol, params = { period: '1m', size: 10 }) => {
  return quote(`history/${symbol}`)
}
export const getHistoryBySymbolAndOption = (symbol, params = { period: '1m', begin: Date(), end: Date() }) => {
  return quote(`history/millis/${symbol}`)
}
export const getReachDataBySymbol = (symbol, params = { size: 10 }) => {
  return quote(`deal/${symbol}`,params)
}
export const getOrderDataBySymbol = (symbol, params = { offset: 0, accuracy: 1, size: 10 }) =>  {
  console.log('123123123')
  return quote(`orderbook/${symbol}`,params)
}

// getQuoteOrderbook({ pair, accuracy, offset, size }) {
//   return quote(`orderbook/${pair}`, { offset, accuracy, size })
// },
// 获取交易对列表 POST /unit/symbol/list
export const getSymbolList = data => request({
  url: `/unit/symbol/list`,
  method: 'post',
  params: data
})
// 用户余额(持仓) POST /unit/account/balance/list
export const getBalanceList = (query) => {
  return getCache('unit-balance-list', () => request({
    url: `/unit/account/balance/list`,
    method: 'post',
    params: query
  }), 1e3)
}
// export const getBalanceList = (query) => request({
//   url: `/unit/account/balance/list`,
//   method: 'post',
//   params: query
// }) 

// 已平仓位 POST /unit/closedposition
export const getClosedpositionList = data => request({
  url: `/unit/closedposition`,
  method: 'post',
  params: data
})
// 当前委托 POST /unit/activeorders 参数user_id page size
export const getActiveorders = (query) =>  { 
  return getCache('unit-active-orders', () => request({
    url: `/unit/activeorders`,
    method: 'post',
    params: query
  }), 1e3)
}
// 止损委托 POST /unit/activetriggers 参数user_id page size
export const getActivetriggers = data => request({
  url: `/unit/activetriggers`,
  method: 'post',
  params: data
})
// 委托历史 POST /unit/orderhistory 参数user_id currency （非必传）默认全部 其他：BTCUSD/BHDUSD page size
export const getActiveOrderhistory = data => request({
  url: `/unit/orderhistory`,
  method: 'post',
  params: data
})
// 已成交 POST /unit/account/orderfills
export const getActiveOrderfills = data => request({
  url: `/unit/account/orderfills`,
  method: 'post',
  params: data
})
// 已成交 soket
export const WSURL = 'wss://wss.ixex.pro/v1'
// 周期频道 URI：history/{pair}/{period}

// 已成交 POST /account/currency/rates
export const getRates = data => request({
  url: `/account/currency/rates`,
  method: 'post',
  params: data
})
/* 下单 POST /unit/order
user_id
amount
price
type 下单类型 1 限价 2市价 3限价止损 4市价止损 5限价止盈 6市价止盈
side 方向 2卖 1买
symbol 交易对
leverage 杠杆倍数 -1代表全仓 10 20 100
passive 是否被动委托 0否 1是
trigger_price 触发价格
trigger_type 触发类型 0默认 1盘口价格 2标记价格 3指数价格
trigger_close 触发后平仓 0未勾选 1勾选
tp_type 止盈触发类型 0默认 1盘口价格 2标记价格 3指数价格 如果是-1的话代表从仓位里下的触发单
tp_price 止盈价格
sl_type 止损触发类型 0默认 1盘口价格 2标记价格 3指数价格 如果是-1的话代表从仓位里下的触发单
sl_price 止损价格 */
export const submitOrder = data => request({
  url: `/unit/order`,
  method: 'post',
  params: data
})

// 当前仓位,委托,止损委托,委托历史,已成交数量 POST /unit/account/holding/amount
// export const getAllAmount = data => request({
//   url: `/unit/account/holding/amount`,
//   method: 'post',
//   params: data
// }) 
export const getAllAmount = (query) => { 
  return getCache('unit-all-amount', () => request({
    url: '/unit/account/holding/amount',
    method: 'post',
    params: query
  }), 1e3)
}
// 撤单 POST /unit/remove
/*
user_id
symbol 交易对
order_id 订单id */
export const cancelOrder = data => request({
  url: `/unit/remove`,
  method: 'post',
  params: data
})
// 财务记录 POST /unit/account/fund/history
/* user_id */
export const getFinanceRecord = data => request({
  url: `/unit/account/fund/history`,
  method: 'post',
  params: data
})

// 设置杠杆倍数 POST /unit/account/leverage
/* user_id
currency 币种
leverage */
export const setLeverage = data => request({
  url: `/unit/account/leverage`,
  method: 'post',
  params: data
})

// 合约信息 POST /unit/account/symbol/info
/* symbol 交易对 */

export const getSymbolInfo = data => request({
  url: `/unit/account/symbol/info`,
  method: 'post',
  params: data
})
// 合约信息 POST /unit/account/symbol/info
/* user_id
symbol 交易对
price 平仓价格 */
export const closeStorehouse = data => request({
  url: `/unit/close`,
  method: 'post',
  params: data
})

// "0.076973",         // 起始价
//                 "0.076838",         // 结束价
//                 "0.07606",          // 最低价
//                 "0.077378",         // 最高价
//                 "27.3411",          // 成交量
//                 "2.1000977805",     // 成交额
//                 "0.076973",         // 上一周期结束价
//                 "121",              // 成交笔数
//                 "0.205"             // 现量
// history/millis/{pair}?period={period}&begin={begin}&end={end}
export const getKlineHistoryList = (symbol, query) =>  {
  return quote(`history/millis/${symbol}`, query)
}

// 修改委托单价格或数量或触发价格 POST /unit/modify
// 参数

// user_id
// order_id 订单id
// name 合约名(EHTUSD,EOSUSD)
// amount 数量(可为空)
// price 价格(可为空)
// trigger_price 触发价格(可为空)
export const setModify = data => request({
  url: `/unit/modify`,
  method: 'post',
  params: data
})
/* 修改保证金 POST /unit/account/transfer_margin
参数
user_id 用户id
name 合约名(EHTUSD,EOSUSD)
amount 增加或减少数量 */
export const setTransferMargin = data => request({
  url: `/unit/account/transfer_margin`,
  method: 'post',
  params: data
})
/* 设置杠杆倍数(预览) POST /unit/account/leverage_preview
参数
user_id
name 合约名(EHTUSD,EOSUSD)
leverage 杠杆倍数 */
export const leveragePreview = data => request({
  url: `/unit/account/leverage_preview`,
  method: 'post',
  params: data
})

// 合约是否开通
export const checkContractActive = (currency, isSimulation) => request({
  url: `/future/account/is_activated${isSimulation ? '_simulation' : ''}`,
  method: 'post',
  params: {currency}
})
