<template>
  <div class="tv-wrap">
    <div
      id="tv_chart_container"
      v-loading="!tvReady" />  
  </div>
</template>

<script>
import utils from '@/modules/utils'
import configIniter from '@/libs/tradingview/contract-config'
import datafeeder from '@/libs/tradingview/blend-datafeeder'
import { local, state } from '@/modules/store'
// preload
const tvlib = utils.getExtModule('TradingView')
export default {
  name: 'ContractTradingView',
  data () {
    return {
      state,
      local,
      widget: null,
      layoutOk: false,
      tvReady: false,
      entryId: '',
      hasIndicator: false,
      ida: 0,
      idb: 0,
      idc: 0
      // pair: 'UNIT_ETH'
    }
  },
  methods: {
    layout () {
      this.layoutOk = true
      this.init()
    },
    configure () {
      const config = configIniter()
      config.symbol = this.pair
      config.interval = local.blendInterval
      config.datafeed = datafeeder
      config.locale = this.getLanguage(this.state.locale)
      return config
    },
    getLanguage (locale) {
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
    async init (pair) {
      if (!this.pair || this._isDestroyed) {
        return false
      }
      const vm = this
      const config = this.configure()

      const TradingView = await tvlib
      const Widget = TradingView.widget
      this.widget = new Widget(config)

      this.widget.onChartReady(function () {
        if (vm._isDestroyed) {
          return false
        }
        let widget = vm.widget
        vm.tvReady = true
        vm.$emit('chartReady') 
                let ida = 0
        let idb = 0
        let idc = 0
        widget.chart().createStudy('Moving Average', !1, !1, [7],
          (entryId) => { ida = entryId }, {
            'Plot.color': '#ff9500',
            'Plot.linewidth': 3,
            precision: 1
          })
        // 30 ?????????
        widget.chart().createStudy('Moving Average', !1, !1, [30],
          (entryId) => { idb = entryId }, {
            'Plot.color': '#107efa',
            'Plot.linewidth': 3,
            precision: 1
          })
        // 60 ?????????
        widget.chart().createStudy('Moving Average', !1, !1, [60],
          (entryId) => { idc = entryId }, {
            'Plot.color': '#92d5f7',
            'Plot.linewidth': 3,
            precision: 1
          })
        widget
          .chart()
          .onIntervalChanged()
          .subscribe(null, function (interval) {
            local.blendInterval = interval 
            widget.save(function(data) { 
              local.blendWidgetContent = data
            })
          })
          
        widget.chart().executeActionById('drawingToolbarAction') 
        widget.subscribe('onAutoSaveNeeded', () => {
          widget.save(function(data) { 
            local.blendWidgetContent = data
          })
        })
        widget.subscribe('drawing', () => {
          widget.save(function(data) { 
            local.blendWidgetContent = data
          })
        })
        if (local.blendWidgetContent) {
          local.blendWidgetContent.charts[0].panes[0].sources[0].state.symbol = vm.pair
          local.blendWidgetContent.charts[0].panes[0].sources[0].state.shortName = vm.pair.replace('_', '/')
          local.blendWidgetContent.charts[0].chartProperties.paneProperties.background = config.overrides['paneProperties.background']
          widget.load(local.blendWidgetContent)
        } 
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
        if (key === '1m') { // ?????????
          this.widget.chart().setResolution('1', null) // ????????????
          local.blendLineType = this.widget.chart().chartType() // ???????????????K?????????
          this.widget.chart().setChartType(2) // K??????????????????????????? 
        } else {
          this.widget.chart().setResolution(key, null) // ????????????
          this.widget.chart().setChartType(local.blendLineType) // K??????????????????????????? 
        }
        local.blendIntervalText = p
      }  
    },
    switchSkin (skin) { 
      // this.init()
      const config = this.configure()
      this.widget.addCustomCSSFile(config.custom_css_url)
      this.widget.applyOverrides(config.overrides)
      this.widget.save(function(data) { 
        local.blendWidgetContent = data
      })
    } 
  },
  computed: {
    pair () {
      return this.state.blend.pair 
    }
  },
  watch: {
    pair: {
      handler (pair, oldPair) {  
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
    'local.upDown' () {
      if (this.tvReady) {
        this.widget.remove()
      }
      datafeeder.destroy()
      this.tvReady = false
      this.$nextTick(() => {
        this.init(this.pair)
      })
    },
    'state.locale' (locale) {
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
  async created () {
    this.$eventBus.$on('protrade:layout:init', this.layout)
  },
  beforeDestroy () {
    this.$eventBus.$off('protrade:layout:init', this.layout)
  },
  destroyed () {
    if (this.tvReady) {
      this.widget.remove()
    }
    datafeeder.destroy()
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
    // background-image: url("~@/assets/logo-h.png");
    background-position: 0 0;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
