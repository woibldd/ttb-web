<template>
  <div
    class="trading-chart"
    ref="wrap">
    <v-nav
      pro="1"
      v-if="!isMobile"/>
    <mobile-nav v-if="isMobile" />
    <div class="container-trade-panel">
      <div class="ix-row">
        <div class="ix-col ix-col-2">
          <!-- 大盘顶部当前交易对信息 -->
          <pair-title/>
          <!-- 倒计时 & 大盘 -->
          <div
            class="ix-grid ix-grid-tv"
            ref="gridTradingView">
            <TradingView
              ref="TradingView"
            />
            <!-- <div
              class="active-box"
              v-if="showCountdown">
              <p class="text"><span v-html="$t('active_countdown_text')"/><span class="seconds">{{ countdownText }}</span>{{ $t('active_countdown_unit') }}</p>
              <router-link
                class="line link"
                :to="{name: 'relay'}"
                target="_blank">{{ $t('active_rules') }}</router-link>
              <span
                class="line totally"
                v-if="typeof relayTotal[state.pro.pair] != 'undefined'">{{ $t('active_relay_short') }} {{ relayTotal[state.pro.pair]|round(0) }} USDT</span>
              <span
                class="close pointer"
                @click.prevent="closeBox"
              >x</span>
            </div> -->
          </div>
        </div>

        <div class="trade-top-right">
          <div class="ix-col-rb ix-height-rt flex-row">
            <!-- bids & asks -->
            <div
              class="ix-grid ix-grid-orderbook"
              ref="gridOrderbook">
              <Orderbook ref="Orderbook"/>
            </div>
            <div
              class="ix-grid ix-grid-deal pb-5"
              ref="gridDeal">
              <!-- 最新交易 -->
              <Deal ref="Deal"/>
            </div>
          </div>
          <!--  限价单 & 市价单 -->
          <div
            class="ix-grid ix-grid-operate ix-col-rb"
            ref="gridOperate">
            <Operate ref="Operate"/>
          </div>
        </div>
      </div>
      <div class="ix-row">
        <!--  当前委托 & 委托历史 -->
        <div
          v-if="state.userInfo"
          class="ix-grid ix-grid-order"
          ref="gridOrder">
          <Order ref="Order"/>
        </div>
      </div>
      <!-- 币种介绍 -->
      <div class="ix-row">
        <div
          class="ix-grid ix-grid-intro"
          ref="gridIntro">
          <coin-intro/>
        </div>
      </div>
    </div>
    <order-deal-popover />
    <v-modal :open.sync="showMvpModal">
      <div class="pd-20 mvp-modal">
        <article  class="mt-20 mb-20">
          <h3 style="text-align:center; font-size:20px; font-weight: 600; " class="mb-8">{{ $t('trading_page.mpv_modal.tips') }}</h3>  
          <p  class="mb-20">{{ $t('trading_page.mpv_modal.content_a')}}</p>
          <p  class="mb-20">{{ $t('trading_page.mpv_modal.content_b')}}</p>
          <a>{{ $t('trading_page.mpv_modal.content_c')}}</a> 
        </article>  
        <p style="text-align:left">{{ $t('trading_page.mpv_modal.content_d')}}</p>
        <div>
          <el-checkbox v-model='agreeMPV'>{{$t('trading_page.mpv_modal.chk_text')}}</el-checkbox>
          <a href="https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360035136651">{{$t("trading_page.mpv_modal.content_e")}}</a>
        </div>
        <div class="mt-10 mb-15">
          <el-button type="primary" 
            style="width: 100%;"
            :disabled="!agreeMPV"
            @click="activeMpv"
          >{{$t('confirm')}}</el-button>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script>
import _ from 'lodash'
import { local, state } from '@/modules/store'
import service from '@/modules/service'
import utils from '@/modules/utils'
import MobileNav from '@/components/Mobile/MobileNav.vue'
import VNav from '@/components/VNav3'

import TradingView from '@/components/Trading/TradingView'
import Order from '@/components/Trading/Order'
import Deal from '@/components/Trading/Deal'
// import DepthChart from '@/components/DepthChart'
import Orderbook from '../components/Trading/Orderbook'
import PairNav from '@/components/Trading/PairNav'
import Operate from '@/components/Trading/Operate'
import OrderDealPopover from '@/components/Trading/OrderDealPopover'
import coinIntro from '@/components/Trading/coin-intro'
import PairTitle from '@/components/Trading/PairTitle'
import responsiveScale from '@/mixins/responsiveScale'

export default {
  mixins: [responsiveScale],
  name: 'Trading',
  components: {
    VNav,
    OrderDealPopover,
    TradingView,
    Order,
    Deal,
    coinIntro,
    // DepthChart,
    Orderbook,
    PairNav,
    Operate,
    PairTitle, 
    MobileNav
  },
  computed: { 
    isLogin() {
      return this.state.userInfo !== null;
    },
  },
  data () {
    return {
      state,
      comps: [],
      isMobile: utils.isMobile(),
      showMvpModal: false,
      agreeMPV: false
    }
  },
  watch: {
    '$route.params.pair': {
      async handler (pair = '', last) { 
        this.state.pro.lock = true
        const match = pair.match(/^([A-Za-z0-9]*)_([A-Za-z0-9]*)$/)

        if (this.isLogin) {
          //默认可交易
          this.state.pro.isActivity = true
          if (!!match && match.indexOf('MPV') > -1) {
            if (this.state.pro.activityList.indexOf('mpv_user') > -1) {
              this.showMvpModal = false
            } else {
              console.log('$route.params.pair')
              this.showMvpModal = true
              this.state.pro.isActivity = false
            }
          } 
        }
        if (match) {
          this.state.pro.pair = pair
          local.pair = pair
          const [product, currency] = match.slice(1, 3)
          this.state.pro.product_name = product
          this.state.pro.currency_name = currency
          const res = await service.getPairInfo({ symbol: pair })
          if (!res.code) {
            this.state.pro.pairInfo = res.data
            this.state.close_time = res.data.close_time
            this.state.price_open = res.data.price_open || 0.017
            this.state.showCountDown = false // !!this.state.close_time && this.state.close_time != ""
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
      if (
        this.state.pro.product &&
        this.state.pro.product.currency_name !== product
      ) {
        this.state.pro.product = null
      }
      if (
        this.state.pro.currency &&
        this.state.pro.currency.currency_name !== currency
      ) {
        this.state.pro.currency = null
      }
      let [resc, resp] = await service.getBalanceByPair(currency, product)
      if (!resc || typeof resc.available === 'undefined') {
        resc = {
          available: '0',
          currency: currency,
          ordering: '0',
          quota: '20000',
          withdrawing: '0'
        }
      }

      if (!resp || typeof resp.available === 'undefined') {
        resp = {
          available: '0',
          currency: product,
          ordering: '0',
          quota: '20000',
          withdrawing: '0'
        }
      }
      if (
        resc &&
        resp &&
        product === this.state.pro.product_name &&
        currency === this.state.pro.currency_name
      ) {
        this.state.pro.product = resp
        this.state.pro.currency = resc
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
      this.setGridContainers()
    },
    closeModal() {
    },
    async activityWalletSet(symbol) {
      let params = {
        tagSymbol: symbol
      }
      let res = await service.futureActivitySet(params)
      //console.log({res})
      if (!res.code && res.message == "OK") { 
        this.state.pro.isActivity = true 
        this.showMvpModal = false 
      } else {
        utils.alert(res.message)
      }
    },
    async activityWalletGet() {
      let params = {} 
      let res = await service.futureActivityGet(params)
      //console.log({res})
      if (!res.code) {
        this.state.pro.activityList = res.data

        const pair = this.state.pro.pair
        this.state.pro.lock = true
        const match = pair.match(/^([A-Za-z0-9]*)_([A-Za-z0-9]*)$/) 
        //默认可交易
        this.state.pro.isActivity = true
        if (!!match && match.indexOf('MPV') > -1) {
          if (this.state.pro.activityList.indexOf('mvp_user') > -1) {
            this.showMvpModal = false
          } else {
            console.log('activityWalletGet')
            this.showMvpModal = true
            this.state.pro.isActivity = false
          }
        } 
        this.state.pro.lock = false
      }
    },
    activeMpv() { 
      this.activityWalletSet('mpv_user')   
    }
  },
  async created () {
    document.querySelector('.page-loading').classList.add('show')
    await this.activityWalletGet()
    if (!this.$route.params.pair) {
      const res = await service.getPairList()
      if (res.code) {
        return utils.alert(res.message)
      }
      this.$router.replace({
        name: 'trading',
        params: {
          pair: _.find(res.data.items, item => item.name === local.pair)
            ? local.pair
            : res.data.items[0].name
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
      // this.$eh.$on('deal:update', this.dealChanged)
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
    // this.$eh.$off('deal:update', this.dealChanged)
    // this.stopTimer()
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
  color: #bcbfce;
  min-height: 100%;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  .mvp-modal {
    width: 430px;
    line-height: 1.5em;
    font-size: 14px;

    article {
      color: #666;
      h3 {
        font-size:16px;
        padding-bottom:20px;
      } 
    }
  }
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
  background: $protrade-bg;
}
.ix-col {
  display: flex;
  flex-direction: column;
}
.ix-col-rt {
  width: 300px;
}
.ix-col-rb {
    width: 600px;
}
.ix-height-rt {
    height: 320px;;
}
.ix-col-2 {
  flex: 1;
}
.ix-col-3 {
  width: 320px;
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
  height: 320px;
}
.ix-grid-orderbook {
  // height: 2px;
}
.ix-grid-pairnav {
  // flex: 1;
  height: 268px;
}
.ix-grid-operate {
  flex: 1;
  // height: 1px;
}
.ix-grid-intro {
  flex: 1;
  // height: 300px;
}
.active-box {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 260px;
  height: 68px;
  background: url("../assets/active_bg.png") no-repeat;
  background-size: 100%;

  .text {
    font-size: 16px;
    line-height: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #737373;
    margin-top: 12px;
    margin-left: 14px;

    .seconds {
      font-size: 20px;
      color: #A37138;
      width: 22px;
      text-align: right;
      margin-right: 5px;
      display: inline-block;
    }
  }
  .line {
    position: absolute;
    bottom: 6px;
    padding: 1px 3px;
    box-sizing: content-box;
    font-size: 12px;
    color: #737373;
    font-weight: bold;

    &.link {
      cursor: pointer;
      border: 1px solid #ffffff;
      background:linear-gradient(0deg,rgba(195,196,196,1) 0%,rgba(255,255,255,1) 100%);
      border-radius:20px;
      left: 14px;
      padding: 2px 8px;
    }
    &.totally {
      right: 55px;
      bottom: 8px;
    }
  }

  .close {
    position: absolute;
    right: 4px;
    top: 4px;
    text-align: center;
    font-size: 18px;
    line-height: 14px;
    display: block;

    width: 16px;
    height: 16px;
    color: #000;
    opacity: 1;

    &:hover {
      opacity: 0.5;
    }
  }

}
.flex-row {
    display: flex;
}
@media screen and (max-width: 1200px) {
  .ix-grid-orderbook {
    height: 310px;
  }
  .wd-100 {
    width: 100%;
  }
}
.mobile {
  .ix-grid-orderbook {
    height: 310px;
  }
  .wd-100 {
    width: 100%;
  }
}
</style>

<style lang="scss">

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
