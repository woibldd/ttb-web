let timer
let lastTime
let point
let minus
let plus
let high
let low
let close

export default {
  onReady: function (resolve) {
    setTimeout(function () {
      resolve({
        supports_search: true,
        supports_group_request: false,
        supports_marks: false,
        supported_resolutions: ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M']
      })
    }, 0)
  },
  resolveSymbol: function (name, resolve, reject) {
    const scale = /_USDT/.test(name) ? 100 : 1e6
    setTimeout(function () {
      resolve({
        name,
        exchange: 'Thinkbit',
        ticker: name,
        description: name,
        type: 'bitcoin',
        session: '24x7',
        timezone: 'Asia/Shanghai',
        minmov: 1,
        pricescale: scale,
        has_intraday: true,
        intraday_multipliers: ['1', '5', '15', '30', '60', '240'],
        has_no_volume: true
      })
    }, 0)
  },
  getBars: function (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
    setTimeout(function () {
      if (firstDataRequest) {
        var data = []
        point = 100
        var interval = resolution === 'D' ? 24 * 36e5 : resolution * 60000
        if (resolution === '1D') {
          interval = 24 * 36e5
        }
        if (resolution === '1W') {
          interval = 7 * 24 * 36e5
        }
        if (resolution === '1M') {
          interval = 30 * 7 * 24 * 36e5
        }
        for (var start = from * 1000; start < to * 1000; start += interval) {
          minus = Math.random() * 5
          plus = Math.random() * 8
          high = point + plus
          low = point - minus
          close = low + (minus + plus) * Math.random()
          data.push({
            time: start,
            open: point,
            high: high,
            low: low,
            close: close,
            volume: Math.random() * 1e4
          })
          lastTime = start
          point = close
        }
        onHistoryCallback(data, {noData: true})
      }
    }, 0)
  },
  subscribeBars: function (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
    var times = 0
    timer = setInterval(function () {
      times += 1
      if (times > 10) {
        times = 0
        lastTime += 15000 * 60
        point = close
        close = point
        high = point
        low = point
      } else {
        close = close + (Math.random() * 5 - 2.5)
        if (close > high) {
          high = close
        }
        if (close < low) {
          low = close
        }
      }
      onRealtimeCallback({
        time: lastTime,
        open: point,
        low: low,
        high: high,
        close: close,
        volume: Math.random() * 1e4
      })
    }, 500)
  },
  unsubscribeBars (subscriberUID) {
    clearTimeout(timer)
  }
}
