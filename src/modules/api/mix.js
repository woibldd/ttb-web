import {getCache, request} from './api-base'

export default { 
  // 币本位可用余额
  getContractMixBalanceList () {
    return getCache('contractMixBalance', () => request('mix/account/balance/list'), 1e3)
  }, 
  async getMixBalanceByPair (symbol) { 
    if (!symbol || !symbol.symbol) {
      symbol = {
        symbol: 'USDT'
      }
    } 
    let result = await this.getContractMixBalanceList() 
    if (!result.code) {
      console.log({data: result.data})
      let list = result.data
      let balance = list ? list.filter(l => symbol.symbol === l.currency)[0] || {} : {
        available: '0',
        holding: '0',
        available_balance: '0',
        leverage: 100
      }
      return {
        code: 0,
        data: balance
      }
    }
    return null
  },  
  async getMixContractSymList () { 
    const res = await getCache('mixPairList', () => request('mix/symbol/list'), 5e3)
    if (res && res.data && !res.data.items) {
      res.data = res.data.map(item => {
        item.amount_scale = parseInt(item.amount_scale, 10)
        item.currency_scale = parseInt(item.price_scale, 10) || 0
        item.price_scale = parseInt(item.price_scale, 10) || 2
        item.fee_rate = item.fee_rate || 0 
        return item
      }) 
      res.data = { items: res.data.sort((a,b) => a.rank - b.rank) }
    } 
    return res  
  },
  async getMixContractPairInfo ({symbol}) {  
    const res = await this.getMixContractSymList()
    if (!res.code) {
      const find = _.find(res.data.items, item => `${item.product}_${item.currency}` === symbol) 
      return {
        code: find ? 0 : 100001,
        data: find,
        message: find ? '' : utils.$i18n.t('sth_went_wrong')
      }
    }
    return res
  },
  // 盈亏币盈亏历史
  getMixCloseRealized (params) {
    return request('mix/account/close_realized', params)
  },
  // 盈亏金本位历史走势
  getMixCloseRealizedDays (params) {
    return getCache('c_future_close_realized_days', () => request('mix/account/close_realized_days', params), 1e3)
  },
  getMixContractSymInfo (params) {
    return request('mix/account/symbol/info', params)
  },
  // 金本位委托历史
  getMixOrderhistory (params) {
    return getCache('c_mixOrderhistory', () => request('mix/orderhistory', params), 1e3)
  },
  getMixTradeHistory (params) {
    return request('mix/account/trade_history', params)
  },
  // 金本位财务记录
  getMixFundHistory (params) {
    return request('mix/account/fund/history', params)
  },
  // 盈亏币盈亏历史
  getMixCloseRealized (params) {
    return request('mix/account/close_realized', params)
  },
  // 盈亏金本位历史走势
  getMixCloseRealizedDays (params) {
    return getCache('c_future_close_realized_days', () => request('mix/account/close_realized_days', params), 1e3)
  },
}