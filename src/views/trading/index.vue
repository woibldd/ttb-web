<template>
  <div class="trading-chart" ref="wrap">
    <!-- <v-navbc v-if="state.siteName==='BachEx' &&!isMobile" :dark="true" />
    <v-nav  :dark="true" pro="1" v-else-if="!isMobile"/> -->
    <!-- <mobile-nav v-if="isMobile"/> -->
    <div class="trade-panel-new pd-5" flex="box:last"  :skin="state.skin">
      <div class="mr-5"> 
        <div class="trade-box mb-5"> 
          <!-- 大盘顶部当前交易对信息 -->
          <pair-title/>
        </div>
        <div class="" flex="box:last"> 
          <!-- k线 深度图 -->
          <div class="trade-box mr-5"> 
            <div class="tv-header" flex="main:justify cross:center">
              <div class="tv-tools" flex="cross:center">
                <el-dropdown class="tool" @command="handleCyclesCommand" size="mini">
                  <span class="el-dropdown-link pointer">
                    <span style="display: inline-block; width:36px; white-space: nowrap;">{{ $t(`tv.cycles.${local.intervalText}.text`)}}</span> <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu :class="state.skin" slot="dropdown"> 
                    <el-dropdown-item 
                      v-for="(item, index) in mapCycles"  
                      :command="index"
                      :key="index"> 
                      <div style="width: 50px; text-align:center;" >{{item.text}}</div>
                    </el-dropdown-item> 
                  </el-dropdown-menu>
                </el-dropdown> 
                <div class="sep"></div>
                <el-dropdown class="tool" @command="handleTypesCommand">
                  <span class="el-dropdown-link pointer">
                    <icon name="candle" /> 
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span> 
                  <el-dropdown-menu :class="state.skin" slot="dropdown">
                    <el-dropdown-item 
                      v-for="(value, key) in mapChartTypes"  
                      :command="key"
                      :key="key"> 
                      <label>
                        <icon class="f24" :name="value.icon" /> 
                        <span>{{value.name}}</span> 
                      </label> 
                    </el-dropdown-item> 
                  </el-dropdown-menu>
                </el-dropdown> 
                <div class="sep"></div>
                <label class="el-dropdown-link pointer tool" @click="handleTVOption('indicators')"> 
                  <icon name="view"/>
                </label> 
                <div class="sep"></div>
                <label class="el-dropdown-link pointer tool" @click="handleTVOption('drawing')">
                  <span class="draw">{{ $t('tv.navs.left.drawing_tools') }}</span>  
                </label>
                <div class="sep"></div>
                <label class="el-dropdown-link pointer tool" @click="handleTVOption('setting')"> 
                  <icon name="setting" />
                </label>
                <div class="sep"></div> 
                <label class="el-dropdown-link pointer tool" @click="handleTVOption('fullscreen')"> 
                  <icon name="fullscreen" />
                </label>   
              </div>
              <div class="tv-tab">
                <label :class="{active:selectTV==='kline'}" @click="selectTV='kline'">{{ $t('tv.navs.right.kline') }}</label>
                <label :class="{active:selectTV==='depth'}" @click="selectTV='depth'">{{ $t('tv.navs.right.deep') }}</label>
              </div>
            </div>
            <div class="ix-grid ix-grid-tv" ref="gridTradingView" >
              <div v-show="selectTV==='kline'" style="height: 483px;">
                <TradingView ref="TradingView"/>
              </div>
              <div v-show="selectTV==='depth'" style="height: 483px;">
                <div class="ix-header" >
                  <span> {{ $t('orderbook_chart') }}</span>
                </div>
                <depthMap
                    v-if="selectTV==='depth'"
                    v-loading="!delegateData"
                    :data="delegateData"
                    :pair="pair"
                    element-loading-background="rgba(0, 0, 0, 0.3)" />
              </div> 
            </div>
          </div>
          <div class="" style="width:250px; ">
            <div class="trade-box mb-5"> 
              <!-- 委托列表 -->
              <div class="ix-grid ix-grid-orderbook" ref="gridOrderbook">
                <Orderbook ref="Orderbook" :dataTable="delegateData" @setDeep="changeDeep" />
              </div>
            </div>
            <div class="trade-box ">
              <!-- 最新交易 -->
              <div class="ix-grid ix-grid-deal pb-5" ref="gridDeal">
                <Deal ref="Deal" :dataTable="dealData"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="trade-box"  style="width:320px; "> 
        <Operate ref="Operate"/>
      </div> 
    </div>
    <div class="container-trade-panel">
      <div class="ix-row">
        <div class="ix-col ix-col-2">
          <!-- 倒计时 & 大盘 -->
          <div class="ix-grid ix-grid-tv">
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
            </div>-->
          </div>
        </div> 
        
      </div>
      <div class="ix-row">
        <!--  当前委托 & 委托历史 -->
        <div v-if="state.userInfo" class="ix-grid ix-grid-order" ref="gridOrder">
          <Order ref="Order"/>
        </div>
      </div>
      <!-- 币种介绍 -->
      <div class="ix-row">
        <div class="ix-grid ix-grid-intro" ref="gridIntro">
          <coin-intro/>
        </div>
      </div>
    </div>
    <order-deal-popover/>
    <v-modal :open.sync="showMvpModal">
      <div class="pd-20 mvp-modal">
        <article class="mt-20 mb-20">
          <h3>请您认真阅读以下内容：</h3>
          <p>根据MPV项目法律监管要求，MPV项目需要获取您的以下信息：</p>
          <p>MPV持有者的账号、名字、证件号、电邮、MPV成交量信息、充/提币信息、MPV划转信息。</p>
        </article>
        <div style="text-align:right" class="mb-10">
          <el-button @click="closeModal">不再提醒</el-button>
          <el-button type="primary" @click="closeModal">确认</el-button>
        </div>
        <p style="text-align:right">*这将不会影响您的提币操作</p>
      </div>
    </v-modal>
    <v-modal :open.sync="showSgpDialog" @close="handleCloseSgpDialog">
      <div class="el-message-box ix-message-box-wrapper sgp-dialog">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>{{$t('sgp.tips_title')}}</span>
          </div>
        </div>
        <div class="el-message-box__content">
          <p>{{$t('sgp.tips_content_1')}}</p>
          <p>{{$t('sgp.tips_content_2')}}</p>
          <p>{{$t('sgp.tips_content_3')}}</p>
          <p>{{$t('sgp.tips_content_4')}}</p>
          <p>{{$t('sgp.tips_content_5')}}</p>
        </div>
        <div class="el-message-box__btns">
          <el-checkbox
            v-model="neverShowSgpAgain"
            @change="handleNeverShowSgpAgain"
          >{{$t('no_alert_again')}}</el-checkbox>
          <button
            type="button"
            @click="showSgpDialog=false"
            class="el-button el-button--default el-button--small el-button--primary btn--confirm"
          >
            <span>{{$t('confirm')}}</span>
          </button>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script>
import _ from "lodash";
import { local, state } from "@/modules/store";
import service from "@/modules/service";
import utils from "@/modules/utils";
import MobileNav from "@/components/Mobile/MobileNav.vue";
import VNav from "@/components/VNav3";
import VNavbc from '@/components/VNavBC.vue'
import responsiveScale from "@/mixins/responsiveScale";
import wsNew from '@/modules/ws-new'
import depthMap from '@/components/depth-map'

import TradingView from "./components/TradingView";
import Order from "./components/Order";
import Deal from "./components/Deal"; 
import Orderbook from "./components/Orderbook";
import PairNav from "./components/PairNav";
import Operate from "./components/Operate";
import OrderDealPopover from "./components/OrderDealPopover";
import coinIntro from "./components/coin-intro";
import PairTitle from "./components/PairTitle";

export default {
  mixins: [responsiveScale],
  name: "Trading",
  components: {
    VNav,
    VNavbc,
    OrderDealPopover,
    TradingView,
    Order,
    Deal,
    coinIntro,
    // DepthChart,
    Orderbook,
    PairNav,
    Operate,
    MobileNav,
    PairTitle,
    depthMap,
  },
  data() {
    return {
      state,
      local,
      comps: [],
      isMobile: utils.isMobile(),
      showMvpModal: false,
      site: state.site,
      showSgpDialog: false,
      neverShowSgpAgain: local.neverShowSgpTradingDialog,
      socket: null,
      delegateData: [],
      dealData: [],
      selectTV: 'kline'
    };
  },
  watch: {
    "$route.params.pair": {
      async handler(pair = "", last) { 
        this.state.pro.lock = true;
        const match = pair.match(/^([A-Za-z0-9]*)_([A-Za-z0-9]*)$/);
        if (match) {
          this.state.pro.pair = pair;
          local.pair = pair;
          const [product, currency] = match.slice(1, 3);
          this.state.pro.product_name = product;
          this.state.pro.currency_name = currency;
          const res = await service.getPairInfo({ symbol: pair });
          if (!res.code) {
            this.state.pro.pairInfo = res.data;
            this.state.close_time = res.data.close_time;
            this.state.price_open = res.data.price_open || 0.017;
            this.state.showCountDown = false; // !!this.state.close_time && this.state.close_time != ""
 
          } else {
            this.state.pro.pairInfo = null;
          }
          await this.refreshBalance();
        }
        this.state.pro.lock = false;
      },
      immediate: true
    }
  },
  computed: { 
    pair () {
      return state.pro.pair
    },
    mapHandlerSocket () {
      return { 
        'heart': this.handleHeart,
        'market': this.handleTickers,
        'deal': this.handleDealSoket,
        'orderbook': this.handleOrderbook, 
      }
    }, 
    mapChartTypes () {
      return this.allLangData.tv.chart_types
    },
    mapCycles () {
      return this.allLangData.tv.cycles
    }, 
  },
  methods: { 
    handleTVOption(option, para) {
      this.$refs.TradingView.handleOption(option, para)
    },
    handleTypesCommand(command) { 
      this.$refs.TradingView.handleOption('chartType', command)
    },
    handleCyclesCommand(command) { 
      this.$refs.TradingView.handleOption('cycle', command)
    },
    async refreshBalance() {
      const product = this.state.pro.product_name;
      const currency = this.state.pro.currency_name;
      if (
        this.state.pro.product &&
        this.state.pro.product.currency_name !== product
      ) {
        this.state.pro.product = null;
      }
      if (
        this.state.pro.currency &&
        this.state.pro.currency.currency_name !== currency
      ) {
        this.state.pro.currency = null;
      }
      let [resc, resp] = await service.getBalanceByPair(currency, product);
      if (!resc || typeof resc.available === "undefined") {
        resc = {
          available: "0",
          currency: currency,
          ordering: "0",
          quota: "20000",
          withdrawing: "0"
        };
      }

      if (!resp || typeof resp.available === "undefined") {
        resp = {
          available: "0",
          currency: product,
          ordering: "0",
          quota: "20000",
          withdrawing: "0"
        };
      }
      if (
        resc &&
        resp &&
        product === this.state.pro.product_name &&
        currency === this.state.pro.currency_name
      ) {
        this.state.pro.product = resp;
        this.state.pro.currency = resc;
      }
    },
    setGridContainers() {
      for (var compName in this.$options.components) {
        if (!this.$refs[compName]) {
          continue;
        } 
        const grid = this.$refs["grid" + compName];
        if (grid) {
          this.$refs[compName].container = {
            width: grid.clientWidth,
            height: grid.clientHeight
          };
        }
      }
    },
    async onresize() {
      this.setGridContainers();
    },
    closeModal() {
      this.showMvpModal = false;
    },
    handleCloseSgpDialog() {
      this.showSgpDialog = false;
    },
    handleNeverShowSgpAgain() {
      local.neverShowSgpTradingDialog = this.neverShowSgpAgain;
    }, 
    handleSocketData (res) { 
      const key = res.topic && res.topic.split('@')[0]
      this.mapHandlerSocket[key] && this.mapHandlerSocket[key](res.data)
    },  
    handleHeart(data) {  
      if (this.socket) {
        this.socket.heartCheck.start()
      }
    }, 
    handleOrderbook(data) { 
      this.delegateData = data
    },
    handleTickers (data) { 
      // console.log('handleTickers') 
    },
    handleDealSoket(data) { 
      this.dealData = data
    }, 
    subMarket() {    
      const that = this
      if (utils.$tvSocket) {
        utils.$tvSocket.$destroy()
      }
      utils.$tvSocket = wsNew.create()
      this.socket = utils.$tvSocket 
      this.socket.$on('open', () => { 
        // that.socket.heartCheck.start() 
        that.socket.socket.send('{"op":"subscribepub","args":["market@ticker"]}') 
        if (that.state.userInfo) {
          that.socket.socket.send(`{"op":"loginWeb","args":["${that.state.userInfo.session_id}"]}`) 
        } 
        if (that.state && that.state.pro && that.state.pro.pair) {
          let period = utils.getPeriod(local.interval)
          that.socket.socket.send(`{"op":"subscribepub","args":["history@${that.state.pro.pair}@${period}"]}`)
          that.socket.socket.send(`{"op":"subscribepub","args":["orderbook@${that.state.pro.pair}@${'0'}@1@20"]}`)
          that.socket.socket.send(`{"op":"subscribepub","args":["deal@${that.state.pro.pair}"]}`) 
        }
      })
      
      this.socket.$on('message', (data) => { 
        that.handleSocketData(data) 
      })
      this.socket.$on('reopen', () => {
        that.socket.$destroy()
        that.subMarket()
      })
    }
  },
  async created() { 
    document.querySelector(".page-loading").classList.add("show");
    if (!this.$route.params.pair) {
      const res = await service.getPairList();
      if (res.code) {
        return utils.alert(res.message);
      }
      if (!local.pair && this.site === 'sgp_') {
        local.pair = 'ETH_BTC'
      } 
      this.$router.replace({
        name: "tradingx",
        params: {
          pair: _.find(res.data.items, item => item.name === local.pair)
            ? local.pair
            : res.data.items[0].name
        }
      });
    }
    this.state.loading = true; 
    this.subMarket()
    this.$nextTick(() => {
      // const layoutHeight = window.innerHeight
      // this.$refs.wrap.style.height = layoutHeight + 'px' 
    if (this.site === 'sgp_' && local.neverShowSgpTradingDialog === false) {
        this.showSgpDialog = true
    }
      this.state.loading = false;
      this.state.pro.layout = true;

      this.setGridContainers();

      this.$eh.$emit("protrade:layout:init");
      utils.log("Layout inited");

      this.$eh.$on("protrade:balance:refresh", this.refreshBalance);
      this.$eh.$on("app:resize", this.onresize);
      // this.$eh.$on('deal:update', this.dealChanged)
      document.querySelector(".page-loading").classList.remove("show");
    });
  },
  beforeRouteLeave(to, from, next) {
    if (this.state.pro.lock) {
      return next(false);
    }
    this.$refs.TradingView.$destroy();
    next();
  },
  destroyed() {
    this.$eh.$off("app:resize", this.onresize);
    this.$eh.$off("protrade:balance:refresh", this.refreshBalance);
    // this.$eh.$off('deal:update', this.dealChanged)
    // this.stopTimer()
    this.state.pro.layout = false;
    document.querySelector(".page-loading").classList.remove("show");
    document.documentElement.setAttribute("style", "");
  }
};
</script>

<style lang="scss" scoped>
.trade-panel-new {
  background-color: $contract-bg;
  &[skin~="dark"] {
    background-color: $contract-bg2;
    .trade-box {
      background-color: $--contract-table-bg2; 
    }
  }
  color:#CBCBCB;
  .trade-box {
    background-color: $--contract-table-bg;
    min-height: 60px;
  }
  .tv-header {
    height: 60px;
    .tv-tools {
      @include clearfix();
      color:#9B9B9B;
      .draw {
        border:1px solid;
      }
      .tool {
        float: left;
        .iconfont {
          color:#9B9B9B;
        }
      }
      label.el-dropdown-link {
        padding: 4px 12px;
        &:hover {
          color: #dddddd;
        }
      }
      .el-dropdown-link:hover {
        color: #eeeeee;
      }
      .sep {
        float: left;
        margin-top: 3px;
        width:1px;
        height: 20px;
        background-color: #dddddd;
      }
    }
    .tv-tab {
      margin: 0 10px;
      font-size: 0;
      label {
        font-size: 14px;
        padding: 5px 10px;
        margin:0;
        border:1px solid $primary;
        color: $primary; 
        &.active {
          background-color: $primary;
          color: $primary-back;
        }
        &:nth-child(1) {
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }
        &:nth-child(2) {
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;;
        }
      } 
      
    } 
  }
  
  .ix-grid { 
    position: relative;
    .ix-grid-deal {
      flex: 1;
      height: 320px;
    }
  }
}

.container-trade-panel {
  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  ::-webkit-scrollbar-track {
  }
  ::-webkit-scrollbar-thumb {
    background-color: RED;
    border: 2px solid #141721;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}
.trading-chart {
  width: 100%;
  overflow: hidden;
  user-select: none;
  position: relative;
  color: #bcbfce;
  min-height: 100%;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  .mvp-modal {
    font-size: 14px;
    article {
      color: #666;
      h3 {
        font-size: 16px;
        padding-bottom: 20px;
      }
    }
  }
  .sgp-dialog {
    width: 600px;
    .el-message-box__title {
      text-align: center;
    }
    // .el-message-box__content {
    //   text-indent: 2em;
    // }
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
  height: 320px;
}
.ix-col-2 {
  flex: 1;
}
.ix-col-3 {
  width: 320px;
}
.ix-grid {
  position: relative;
  // border-top: 4px solid $splitter;
  // border-left: 4px solid $splitter;
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
  height: 220px;
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
  background: url("~@/assets/active_bg.png") no-repeat;
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
      color: #a37138;
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
      background: linear-gradient(
        0deg,
        rgba(195, 196, 196, 1) 0%,
        rgba(255, 255, 255, 1) 100%
      );
      border-radius: 20px;
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
