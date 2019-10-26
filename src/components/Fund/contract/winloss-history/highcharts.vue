<template>
  <div>
    <div class="title">
      <el-radio-group 
        @change="cycleChange"
        v-model="cycleTime" 
        style="margin-bottom: 30px;">
        <el-radio-button label="7">7日</el-radio-button>
        <el-radio-button label="30">30日</el-radio-button>
        <el-radio-button label="90">90日</el-radio-button> 
      </el-radio-group> 
    </div>
    
    <div id="high" class="high" :option="option" ref="lineCharts"></div>
  </div>
</template>

<script>
import HighCharts from 'highcharts' 
import service from '@/modules/service'
export default { 
  props: {
    pair: {
      type: String,
      default: 'BTCUSD'
    }
  },
  data() {
    return {
      cycleTime: 7, 
      option: {
        chart: {
          type: "spline"
        },
        title: {
          text: ""
        },
        subtitle: {
          //text: "数据来源: WorldClimate.com"
        },
        xAxis: {
          categories: [
          ],
          crosshair: true
        },
        yAxis: {
          
          title: {
            text: ""
          }
        },
        tooltip: {
          // head + 每个 point + footer 拼接成完整的 table
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.8f} BTC</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            borderWidth: 0
          }
        },
        series: [
          {
            color: '#36D1DC',
            name: "当日已结算盈亏",
            data: [ 
            ]
          }, 
          { 
            color: '#FF6B70',
            name: "盈亏累计计算",
            data: [ 
            ]
          }
        ]
      }
    };
  }, 
  mounted() {
    HighCharts.chart("high",this.option)
  },  
  methods: {
    cycleChange() {
      this.getFundHistoryTrend()
    },
    //盈亏历史走势
    async getFundHistoryTrend() {
      const params = {
        currency: this.pair, 
        begin_time: this.cycleTime
      }    
      let res = await service.getFutureCloseRealizedDays(params) 

      if (!!res && !res.code) {
          this.option.xAxis.categories=[] //x轴时间
          this.option.series[0].data=[]
          this.option.series[1].data=[]
          let $this = this
          // res.data.forEach(t => {
          //    $this.option.categories.push(t.date)
          //    $this.option.series[0].data.push(t.realized_today || 0)
          //    $this.option.series[1].data.push(t.realized_total || 0) 
          // })

          for (let i = 0; i < res.data.length; i++) {
            let t = res.data[i]
            this.option.xAxis.categories.push(t.date)
            this.option.series[0].data.push( !t.realized_today ? 0 : parseFloat(t.realized_today))
            this.option.series[1].data.push(!t.realized_total ? 0 :  parseFloat(t.realized_total)) 
            // this.option.series[0].data.push({
            //   x: t.date,
            //   y: t.realized_today || 0
            // })
          }
          
          let chart = HighCharts.chart("high",this.option)
        }
    },
  }, 
  async created() {   
    this.getFundHistoryTrend()
  },
  watch: {
    pair() {
      this.getFundHistoryTrend()
    },
  }
};
</script> 

<style lang="scss">
.high {
  width: 1000px;
  height: 500px;
  margin: 40px auto;
}
</style>