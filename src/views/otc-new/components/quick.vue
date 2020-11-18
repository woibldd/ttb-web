<template>
  <div class="otc-quick-container">
    <div class="otc-quick-box" flex="main:left">
      <div class="coin-info">
        <div class="title">
          <icon name="btc" />
          <span>关于比特币</span>
        </div>
        <div class="box">
          <p>比特币（BitCoin）的概念最初由中本聪在2008年提出，根据中本聪的思路设计发布的开源软件以及建构其上的P2P网络。比特币</p>
          <div class="kline">
            <div id="high" class="high" :option="option" ref="lineCharts"></div>
          </div>
          <div flex>
            <div flex-box="1">
              <h6>发行时间</h6>
              <span>2014-11-26</span>
            </div>
            <div flex-box="1">
              <h6>总市值</h6>
              <span>666.66亿</span>
            </div>
            <div flex-box="1">
              <h6>历史最高价</h6>
              <span>￥6.98</span>
            </div>
          </div>
        </div>
      </div>
      <div class="trade-box">
        <div class="form">
          <div class="trade-side">
            <div @click="side=1" :class="['side', 'side-buy', {'side-active': side===1}]">购买</div>
            <div @click="side=2" :class="['side', 'side-sell', {'side-active': side===2}]">出售</div>   
          </div>
          <div class="trade-content">
            <p> asdfsssssssss</p>
            <p> asdfsssssssss</p>
            <p> asdfsssssssss</p>
            <p> asdfsssssssss</p>
            <p> asdfsssssssss</p>
            <p> asdfsssssssss</p>
            <p> asdfsssssssss</p>
            <p> asdfsssssssss</p>
            <p> asdfsssssssss</p>
            <p> asdfsssssssss</p>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import HighCharts from 'highcharts' 
import service from '@/modules/service'
export default {
  data() {
    return {
      side: 1,
    }
  },
  methods: {
     getHistory(name) {
      console.log({name})
      const to = (new Date) * 1
      const from = to - 1000 * 60 * 60 * 5 //获取5个小时的数据
      service.getQuoteHistory({
        period: '5m',
        pair: name,
        begin: from,
        end: to
      }).then((res) => {
        if (!!res && !res.code) {
          this.option.xAxis.categories=[] //x轴时间
          this.option.xAxis.labels.autoRotation=[]
          this.option.series[0].data=[]
          this.option.series[0].name=name.replace('_','/')  

          for (let i = 0; i < res.data.length; i++) {
            let t = res.data[i] 
            this.option.xAxis.categories.push(utils.dateFormatter(t.time, 'H:m'))
            this.option.xAxis.labels.autoRotation.push(-20) 
            this.option.series[0].data.push( !t.values ? 0 : parseFloat(t.values[0]))  
          } 
          let chart = HighCharts.chart("high",this.option)
        }
      })  
    },
  },
  mounted() {  
    this.getHistory('BTC_USDT') 
  },
}

</script>

<style lang="scss">
.otc-quick-container {
  // padding-top:90px;
  background-color:#F9F9F9;
  .otc-quick-box {
    .coin-info {
      width: 580px;
      margin-right: 150px;
    }
    .trade-box {
      width: 473px;
      background-color: #FFFFFF;
      .form {
          box-shadow: 0 6px 12px 0 rgba(36,58,120,.08);
        .trade-side {
          display: flex; 
          background-color: #FFFFFF;
          .side {
            &:last-child {
              margin-left: 24px;
            }
            height: 52px;
            line-height: 52px;
            background: #e9ebf2; 
            flex: 1;
            position: relative;
            text-align: center; 
            cursor: pointer;
            &.side-buy { 
              &::after {
                content: "";
                position: absolute;
                border-bottom-right-radius: 6px;
                z-index: 1;
                background: #e9ebf2;
                top: 0;
                right: -11px;
                width: 22px;
                -webkit-transform: skewX(-15deg);
                transform: skewX(-15deg);
                height: 52px;
              } 
              &.side-active{
                margin-top: -8px;
                padding-top: 8px;
                background: #fff;
                color: #1f2533;
                &::after {
                  border-bottom-right-radius: 0;
                  border-top-right-radius: 6px;
                  background: #fff;
                  height: 60px;
                  right: -13px;
                  -webkit-transform: skewX(15deg);
                  transform: skewX(15deg);
                }
              }
            }
            &.side-sell {
              &::before {
                content: "";
                position: absolute;
                border-bottom-left-radius: 6px;
                z-index: 1;
                background: #e9ebf2;
                top: 0;
                left: -10px;
                width: 22px;
                -webkit-transform: skewX(15deg);
                transform: skewX(15deg);
                height: 52px;
              }
              &.side-active {
                margin-top: -8px;
                padding-top: 8px;
                background: #fff;
                color: #1f2533;
                &::before {
                  border-bottom-left-radius: 0;
                  border-top-left-radius: 6px;
                  background: #fff;
                  height: 60px;
                  left: -12px;
                  -webkit-transform: skewX(-15deg);
                  transform: skewX(-15deg);
                }
              }
            } 
          }
        }
      }
    }
  }
}
</style>