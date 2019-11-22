<template>
  <div class="list-con">
    <div class="list-table">
      <ul class="tab-m">
        <li class="dt">交易对</li>
        <li class="dt">价格</li>
        <li class="nt">24H涨跌幅</li>
      </ul>
      <ul class="tab-m" v-for="(item, index) in market" :key="index" @click="toExchange(item.c)">
        <li>{{ item.pair }}</li>
        <li>
          {{ item.price }} USDT
          <p> ≈￥{{ item.cny }}</p>
        </li>
        <li>
          <div class="btn" :class="{low: item.h < 0,high: item.h > 0}">
            {{ item.h }}%
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ws from '@/modules/ws'
  import _ from 'lodash'
  import { symbolList } from "../../api/user"
  export default {
    data() {
      return {
        rate: 0,
        current: 'USDT',
        market: [
          {
            pair: 'BTC/USDT',
            c: 'BTC_USDT',
            h: '-',
            price: '-',
            rmb: '-'
          },
          {
            pair: 'ETH/USDT',
            c: 'ETH_USDT',
            h: '-',
            price: '-',
            rmb: '-'
          },
          {
            pair: 'EOS/USDT',
            c: 'EOS_USDT',
            h: '-',
            price: '-',
            rmb: '-'
          },
          {
            pair: 'LTC/USDT',
            c: 'LTC_USDT',
            h: '-',
            price: '-',
            rmb: '-'
          },
          {
            pair: 'BCH/USDT',
            c: 'BCH_USDT',
            h: '-',
            price: '-',
            rmb: '-'
          }
        ],
      }
    },
    methods: {
      toExchange(pair) {
        this.$router.push({
          name: 'trading',
          params: {
            pair: pair
          }
        })
      },
      patch(item) {
        const find = _.find(this.pro.pairList, pair => pair.name === item.pair)
        if (find) {
          find.price = item.current
          find.delta = this.$big(item.increment_24h).mul(100).div(this.$big(item.current).minus(item.increment_24h)).round(2, this.C.ROUND_HALF_UP).toFixed(2)
          find.vol = item.volume_24h
          find.tick = item
        }
        if (item.pair === this.pro.pair) {
          this.pro.pairTick = item
        }
      },
      async init() {
        var res = await symbolList({currency: "USDT"})
        console.log(res.data.USDT.CNY)
        this.rate = res.data.USDT.CNY
      },
      subMarket() {
        if (this.socket) {
          this.socket.$destroy()
        }
        this.socket = ws.create('market/tickers')
        this.socket.$on('message', (datas) => {
          datas.forEach(data => {
            this.market.forEach((item) => {
              if (data.pair === item.c) {
                this.$set(item, 'cny', this.$big(data.current).times(this.rate).round(2, 0).toFixed(2).toString())
                this.$set(item, 'h', this.$big(data.change_24h).round(2, 0).toFixed(2).toString())
                this.$set(item, 'price', this.$big(data.current).round(2, 0).toFixed(2).toString())
              }
            })
          })
        })
      }
    },
    destroyed() {
      if (this.socket) {
        this.socket.$destroy()
      }
    },
    async created() {
      this.subMarket()
      this.init()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .tab-m {
    display: flex;
    li {
      flex: 1;
      font-size: 14px;
      padding-bottom: 30px;
    }
    .dt {
      flex: 1;
    }
    .nt {
      flex: 0 0 0 64px;
      width: 64px;
      text-align: center;
    }
    .btn {
      width: 60px;
      height: 30px;
      text-align: center;
      color: #fff;
      line-height: 30px;
      font-size: 14px;
      margin: 0 auto;
    }
    .low {
      background: #f24e4d;
    }
    .high {
      background: #4BC384;
    }
  }
</style>
