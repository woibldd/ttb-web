import utils from '@/modules/utils'
import theme from '@/modules/dynamic-theme'

export default function () {
  const themeStyle = theme.getStyle()
  const upColor = themeStyle.up
  const downColor = themeStyle.down
  return {
    timezone: utils.getDefaultTimezone(),
    autosize: true,
    // fullscreen: true,
    allow_symbol_change: true,
    container_id: 'tv_chart_container',
    library_path: utils.staticPath + 'static/charting_library/',
    locale: 'en',
    drawings_access: {
      type: 'black',
      tools: [ { name: 'Regression Trend' } ]
    },
    disabled_features: [
      'header_symbol_search',
      'header_interval_dialog_button',
      'header_settings',
      'header_compare',
      'header_undo_redo',
      'header_saveload',
      'volume_force_overlay',
      'compare_symbol',
      'context_menus',
      'header_screenshot',
      'display_market_status',
      'left_toolbar',
      'use_localstorage_for_settings'
      // 'volume_force_overlay',
      // 'use_localstorage_for_settings'
    ],
    enabled_features: [
      'adaptive_logo',
      'save_chart_properties_to_local_storage' 
      // 'charting_library_debug_mode',
      // 'seconds_resolution'
    ],
    custom_css_url: 'light-kline.css',
    studies_access: {
      type: 'black',
      tools: []
    },
    overrides: {
      'symbolWatermarkProperties.color': 'rgba(255,255,255,0)',
      'paneProperties.background': '#252525',
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
      'macd.macd.color': '#cccccc',
      'macd.signal.color': '#fdc52e',
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
    },
    charts_storage_url: 'http://saveload.tradingview.com',
    client_id: 'tradingview.com',
    user_id: 'public_user'
  }
}
