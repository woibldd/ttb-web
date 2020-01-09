import request from '../utils/request'

// user_id 用户id
// symbol 产品类型
// currency 支付货币
// tradeType 交易方向 0买涨，1买跌
// period 周期 1M，5M，10M，1H, 6H, 1D，7D
export const createOrder = (data = { user_id: '', symbol: '', currency: '', tradeType: '', period: '' }) => request({
  url: '/opt/order/create',
  method: 'post',
  data
})
export const getShareAccountList = (user_id, currencys) => request({
  url: '/opt/account/balance',
  method: 'post',
  data: { user_id, currencys }
})
export const activeShareAccount = user_id => request({
  url: '/opt/account/activate',
  method: 'post',
  data: { user_id }
})
// user_id 用户id
// currency 账户类型
// begin_time 下单时间
// end_time 结算时间
// page
// size
export const getHistory = data => request({
  url: '/opt/account/order/list',
  method: 'post',
  data
})
export const getProduct = () => request({
  url: '/opt/account/product',
  method: 'post'
})
export const resetBalance = () => request({
  url: '/opt/account/reset',
  method: 'post'
})
