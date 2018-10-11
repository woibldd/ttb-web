<template>
  <div class="ix-panel">
    <div class="ix-header">
      <orderbook-nav :height="navHeight" />
      <!-- <div class="pull-right">
        <span
          v-show="offset || accuracy !== 1"
          class="group-display ibt"
          v-tooltip="clearTip"
          @click="clearSetting">
          {{ curGroup }} <span class="has-underline">{{ $t('orderbook_group') }}</span>
        </span>
        <div class="header-icons ibt">
          <a
            @click.prevent.stop="toggleSetting"
            class="header-btn btn">
            <icon name="setting"/>
          </a>
        </div>
      </div> -->
    </div>
    <div
      class="ix-panel-thead"
      :style="{paddingRight: hasScrollBar ? '14px' : '4px'}">
      <div class="table table-ix-orderbook">
        <div class="thead">
          <div class="th ibt left">{{ $t('price') }}</div>
          <div class="th ibt right">{{ $t('amount_unit', {unit: state.pro.product_name}) }}</div>
          <div class="th ibt right">{{ $t('total', {unit: state.pro.product_name}) }}</div>
        </div>
      </div>
    </div>
    <div
      class="ix-panel-body"
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
              :height="itemHeight + 'px'"
              side="sell"
              :item="item"
              :price-scale="priceScale"
              :amount-scale="amountScale"/>
          </tbody>
        </table>
      </div>
      <div class="order-split">
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
    <!-- <div
      class="setting-panel"
      :class="{show: panelShow}"
      @click.stop>
      <div class="setting-panel-header">{{ $t('orderbook_options') }}</div>
      <div class="group-title">{{ $t('orderbook_group') }}</div>
      <div class="group-wrap">
        <span class="group-value">{{ curGroup }}</span>
        <span
          class="minus bgcolor-down"
          @click="minus"/>
        <span
          class="plus bgcolor-up"
          @click="plus"/>
      </div>
    </div> -->
    <div
      class="mask"
      :class="{show: loading && !bids.length && !asks.length}">
      <v-loading />
    </div>
    <div
      class="mask changing"
      :class="{show: changing}">
      <v-loading />
    </div>
  </div>
</template>

<script>
import {state, local} from '@/modules/store'
import utils from '@/modules/utils'
import ws from '@/modules/ws'
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
      itemHeight: 24,
      navHeight: 32,
      splitHeight: 50,
      theadHeight: 30,
      panelHeight: 200,
      loading: false,
      changing: false,
      clearTip: {
        classes: ['ix-popover'],
        content () {
          return vm.$i18n.t('click_to_clear')
        }
      }
    }
  },
  watch: {
    pair: {
      immediate: true,
      async handler (pair) {
        if (pair) {
          this.clear()
          this.sub()
        }
      }
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
    curGroup () {
      if (this.state.pro.pairInfo) {
        const scale = this.state.pro.pairInfo.price_scale
        const accuracy = this.accuracy === 2 && this.offset !== 0 ? 2.5 : this.accuracy
        return this.$big(10).pow(this.offset - scale).mul(accuracy).toFixed(scale)
      }
      return ''
    },
    bookHeight () {
      return this.panelHeight - this.navHeight - this.theadHeight
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
          minHeight: this.sideHeight + 'px',
          paddingTop: Math.max(this.sideHeight - this.asks.length * this.itemHeight, 0) + 'px',
          marginTop: 0 - Math.max(0, this.asks.length * this.itemHeight - this.sideHeight) + 'px'
        }
      }
      if (this.local.orderbookMode === 'ask') {
        return {
          overflow: 'hidden',
          paddingTop: Math.max(this.bookHeight - this.splitHeight - this.asks.length * this.itemHeight, 0) + 'px',
          minHeight: this.bookHeight - this.splitHeight + 'px',
          marginTop: 0 - Math.max(0, this.asks.length * this.itemHeight - this.bookHeight + this.splitHeight) + 'px'
        }
      }
      return {}
    },
    bidStyle () {
      if (this.local.orderbookMode === 'both') {
        return {
          overflow: 'hidden',
          height: Math.floor((this.bookHeight - this.splitHeight - this.sideHeight) / this.itemHeight) * this.itemHeight + 'px'
        }
      }
      if (this.local.orderbookMode === 'bid') {
        return {
          height: this.bookHeight - this.splitHeight + 'px'
        }
      }
      return {}
    }
  },
  methods: {
    clearSetting () {
      this.offset = 0
      this.accuracy = 1
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
      let maxBuyTotal = _.maxBy(this.buy, i => parseFloat(i[1]))[1]
      let maxSellTotal = _.maxBy(this.sell, i => parseFloat(i[1]))[1]
      this.buy.forEach((buy) => {
        const amount = this.$big(buy[1])
        buyTotal = buyTotal.plus(amount)
        bids.push({
          price: this.$big(buy[0]),
          amount: this.$big(buy[1]),
          deep: this.$big(buy[1]).div(maxBuyTotal).times(100).round(4).toString(),
          total: buyTotal
        })
      })
      this.sell.forEach((sell) => {
        const amount = this.$big(sell[1])
        sellTotal = sellTotal.plus(amount)
        asks.unshift({
          price: this.$big(sell[0]),
          amount: this.$big(sell[1]),
          deep: this.$big(sell[1]).div(maxSellTotal).times(100).round(4).toString(),
          total: sellTotal
        })
      })
      this.asks = asks
      this.bids = bids
    },
    plus () {
      if (this.offset >= 8 || this.priceScale <= 0) {
        return false
      }
      if (this.accuracy === 1) {
        this.accuracy = 2
      } else if (this.accuracy === 2) {
        this.accuracy = 5
      } else if (this.accuracy === 5) {
        this.accuracy = 1
        this.offset += 1
      }
      this.onGroupChange()
    },
    minus () {
      if (this.offset === 0 && this.accuracy === 1) {
        return false
      }
      if (this.accuracy === 5) {
        this.accuracy = 2
      } else if (this.accuracy === 2) {
        this.accuracy = 1
      } else if (this.accuracy === 1) {
        this.accuracy = 5
        this.offset -= 1
      }
      this.onGroupChange()
    },
    error (msg) {
      this.err = msg
    },
    async sub () {
      this.loading = true
      if (this.socket) {
        this.socket.$destroy()
      }
      const fetchId = this.pair + this.offset + this.accuracy
      const res = await service.getQuoteOrderbook({
        pair: this.pair,
        offset: this.offset,
        accuracy: this.accuracy,
        size: 20
      })
      if (fetchId !== this.pair + this.offset + this.accuracy) {
        return false
      }
      if (!res.code) {
        this.assignData(res.data)
      }
      this.socket = ws.create(`orderbook/${this.pair}/${this.offset}/${this.accuracy}/20`)
      this.socket.$on('message', (data) => {
        this.assignData(data)
      })
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
}
</script>

<style lang="scss" scoped>
@import "../../styles/vars";
@import "../../styles/mixins";

.header-icons {
  padding-right: 8px;
}
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
.group-display {
  font-size: 12px;
  margin-right: 8px;
}
.has-underline {
  border-bottom: 1px dotted #788694;
}
.ix-panel-thead {
  padding-left: 10px;
  height: 30px;
}
.ix-panel-body {
  overflow-y: hidden;
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
  width: 33.33%;
  box-sizing: border-box;
  &.right {
    text-align: right;
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
.order-split {
  color: white;
  padding-left: 12px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.setting-panel {
  width: 200px;
  padding-bottom: 20px;
  background-color: #232D3D;
  border: 3px outside rgba(0,0,0, .5);
  opacity: 0;
  visibility: hidden;
  position: absolute;
  z-index: 10;
  right: 8px;
  top: 36px;
  transition: opacity 300ms, visibility 0s 300ms;
  &.show {
    transition: opacity 300ms;
    opacity: 1;
    visibility: visible;
  }
}
.side-wrap {
  box-sizing: border-box;
}
.setting-panel-header {
  text-align: center;
  line-height: 28px;
  height: 30px;
  border-top: 2px solid $primary;
  background-color: #303948;
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
  .minus {
    width: 36px;
    box-sizing: border-box;
    border: 1px inset rgba(255,255,255, .1);
    height: 28px;
    position: absolute;
    background-color: $sell;
    right: 35px;
    top: -1px;
  }
  .plus {
    width: 36px;
    box-sizing: border-box;
    border: 1px inset rgba(255,255,255, .1);
    height: 28px;
    position: absolute;
    background-color: $buy;
    right: -1px;
    top: -1px;
  }
  .minus, .plus {
    &:before,
    &:after {
      content: ' ';
      width: 8px;
      height: 2px;
      background-color: white;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -4px;
      margin-top: -1px;
    }
  }
  .minus {
    &:after {
      display: none;
    }
  }
  .plus {
    &:after {
      height: 8px;
      width: 2px;
      margin-left: -1px;
      margin-top: -4px;
    }
  }
}
</style>
