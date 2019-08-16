<template>
  <div class="tv-wrap">
    <div id="tv_chart_container" />
    <div :class="{show: !tvReady}" class="mask">
      <v-loading />
    </div>
    <i class="k-line-logo icon"/>
  </div>
</template>

<script>
import utils from '@/modules/utils'
import configIniter from '@/libs/tradingview/contract-config'
import datafeeder from '@/libs/tradingview/contract-datafeeder'
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

        // 7 日均线
        let ida = 0
        widget.chart().createStudy(
          'Moving Average',
          !1,
          !1,
          [7],
          entryId => {
            ida = entryId
          },
          {
            'Plot.color': '#ff9500',
            'Plot.linewidth': 3,
            precision: 1
          }
        )
        // 30 日均线
        let idb = 0
        widget.chart().createStudy(
          'Moving Average',
          !1,
          !1,
          [30],
          entryId => {
            idb = entryId
          },
          {
            'Plot.color': '#107efa',
            'Plot.linewidth': 3,
            precision: 1
          }
        )
        // 60 日均线
        const idc = 0
        widget.chart().createStudy(
          'Moving Average',
          !1,
          !1,
          [60],
          entryId => {
            idb = entryId
          },
          {
            'Plot.color': '#92d5f7',
            'Plot.linewidth': 3,
            precision: 1
          }
        )

        local.lineType = 1 // 默认蜡烛线
        const resolutions = document.createElement('div') // 时间周期菜单
        // 时间周期下拉菜单
        widget.btnFS = widget.createButton().on('click', (e, vm) => {
          let element = e.srcElement || e.target
          if (element.tagName === 'SPAN') {
            element = element.parentElement.parentElement
          } else if (element.tagName === 'DIV' && !element.classList.contains('button')) {
            element = element.parentElement
          }
          const cls = element.classList
          if (!cls.contains('selected')) {
            widget.closePopupsAndDialogs()
            element.classList.add('selected')
          } else {
            element.classList.remove('selected')
          }
        })
          .append(resolutions)
        widget.btnFS.addClass('charts-popup-d')
        const span = document.createElement('span')
        span.innerText = '1分'
        resolutions.appendChild(span)

        const list = ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', '1D', '1W', '1M']
        const ul = document.createElement('ul')
        const lia = document.createElement('li')
        lia.innerText = utils.$i18n.t('tradingview_line') // 分时线
        lia.addEventListener('click', function() {
          widget.chart().setResolution('1', null) // 周期切换到一分钟
          local.lineType = widget.chart().chartType() // 记录当前的K线样式
          widget.chart().setChartType(2) // K线样式切換到线形图
          widget.chart().setEntityVisibility(ida, false) // 隐藏7 日平均线
          widget.chart().setEntityVisibility(idb, false) // 隐藏30 日平均线
          widget.chart().setEntityVisibility(idc, false) // 隐藏60 日平均线
          resolutions.parentElement.classList.remove('selected')
          span.innerText = lia.innerText
        })
        ul.appendChild(lia)
        list.map((item) => {
          const li = document.createElement('li')
          const text = ''
          if (item === '1D') {
            li.innerText = '1 ' + utils.$i18n.t('tv_down_day')
          } else if (item === '1W') {
            li.innerText = '1 ' + utils.$i18n.t('tv_down_week')
          } else if (item === '1M') {
            li.innerText = '1 ' + utils.$i18n.t('tv_down_month')
          } else if (!!Number(item) && Number(item) < 60) {
            li.innerText = item + ' ' + utils.$i18n.t('tv_down_minute')
          } else if (Number(item)) {
            li.innerText = item / 60 + ' ' + utils.$i18n.t('tv_down_hour')
          }
          if (item === config.interval) {
            span.innerText = li.innerText
          }

          li.addEventListener('click', function() {
            widget.chart().setResolution(item, null) // 周期切换到一分钟
            resolutions.parentElement.classList.remove('selected')
            if (local.lineType) {
              widget.chart().setChartType(local.lineType)
            }
            widget.chart().setEntityVisibility(ida, true) // 显示7 日平均线
            widget.chart().setEntityVisibility(idb, true) // 显示30 日平均线
            widget.chart().setEntityVisibility(idc, true) // 显示60 日平均线
            span.innerText = li.innerText
          })
          ul.appendChild(li)
        })
        resolutions.appendChild(ul)

        // .append(utils.$i18n.t("tradingview_line"))
        widget.btnIndicator = widget.createButton().on('click', (e, vm) => {
          // 隐藏周期列表
          resolutions.parentElement.classList.remove('selected')
          widget.closePopupsAndDialogs()
          widget.chart().executeActionById('insertIndicator') // 技术指标
        }).append(utils.$i18n.t('tv_technical_indicators'))
        widget.btnProperties = widget.createButton().on('click', (e, vm) => {
          // 隐藏周期列表
          console.log(222)

          resolutions.parentElement.classList.remove('selected')
          widget.closePopupsAndDialogs()
          widget.chart().executeActionById('chartProperties') // 样式设置
        }).append(utils.$i18n.t('tv_style'))

        // MACD
        widget
          .chart()
          .onIntervalChanged()
          .subscribe(null, function(interval) {
            local.interval = interval
            if (interval != '1') {
              // widget.chart().setChartType(local.lineType);
              widget.chart().setEntityVisibility(ida, true) // 显示7 日平均线
              widget.chart().setEntityVisibility(idb, true) // 显示30 日平均线
              widget.chart().setEntityVisibility(idc, true) // 显示60 日平均线

              // 移除分时线高亮
              if (widget.btnFS[0].classList.contains('selected')) {
                widget.btnFS[0].classList.remove('selected')
              }
            }
          })
        const indicators = [
          {
            name: 'MACD'
            // args: [14, 30, 'close', 9]
          },
          {
            name: 'StochRSI',
            fullname: 'Stochastic RSI'
            // args: [10]
          },
          {
            name: 'BOLL',
            fullname: 'Bollinger Bands'
            // args: [20]
          }
        ]
        indicators.forEach(indicat => {
          const btn = widget
            .createButton()
            .on('click', e => {
              const element = e.srcElement || e.target
              const cls = element.classList
              if (!cls.contains('selected')) {
                if (this.hasIndicator) {
                  widget.chart().removeEntity(this.entryId)
                  element.parentElement.parentElement
                    .querySelector('.space-single .selected')
                    .classList.remove('selected')
                }
                widget.chart().createStudy(
                  indicat.fullname || indicat.name,
                  !1,
                  !1,
                  indicat.args,
                  entryId => {
                    this.entryId = entryId
                  },
                  {
                    precision: 1
                  }
                )
                element.classList.add('selected')
                this.hasIndicator = true
              } else {
                if (!this.entryId) return
                widget.chart().removeEntity(this.entryId)
                this.entryId = ''
                this.hasIndicator = false
                element.classList.remove('selected')
              }
            })
            .append(indicat.name)
          if (indicat.name === 'MACD') {
            btn.trigger('click')
          }
        })

        // widget.chart().executeActionById("chartProperties") //样式设置
        // widget.chart().executeActionById("symbolSearch") //
        // widget.chart().executeActionById("insertIndicator")
        // widget.chart().executeActionById('drawingToolbarAction')
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
  .icon {
    position: absolute;
    bottom: 57px;
    left: 250px;
    width: 85px;
    height: 22px;
    background-image: url("~@/assets/ixx-k.png");
    background-position: 0 0;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
