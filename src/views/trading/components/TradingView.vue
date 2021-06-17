<template>
  <div class="tv-wrap">
    <div id="tv_chart_container"/>
    <div
      :class="{show: !tvReady}"
      class="mask">
      <v-loading/>
    </div>
    <!-- <i class="k-line-logo icon"/> -->
  </div>
</template>

<script>
import utils from '@/modules/utils'
import configIniter from '@/libs/tradingview/config'
import datafeeder from '@/libs/tradingview/datafeeder'
import { local, state } from '@/modules/store'
// preload
const tvlib = utils.getExtModule('TradingView')
export default {
  name: 'TradingView',
  data() {
    return {
      state,
      local,
      widget: null,
      layoutOk: false,
      tvReady: false,
      entryId: '',
      hasIndicator: false,
      lineType: 1
    }
  },
  computed: {
    pair() {
      return this.state.pro.pair
    }
  },
  watch: {
    pair: {
      handler(pair, oldPair) {
        if (pair && !oldPair) {
          this.init(pair)
        }
        if (pair && oldPair) {
          if (this.tvReady) {
            return this.widget.chart().setSymbol(pair)
          }
          this.$once('chartReady', () => {
            return this.widget.chart().setSymbol(this.pair)
          })
        }
      },
      immediate: true
    },
    'local.upDown'() {
      if (this.tvReady) {
        this.widget.remove()
      }
      datafeeder.destroy()
      this.tvReady = false
      this.$nextTick(() => {
        this.init(this.pair)
      })
    },
    'state.locale'(locale) {
      // SetLanguage is bugy
      // this.widget.setLanguage(this.getLanguage(this.state.locale))
      // Reload widget
      if (this.tvReady) {
        this.widget.remove()
      }
      datafeeder.destroy()
      this.tvReady = false
      this.$nextTick(() => {
        this.init(this.pair)
      })
    }
  },
  async created() {
    this.$eh.$on('protrade:layout:init', this.layout)
    this.$eh.$on('tradingview:skin', this.switchSkin)
  },
  beforeDestroy() {
    this.$eh.$off('protrade:layout:init', this.layout)
    this.$eh.$off('tradingview:skin', this.switchSkin)
  },
  destroyed() {
    if (this.tvReady) {
      this.widget.remove()
    }
    datafeeder.destroy()
  },
  methods: {
    layout() {
      this.layoutOk = true
      this.init()
    },
    configure() {
      const config = configIniter()
      config.symbol = this.pair
      config.interval = local.interval
      config.datafeed = datafeeder
      config.locale = this.getLanguage(this.state.locale) 
      return config
    },
    getLanguage(locale) {
      switch (locale) {
        case 'zh-CN':
          return 'zh'
        case 'zh-HK':
          return 'zh_TW'
        case 'ko':
          return 'ko'
        case 'en':
        default:
          return 'en'
      }
    },
    async init(pair) {
      if (!this.pair || !this.layoutOk || this._isDestroyed) {
        return false
      }
      const vm = this
      const config = this.configure()
      const TradingView = await tvlib
      const Widget = TradingView.widget
      this.widget = new Widget(config) 
      this.widget.onChartReady(function() {  
        if (vm._isDestroyed) {
          return false
        } 
        const widget = vm.widget 
        vm.tvReady = true 
        vm.$emit('chartReady')
        // widget.chart().createStudy('Moving Average', !1, !1, [1], null, {
        //   'Plot.color': '#ff9500',
        //   'Plot.linewidth': 3,
        //   precision: 8
        // })
        // 7 日均线
        let ida = 0
        let idb = 0
        widget.chart().createStudy('Moving Average', !1, !1, [5],
          (entryId) => { ida = entryId }, {
            'Plot.color': '#ff9500',
            'Plot.linewidth': 3,
            precision: 1
          })
        // 30 日均线
        widget.chart().createStudy('Moving Average', !1, !1, [10],
          (entryId) => { idb = entryId }, {
            'Plot.color': '#107efa',
            'Plot.linewidth': 3,
            precision: 1
          })
        // 60 日均线
        const idc = 0
        widget.chart().createStudy('Moving Average', !1, !1, [20],
          (entryId) => { idb = entryId }, {
            'Plot.color': '#92d5f7',
            'Plot.linewidth': 3,
            precision: 1
          })
 
        widget
          .chart()
          .onIntervalChanged()
          .subscribe(null, function (interval) {
            local.interval = interval 
            widget.save(function(data) { 
              local.tradingWidgetContent = data
            })
          })   
  
       
        widget.subscribe('onAutoSaveNeeded', () => {
          widget.save(function(data) {  
            local.tradingWidgetContent = data
          })
        })
        widget.subscribe('drawing', () => {
          widget.save(function(data) {  
            local.tradingWidgetContent = data
          })
        }) 
        //载入和保存k线状态
        if (local.tradingWidgetContent) { 
          local.tradingWidgetContent.charts[0].panes[0].sources[0].state.symbol = vm.pair
          local.tradingWidgetContent.charts[0].panes[0].sources[0].state.shortName = vm.pair.replace('_', '/')   
          local.tradingWidgetContent.charts[0].chartProperties.paneProperties.background = config.overrides['paneProperties.background']
          widget.load(local.tradingWidgetContent)
        }  
        // widget.chart().createStudy('ShuBenRSI', false, true)
        // widget.chart().createStudy('MACDCUSTOM', false, true) 
        // widget.chart().executeActionById('drawingToolbarAction')
        
      })
    },
    handleOption(option, p) { 
      if (option === 'fullscreen') { 
        this.widget._innerWindow().chartWidget._chartWidgetCollection.startFullscreen()
      } else if (option === 'indicators') { 
        this.widget.closePopupsAndDialogs()
        this.widget.chart().executeActionById('insertIndicator') 
      } else if (option === 'drawing') { 
        this.widget.closePopupsAndDialogs()
        this.widget.chart().executeActionById('drawingToolbarAction') 
      } else if (option === 'setting') { 
        this.widget.closePopupsAndDialogs()
        this.widget.chart().executeActionById('chartProperties') 
      } else if (option === 'chartType') { 
        this.widget.chart().setChartType(+p)
      } else if (option === 'cycle') {
        let dict = this.$t('tv')
        const key = dict.cycles[p].key
        if (key === '1m') { // 分时线 
          this.widget.chart().setResolution('1', null) // 周期切换 
          local.lineType = this.widget.chart().chartType() // 记录当前的K线样式
          this.widget.chart().setChartType(2) // K线样式切換到线形图 
        } else { 
          this.widget.chart().setResolution(key, null) // 周期切换
          this.widget.chart().setChartType(local.lineType) // K线样式切換到线形图 
        } 
        local.intervalText = p
        this.widget.save(function(data) { 
          local.widgetContent = data
        })
      } else if (option === 'save') {
        this.widget.save(function(data) { 
          local.widgetContent = data
        })
      }
    },
    switchSkin (skin) {  
      const config = this.configure() 
      this.widget.addCustomCSSFile(config.custom_css_url)
      this.widget.applyOverrides(config.overrides)
      // this.widget.save(function(data) { 
      //   local.widgetContent = data
      // })
    } 

  }
}
</script>

<style lang="scss">
#tv_chart_container {
  width: 100%;
  height: 100%;
}
.tv-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  .mask {
    @include ix-mask();
  }
  .icon {
    position: absolute;
    bottom: 57px;
    left: 250px;
    width: 85px;
    height: 22px;
    background-image: url('~@/assets/ixx-k.png');
    background-position: 0 0;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
