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
