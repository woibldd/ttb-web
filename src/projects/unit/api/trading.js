import request from '../utils/request'

const proxy_q = process.env.NODE_ENV === 'development' ? process.env.VUE_APP_PROXY_Q : process.env.VUE_APP_BASE_API_Q

export const getReachDataBySymbol = (symbol, params = { size: 20 }) => request({
  url: `${proxy_q}/v1/deal/${symbol}`,
  method: 'get',
  params
})
export const getOrderDataBySymbol = (symbol, params = { offset: 0, accuracy: 1, size: 20 }) => request({
  url: `${proxy_q}/v1/orderbook/${symbol}`,
  method: 'get',
  params
})

export const futureActivityGet = (params) => request({
  url: `future/activity/wallet/queryUserTag`,
  method: 'post',
  params
})

export const getRates = (params) => request({
  url: `account/currency/rates`,
  method: 'post',
  params
})

export const getPairList = () => request({
  url: `order/symbol/list`,
  method: 'post'
})

export const getBalanceList = () => request({
  url: `account/balance/list`,
  method: 'post'
})

/**
 * 获取当前委托
 * @param {*} paramspage:1, size:1000
 */
export const getOrderActive = (params) => request({
  url: 'order/active',
  method: 'post',
  params
})

/**
 * 获取止盈止损委托
 * @param {*} params {page:1, size:1000}
 */
export const getActiveTriggers = (params) => request({
  url: 'order/active/triggers',
  method: 'post',
  params
})

/**
 * 获取委托历史
 * @param {*} params {page:1, size:1000}
 */
export const getOrderHistory = (params) => request({
  url: 'order/history',
  method: 'post',
  params
})
