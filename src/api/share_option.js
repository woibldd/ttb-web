import request from '@/utils/request'

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
/* 
  user_id 用户id
  currency 账户类型
  begin_time 下单时间
  end_time 结算时间
  page
  size
  state 状态 0待结算，1已结算 3或不传查全部
*/
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
