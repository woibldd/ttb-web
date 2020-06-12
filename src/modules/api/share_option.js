// import request from '@/utils/request'
import { getCache, request } from './api-base'


export const createOrder = (data = { user_id: '', symbol: '', currency: '', tradeType: '', period: '' }) => {
  return getCache('opt_createOrder', () => request('/opt/order/create',data), 1e3)
}
export const getShareAccountList = (user_id, currencys) => request('/opt/account/balance',{ user_id, currencys })
export const activeShareAccount = user_id => request('/opt/account/activate',{ user_id }) 
export const getHistory = data => request('/opt/account/order/list',data)
export const getProduct = () => request('/opt/account/product','post')
export const resetBalance = () => request('/opt/account/reset')


 