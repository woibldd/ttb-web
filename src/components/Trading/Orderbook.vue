<template>
  <div class="ix-panel">
    <div class="ix-header">
      <orderbook-nav :height="navHeight" />
      <!-- 深度选择 -->
      <div
        class="depth-group-display relative pointer pull-right"
        @mouseover="showDepthOption = true"
        @click.prevent.stop="toggleSetting"
        @mouseout="showDepthOption = false">
        <span
          class="ibt depth">
          <span class="dib mr-5">{{ $t('orderbook_depth_group') }}</span>{{ currentDepth }} <icon
            name="arrow-down-blue"
            :class="[showDepthOption && 'up']"
            class="arrow-down-blue"/>
        </span>
        <div
          class="depth-options-wrapper"
          v-show="showDepthOption">
          <div class="depth-options">
            <div
              v-for="(dp, index) in depthGroup"
              @click="changeDepth(dp)"
              :key="index"
              class="depth__row">{{ dp.offset }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ix-panel-thead"
      :style="{paddingRight: hasScrollBar ? '14px' : '4px'}">
      <div class="table table-ix-orderbook">
        <div class="thead">
          <div class="th ibt left" />
          <div class="th ibt left">{{ $t('price') }}</div>
          <div class="th ibt right">{{ $t('amount_unit', {unit: state.pro.product_name}) }}</div>
          <div class="th ibt right">{{ $t('total', {unit: state.pro.product_name}) }}</div>
        </div>
      </div>
    </div>
    <div class="ix-panel-body"
      ref="body"
      :style="{height: bookHeight + 'px'}">
      <div
        class="side-wrap ask"
        :style="askStyle"
        v-show="local.orderbookMode !== 'bid'">
        <table class="table table-asks">
          <tbody v-if="state.pro.pairInfo">
            <tr
              is="OrderbookItem"
              v-for="(item, index) in asks"
              :key="index"
              :rank="asks.length - index"
              :height="itemHeight + 'px'"
              side="sell"
              :item="item"
              :price-scale="priceScale"
              :amount-scale="amountScale"/>
          </tbody>
        </table>
      </div>
      <div
        class="order-split"
        :class="{bid: local.orderbookMode === 'bid', ask: local.orderbookMode === 'ask'}"
      >
        <div class="left-part">
          <div class="last-price">{{ lastPrice }}</div>
          <div class="estimate">
            {{ state.fiatMoneySymbol }} <fiat-money
              :base="state.pro.currency_name"
              :value="lastPrice" />
          </div>
        </div>
        <span
          v-if="delta"
          class="delta"
          :class="{'color-up': delta > 0, 'color-down': delta < 0}">{{ delta > 0 ? '+' : '' }}{{ delta }}%</span>
      </div>
      <div
        class="side-wrap bid"
        :style="bidStyle"
        v-show="local.orderbookMode !== 'ask'">
        <table class="table table-bids">
          <tbody v-if="state.pro.pairInfo">
            <tr
              is="OrderbookItem"
              v-for="(item, index) in bids"
              :key="index"
              :rank="index + 1"
              :height="itemHeight + 'px'"
              side="buy"
              :item="item"
              :price-scale="priceScale"
              :amount-scale="amountScale"/>
          </tbody>
        </table>
      </div>
      <!--<div class="no-data" v-show="!err && !orderbookList.length">{{ $t('orderbook_empty') }}</div>-->
      <!--<div class="err" v-show="err">{{ err }}</div>-->
    </div>
    <div class="mask"
      :class="{show: loading && !bids.length && !asks.length}">
      <v-loading />
    </div>
    <div class="mask changing"
      :class="{show: changing}">
      <v-loading />
    </div>
  </div>
</template>

<script>
import {state, local} from '@/modules/store'
import utils from '@/modules/utils'
// import ws from '@/modules/ws'
import _ from 'lodash'
import OrderbookItem from './OrderbookItem'
import OrderbookNav from './OrderbookNav'
import service from '@/modules/service'

export default {
  name: 'Orderbook',
  components: {
    OrderbookItem,
    OrderbookNav
  },
  props: {
    dataTable: {
      type: Array,
      default: []
    }
  },
  data () {
    const vm = this
    return {
      state,
      local,
      err: '',
      socket: null,
      panelShow: false,
      tab: 'active',
      buy: [],
      sell: [],
      bids: [],
      asks: [],
      offset: 0,
      accuracy: 1,
      itemHeight: 20,
      navHeight: 32,
      splitHeight: 50,
      theadHeight: 30,
      panelHeight: 316,
      loading: false,
      changing: false,
      clearTip: {
        classes: ['ix-popover'],
        content () {
          return vm.$i18n.t('click_to_clear')
        }
      },
      // 第一次纠正滚动条位置
      isFristAdultScrolling: true,
      showDepthOption: false
    }
  },
  watch: {
    pair: {
      immediate: true,
      async handler (pair) {
        if (pair) {
          this.clear()
          this.sub()
          // 切换币种前置纠正
          this.isFristAdultScrolling = true
          this.computedScrollPosition()
        }
      }
    },
    'local.orderbookMode': {
      // 切换标签后重新计算
      immediate: true,
      async handler (mode) {
        // 切换标签强制指定滚动条位置
        this.isFristAdultScrolling = true
        this.computedScrollPosition()
      }
    },
    dataTable() { 
      this.assignData(this.dataTable) 
    } 
  },
  computed: {
    lastPrice () {
      if (this.state.pro.lastPrice) {
        return this.state.pro.lastPrice.toFixed(_.get(this, 'state.pro.pairInfo.price_scale', 4))
      }
    },
    spread () {
      // deprecated
      if (this.state.pro.ask && this.state.pro.ask > 0) {
        return this.state.pro.ask.minus(this.state.pro.bid).div(this.state.pro.ask)
          .mul(100).round(2).toString() + '%'
      }
      return '-'
    },
    delta () {
      const tick = this.state.pro.pairTick
      if (!tick || tick.increment_24h === tick.current) {
        return false
      }
      return this.$big(tick.increment_24h)
        .mul(100)
        .div(this.$big(tick.current).minus(tick.increment_24h))
        .round(2, this.C.ROUND_HALF_UP)
        .toFixed(2)
    },
    pair () {
      return this.state.pro.pair
    },
    priceScale () {
      let scale = _.get(this, 'state.pro.pairInfo.price_scale', 4) - this.offset
      if (this.offset !== 0 && this.accuracy === 2) {
        scale += 1
      }
      return utils.unsign(scale)
    },
    amountScale () {
      return _.get(this, 'state.pro.pairInfo.amount_scale', 4)
    },
    depthGroup () {
      const deep = 6
      let depthArr = []
      if (!this.state.pro.pairInfo) return []
      let scale = this.state.pro.pairInfo.price_scale
      for (let accuracy = scale; accuracy > scale - deep; accuracy--) {
        let offset = Math.pow(10, -accuracy).toFixed(accuracy >= 0 ? accuracy : 0)
        if (offset > 1) break
        depthArr.push({
          offset,
          accuracy: scale - accuracy
        })
      }
      return depthArr
    },
    currentDepth () {
      return Math.pow(10, -this.priceScale).toFixed(this.priceScale >= 0 ? this.priceScale : 0)
    },
    curGroup () {
      if (this.state.pro.pairInfo) {
        const scale = this.state.pro.pairInfo.price_scale
        const accuracy = this.accuracy === 2 && this.offset !== 0 ? 2.5 : this.accuracy
        return this.$big(10).pow(this.offset - scale).mul(accuracy).toFixed(scale)
      }
      return ''
    },
    bookHeight () {
      return this.panelHeight - this.navHeight - this.theadHeight - 4
    },
    sideHeight () {
      return this.itemHeight * Math.floor((this.bookHeight - this.splitHeight) / 2 / this.itemHeight)
    },
    hasScrollBar () {
      if (this.local.orderbookMode === 'both') {
        return false
      }
      if (this.local.orderbookMode === 'ask') {
        return this.asks.length * this.itemHeight > this.bookHeight
      }
      if (this.local.orderbookMode === 'bid') {
        return this.bids.length * this.itemHeight > this.bookHeight
      }
    },
    askStyle () {
      if (this.local.orderbookMode === 'both') {
        return {
          minHeight: this.sideHeight + 'px'
          // paddingTop: Math.max(this.sideHeight - this.asks.length * this.itemHeight, 0) + 'px',
          // marginTop: 0 - Math.max(0, this.asks.length * this.itemHeight - this.sideHeight) + 'px'
        }
      }
      if (this.local.orderbookMode === 'ask') {
        return {
          minHeight: this.bookHeight - this.splitHeight + 'px'
        }
      }
      return {}
    },
    bidStyle () {
      if (this.local.orderbookMode === 'both') {
        return {
          overflow: 'hidden',
          minHeight: Math.floor((this.bookHeight - this.splitHeight - this.sideHeight) / this.itemHeight) * this.itemHeight + 'px'
        }
      }
      if (this.local.orderbookMode === 'bid') {
        return {
          minHeight: this.bookHeight - this.splitHeight + 'px'
        }
      }
      return {}
    }
  },
  methods: {
    changeDepth (dp) {
      this.offset = dp.accuracy
      this.showDepthOption = false
      this.onGroupChange()
    },
    toggleSetting () {
      this.panelShow = !this.panelShow
    },
    onGroupChange () {
      this.changing = true
      this.lazySub()
    },
    lazySub: _.throttle(function () {
      this.sub()
    }, 1000),
    clear () {
      this.state.pro.ask = 0
      this.state.pro.bid = 0
      this.state.pro.askVol = 0
      this.state.pro.bidVol = 0
      this.buy = []
      this.sell = []
      this.asks = []
      this.bids = []
      this.offset = 0
      this.accuracy = 1
    },
    update () {
      const bids = []
      const asks = []

      let buyTotal = this.$big(0)
      let sellTotal = this.$big(0)
      let maxBuyTotal = 0
      let maxSellTotal = 0

      if(this.buy.length > 1){
        maxBuyTotal = _.maxBy(this.buy, i => parseFloat(i[1]))[1]
      }
      if(this.sell.length > 1){
         maxSellTotal = _.maxBy(this.sell, i => parseFloat(i[1]))[1]
      }

      this.buy.forEach((buy) => {
        const amount = this.$big(buy[1])
        buyTotal = buyTotal.plus(amount)
        // console.log(buy[1],maxBuyTotal)
        bids.push({
          price: this.$big(buy[0]),
          amount: this.$big(buy[1]),
          deep: this.$big(buy[1]).times(100).round(4).toString(),
          total: buyTotal
        })
      })
      this.sell.forEach((sell) => {
        const amount = this.$big(sell[1])
        sellTotal = sellTotal.plus(amount)
        asks.unshift({
          price: this.$big(sell[0]),
          amount: this.$big(sell[1]),
          deep: this.$big(sell[1]).times(100).round(4).toString(),
          total: sellTotal
        })
      })
      for (let i = asks.length; i < 20; i++) {
        asks.unshift({}) 
      }

      this.asks = asks
      this.bids = bids
      // 获取数据后强制指定滚动条位置，并重置状态，否则用户滚动会被纠正
      this.computedScrollPosition()
      if (this.isFristAdultScrolling) {
        this.isFristAdultScrolling = false
      }
    },
    error (msg) {
      this.err = msg
    },
    async sub () {
      this.loading = true 
      const fetchId = this.pair + this.offset + this.accuracy
      const res = await service.getQuoteOrderbook({
        pair: this.pair,
        offset: this.offset,
        accuracy: this.accuracy,
        size: 20
      })
      this.$emit('setDeep', this.offset)

      if (fetchId !== this.pair + this.offset + this.accuracy) {
        return false
      }
      if (!res.code) {
        this.assignData(res.data)
      }
 
      // this.socket = ws.create(`orderbook/${this.pair}/${this.offset}/${this.accuracy}/20`)
      // this.socket.$on('open', () => {
      //   this.socket.heartCheck.start()
      // })
      // this.socket.$on('message', (data) => {
      //   this.socket.heartCheck.start()
      //   this.assignData(data)
      // })
      // this.socket.$on('reopen', this.sub)
    },
    assignData (data) {
      const toBig = item => [this.$big(item.values[0]), this.$big(item.values[1])]
      this.buy = _.map(data.bids, toBig)
      this.sell = _.map(data.asks, toBig)
      this.$eh.$emit('protrade:orderbook:update', {
        buy: this.buy,
        sell: this.sell
      })
      this.state.pro.bid = _.get(this.buy, '0.0', 0)
      this.state.pro.ask = _.get(this.sell, '0.0', 0)
      this.state.pro.bidVol = _.get(this.buy, '0.1', 0)
      this.state.pro.askVol = _.get(this.sell, '0.1', 0)
      this.loading = false
      this.changing = false
      this.update()
    },
    closePanels () {
      this.panelShow = false
    },
    onresize: _.debounce(function () {
      this.panelHeight = this.container.height
    }, 100),
    layout () {
      this.onresize()
      this.$eh.$on('app:resize', this.onresize)
    },
    /**
     * 计算滚动条位置，强制滚动
     */
    computedScrollPosition () {
      // 已经纠正过的不在纠正
      if (!this.isFristAdultScrolling) return
      let mode = this.local.orderbookMode
      if (mode === 'ask') {
        this.$nextTick(() => {
          this.$refs['body'].scrollTop = 200
        })
        // 数据更新不及时可能会带来问题
        setTimeout(() => {
          this.$refs['body'].scrollTop = 200
        }, 300)
      } else if (mode === 'bid') {
        this.$nextTick(() => {
          this.$refs['body'].scrollTop = 0
        })
      } else {
        // mode === 'both'
        this.$nextTick(() => {
          this.$refs['body'].scrollTop = 300
        })
        // 数据更新不及时可能会带来问题
        setTimeout(() => {
          this.$refs['body'].scrollTop = 300
        }, 300)
      }
    }
  },
  created () {
    this.$eh.$on('app:click', this.closePanels)
    this.$eh.$on('protrade:layout:init', this.layout)
  },
  destroyed () {
    this.$eh.$off('app:resize', this.onresize)
    this.$eh.$off('app:click', this.closePanels)
    this.$eh.$off('protrade:layout:init', this.layout)
    if (this.socket) {
      this.socket.$destroy()
    }
  }
  // updated () {
  //   console.log(new Date())
  //   this.computedScrollPosition()
  // }
}
</script>

<style lang="scss" scoped>



.header-btn {
  cursor: pointer;
  color: white;
  opacity: 0.8;
  transition: opacity 300ms;
  font-size: 16px;
  display: inline-block;
  &:hover,
  &:active {
    opacity: 1;
  }
}

.depth-options-wrapper {
    padding-top: 4px;
    position: absolute;
    right: -18px;
    z-index: 9999;
}
.depth-options {
    box-sizing: border-box;
    min-width:100px;
    background:rgba(25,45,63,1);
    border-radius:4px;
    padding-top: 10px;

    .depth__row {
        box-sizing: border-box;
        padding: 0 24px;
        height: 30px;
        line-height: 30px;
        width: 100%;
        text-align: right;
        color: $text-link;

        &:hover {
            background-color: #0F1F2D;
        }
    }
}

.mask {
  @include ix-mask();
  &.changing {
    pointer-events: none;
    background-color: transparent;
    z-index: 1;
  }
}
.ix-header {
  background-color: $nav;
  height: 32px;
  line-height: 32px;
  box-sizing: border-box;
  color: white;
  font-size: 0;
}
.depth-group-display {
  font-size: 12px;
  margin-right: 18px;
  width: 102px;
  color: $text-link;
  font-size: 12px;
  text-align: right;

  .depth {
    @include limit(1);
  }
}
.arrow-down-blue {
    width: 12px;
    height: 6px;
    position: absolute;
    top: 14px;
    color: $text-link;
    transition: all 0.2s ease-in-out;

    &.up {
        transform: rotateZ(180deg)
    }
}
.has-underline {
  border-bottom: 1px dotted #788694;
}
.dib {
    display: inline-block;
}
.ix-panel-thead {
  padding-left: 10px;
  height: 30px;
}
.ix-panel-body {
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: block;
    width: 2px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #192D3F;
    border: none;
  }
}
.err,
.no-data {
  line-height: 70px;
  text-align: center;
  color: rgba(200,200,200, .2);
}
.table {
  font-size: 12px;
  width: 100%;
}
.thead {
  font-size: 0;
  white-space: nowrap;
}
.th {
  font-size: 12px;
  color: #A5B4C5;
  line-height: 30px;
  padding: 0 5px;
  width: 28%;
  box-sizing: border-box;
  &.right {
    text-align: right;
  }
  &:first-child {
    max-width: 46px;
    padding-left: 5px;
  }
}
.table tbody tr:hover {
  background-color: $primary-opacity;
}
th.buy {
  padding-right: 10px;
}
th.sell {
  padding-left: 10px;
}
.relative {
    position: relative;
}
.order-split {
  color: white;
  padding-left: 12px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  bottom:0;
  background: $protrade-bg;
  z-index: 100;

  &.bid {
    top: 0;
    bottom: auto;
  }
  &.ask {
    bottom: 0;
    top: auto;
  }
  .left-part {
    .last-price {
      line-height: 24px;
    }
    .estimate {
      font-size: 12px;
      line-height: 17px;
      color: fade-out(white, .6);
    }
  }
  .delta {
    padding-right: 5px;
    white-space: nowrap;
    &.up {
      color: $up-price;
    }
    &.down {
      color: $down-price;
    }
  }
}

.side-wrap {
  box-sizing: border-box;
}
.group-title {
  text-align: center;
  font-size: 13px;
  line-height: 40px;
}
.group-wrap {
  width: 182px;
  margin: 0 auto;
  background-color: rgba(255,255,255, .11);
  border: 1px inset rgba(255,255,255, .1);
  position: relative;
  height: 28px;
  box-sizing: border-box;
  .group-value {
    display: block;
    padding-right: 80px;
    text-align: right;
    line-height: 26px;
  }
}
</style>
