<template>
  <div class="orderbook-container" :style="{height: panelHeight + 'px'}">
    <div class="ix-pannel flex "> 
      <div
        class="ix-panel-thead">
        <div class="table table-ix-orderbook" :style="{height: theadHeight + 'px'}" >
          <div
            class="thead">
            <!-- <div class="th ibt left" /> -->
            <div class="th ibt txl">{{ $t('contractMix.mapDelegateList.mapHeader1.price') }}</div>
            <div class="th ibt txr">{{ $t('contractMix.mapDelegateList.mapHeader1.amount') }}</div>
            <div class="th ibt txr">{{ $t('contractMix.mapDelegateList.mapHeader1.total', {unit: ''}).replace('(','').replace(')','') }}</div>

          </div>
        </div>
      </div>
      <div
        class="ix-pannel-body"
        ref="body"
        :style="{height: bookHeight + 'px'}">
        <div
          class="side-wrap ask"
          :style="askStyle"
        >
          <table class="table table-asks" :class="[state.skin]">
            <!-- <tbody v-if="state.ct.pairInfo"> -->
            <tbody>
              <tr
                class="mt-1 mb-1"
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
          class="order-split  mb-6 mt-6" 
          :class="[{displayFlex:hasBtnReturnDish}, state.skin]">
          <span
            class="delta"
            :class="isBuy ? 'color-up' : 'color-down'">{{ lastPrice | fixed(priceScale) }} 
            <icon name="arrow-up" 
              :class="{'up':isBuy, 'down': !isBuy}"/>
          </span>
          <div
            class="left-part"
            v-if="!hasBtnReturnDish">
            <span class="last-price">
              <!-- <router-link
                class="pointer text-light"
                v-tooltip.top-center="{html: true, content: $t('contractMix.mapDelegateList.contract_index_price_tips', {product_name: (activeProduct || {}).currency}), classes: 'contract'}"
                :to="{name: 'MixIndex', params: {pair: `${(activeProduct || {}).symbol}` }}">{{ indexPrice }}</router-link>
              /
              <router-link
                class="pointer text-light"
                v-tooltip.top-center="{html: true, content: $t('contractMix.mapDelegateList.contract_mark_price_tips'), classes: 'contract'}"
                :to="{name: 'MixIndex', params: {pair: `${(activeProduct || {}).symbol}` }}">{{ markPrice }}</router-link> -->
              <router-link
                class="pointer ml-30 text-primary "
                v-tooltip.top-center="{html: true, content: $t('contractMix.mapDelegateList.contract_mark_price_tips'), classes: 'contract'}"
                :to="{name: 'MixIndex', params: {pair: `${(activeProduct || {}).symbol}` }}"> 
                <span ><icon class="" name="qizhi" /> </span> 
                {{ markPrice | fixed(priceScale)}}
              </router-link>
            </span>
          </div>
          <a
            v-else
            size='mini'
            class="el-link"
            @click="returnToDefault">{{ $t('contractMix.mapDelegateList.return-dish') }}</a>
        </div>
        <div
          class="side-wrap bid"
          :style="bidStyle">
          <table class="table table-bids" :class="[state.skin]">
            <!-- <tbody v-if="state.ct.pairInfo"> -->
            <tbody>
              <tr
                class="mt-1 mb-1"
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
      </div>
      <!-- <div
        class="mask"
        :class="{show: loading && !bids.length && !asks.length}">
        <v-loading />
      </div> -->
      <!-- <div
        class="mask changing"
        :class="{show: changing}">
        <v-loading />
      </div> -->
    </div>
  </div>
</template>
<script>
import {state, local} from '@/modules/store'
import utils from '@/modules/utils'
// import ws from '@/modules/ws'
import _ from 'lodash'
import OrderbookItem from './orderbookItem'
import service from '@/modules/service'
// import stateMixins from './stateComputedMixins'

// import dealSocketMixins from '@/mixins/deal-socket-mixins'

export default {
  // mixins: [stateMixins],
  name: 'OrderBook',
  components: {
    OrderbookItem
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
      deepthData: {},
      accuracy: 1,
      itemHeight: 19,
      navHeight: 32,
      splitHeight: 50,
      theadHeight: 35,
      panelHeight: 323, 
      loading: false,
      changing: false,
      clearTip: {
        classes: ['ix-popover'],
        content () {
          return vm.$i18n.t('click_to_clear')
        }
      },
      // ??????????????????????????????
      isFristAdultScrolling: true,
      showDepthOption: false,
      buyOnePrice: 0, // ?????????
      sellOnePrice: 0, // ????????? 
      hasBtnReturnDish: false
    }
  },
  props: {
    orderData: {
      type: Object,
      default: () => {}
    },
    lastPrice: {
      type: [Number, String],
      default: 0
    },
    indexPrice: {
      type: [Number, String],
      default: 0
    },
    markPrice: {
      type: [Number, String],
      default: 0
    },
    isBuy: {
      type: Boolean,
      default: true
    },
    activeProduct: {
      type: Object,
      default: () => {}
    },
    // ??????????????????
    singleSideLength: {
      type: [Number, String],
      default: () => 6
    } 
  },
  watch: {
    pair: {
      immediate: true,
      async handler (pair) {
        if (pair) {
          this.clear()
          this.sub()
          // ????????????????????????
          this.isFristAdultScrolling = true
          this.computedScrollPosition() 
        }
      }
    },
    orderData: {
      immediate: true,
      async handler (data) {
        this.changeDepthNumber(data)
      }
    }
  },
  computed: {
    // spread () {
    //   if (this.state.ct.ask && this.state.ct.ask > 0) {
    //     return this.state.ct.ask.minus(this.state.ct.bid).div(this.state.ct.ask)
    //       .mul(100).round(2).toString() + '%'
    //   }
    //   return '-'
    // },
    mapHeader1 () {
      return this.langData.mapDelegateList.mapHeader1
    },
    pair () {
      return this.state.mix.pair
    },
    priceScale () {
      // let scale = _.get(this, 'activeProduct.price_scale', 4) - this.offset
      let scale = ((this.activeProduct || {}).price_scale || 4) - this.offset
      if (this.offset !== 0 && this.accuracy === 2) {
        scale += 1
      }
      return utils.unsign(scale)
    },
    amountScale () {
      // return _.get(this, 'activeProduct.amount_scale', 0)
      return (this.activeProduct || {}).amount_scale || 0
    },
    depthGroup () {
      const deep = 6
      let depthArr = []
      if (!this.activeProduct) return []
      let scale = (this.activeProduct || {}).price_scale
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
      if (this.state.ct.pairInfo) {
        const scale = this.state.ct.pairInfo.price_scale
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
      return true
    },
    askStyle () {
      return {
        minHeight: this.sideHeight + 'px'
        // paddingTop: Math.max(this.sideHeight - this.asks.length * this.itemHeight, 0) + 'px',
        // marginTop: 0 - Math.max(0, this.asks.length * this.itemHeight - this.sideHeight) + 'px'
      }
    },
    bidStyle () {
      return {
        overflow: 'hidden',
        minHeight: Math.floor((this.bookHeight - this.splitHeight - this.sideHeight) / this.itemHeight) * this.itemHeight + 'px'
      }
    },
    indexPriceTips () {
      if (state.ct.pairInfo) {
        return this.$t('contract_index_price_tips', {product_name: state.ct.pairInfo.product_name || 'BTC'})
      }
      return this.$t('contract_index_price_tips', {product_name: 'BTC'})
    }
  },
  methods: {
    changeDepth (dp) {
      this.offset = dp.accuracy
      this.showDepthOption = false
      this.$emit('changeDeep', dp)
      this.onGroupChange()
      this.changeDepthNumber(this.deepthData)
    },
    changeDepthNumber (data) {
      this.assignData(data)
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
      // this.state.ct.ask = 0
      // this.state.ct.bid = 0
      // this.state.ct.askVol = 0
      // this.state.ct.bidVol = 0
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
      if (!this.buy || !this.sell) {
        return
      }
      let maxBuyTotal = 0
      if (this.buy.length) {
        maxBuyTotal = _.maxBy(this.buy, i => parseFloat(i[1]))[1]
      }
      let maxSellTotal = 0
      if (this.sell.length) {
        maxSellTotal = _.maxBy(this.sell, i => parseFloat(i[1]))[1]
      }
      this.buy.forEach((buy, index) => {
        const amount = this.$big(buy[1])
        buyTotal = buyTotal.plus(amount)
        bids.push({
          price: this.$big(buy[0]),
          amount: this.$big(buy[1]),
          deep: this.$big(buy[1]).div(maxBuyTotal).times(100).round(4).toString(),
          total: buyTotal
        })
        if (index === 0) {
          this.buyOnePrice = buy[0]
        }
      })
      this.sell.forEach((sell, index) => {
        const amount = this.$big(sell[1])
        sellTotal = sellTotal.plus(amount)
        asks.unshift({
          price: this.$big(sell[0]),
          amount: this.$big(sell[1]),
          deep: this.$big(sell[1]).div(maxSellTotal).times(100).round(4).toString(),
          total: sellTotal
        })
        if (index === 0) {
          // console.log("sell:" + sell[0])
          this.sellOnePrice = sell[0]
        }
        // console.log(asks,bids)
      })
      // console.log(asks,asks)
      let asksRepair = []
      if (asks.length < 20) {
        for (var i = 0; i < (20 - asks.length); i++) {
          asksRepair.push({})
        }
        asksRepair = asksRepair.concat(asks)
      } else {
        asksRepair = asks
      }
      this.asks = asksRepair
      this.bids = bids
      // this.setOnePrice(this.buyOnePrice.toString(), this.sellOnePrice.toString())

      // ?????????????????????????????????????????????????????????????????????????????????????????????
      this.computedScrollPosition()
      if (this.isFristAdultScrolling) {
        this.isFristAdultScrolling = false
      }
    },
    // ??????????????????
    // setOnePrice (buyPrice, sellPrice){
    //   this.$eh.$emit('protrade:exchange:setOnePrice', {buyPrice, sellPrice})
    // },
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
    },
    assignData (data) {
      if (!data) { return } 
      const toBig = item => [this.$big(item.values[0]), this.$big(item.values[1])] 
      this.buy = _.map(data.bids, toBig)
      this.sell = _.map(data.asks, toBig)
      let bid = _.get(this.buy, '0.0', 0)
      if (bid && !bid.eq(this.state.ct.bid)) {
        // this.state.ct.bid = bid
      }

      let bidVol = _.get(this.buy, '0.1', 0)
      if (bidVol && !bidVol.eq(this.state.ct.bidVol)) {
        // this.state.ct.bidVol = bidVol
      }

      let ask = _.get(this.sell, '0.0', 0)
      if (ask && !ask.eq(this.state.ct.ask)) {
        // this.state.ct.ask = ask
      }

      let askVol = _.get(this.sell, '0.1', 0)
      if (askVol && !askVol.eq(this.state.ct.askVol)) {
        // this.state.ct.askVol = askVol
      }

      this.loading = false
      this.changing = false
      this.update()
      // this.$eh.$emit('protrade:orderbook:update', { data })
    },
    closePanels () {
      this.panelShow = false
    },
    onresize: _.debounce(function () {
      // this.panelHeight = this.container.height
    }, 100),
    layout () {
      this.onresize()
      // this.$eh.$on('app:resize', this.onresize)
    },
    /**
     * ????????????????????????????????????
     */
    computedScrollPosition () {
      // ?????????????????????????????? 
      if (!this.isFristAdultScrolling) return
      // ??????????????????
      // const singleSideLength = 12.5
      // mode === 'both'
      this.$nextTick(() => {
        this.$refs['body'].scrollTop = (this.asks && this.asks.length) ? (this.asks.length - this.singleSideLength) * 20 : 300
      })
      // ??????????????????????????????????????????
      setTimeout(() => {
        this.$refs['body'].scrollTop = (this.asks && this.asks.length) ? (this.asks.length - this.singleSideLength) * 20 : 300
      }, 300)
    },
    jumpToHistory () {
      this.$router.push({name: 'TradeIndex', params: {pair: this.state.ct.pair}})
    },
    handleScroll (e) {
      this.$nextTick(() => {
        let tag = e.target
        let [ask, split, bid] = tag.children
        if (ask.offsetHeight - tag.scrollTop + split.offsetHeight >= tag.offsetHeight ||
          ask.offsetHeight - tag.scrollTop + split.offsetHeight <= 0
        ) {
          this.hasBtnReturnDish = true
        } else {
          this.hasBtnReturnDish = false
        }
      })
    },
    returnToDefault () {
      // const singleSideLength = 7 
      this.$refs['body'].scrollTop = (this.asks && this.asks.length) ? (this.asks.length - this.singleSideLength) * 20 : 300
    }
  },
  created () {
    // this.$eh.$on('app:click', this.closePanels)
    // this.$eh.$on('protrade:layout:init', this.layout)
  },
  mounted () {
    let height = utils.getComputedStyle(this.$refs.body, 'height')
    // this.panelHeight = parseInt(height)
    const el = this.$refs['body']
    el.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    // this.$eh.$off('app:resize', this.onresize)
    // this.$eh.$off('app:click', this.closePanels)
    // this.$eh.$off('protrade:layout:init', this.layout)
    // if (this.socket) {
    //   this.socket.$destroy()
    // }
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    display: none;
    width: 0px;
    height: 10px;
  }
::-webkit-scrollbar-thumb {
  background: $contract-block-active-bg;
  border: none;
}
.orderbook-container {
  flex: 1;
  // height: 100%;
  width: 100%;
  .ix-pannel {
    height: 100%;
    .ix-pannel-body {
      width:100%;
      flex-grow: 1;
      overflow-y: scroll;
      scrollbar-width: none;
    }
  }
}
.el-link{
  font-size: 14px;
  color: #888;
  &:hover{
    text-decoration: underline;
    color: $--color-primary;
  }
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

.depth-options-wrapper {
    padding-top: 4px;
    position: absolute;
    right: -18px;
    z-index: 9999;
}
.depth-options {
    box-sizing: border-box;
    min-width:100px;
    background:$contract-block-active-bg;
    border-radius:4px;
    padding-top: 10px;

    .depth__row {
        box-sizing: border-box;
        padding: 0 24px;
        height: 30px;
        line-height: 30px;
        width: 100%;
        text-align: right;

        &:hover {
          color: $primary;
          background-color: $contract-block-bg;
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
  color: $--contract-pannel-header;
  font-size: 0;
}
.depth-group-display {
  font-size: 12px;
  margin-right: 18px;
  color: $--contract-pannel-header;
  font-size: 12px;
  text-align: right;

  .depth {
    @include limit(1);
  }
}
.arrow-down-yellow {
    width: 12px;
    height: 6px;
    position: absolute;
    top: 14px;
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
  height: 35px;
}
.ix-panel-body {
  overflow-y: scroll;
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
  line-height: 35px;
  padding: 0 5px;
  width: 30%;
  box-sizing: border-box;
  &:last-child {
    width: 40%;
  }
  // &.right {
  //   text-align: right;
  // }
  // &:first-child {
  //   text-align: left; 
  // }
}
.table tbody tr:hover {
  background-color: $primary-opacity;
}
.table.dark tbody tr:hover {
  background-color: $primary-opacity2;
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
.order-split.dark { 
  background: $contract-block-bg2;
}
.order-split {
  position: sticky;
  top: 0;
  bottom:0;
  color: white;
  padding: 0 12px;
  line-height: 34px;
  font-size: 16px; 
  text-align: center;
  background: $contract-block-active-bg;
  @include clearfix();
  z-index: 2;
  &.displayFlex{
    padding: 0 10px;
    display: flex;
    justify-content: space-between
  }
  &.bid {
    top: 0;
    bottom: auto;
  }
  &.ask {
    bottom: 0;
    top: auto;
  }
  .left-part {
    float: left;
    // font-size: 12px;
    .last-price {
      line-height: 24px;
    } 
    .estimate {
      font-size: 12px;
      line-height: 17px;
      color: fade-out(white, .6);
    }
    // a, a:visited, a:focus {
    //     color: $primary
    // }
  }
  .delta { 
    float: left;
    padding-right: 5px;
    font-size: 16px;
    font-weight:bold;
    white-space: nowrap;
    &.color-down {
      .iconfont {
        transform: rotateX(180deg) 
      } 
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
