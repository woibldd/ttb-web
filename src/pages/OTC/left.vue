<template>
  <div class="otc-left-container">
    <div class="left-menu-container left-menu-nobottom"> 
      <div class="coin_link arrow-down"
        :class="{hover: down}"
        @click="down=!down"
        >
        <dl>
          <dt>{{coin.name +'/' + coin.symbol}}</dt>
          <dd>
            {{ $t(coin.name)}}
            <icon class="arrow ml-5" name="arrow-down-w" />
          </dd>
        </dl> 
        <div class="dropdown-sub-menu">
          <ul class="dropdown-list pt-1 pb-1">
            <li
              v-for="(item,index) in symbolList"
              class="dropdown-item link pl-24 pr-24"
              @click="changeCoin(item.name)"
              :key="index"
            >
              <dl>
                <dt>{{item.name +'/' + item.symbol}}</dt>
                <dd>{{ $t(item.name)}}</dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="left-menu-container left-menu-nobottom">
      <div class="left-menu-box">
        <div class="left-menu-title col">
          <!-- <icon name="handle"/>
          <span class="menu-title">{{ $t('otc_trade') }}</span>-->
          <dl>
            <dt>{{$t('currency')}}</dt>
            <dd><span class="text-idx">{{$t('otc_menu_title_price')}}</span></dd>
          </dl>
        </div>
        <ul class="left-menu-list"> 
          <li 
            v-for="(item, idx) in currencyList"
            :key ="idx"
          >
            <router-link
              to="/OTC/Trade"
              class="menu-name"
              :class="{'active': currency === item.currency && from === 'trade'}"
            > 
              <dl @click="setCurrency(item)">
                <dt>{{ $t(item.currency) }}</dt>
                <dd>
                  <span class="text-idx">
                    {{ getFiatMoneySymbolByFiat(legal_currency)}}
                    {{ getRatebyCurrency(item)}}
                  </span> 
                </dd>
              </dl>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="left-menu-container left-menu-nobottom">
      <div class="left-menu-box">
        <p class="left-menu-title">
          <icon name="manager" />
          <span class="menu-title">{{ $t('otc_transaction_manage') }}</span>
        </p>
        <ul class="left-menu-list">
          <li class>
            <router-link class="menu-name" to="/OTC/Hir" active-class="active">
              {{ $t('otc_my_order') }}
              <span class="count" v-if="token && count > 0">{{ count }}</span>
            </router-link>
          </li>
          <!--<li class="">-->
          <!--<router-link-->
          <!--class='menu-name'-->
          <!--to="/OTC/Transfer"-->
          <!--active-class="active" >-->
          <!--{{$t('account_exchange')}}-->
          <!--</router-link>-->
          <!--</li>-->
          <li>
            <router-link
              class="menu-name"
              to="/OTC/FrenchBill"
              active-class="active"
            >{{ $t('otc_side_35') }}</router-link>
          </li>
          <li class>
            <router-link
              class="menu-name"
              to="/OTC/collection"
              active-class="active"
            >{{ $t('otc_collection_payment_setting') }}</router-link>
          </li>
        </ul>
      </div>
      <div class="left-menu-box">
        <p class="left-menu-title">
          <icon name="help" />
          <span class="menu-title">{{ $t('footer_help') }}</span>
        </p>
        <ul class="left-menu-list">
          <li class>
            <a class="menu-name" :href="guidanceLink">{{ $t('footer_hreseqgslp1') }}</a>
          </li>
          <li class>
            <a class="menu-name" :href="commonProblemLink">{{ $t('footer_hreseqgslp2') }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { state } from "@/modules/store"; 
import utils from '@/modules/utils'
import service from "@/modules/service";
import Vue from "vue";
export default {
  data() {
    return {
      state,
      timer: null,
      token: window.localStorage.getItem("X-TOKEN"),
      user: {
        btcCount: 0,
        usdtCount: 0
      },
      symbolList: {
        CNY: {
          name: "CNY",
          rate: "cny_rate",
          symbol: "￥"
        },
        SGD: {
          name: "SGD",
          rate: "sgd_rate",
          symbol: "S$"
        }
      },
      currencyList: [], 
      count: 0, 
      down: false
    };
  },
  methods: {
    setCurrency(item) {
      console.log({item})
      this.currency = item.currency;
      this.state.otc.symbolInfo = item
      this.$eh.$emit("otc:currency:change", item.currency, this.side);
    },
    init() {
      service.otcSymbolList({}).then(res => {
        if (res.code === 0) {
          this.user.btcCount = this.$big(res.data[1][this.coin.rate]).round(2, 0);
          this.user.usdtCount = this.$big(res.data[0][this.coin.rate]).round(2, 0);
        }
      });
      // 委托
      service
        .getUnDonefills({
          page: 1,
          side: 0,
          size: 9999
        })
        .then(res => {
          if (res.code === 0) {
            let countData = [];
            let orderData = [];
            let orderData1 = [];
            let oneData = [];
            res.data.data.forEach(item => {
              orderData.push(item);
            });
            this.count = orderData.length;
            if (this.count <= 0) {
              service
                .getOtcActivefills({
                  page: 1,
                  side: 0,
                  size: 9999
                })
                .then(res => {
                  if (res.code === 0) {
                    res.data.data.forEach(item => {
                      if (item.state === 1 || item.state === 2 || item.state === 6 ) countData.push(item);
                    });
                    this.count = countData.length;
                  }
                });
            }
          }
        });
    },
    changeCoin(command) {
      this.legal_currency = command;
    },
    getCurrencyList() { 
      service.otcSymbolList({}).then((res) => {
        if (res.code === 0) { 
          this.$set(this, "currencyList", res.data ) 
          if (!this.state.otc.symbolInfo) {
            this.state.otc.symbolInfo = res.data[0]
          }
        }
      })
    }, 
    getRatebyCurrency(item) {
      let currency = this.legal_currency.toLowerCase() 
      return item[currency + '_rate']
    },
    getFiatMoneySymbolByFiat (fiat) {
      const map = {
        'CNY': '¥',
        'USD': '$',
        'KRW': '₩',
        'HKD': 'HK$',
        'JPY': 'JP¥',
        'SGD': 'S$',
      }
      return map[fiat] || fiat
    },
  },
  created() {
    this.init();  
    this.getCurrencyList(); 
    this.timer = setInterval(() => {
      this.getCurrencyList(); 
      service
        .getUnDonefills({
          page: 1,
          side: 0,
          size: 9999
        })
        .then(res => {
          if (res.code === 0) {
            let countData = [];
            let orderData = [];
            let orderData1 = [];
            let oneData = [];
            res.data.data.forEach(item => {
              orderData.push(item);
            });
            this.count = orderData.length;
            if (this.count <= 0) {
              service
                .getOtcActivefills({
                  page: 1,
                  side: 0,
                  size: 9999
                })
                .then(res => {
                  if (res.code === 0) {
                    res.data.data.forEach(item => {
                      if (item.state === 1 || item.state === 2 || item.state === 6 ) countData.push(item);
                    });
                    this.count = countData.length;
                  }
                });
            }
          }
        });
    }, 5000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
    currency: {
      get() {
        return this.state.otc.currency;
      },
      set(value) {
        this.state.otc.currency = value;
      }
    },
    side: {
      get() {
        return this.state.otc.showSide;
      }
    },
    commonProblemLink() {
      let link =
        "https://ixxcustomer.zendesk.com/hc/zh-cn/categories/360001229751";
      if (this.state.locale === "en") {
        link = link.replace("zh-cn", "en-us");
      }
      return link;
    },
    guidanceLink() {
      let link =
        "https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360029413991";
      if (this.state.locale === "en") {
        link = link.replace("zh-cn", "en-us");
      }
      return link;
    },
    from() {
      return this.$route.name;
    },
    legal_currency: {
      get() {
        return state.otc.legal_currency;
      },
      set(value) {
        state.otc.legal_currency = value;
      }
    },
    coin() {
      return this.symbolList[this.legal_currency];
    }
  },
  watch: {
    legal_currency() {
      this.init();
    }
  }
};
</script>
<style lang="scss" scoped>
.otc-left-container {
  float: left;
  .left-menu-nobottom {
    border-bottom: 0;
    margin-bottom: 0;
  }
  .left-menu-container {
    background: #fff;
    position: relative;
    padding-top: 20px;
    // padding-bottom: 20px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 16px;
    width: 210px;
    &:first-child {
      padding-top: 0;
    }

    .left-menu-box {
      &:not(:first-child) {
        padding-top: 20px;
        border-top: 1px solid #e9e9e9;
      }
    }

    .left-menu-title {
      width: 100%;
      font-size: 14px;
      margin-left: 12px;
      text-align: left;
      color: $text-weak;
      box-sizing: border-box; 
      .menu-title {
        margin-left: 6px;
      }
      &.col { 
        margin-left: 0;
        dl {
          padding-left: 25px; 
        }
      }
    }

    .left-menu-list {
      width: 100%;
      margin-top: 5px; 
      .menu-name {
        box-sizing: border-box;
        width: 100%;
        display: inline-block;
        padding-left: 25px;
        color: $text-strong;

        &.active,
        &:hover {
          color: $primary;
          background: $profile-menu-bg;
          box-shadow: inset 3px 0 0 0 $primary;
          span {
            color: #fff;
          }
        }
      }
      .sub-menu-group {
        margin-top: 10px;
      }
      .sub-menu-item {
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: 50px;
        color: #333333;

        &:hover,
        &.active {
          color: #c9aa6d;
        }
      }
      li {
        width: 100%;
        text-align: left;
        line-height: 36px;
        font-size: 14px;
        color: #333;
        cursor: pointer;
        margin-bottom: 5px;
      }
      dt {
        font-size: 14px; 
        font-weight:400;
      }
    }

    dl {
      display: flex;
      dt,
      dd {
        flex: 1;
      }
      dt {
        font-size: 14px;
        //font-weight: bold;
      }
      dd {
        font-size: 12px;
        color: #999;
      }
    }

    .coin_link {
      font-size: 16px;
      position: relative;
      background-color: #fefefe;
      border-radius: 5px;
      margin-top: 4px;
      text-align: center;
      vertical-align: middle;

      height: 40px;
      line-height: 40px;

      cursor: pointer;
      &.arrow-down {
        width: 100%;
        .label {
          line-height: 40px;
        }
        .arrow {
          font-size: 10px;
          transition: all 0.2s ease-in-out;
        }
        .dropdown-sub-menu {
          background: #fff;
        }
        &.hover {
          .dropdown-sub-menu {
            opacity: 1;
            display: block;
            visibility: visible;
          }
          // .nav_link {
          //   color: $primary;
          // }
          .arrow {
            transform: rotate(180deg);
          }
        }

        .dropdown-sub-menu {
          background: transparent;
          position: absolute;
          left: 0;
          top: 40px;
          width: 100%;
          z-index: 999;
          opacity: 0;
          display: none;
          visibility: hidden;

          .dropdown-list {
            margin-top: 3px;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 4px;
            .dropdown-item {
              white-space: nowrap;
              .link {
                width: 100%;
                height: 100%;
                display: block;
                color: #fff;
              }
              &:hover {
                background: #b0edef;
                .link {
                  color: #fff;
                }
              }
            }
            .dropdown-qrcode {
              line-height: 1.2em !important;
              text-align: center !important;
              span {
                font-size: 0.9em;
                color: #fff;
              }
              i {
                //color: $primary;
              }
            }
          }
        }
      }

      // &:hover {
      //   color: $primary;
      // }

      &.router-link-active {
        color: $primary;
      }

      .hot,
      .mining-dig {
        font-size: 16px;
        // margin-left:5px;
        display: inline-block;
      }
    }
  }
}
.text-idx {
  margin-left: 10px;
  margin-right: 2px;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.text-ixo {
  font-size: 12px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(244, 81, 81, 1);
}
.count {
  background: rgba(244, 81, 81, 1);
  display: inline-block;
  padding: 0 6px;
  height: 14px;
  margin-left: 6px;
  border-radius: 40px;
  line-height: 14px;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
}
</style>
