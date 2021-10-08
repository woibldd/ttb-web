<template>
  <div class="tv-wrap"  v-loading="!tvReady">
    <div id="tv_chart_container" />
    <!-- <div :class="{show: !tvReady}" class="mask">
      <v-loading />
    </div>  -->
  </div>
</template>

<script>
import utils from '@/modules/utils'
import configIniter from '../libs/contract-config'
import datafeeder from '../libs/contract-datafeeder'
import { local, state } from '@/modules/store'
// preload
const tvlib = utils.getExtModule('TradingView')
export default {
  name: 'ContractTradingView',
  data() {
    return {
      state,
      local,
      widget: null,
      layoutOk: false,
      tvReady: false,
      entryId: '',
      hasIndicator: false
    }
  },
  computed: {
    pair() {
      return this.state.ct.pair
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
    document.addEventListener('visibilitychange',()=>{
      if(utils.$tvSocket.socket.readyState !== 1)location.reload()
    });
    this.$eh.$on('protrade:layout:init', this.layout)
  },
  beforeDestroy() {
    this.$eh.$off('protrade:layout:init', this.layout)
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
    async init (pair) {
      if (!this.pair || !this.layoutOk || this._isDestroyed) {
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
 
        widget.chart().executeActionById('drawingToolbarAction')
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
      }  
    },
    switchSkin (skin) { 
      this.init()
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
}
</style>
