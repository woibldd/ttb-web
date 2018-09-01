<template>
  <div class="tv-wrap">
    <div id="tv_chart_container"></div>
    <div class="mask" :class="{show: !tvReady}">
      <v-loading></v-loading>
    </div>
  </div>
</template>

<script>
import utils from '@/modules/utils'
import configIniter from '@/libs/tradingview/config'
import datafeeder from '@/libs/tradingview/datafeeder'
import {local, state} from '@/modules/store'

// preload
const tvlib = utils.getExtModule('TradingView')

export default {
  name: 'tradingView',
  data () {
    return {
      state,
      local,
      widget: null,
      layoutOk: false,
      tvReady: false
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
      config.interval = local.interval
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
        case 'ja':
          return 'ja'
        case 'ko':
          return 'ko'
        case 'tr':
          return 'tr'
        case 'ru':
          return 'ru'
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
        vm.tvReady = true
        vm.$emit('chartReady')
        vm.widget.chart().createStudy('Moving Average', !1, !0, [7], null, {
          'Plot.color': '#43bedc',
          'Plot.linewidth': 2,
          precision: 8
        })
        vm.widget.chart().createStudy('Moving Average', !1, !0, [30], null, {
          'Plot.color': '#eebb93',
          'Plot.linewidth': 2,
          precision: 8
        })
        vm.widget.chart().onIntervalChanged().subscribe(null, function (interval) {
          local.interval = interval
        })
        vm.widget.chart().executeActionById('drawingToolbarAction')
      })
    }
  },
  computed: {
    pair () {
      return this.state.pro.pair
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
      console.log('change')
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
      console.log('change')
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
    this.$eh.$on('protrade:layout:init', this.layout)
  },
  beforeDestroy () {
    this.$eh.$off('protrade:layout:init', this.layout)
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
@import "../../styles/mixins";

#tv_chart_container {
  width: 100%;
  height: 100%;
}
.tv-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  .mask {
    @include pro-mask();
  }
}
</style>
