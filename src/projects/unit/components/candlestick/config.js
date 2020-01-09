// import { getBars } from '@/api/contract'
// getSymbolList
import { getKlineHistoryList } from '../../api/contract'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { mapPeriod, upColor, downColor, WSURL } from '../../const'

const wsurl = process.env.VUE_APP_WS_API
const mapItemFun = item => ({
  time: +item.time,
  open: +item.values[0],
  close: +item.values[1],
  low: +item.values[2],
  high: +item.values[3],
  volume: +item.values[4]
})
// import { upColor, downColor } from '@/const'
const udf_datafeed = {
  onReady: cb => {
    setTimeout(() => cb({
      supports_search: true,
      supports_group_request: false,
      supports_marks: false,
      // supported_resolutions: ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', '1D', '1W', '1M']
      supported_resolutions: ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', '1D', '1W', '1M']
    }))
  },
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {},

  resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
    // getSymbolList().then(res => {
    //   console.log(res)
    // })
    // var split_data = symbolName.split(/[:/]/)
    var symbol_stub = {
      name: symbolName,
      description: '',
      type: 'crypto',
      session: '24x7',
      timezone: 'America/New_York',
      ticker: symbolName,
      minmov: 1,
      pricescale: 100,
      has_intraday: true,
      intraday_multipliers: ['1', '60'],
      supported_resolution: ['1', '3', '5', '15', '30', '60', '120', '240', 'D'],
      volume_precision: 8,
      data_status: 'streaming'
    }

    // if (split_data[2].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
    //   symbol_stub.pricescale = 100
    // }

    setTimeout(function () {
      onSymbolResolvedCallback(symbol_stub)
    }, 0)
  },

  getBars: (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
    // Vue.prototype.$eventBus.$emit('getBars', { mapItemFun, symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest })
    console.log(new Date(from * 1000), new Date(to * 1000))
    const [period, begin, end] = [mapPeriod[resolution], from * 1000, to * 1000]
    getKlineHistoryList(symbolInfo.name, { period, begin, end }).then(res => {
      const data = res.data.map(mapItemFun)
      return onHistoryCallback(data, { noData: !data.length })
    })
  },
  subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
    const websocket = new ReconnectingWebSocket(`${wsurl}/history/${symbolInfo.ticker}/${mapPeriod[resolution]}`)
    websocket.onmessage = e => {
      const obj = JSON.parse(e.data).data[0]
      onRealtimeCallback(mapItemFun(obj))
    }
    // const period = getPeriod(resolution)
    // utils.$tvSocket && utils.$tvSocket.$destroy()
    // utils.$tvSocket = ws.create(`history/${symbolInfo.ticker}/${period}`)
    // utils.$tvSocket.$on('message', (data) => {
    //   // @fixme 改接口，不用数组
    //   data = data[0]
    //   if (!data.time || data.time < lastTime) {
    //     return utils.log('Wrong realtime')
    //   }
    //   lastTime = data.time
    //   onRealtimeCallback(toTick(data))
    // })
  },

  unsubscribeBars: subscriberUID => {},

  /* 可选方法 */

  getServerTime: cb => {},

  calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {},

  getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {},

  getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {}
}
export const widgetOptions = {
  debug: false,
  datafeed: udf_datafeed, // our datafeed object
  interval: '15',
  container_id: 'tv_chart_container',
  library_path: '/static/charting_library/',
  locale: 'zh',
  disabled_features: ['use_localstorage_for_settings'],
  enabled_features: [],
  client_id: 'test',
  user_id: 'public_user_id',
  fullscreen: false,
  autosize: true,
  toolbar_bg: '#1c273e',
  custom_css_url: '/static/charting_library/tradingView.css',
  overrides: {
    'symbolWatermarkProperties.color': 'rgba(0, 0, 0, 0)',
    'paneProperties.background': '#0c1222',
    'paneProperties.vertGridProperties.color': 'rgba(210, 217, 229, 0.06)',
    'paneProperties.horzGridProperties.color': 'rgba(210, 217, 229, 0.06)',
    'paneProperties.crossHairProperties.color': 'rgb(210, 217, 229)',
    'paneProperties.legendProperties.showStudyArguments': true,
    'paneProperties.legendProperties.showStudyTitles': true,
    'paneProperties.legendProperties.showStudyValues': true,
    'paneProperties.legendProperties.showSeriesTitle': false,
    'paneProperties.legendProperties.showSeriesOHLC': true,
    // 'paneProperties.legendProperties.showLegend': false,
    'paneProperties.topMargin': 8,
    'paneProperties.bottomMargin': 18,
    'scalesProperties.lineColor': 'rgba(210, 217, 229, 0.06)',
    'scalesProperties.textColor': 'rgb(210, 217, 229)',
    'mainSeriesProperties.barStyle.upColor': upColor,
    'mainSeriesProperties.barStyle.downColor': downColor,
    'mainSeriesProperties.candleStyle.upColor': upColor,
    'mainSeriesProperties.candleStyle.downColor': downColor,
    'mainSeriesProperties.candleStyle.drawBorder': false,
    'mainSeriesProperties.candleStyle.borderUpColor': upColor,
    'mainSeriesProperties.candleStyle.borderDownColor': downColor,
    'mainSeriesProperties.candleStyle.wickUpColor': upColor,
    'mainSeriesProperties.candleStyle.wickDownColor': downColor,
    'mainSeriesProperties.hollowCandleStyle.upColor': upColor,
    'mainSeriesProperties.hollowCandleStyle.downColor': downColor,
    'mainSeriesProperties.hollowCandleStyle.borderUpColor': upColor,
    'mainSeriesProperties.hollowCandleStyle.borderDownColor': downColor,
    'mainSeriesProperties.hollowCandleStyle.wickUpColor': upColor,
    'mainSeriesProperties.hollowCandleStyle.wickDownColor': downColor,
    'mainSeriesProperties.lineStyle.color': 'rgb(42, 159, 248)',
    'mainSeriesProperties.areaStyle.color1': 'rgba(42, 159, 248, 0.4)',
    'mainSeriesProperties.areaStyle.color2': 'rgb(42, 159, 248)',
    'mainSeriesProperties.areaStyle.linecolor': 'rgb(42, 159, 248)'
  },
  studies_overrides: {
    'volume.volume.color.0': downColor,
    'volume.volume.color.1': upColor,
    'volume.volume.transparency': 80,
    'volume.volume ma.transparency': 80,
    'volume.volume ma.linewidth': 2,
    'volume.volume ma.plottype': 'line',
    'volume.show ma': true,
    'macd.macd.color': '#ff9500',
    'macd.signal.color': '#107efa',
    'macd.histogram.color': upColor,
    'bb.Upper.color': upColor,
    'bb.Lower.color': downColor,
    'bb.Median.color': '#cccccc',
    'bb.Plots Background.color': '#ccc',
    'Stoch RSI.%K.color': upColor,
    'Stoch RSI.%D.color': downColor,
    'Stoch RSI.Hlines Background.color': '#fff',
    'Stoch RSI.Hlines Background.transparency': 90,
    // 'volume.show macd': true,
    'volume.options.showStudyArguments': true
  }
  // overrides: {
  //   'paneProperties.background': '#131722',
  //   'paneProperties.vertGridProperties.color': '#363c4e',
  //   'paneProperties.horzGridProperties.color': '#363c4e',
  //   'symbolWatermarkProperties.transparency': 90,
  //   'scalesProperties.textColor': '#AAA',
  //   'mainSeriesProperties.candleStyle.wickUpColor': '#336854',
  //   'mainSeriesProperties.candleStyle.wickDownColor': '#7f323f',
  //   'mainSeriesProperties.lineStyle.color': 'rgb(42, 159, 248)',
  //   'mainSeriesProperties.areaStyle.color1': 'rgba(42, 159, 248, 0.4)',
  //   'mainSeriesProperties.areaStyle.color2': 'rgb(42, 159, 248)',
  //   'mainSeriesProperties.areaStyle.linecolor': 'rgb(42, 159, 248)'
  // }
}
