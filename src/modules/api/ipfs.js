import {getCache, request} from './api-base'

export default { 
  // 算力购买
  createPowerBuy (params) {
    return getCache('ipfs-power-buy', () => request('api/power/buy', params), 1e3)
  }, 
  //订单记录
  getPowerList (params) {
    return getCache('ipfs-power-list', () => request('api/power/list', params), 1e3)
  }, 
  //算力余额
  getPowerBalanceList (params) {
    return getCache('ipfs-power-balance-list', () => request('api/power/balance/list', params), 1e3)
  }, 
  //算力产品余额
  getPowerProductList (params) {
    return getCache('ipfs-power-product-list', () => request('api/power/product/balance/list', params), 1e3)
  }, 
  //奖励分配
  getPowerCandyList (params) {
    return getCache('ipfs-power-candy-list', () => request('api/power/candy/list', params), 1e3)
  }, 
  //产品首页
  getPowerFindPage (params) {
    return getCache('ipfs-power-findPage', () => request('api/power/findPage', params), 1e3)
  }, 
}