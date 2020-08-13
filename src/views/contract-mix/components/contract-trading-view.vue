<template>
  <div class="tv-wrap">
    <div
      id="tv_chart_container"
      v-loading="!tvReady" />
      <!-- <div
        class="mask"
        :class="{show: !tvReady}">
        <v-loading />
      </div> -->
    <i class="k-line-logo icon"/>
  </div>
</template>

<script>
import utils from '@/modules/utils'
import configIniter from '@/libs/tradingview/contract-config'
import datafeeder from '@/libs/tradingview/mix-datafeeder'
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
      hasIndicator: false
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
        let idc = 0
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

        let cycle = ['1m', '1', '5', '15', '30', '60'] // nav显示的周期
        let list = ['1m', '1', '3', '5', '15', '30', '60', '120', '240', '360', '720', '1D', '1W', '1M', '12M'] // 下拉列表中的全部周期
        let more = ['3', '120', '240', '360', '720', '1D', '1W', '1M', '12M'] // 下拉列表中的独有周期
        local.lineType = 1 // 默认蜡烛线
        let cycleList = []
        let cycleliList = []
        cycle.forEach(item => {
          let btn = widget
            .createButton()
            .on('click', e => {
              let element = e.srcElement || e.target
              let cls = element.classList
              if (!cls.contains('active')) {
                if (item === '1m') { // 分时线
                  widget.chart().setResolution('1', null) // 周期切换
                  local.lineType = widget.chart().chartType() // 记录当前的K线样式
                  widget.chart().setChartType(2) // K线样式切換到线形图
                  widget.chart().setEntityVisibility(ida, false) // 隐藏7 日平均线
                  widget.chart().setEntityVisibility(idb, false) // 隐藏30 日平均线
                  widget.chart().setEntityVisibility(idc, false) // 隐藏60 日平均线
                } else {
                  widget.chart().setResolution(item, null) // 周期切换
                  widget.chart().setChartType(local.lineType) // K线样式切換到线形图
                  widget.chart().setEntityVisibility(ida, true) // 隐藏7 日平均线
                  widget.chart().setEntityVisibility(idb, true) // 隐藏30 日平均线
                  widget.chart().setEntityVisibility(idc, true) // 隐藏60 日平均线
                }
                cycleList.forEach(c => {
                  c[0].classList.remove('active')
                  if (c.tag === item) {
                    c[0].classList.add('active')
                  }
                })
                cycleliList.forEach(li => {
                  li.classList.remove('active')
                  if (li.tag === item) {
                    li.classList.add('active')
                  }
                })
              }
              span.classList.remove('active')
              span.innerText = vm.$t(`tv.more`)
            })
            .append(vm.$t(`tv.${item}`))
          btn.addClass('cycle')

          btn.tag = item
          cycleList.push(btn)
        })

        let resolutions = document.createElement('div') // 时间周期菜单
        // 时间周期下拉菜单
        widget.btnFS = widget.createButton().on('click', (e, vm) => {
          let element = e.srcElement || e.target
          if (element.tagName === 'SPAN') {
            element = element.parentElement.parentElement
          } else if (element.tagName === 'DIV' && !element.classList.contains('button')) {
            element = element.parentElement
          }
          let cls = element.classList
          if (!cls.contains('selected')) {
            widget.closePopupsAndDialogs()
            element.classList.add('selected')
          } else {
            element.classList.remove('selected')
          }
        })
          .append(resolutions)

        widget.btnFS.addClass('charts-popup-d')
        let span = document.createElement('span')
        span.innerText = vm.$t(`tv.more`)
        span.classList.add('drowdownlist')
        resolutions.appendChild(span)

        if (more.indexOf(config.interval) > -1) {
          span.classList.add('active')
          span.innerText = vm.$t(`tv.${config.interval}`)
        }
        let ul = document.createElement('ul')
        list.map((item) => {
          let li = document.createElement('li')
          li.innerText = vm.$t(`tv.${item}`)
          li.tag = item
          cycleliList.push(li)

          li.addEventListener('click', function () {
            resolutions.parentElement.classList.remove('selected')
            if (item === '1m') { // 分时线
              widget.chart().setResolution('1', null) // 周期切换
              local.lineType = widget.chart().chartType() // 记录当前的K线样式
              widget.chart().setChartType(2) // K线样式切換到线形图
              widget.chart().setEntityVisibility(ida, false) // 隐藏7 日平均线
              widget.chart().setEntityVisibility(idb, false) // 隐藏30 日平均线
              widget.chart().setEntityVisibility(idc, false) // 隐藏60 日平均线
            } else {
              widget.chart().setResolution(item, null) // 周期切换
              widget.chart().setChartType(local.lineType) // K线样式切換到线形图
              widget.chart().setEntityVisibility(ida, true) // 隐藏7 日平均线
              widget.chart().setEntityVisibility(idb, true) // 隐藏30 日平均线
              widget.chart().setEntityVisibility(idc, true) // 隐藏60 日平均线
            }

            if (more.indexOf(item) > -1) {
              span.classList.add('active')
              span.innerText = vm.$t(`tv.${item}`)
            } else {
              span.classList.remove('active')
              span.innerText = vm.$t(`tv.more`)
            }
            // span.innerText = li.innerText
            cycleList.forEach(c => {
              c[0].classList.remove('active')
              if (c.tag === item) {
                c[0].classList.add('active')
              }
            })

            cycleliList.forEach(li => {
              li.classList.remove('active')
              if (li.tag === item) {
                li.classList.add('active')
              }
            })
          })
          ul.appendChild(li)
        })
        resolutions.appendChild(ul)

        cycleList.forEach(c => {
          c[0].classList.remove('active')
          if (c.tag === config.interval) {
            c[0].classList.add('active')
          }
        })
        cycleliList.forEach(li => {
          li.classList.remove('active')
          if (li.tag === config.interval) {
            li.classList.add('active')
          }
        })

        // .append(vm.$t("tradingview_line"))
        widget.btnIndicator = widget.createButton().on('click', (e, vm) => {
          // 隐藏周期列表
          resolutions.parentElement.classList.remove('selected')
          widget.closePopupsAndDialogs()
          widget.chart().executeActionById('insertIndicator') // 技术指标
        }).append(vm.$t('tv_technical_indicators'))
        widget.btnProperties = widget.createButton().on('click', (e, vm) => {
          // 隐藏周期列表
          resolutions.parentElement.classList.remove('selected')
          widget.closePopupsAndDialogs()
          widget.chart().executeActionById('chartProperties') // 样式设置
        }).append(vm.$t('tv_style'))

        widget
          .chart()
          .onIntervalChanged()
          .subscribe(null, function (interval) {
            local.interval = interval
            if (interval != '1') {
              // widget.chart().setChartType(local.lineType);
              widget.chart().setEntityVisibility(ida, true) // 显示7 日平均线
              widget.chart().setEntityVisibility(idb, true) // 显示30 日平均线
              widget.chart().setEntityVisibility(idc, true) // 显示60 日平均线
            }
          })

        // MACD
        let indicators = [
          {
            name: 'MACD_',
            text: 'MACD'
            // args: [14, 30, 'close', 9]
          },
          {
            name: 'StochRSI',
            fullname: 'Stochastic RSI',
            text: 'StochRSI'
            // args: [10]
          },
          {
            name: 'BOLL',
            fullname: 'Bollinger Bands',
            text: 'BOLL'
            // args: [20]
          }
        ]

        indicators.forEach(indicat => {
          let btn = widget
            .createButton()
            .on('click', e => {
              let element = e.srcElement || e.target
              let cls = element.classList
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
            .append(indicat.text)
          if (indicat.name === 'MACD_') {
            btn.trigger('click')
          }
        })

        // widget.chart().createStudy('MACD_', false, true)
        // widget.chart().createStudy('ShuBenRSI', false, true)

        let arr = utils.getStorageValue('ix-trading-study')
        if (!arr) {
          arr = []
        } else {
          arr = JSON.parse(arr)
        }

        arr.map(item => {
          try {
            if (item.value !== 'MACD_' && item.value !== 'Stochastic RSI' && item.value !== 'Bollinger Bands') {
              widget.chart().createStudy(
                item.value,
                !1,
                !1,
                item.args
              )
            }
          } catch (error) {
            console.log(error)
          }
        })

        widget.subscribe('study', (e) => {
          if (e.value !== 'MACD_' && e.value !== 'Stochastic RSI' && e.value !== 'Bollinger Bands') {
            arr.push(e)
            utils.setStorageValue('ixx-trading-study', JSON.stringify(arr))
          }
        })

        window.tradwgt = widget
        widget.subscribe('onAutoSaveNeeded', () => {
          let studies = tradwgt.chart().getAllStudies()
          arr.map(item => {
            let s = studies.filter(a => a.name === item.value)
            if (s.length === 0) {
              arr.splice(arr.indexOf(item), 1)
              utils.setStorageValue('ix-trading-study', JSON.stringify(arr))
            }
          })
        })

        // widget.chart().executeActionById("chartProperties") //样式设置
        // widget.chart().executeActionById("symbolSearch") //
        // widget.chart().executeActionById("insertIndicator")
        // widget.chart().executeActionById('drawingToolbarAction')
      })
    }
  },
  computed: {
    pair () {
      return this.state.mix.pair 
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
    background-image: url("~@/assets/logo-h.png");
    background-position: 0 0;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
