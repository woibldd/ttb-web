<template>
  <div class="tv-wrap">
    <div id="tv_chart_container"/>
    <div
      :class="{show: !tvReady}"
      class="mask">
      <v-loading/>
    </div>
  </div>
</template>

<script>
import utils from '@/modules/utils'
import configIniter from '@/libs/tradingview/contract-index-config'
import datafeeder from '@/libs/tradingview/contract-o-datafeeder'
import { local, state } from '@/modules/store'
// preload
const tvlib = utils.getExtModule('TradingView')
export default {
  name: 'TradingView',
  props: {
    pair: {
      type: String,
      default: 'BTC_USDT'
    }
  },
  data() {
    return {
      state,
      local,
      widget: null,
      tvReady: false,
      entryId: '',
      hasIndicator: false
    }
  },
  watch: {
    pair: {
      handler(pair, oldPair) {
        if (pair && !oldPair) {
          this.init(pair)
        }
        if (pair && oldPair) {
          // this.$destroy()
          // this.init(pair)
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
  },
  beforeDestroy() {
  },
  destroyed() {
    if (this.tvReady) {
      this.widget.remove()
    }
    datafeeder.destroy()
  },
  methods: {
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
      if (!this.pair || this._isDestroyed) {
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

        // 7 日均线
        widget.chart().createStudy('Moving Average', !1, !1, [7], null, {
          'Plot.color': '#cccccc',
          'Plot.linewidth': 3,
          precision: 8
        })
        // 30 日均线
        widget.chart().createStudy('Moving Average', !1, !1, [30], null, {
          'Plot.color': '#fdc52e',
          'Plot.linewidth': 3,
          precision: 8
        })
        // MACD
        widget.chart().onIntervalChanged().subscribe(null, function(interval) {
          local.interval = interval
        })
        const indicators = [
          {
            name: 'MACD'
            // args: [14, 30, 'close', 9]
          }, {
            name: 'StochRSI',
            fullname: 'Stochastic RSI'
            // args: [10]
          }, {
            name: 'BOLL',
            fullname: 'Bollinger Bands'
            // args: [20]
          }]
        indicators.forEach(indicat => {
          const btn = widget.createButton().on('click', (e) => {
            const element = e.srcElement || e.target
            const cls = element.classList
            if (!cls.contains('selected')) {
              if (this.hasIndicator) {
                widget.chart().removeEntity(this.entryId)
                element.parentElement.parentElement.querySelector('.space-single .selected').classList.remove('selected')
              }
              widget.chart().createStudy(indicat.fullname || indicat.name, !1, !1, indicat.args, (entryId) => {
                this.entryId = entryId
              }, {
                precision: 8
              })
              element.classList.add('selected')
              this.hasIndicator = true
            } else {
              if (!this.entryId) return
              widget.chart().removeEntity(this.entryId)
              this.entryId = ''
              this.hasIndicator = false
              element.classList.remove('selected')
            }
          }).append(indicat.name)
          if (indicat.name === 'MACD') {
            btn.trigger('click')
          }
        })

        // widget.chart().createStudy(indicators[0].name, !1, !1, indicators[0].args, (entryId) => {
        //   this.entryId = entryId
        //   this.hasIndicator = true
        // })

        widget.chart().executeActionById('drawingToolbarAction')
      })
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
