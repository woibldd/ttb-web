<template>
  <div class="trading-chart" ref="wrap">
    <v-nav pro="1"></v-nav>
    <div class="container-trade-panel">
      <div class="ix-row">
        <div class="ix-col ix-col-1">
          <div class="ix-grid ix-grid-pairnav" ref="gridPairNav">
            <PairNav ref="PairNav"></PairNav>
          </div>
          <div class="ix-grid ix-grid-deal" ref="gridDeal">
            <Deal ref="Deal"></Deal>
          </div>
        </div>
        <div class="ix-col ix-col-2">
          <div class="ix-grid ix-grid-tv" ref="gridTradingView">
            <TradingView ref="TradingView"></TradingView>
            <div class="active-box" v-if="showCountdown">
              <p class="text">据获奖者产生剩余：<span class="seconds">{{countdownText}}</span>秒</p>
              <span class="link">活动规则</span>
            </div>
          </div>
        </div>
        <div class="ix-col ix-col-3">
          <div class="ix-grid ix-grid-orderbook" ref="gridOrderbook">
            <Orderbook ref="Orderbook"></Orderbook>
          </div>
        </div>
      </div>
      <div class="ix-row">
        <div class="ix-grid ix-grid-order" ref="gridOrder">
          <Order ref="Order"></Order>
        </div>
        <div class="ix-grid ix-grid-operate" ref="gridOperate">
          <Operate ref="Operate"></Operate>
        </div>
      </div>
      <!-- <div class="ix-row">
        <div class="ix-grid ix-grid-intro" ref="gridIntro">
          <intro></intro>
        </div>
      </div> -->
    </div>
    <order-deal-popover />
  </div>
</template>

<script>
import _ from 'lodash'
import {local, state} from '@/modules/store'
import service from '@/modules/service'
import utils from '@/modules/utils'

import VNav from '@/components/VNav2'
import TradingView from '@/components/Trading/TradingView'
import Order from '@/components/Trading/Order'
import Deal from '@/components/Trading/Deal'
// import DepthChart from '@/components/DepthChart'
import Orderbook from '../components/Trading/Orderbook'
import PairNav from '@/components/Trading/PairNav'
import Operate from '@/components/Trading/Operate'
import OrderDealPopover from '@/components/Trading/OrderDealPopover'
import Intro from '@/components/Trading/Intro'

export default {
  name: 'trading',
  components: {
    VNav,
    OrderDealPopover,
    TradingView,
    Order,
    Deal,
    Intro,
    // DepthChart,
    Orderbook,
    PairNav,
    Operate
  },
  data () {
    return {
      state,
      comps: [],
      showCountdown: false,
      countdownTimer: 0,
      countdownText: '20',
      lastDealTime: 0
    }
  },
  watch: {
    '$route.params.pair': {
      async handler (pair = '') {
        this.state.pro.lock = true
        const match = pair.match(/^([A-Z]*)_([A-Z]*)$/)
        if (match) {
          this.state.pro.pair = pair
          local.pair = pair
          const [product, currency] = match.slice(1, 3)
          this.state.pro.product_name = product
          this.state.pro.currency_name = currency
          const res = await service.getPairInfo({symbol: pair})
          if (!res.code) {
            this.state.pro.pairInfo = res.data
          } else {
            this.state.pro.pairInfo = null
          }
          await this.refreshBalance()
        }
        this.state.pro.lock = false
      },
      immediate: true
    }
  },
  methods: {
    async refreshBalance () {
      const product = this.state.pro.product_name
      const currency = this.state.pro.currency_name
      if (this.state.pro.product && this.state.pro.product.currency_name !== product) {
        this.state.pro.product = null
      }
      if (this.state.pro.currency && this.state.pro.currency.currency_name !== currency) {
        this.state.pro.currency = null
      }
      const [resc, resp] = await Promise.all([
        service.getBalanceInfo({currency_name: currency}),
        service.getBalanceInfo({currency_name: product})
      ])
      if (!resc.code && !resp.code && product === this.state.pro.product_name && currency === this.state.pro.currency_name) {
        this.state.pro.product = resp.data
        this.state.pro.currency = resc.data
      }
    },
    setGridContainers () {
      for (var compName in this.$options.components) {
        if (!this.$refs[compName]) {
          continue
        }
        const grid = this.$refs['grid' + compName]
        this.$refs[compName].container = {
          width: grid.clientWidth,
          height: grid.clientHeight
        }
      }
    },
    async onresize () {
      const layoutHeight = window.innerHeight
      this.setGridContainers()
    },
    startTimer () {
      this.stopTimer()
      this.countdownTimer = setInterval(this.doCountdown, 1000)
    },
    doCountdown () {
        let num = parseInt(this.countdownText, 10)
        // console.log('--' + num)
        num--
        if (num < 0) {
          this.stopTimer()
          return
        }
        this.countdownText = num
    },
    stopTimer () {
      clearInterval(this.countdownTimer)
    },
    dealChanged (data) {
      if (data && data.length > 0) {
        // 第一次进入
        if (!this.showCountdown) {
          this.lastDealTime = data[data.length - 1].time
          let tick = new Date().getTime() - this.lastDealTime
          if (tick < 0) {
            tick = 0
          } else if (tick > 20000) {
            tick = 20000
          }
          this.countdownText = Math.floor(tick / 1000) + ''
          this.showCountdown = true
          this.startTimer()
        } else {
          if (data[data.length - 1].time > this.lastDealTime) {
            // 有行情变化
            this.countdownText = '20'
            this.lastDealTime = data[data.length - 1].time
            this.startTimer()
          }
        }
      }
    }
  },
  async created () {
    document.querySelector('.page-loading').classList.add('show')
    if (!this.$route.params.pair) {
      const res = await service.getPairList()
      if (res.code) {
        return utils.alert(res.message)
      }
      this.$router.replace({
        name: 'trading',
        params: {
          pair: _.find(res.data.items, item => item.name === local.pair) ? local.pair : res.data.items[0].name
        }
      })
    }
    this.state.loading = true

    this.$nextTick(() => {
      // const layoutHeight = window.innerHeight
      // this.$refs.wrap.style.height = layoutHeight + 'px'
      this.state.loading = false
      this.state.pro.layout = true

      this.setGridContainers()

      this.$eh.$emit('protrade:layout:init')
      utils.log('Layout inited')

      this.$eh.$on('protrade:balance:refresh', this.refreshBalance)
      this.$eh.$on('app:resize', this.onresize)
      this.$eh.$on('deal:update', this.dealChanged)
      document.querySelector('.page-loading').classList.remove('show')
    })
  },
  beforeRouteLeave (to, from, next) {
    if (this.state.pro.lock) {
      return next(false)
    }
    this.$refs.TradingView.$destroy()
    next()
  },
  destroyed () {
    this.$eh.$off('app:resize', this.onresize)
    this.$eh.$off('protrade:balance:refresh', this.refreshBalance)
    this.$eh.$off('deal:update', this.dealChanged)
    this.state.pro.layout = false
    document.querySelector('.page-loading').classList.remove('show')
    document.documentElement.setAttribute('style', '')
  }
}
</script>

<style lang="scss" scoped>
.container-trade-panel {
  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  ::-webkit-scrollbar-track {
  }
  ::-webkit-scrollbar-thumb {
    background-color: #475166;
    border: 2px solid #141721;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}
.trading-chart {
  overflow: hidden;
  user-select: none;
  position: relative;
  color: #BCBFCE;
  min-height: 100%;
  font-size: 12px;
  display: flex;
  flex-direction: column;

}
.container-trade-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.ix-row {
  flex: 1;
  display: flex;
  flex-direction: row;
}
.ix-col {
  display: flex;
  flex-direction: column;
}
.ix-col-1 {
  width: 350px;
}
.ix-col-2 {
  flex: 1;
}
.ix-col-3 {
  width: 350px;
}
.ix-grid {
  position: relative;
  border-top: 4px solid $splitter;
  border-left: 4px solid $splitter;
}
.ix-grid-tv {
  flex: 2;
  height: 2px;
}
.ix-grid-order {
  flex: 1;
  height: 275px;
}
.ix-grid-deal {
  flex: 1;
  height: 256px;
}
.ix-grid-orderbook {
  flex: 2;
  // height: 2px;
}
.ix-grid-pairnav {
  flex: 1;
  height: 268px;
}
.ix-grid-operate {
  flex: 1;
  // height: 1px;
}
.ix-grid-intro {
  flex: 1;
  height: 300px;
}
.active-box {
  position: absolute;
  top: 13px;
  right: 25px;
  width: 260px;
  height: 68px;
  background: url("../assets/active_bg.png") no-repeat;
  background-size: 100%;

  .text {
    font-size: 14px;
    line-height: 14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(250,248,239,1);
    margin-top: 12px;
    margin-left: 14px;

    .seconds {
      font-size: 20px;
      color: #EEDC50;
      width: 22px;
      text-align: right;
      margin: 0 5px;
      display: inline-block;
    }
  }
}
@media screen and (max-width: 1000px) {
  .ix-col-1 {
    display: none;
  }
}
</style>

<style lang="scss">
@import "../styles/mixins";

.ix-panel {
  width: 100%;
  height: 100%;
  &.progress {
    cursor: progress;
  }
}
.tmp-children {
  display: none;
}
</style>
