import utils from '@/modules/utils'
import service from '@/modules/service'
import ws from '@/modules/ws'
import _ from 'lodash'
const theme = process.env.THEME_ENV

let lastTime

function getPeriod (interval) {
  return {
    1: '1m',
    5: '5m',
    15: '15m',
    30: '30m',
    60: '1h',
    120: '2h',
    240: '4h',
    360: '6h',
    720: '12h',
    'D': '1d',
    '1D': '1d',
    'W': '1w',
    '1W': '1w',
    'M': '1M',
    '1M': '1M'
  }[interval]
}
function toTick (item) {
  return {
    time: item.time,
    open: +item.values[0],
    close: +item.values[1],
    low: +item.values[2],
    high: +item.values[3],
    volume: +item.values[4]
  }
}

export default {
  onReady (resolve) {
    setTimeout(function () {
      resolve({
        supports_search: true,
        supports_group_request: false,
        supports_marks: false,
        supported_resolutions: ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M']
      })
    })
  },
  resolveSymbol: async function (name, resolve, reject) {
    let product
    let currency
    // @check
    const match = name.match(/([A-Z]*)[/_]([A-Z]*)$/)
    if (match) {
      product = match[1]
      currency = match[2]
    } else {
      reject(new Error('Invalid Symbol'))
    }
    const ticker = product + '_' + currency
    // @check end

    const res = await service.getPairInfo({pair_name: ticker})
    const scale = res.code ? 1e8 : Math.pow(10, res.data.price_scale)
    if (res.code) {
      return reject()
    }
    resolve({
      timezone: utils.getDefaultTimezone(),
      name: product + '/' + currency,
      exchange: 'IX.COM', // theme.companyName,
      ticker: ticker,
      description: 'IX.COM', // theme.exchangeName,
      type: 'bitcoin',
      session: '24x7',
      minmov: 1,
      pricescale: scale,
      has_intraday: true,
      intraday_multipliers: ['1', '5', '15', '30', '60', '240'],
      has_daily: true,
      has_weekly_and_monthly: true,
      has_no_volume: false,
      volume_precision: 3
    })
  },
  getBars: function (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
    const period = getPeriod(resolution)
    service.getQuoteHistory({
      period: period,
      pair: symbolInfo.ticker,
      begin: from * 1000,
      end: to * 1000
    }).then((res) => {
      if (res.code) {
        return onErrorCallback(new Error())
      }
      const data = _.map(res.data, toTick)
      if (data.length && firstDataRequest) {
        lastTime = _.last(data).time
      }
      onHistoryCallback(data, {noData: !data.length})
    })
  },
  subscribeBars: function (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
    const period = getPeriod(resolution)
    utils.$tvSocket && utils.$tvSocket.$destroy()
    utils.$tvSocket = ws.create(`history/${symbolInfo.ticker}/${period}`)
    utils.$tvSocket.$on('message', (data) => {
      // @fixme 改接口，不用数组
      data = data[0]
      if (!data.time || data.time < lastTime) {
        return utils.log('Wrong realtime')
      }
      lastTime = data.time
      onRealtimeCallback(toTick(data))
    })
  },
  unsubscribeBars (subscriberUID) {
    utils.log('UnsubscribeBars', subscriberUID)
    utils.$tvSocket && utils.$tvSocket.$destroy()
  },
  destroy () {
    utils.$tvSocket && utils.$tvSocket.$destroy()
  }
}
