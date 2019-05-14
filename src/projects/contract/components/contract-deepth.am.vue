<template>
  <div class="deepth-container">
    <div class="ix-pannel">
      <div class="ix-header">
        {{ $t('orderbook_depth_title') }}
      </div>
      <div class="ix-pannel-body relative">
        <div class="book-depth-container">
          <div
            id="depth-chart"
            class="depth-chart"/>
        </div>
        <div
          class="mask"
          :class="{show: loading}">
          <v-loading/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {state} from '@/modules/store'
import service from '@/modules/service'
import throttle from 'lodash/throttle'
import utils from '@/modules/utils'
import isEmtpy from 'lodash/isEmpty'
export default {
  name: 'ContractDeepth',
  components: {
  },
  watch: {
    pair: {
      immediate: false,
      async handler (pair) {
        if (pair) {
          this.loading = true
          setTimeout(() => {
            this.initChart()
          }, 1000)
        }
      }
    }
  },
  data () {
    return {
      state,
      chart: null,
      xAxis: null,
      loading: true
    }
  },
  computed: {
    pair () {
      return this.state.ct.pair
    },
    priceScale () {
      let scale = _.get(this, 'state.ct.pairInfo.price_scale', 4) - this.offset
      if (this.offset !== 0 && this.accuracy === 2) {
        scale += 1
      }
      return utils.unsign(scale)
    }
  },
  async created () {
    this.initChart()
    this.fetch()
    this.$eh.$on('protrade:orderbook:update', throttle(this.updateData, 10000))
  },
  methods: {
    _getDataSourceUrl () {
      let pair = this.pair || 'FUTURE_BTCUSD'
      if (pair) {
        return `https://q.ixex.io/v1/orderbook/${pair}?offset=0&accuracy=1&size=20`
      }
    },
    _parseData (resp) {
      let data = resp.data
      if (isEmtpy(data) || (!data.bids || !data.asks)) {
        this.loading = false
        return
      }
      data = {
        bids: data.bids.map(item => item.values),
        asks: data.asks.map(item => item.values)
      }
      // Function to process (sort and calculate cummulative volume)
      function processData (list, type, desc) {
        // Convert to data points
        for (var i = 0; i < list.length; i++) {
          list[i] = {
            value: Number(list[i][0]),
            volume: Number(list[i][1])
          }
        }

        // Sort list just in case
        list.sort(function (a, b) {
          if (a.value > b.value) {
            return 1
          } else if (a.value < b.value) {
            return -1
          } else {
            return 0
          }
        })

        // Calculate cummulative volume
        if (desc) {
          for (let i = list.length - 1; i >= 0; i--) {
            if (i < (list.length - 1)) {
              list[i].totalvolume = list[i + 1].totalvolume + list[i].volume
            } else {
              list[i].totalvolume = list[i].volume
            }
            let dp = {}
            dp['value'] = list[i].value
            dp[type + 'volume'] = list[i].volume
            dp[type + 'totalvolume'] = list[i].totalvolume
            res.unshift(dp)
          }
        } else {
          for (let i = 0; i < list.length; i++) {
            if (i > 0) {
              list[i].totalvolume = list[i - 1].totalvolume + list[i].volume
            } else {
              list[i].totalvolume = list[i].volume
            }
            let dp = {}
            dp['value'] = list[i].value
            dp[type + 'volume'] = list[i].volume
            dp[type + 'totalvolume'] = list[i].totalvolume
            res.push(dp)
          }
        }
      }

      // Init
      let res = []
      processData(data.bids, 'bids', true)
      processData(data.asks, 'asks', false)
      if (this.xAxis) {
        // let tickCount = (data.asks[data.asks.length - 1].value - data.bids[0].value)
        // if (tickCount)
        // this.xAxis.renderer.minGridDistance =
        // console.log(this.xAxis.renderer.minGridDistance)
      }
      this.loading = false
      return res
    },
    async initChart () {
      let am4core = await import(/* webpackChunkName: "amchart" */'@amcharts/amcharts4/core')
      let am4charts = await import(/* webpackChunkName: "amchart" */'@amcharts/amcharts4/charts')
      let chart = am4core.create('depth-chart', am4charts.XYChart)
      this.chart = chart
      chart.fontSize  = 10
      chart.fontWeight  = 200
      chart.fontFamily  = 'Airal'
      chart.dataSource.url = this._getDataSourceUrl()
      // chart.dataSource.reloadFrequency = 10000
      chart.dataSource.adapter.add('parsedData', this._parseData)

      // Set up precision for numbers
      // chart.numberFormatter.numberFormat = '##.####a'

      // Create axes
      let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      this.xAxis = xAxis
      xAxis.dataFields.category = 'value'
      xAxis.renderer.grid.template.location = 0;
      // xAxis.renderer.minGridDistance = 100
      xAxis.stroke = am4core.color('#fff')
      xAxis.strokeWidth = 0.5;
      // xAxis.strokeWidth = 1
      xAxis.title.text = ''
      xAxis.numberFormatter = new am4core.NumberFormatter()
      xAxis.numberFormatter.numberFormat = '###.########'
      // xAxis.numberFormatter.numberFormat = '#,###.####ae'

      let yAxis = chart.yAxes.push(new am4charts.ValueAxis())
      yAxis.title.text = ''
      yAxis.stroke = am4core.color('#fff')
      yAxis.strokeWidth = 0.5;
      yAxis.numberFormatter = new am4core.NumberFormatter()
      yAxis.numberFormatter.numberFormat = '###.##a'
      // yAxis.numberFormatter.numberFormat = '#,###.####'
      // yAxis.align = am4core.a

      // Create series
      let series = chart.series.push(new am4charts.StepLineSeries())
      series.dataFields.categoryX = 'value'
      series.dataFields.valueY = 'bidstotalvolume'
      series.strokeWidth = 2
      series.stroke = am4core.color('#09C989')
      series.fill = series.stroke
      series.fillOpacity = 0.1

      // series.tooltip.getFillFromObject = false
      // series.tooltip.label.fill = am4core.color('#fff');
      // series.tooltip.background.fill = am4core.color('#fff')
      // series.tooltip.background.strokeWidth = 0
      // series.tooltip.background.cornerRadius = 3
      // series.tooltip.background.pointerLength = 0
      // series.tooltip.dy = 5

      series.tooltipText = `${this.$t('contract_tooltip_price')}: {categoryX} \n ${this.$t('contract_tooltip_addons')}: {valueY.formatNumber('#,###.####')}` // 'Ask: [bold]{categoryX}[/]\nTotal volume: [bold]{valueY}[/]\nVolume: [bold]{bidsvolume}[/]'
      console.log(series)
      let series2 = chart.series.push(new am4charts.StepLineSeries())
      series2.dataFields.categoryX = 'value'
      series2.dataFields.valueY = 'askstotalvolume'
      series2.strokeWidth = 2
      series2.stroke = am4core.color('#f5222d')
      series2.fill = series2.stroke
      series2.fillOpacity = 0.1
      series2.tooltipText = `${this.$t('contract_tooltip_price')}: {categoryX} \n ${this.$t('contract_tooltip_addons')}: {valueY.formatNumber('#,###.####')}` // 'Ask: [bold]{categoryX}[/]\nTotal volume: [bold]{valueY}[/]\nVolume: [bold]{asksvolume}[/]'
      // series2.tooltip.background.fill = am4core.color('#fff')
      // series2.tooltip.background.strokeWidth = 0
      // series2.tooltip.background.cornerRadius = 3
      // series2.tooltip.background.pointerLength = 0

      // let series3 = chart.series.push(new am4charts.ColumnSeries())
      // series3.dataFields.categoryX = 'value'
      // series3.dataFields.valueY = 'bidsvolume'
      // series3.strokeWidth = 0
      // series3.fill = am4core.color('#fff')
      // series3.fillOpacity = 0.2

      // let series4 = chart.series.push(new am4charts.ColumnSeries())
      // series4.dataFields.categoryX = 'value'
      // series4.dataFields.valueY = 'asksvolume'
      // series4.strokeWidth = 0
      // series4.fill = am4core.color('#fff')
      // series4.fillOpacity = 0.2

      // Add cursor
      chart.cursor = new am4charts.XYCursor()
    },
    updateData (data) {
      if (this.chart) {
        this.chart.data = this._parseData(data)
      }
    },
    fetch () {
      let pair = this.pair || 'BTC_USDT'
      service.getQuoteOrderbook({
        pair: pair,
        offset: 0,
        accuracy: 1,
        size: 20
      }).then(resp => {
        if (this.chart) {
          this.chart.data = this._parseData(resp)
        }
      })
    }
  },
  props: {},
  destroyed () {
    this.$eh.$off('protrade:orderbook:update', this.updateData)
    this.chart = null
  }
}
</script>
<style>
.ampopup-content{
  display: none!important;
}
.ampopup-curtain{
  display: none!important;
}
</style>
<style lang="scss" scoped>

.deepth-container {
  display: flex;
  height: 100%;
  flex: 1;
  .ix-pannel {
    height: 100%;
    .ix-pannel-body {
      height: 100%;
      .book-depth-container {
          height: 191px;  // 看着页面调整的,要对齐
        .depth-chart {
          height: 100%;
        }
      }
      .mask {
        @include ix-mask();
        background-color: transparent;
      }
    }
  }
}
</style>
