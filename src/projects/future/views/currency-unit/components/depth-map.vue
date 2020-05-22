<template>
  <div  
    id="depth-map"
    style="height:220px" />
</template>
<script>
// import Highcharts from 'highcharts/highcharts'
import {state} from '@/modules/store'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      state,
      loading: false
    } 
  },
  watch: {
    data: {
      immediate: true,
      handler (newValue) {
        if (!this.chart || !newValue) return
        Object.keys(newValue).map((key, index) => {
          let total = 0
          const arrData = newValue[key].map(item => {
            total += +item.values[1]
            return [+item.values[0], total]
          }).sort((a, b) => a[0] - b[0])
          this.chart.series[index].setData(arrData, false, false, true) 
        }) 
        this.chart.redraw()
      }
    }, 
    pair: {
      immediate: true, 
      async handler (pair) { 
        if (pair) {  
          this.reloadChart()  
        }
      }
    }
  },
  computed: {
    pair () {
      return this.state.unit.pair
    },
  },
  methods: {
    reloadChart() {
      this.chart = Highcharts.chart('depth-map', {
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
            color: '#F24E4D'
          },
          {
            name: 'Bids',
            data: [],
            color: '#09C989'
          }
        ]
      })
    }
  },
  mounted () {
    this.reloadChart()
  }
}
</script>
