import request from '../utils/request'

export const getDigitalCurrencyList = query => request({
  url: '/otc/account/symbol/list',
  method: 'post',
  params: query
})
export const getOtcTradeTableList = query => request({
  url: '/otc/account/orderlist',
  method: 'post',
  data: query
})
