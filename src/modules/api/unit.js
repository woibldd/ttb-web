import {getCache, request} from './api-base'


export default {
  // unit contract 接口
  async getUnitContractSymList () {
    const res = await getCache('unitPairList', () => request('unit/symbol/list'), 5e3)
    if (res && res.data && !res.data.items) {
      res.data = res.data.map(item => {
        item.amount_scale = parseInt(item.amount_scale, 10)
        item.currency_scale = parseInt(item.price_scale, 10) || 0
        item.price_scale = parseInt(item.price_scale, 10) || 2
        item.fee_rate = item.fee_rate || 0
        // item.value_scale = parseInt(item.value_scale, 10) || 4
        if (item.currency === 'BTCUSD') {
          item.value_scale = 8
          item.accuracy = item.accuracy || 5
        } else {
          item.value_scale = 8
          item.accuracy = item.accuracy || 5
        }

        if (item.name.indexOf('UNIT_') < 0) {
          item.name = `UNIT_${item.name.replace('_', '')}`
        }

        // USD
        item.currency_name = item.name.substr(-3)
        // BTCUSD
        item.symbol = item.name.split('_')[1]
        // BTC
        item.product_name = item.symbol.substr(0, 3)
        return item
      })
      res.data = { items: res.data }
    } 
    return res
    // return getCache('unitPairList', () => request('unit/symbol/list').then(res => {
    //   if (res && res.data) {
    //     res.data = res.data.map(item => {
    //       item.amount_scale = parseInt(item.amount_scale, 10)
    //       item.currency_scale = parseInt(item.price_scale, 10) || 0
    //       item.price_scale = parseInt(item.price_scale, 10) || 2
    //       item.fee_rate = item.fee_rate || 0
    //       // item.value_scale = parseInt(item.value_scale, 10) || 4
    //       if (item.currency === 'BTCUSD') {
    //         item.value_scale = 8
    //         item.accuracy = item.accuracy || 5
    //       } else {
    //         item.value_scale = 8
    //         item.accuracy = item.accuracy || 5
    //       } 
    //       if (item.name.indexOf('UNIT_') < 0) {
    //         item.name = `UNIT_${item.name.replace('_', '')}`
    //       } 
    //       // USD
    //       item.currency_name = item.name.substr(-3)
    //       // BTCUSD
    //       item.symbol = item.name.split('_')[1]
    //       // BTC
    //       item.product_name = item.symbol.substr(0, 3)
    //       return item
    //     })
    //     res.data = { items: res.data }
    //     return res
    //   }
    // }))
  },
  async getUnitContractPairInfo ({symbol}) { 
    const res = await this.getUnitContractSymList()
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
  getUnitCloseRealized (params) {
    return request('unit/account/close_realized', params)
  },
  // 盈亏币本位历史走势
  getUnitCloseRealizedDays (params) {
    return getCache('c_future_close_realized_days', () => request('unit/account/close_realized_days', params), 1e3)
  },
  getUnitContractSymInfo (params) {
    return request('unit/account/symbol/info', params)
  },
  async getUnitBalanceByPair (symbol) { 
    if (!symbol || !symbol.symbol) {
      symbol = {
        symbol: 'ETHUSD'
      }
    } else {
      symbol.symbol = symbol.symbol + 'USD'
    }
    let result = await service.getContractUnitBalanceList() 
    if (!result.code) {
      console.log({data: result.data})
      let list = result.data
      let balance = list ? list.filter(l => symbol.symbol === l.name)[0] || {} : {
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
  getUnitTradeHistory (params) {
    return request('unit/account/trade_history', params)
  },
  // 币本位财务记录
  getUnitFundHistory (params) {
    return request('unit/account/fund/history', params)
  },
  // 币本位委托历史
  getUnitOrderhistory (params) {
    return getCache('c_unitOrderhistory', () => request('unit/orderhistory', params), 1e3)
  },
  // 币本位可用余额
  getContractUnitBalanceList () {
    return getCache('contractUnitBalance', () => request('unit/account/balance/list'), 1e3)
  },
}