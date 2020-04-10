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
import Highcharts from 'highcharts/highcharts'
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
          this.reloadChart() 
          setTimeout(() => { 
            // this.loading = false
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
    this.fetch()
    this.$eh.$on('protrade:orderbook:update', throttle(this.updateData, 500))
  },
  methods: { 
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
          res[0] = []
          for (let i = list.length - 1; i >= 0; i--) {
            if (i < (list.length - 1)) {
              list[i].totalvolume = list[i + 1].totalvolume + list[i].volume
            } else {
              list[i].totalvolume = list[i].volume
            }
            let dp = {}
            // dp['value'] = list[i].value
            // dp[type + 'volume'] = list[i].volume
            // dp[type + 'totalvolume'] = list[i].totalvolume
            // res.unshift(dp)
            res[0].unshift([list[i].value, list[i].totalvolume])
          }
        } else {
          res[1] = []
          for (let i = 0; i < list.length; i++) {
            if (i > 0) {
              list[i].totalvolume = list[i - 1].totalvolume + list[i].volume
            } else {
              list[i].totalvolume = list[i].volume
            }
            let dp = {}
            // dp['value'] = list[i].value
            // dp[type + 'volume'] = list[i].volume
            // dp[type + 'totalvolume'] = list[i].totalvolume
            // res.push(dp)
            res[1].push([list[i].value, list[i].totalvolume])
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
    updateData (data) {
      if (this.chart) {   
        const list = this._parseData(data)
        this.chart.series[0].setData(list[0], false, false, true)
        this.chart.series[1].setData(list[1], false, false, true) 
        this.chart.redraw() 
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
          const list = this._parseData(resp)  
          this.chart.series[0].setData(list[0], false, false, true)
          this.chart.series[1].setData(list[1], false, false, true)
          this.chart.redraw()
        }
      })
    },
    reloadChart () {
      this.chart = Highcharts.chart('depth-chart', {
        chart: {
          type: 'area',
          zoomType: 'xy',
          backgroundColor: 'transparent'
        },
        credits: {
          enabled: false
        },
        title: {
          text: ''
        },
        legend: {
          enabled: false
        },

        xAxis: {
          minPadding: 0,
          maxPadding: 0,
          gridLineColor: 'rgba(167, 174, 196, 0.1)',
          gridLineWidth: 1,
          tickPosition: 'inside',
          tickPixelInterval: 100
        },
        yAxis: [{
          lineWidth: 1,
          gridLineColor: 'rgba(167, 174, 196, 0.1)',
          gridLineWidth: 1,
          title: null,
          tickWidth: 1,
          tickLength: 5,
          tickPosition: 'inside',
          labels: {
            align: 'left',
            x: 8
          }
        }, {
          opposite: true,
          linkedTo: 0,
          gridLineColor: 'rgba(167, 174, 196, 0.1)',
          gridLineWidth: 1,
          title: null,
          tickWidth: 1,
          tickLength: 5,
          tickPosition: 'inside',
          labels: {
            align: 'right',
            x: -8
          }
        }],
        plotOptions: {
          area: {
            fillOpacity: 0.2,
            lineWidth: 1,
            step: 'center',
            enabled: false
          },
          series: {
            marker: {
              enabled: false
            }
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
          valueDecimals: 2
        },
        series: [
          {
            name: 'Asks',
            data: [],
            color: '#09C989'
          },
          {
            name: 'Bids',
            data: [],
            color: '#F24E4D'
          }
        ]
      })
    }
  },
  props: {},
  destroyed () {
    this.$eh.$off('protrade:orderbook:update', this.updateData)
    this.chart = null
  },
  mounted () {
    this.reloadChart()
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
