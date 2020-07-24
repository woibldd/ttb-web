import {getCache, request} from './api-base'

export default { 
  // 算力购买
  createPowerBuy (params) {
    return getCache('ipfs-power-buy', () => request('power/buy', params), 1e3)
  }, 
  //订单记录
  getPowerList (params) {
    return getCache('ipfs-power-list', () => request('power/list', params), 1e3)
  }, 
  //算力余额
  getPowerBalanceList (params) {
    return getCache('ipfs-power-balance-list', () => request('power/balance/list', params), 1e3)
  }, 
  //算力产品余额
  getPowerProductList (params) {
    return getCache('ipfs-power-product-list', () => request('power/product/balance/list', params), 1e3)
  }, 
  //奖励分配
  getPowerCandyList (params) {
    return getCache('ipfs-power-candy-list', () => request('power/candy/list', params), 1e3)
  }, 
  //产品首页
  getPowerFindPage (params) {
    return getCache('ipfs-power-findPage', () => request('power/findPage', params), 1e3)
  }, 
  //创建/更新标书
  createPower (params) {
    return getCache('ipfs-power-insert', () => request('power/insert', params), 1e3)
  }, 
  //获取产品详情
  getProductByManageID (params) {
    return getCache('ipfs-power-find-product', () => request('power/find/product', params), 1e3)
  }
}