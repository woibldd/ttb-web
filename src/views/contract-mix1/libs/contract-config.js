import utils from '@/modules/utils'
import {state} from '@/modules/store'
import theme from '@/modules/dynamic-theme'  

export default function () {
  const themeStyle = theme.getStyle()
  const upColor = themeStyle.up
  const downColor = themeStyle.down
 
  const myStyle = {
    dark: {
      background: '#151518',
      cssUrl: 'klinev1.css',
      color: 'rgb(210, 217, 229)'
    },
    light: {
      background: '#FFFFFF',
      cssUrl: 'klinev-light.css',
      color: '#7A8590'
    }
  }
 
  // let curStyle = myStyle[process.env.THEME_ENV.tvStyle]
  let curStyle = myStyle[state.skin] 

  return {
    // auto_save_delay: 5,
    // debug: true,
    // load_last_chart: true,
    indicators_file_name: 'customIndex.js',
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
      'header_chart_type', //K线样式
      'header_indicators', //技术指标
      'header_fullscreen_button', //全屏
      'header_resolutions', //时间周期
      'header_compare',
      'header_undo_redo',
      'volume_force_overlay',
      'header_saveload',
      'compare_symbol',
      'context_menus',
      'header_screenshot',
      'display_market_status',
      //'left_toolbar',
      'use_localstorage_for_settings', 
      'timeframes_toolbar'
      // 'volume_force_overlay',

    ],
    enabled_features: [
      'adaptive_logo', 
      'charting_library_debug_mode',
      // 'seconds_resolution'
    ],
    custom_css_url: curStyle.cssUrl,
    studies_access: {
      type: 'black',
      tools: []
    },
    overrides: {
      'symbolWatermarkProperties.color': 'rgba(255,255,255,0)',
      'paneProperties.background': curStyle.background,
      'paneProperties.vertGridProperties.color': 'rgba(210, 217, 229, 0.06)',
      'paneProperties.horzGridProperties.color': 'rgba(210, 217, 229, 0.06)',
      'paneProperties.crossHairProperties.color': curStyle.color,
      'paneProperties.legendProperties.showStudyArguments': true,
      'paneProperties.legendProperties.showStudyTitles': true,
      'paneProperties.legendProperties.showStudyValues': true,
      'paneProperties.legendProperties.showSeriesTitle': false,
      'paneProperties.legendProperties.showSeriesOHLC': true,
      // 'paneProperties.legendProperties.showLegend': false,
      'paneProperties.topMargin': 8,
      'paneProperties.bottomMargin': 18,
      'scalesProperties.lineColor': 'rgba(210, 217, 229, 0.06)',
      'scalesProperties.textColor':  curStyle.color,
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
      'volume.volume.transparency': 50,
      'volume.volume ma.transparency': 50,
      'volume.volume ma.linewidth': 2,
      'volume.volume ma.plottype': 'line',
      'volume.show ma': true, 
      'volume.options.showLastValue': false,
      'volume.options.showStudyArguments': true,
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
    },
    charts_storage_url: 'http://saveload.tradingview.com',
    client_id: 'tradingview.com',
    user_id: 'public_user'
  }
}
