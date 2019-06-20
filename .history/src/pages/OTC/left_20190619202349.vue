<template>
  <div class="otc-left-container">
    <div class="left-menu-container left-menu-nobottom">
      <div class="left-menu-box">
        <p class="left-menu-title">
          <icon name="handle"/>
          <span class="menu-title">{{ $t('otc_trade') }}</span>
        </p>
        <ul class="left-menu-list">
          <li class>
            <router-link
              to="/OTC/Trade"
              class="menu-name"
              :class="{'active': currency === 'USDT' && from === 'trade' }"
            >
              <div @click="setCurrency('USDT')">
                <p>
                  {{ $t('USDT') }}
                  <span class="text-idx">{{ '￥' + user.usdtCount }}</span>
                  <!--<span class="text-ixo">{{'-0.24%'}}</span>-->
                </p>
              </div>
            </router-link>
          </li>
          <li class>
            <router-link
              to="/OTC/Trade"
              class="menu-name"
              :class="{'active': currency === 'BTC' && from === 'trade'}"
            >
              <div @click="setCurrency('BTC')">
                <p>
                  {{ $t('BTC') }}
                  <span class="text-idx">{{ '￥' + user.btcCount }}</span>
                  <!--<span class="text-ixo">{{'-0.24%'}}</span>-->
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="left-menu-box">
        <p class="left-menu-title">
          <icon name="manager"/>
          <span class="menu-title">{{ $t('otc_transaction_manage') }}</span>
        </p>
        <ul class="left-menu-list">
          <li class>
            <router-link
              class="menu-name"
              to="/OTC/Hir"
              active-class="active"
            >{{ $t('otc_my_order') }}
            <span class="count" 
v-if="token && count > 0">{{ count }}</span></router-link>
          </li>
          <!--<li class="">-->
          <!--<router-link-->
          <!--class='menu-name'-->
          <!--to="/OTC/Transfer"-->
          <!--active-class="active" >-->
          <!--{{$t('account_exchange')}}-->
          <!--</router-link>-->
          <!--</li>-->
          <li v-if="false">
            <router-link
              class='menu-name'
              to="/OTC/FrenchBill"
              active-class="active">
              {{ $t('otc_side_35') }}
            </router-link>
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
          <icon name="help"/>
          <span class="menu-title">{{ $t('footer_help') }}</span>
        </p>
        <ul class="left-menu-list">
          <li class>
            <a class="menu-name" 
:href="guidanceLink">{{ $t('footer_hreseqgslp1') }}</a>
          </li>
          <li class>
            <a class="menu-name" 
:href="commonProblemLink">{{ $t('footer_hreseqgslp2') }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { state } from '@/modules/store'
import service from '@/modules/service';
import Vue from 'vue'
export default {
  data () {
    return {
      state,
      timer: null,
      token: window.localStorage.getItem('X-TOKEN'),
      user: {
        btcCount: 0,
        usdtCount: 0
      },
      count: 0
    }
  },
  methods: {
    setCurrency (coin) {
      this.currency = coin
      this.$eh.$emit('otc:currency:change', coin, this.side)
    },
    init () {
      service.otcSymbolList({}).then(res => {
        if (res.code === 0) {
          this.user.btcCount = this.$big(res.data[1].cny_rate).round(2, 0)
          this.user.usdtCount = this.$big(res.data[0].cny_rate).round(2, 0)
        }
      })
      // 委托
      service.getUnDonefills({
        page: 1,
        side: 0,
        size: 9999
      }).then((res) => {
        if (res.code === 0) {
          let countData = []
          let orderData = []
          let orderData1 = []
          let oneData = []
          res.data.data.forEach((item) => {
            orderData.push(item)
          })
          this.count = orderData.length
          if (this.count <= 0) {
            service.getOtcActivefills(
              {
                page: 1,
                side: 0,
                size: 9999
              }
            ).then((res) => {
              if (res.code === 0) {
                res.data.data.forEach((item) => {
                  if (item.state === 2) countData.push(item)
                })
                this.count = countData.length
              }
            })
          }
        }
      })
    }
  },
  created () {
    this.init()
    this.timer = setInterval(() => {
      service.otcSymbolList({}).then(res => {
        if (res.code === 0) {
          Vue.set(this.user, 'btcCount', this.$big(res.data[1].cny_rate).round(2, 0))
          Vue.set(this.user, 'usdtCount', this.$big(res.data[0].cny_rate).round(2, 0))
        }
      })
      service.getUnDonefills({
        page: 1,
        side: 0,
        size: 9999
      }).then((res) => {
        if (res.code === 0) {
          let countData = []
          let orderData = []
          let orderData1 = []
          let oneData = []
          res.data.data.forEach((item) => {
            orderData.push(item)
          })
          this.count = orderData.length
          if (this.count <= 0) {
            service.getOtcActivefills(
              {
                page: 1,
                side: 0,
                size: 9999
              }
            ).then((res) => {
              if (res.code === 0) {
                res.data.data.forEach((item) => {
                  if (item.state === 2) countData.push(item)
                })
                this.count = countData.length
              }
            })
          }
        }
      })
    }, 5000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  computed: {
    currency: {
      get () {
        return this.state.otc.currency
      },
      set (value) {
        this.state.otc.currency = value
      }
    },
    side: {
      get () {
        return this.state.otc.showSide
      }
    },
    commonProblemLink () {
      let link =
        'https://ixxcustomer.zendesk.com/hc/zh-cn/categories/360001229751';
      if (this.state.locale === 'en') {
        link = link.replace('zh-cn', 'en-us')
      }
      return link
    },
    guidanceLink () {
      let link =
        'https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360029413991';
      if (this.state.locale === 'en') {
        link = link.replace('zh-cn', 'en-us')
      }
      return link
    },
    from () {
      return this.$route.name
    }
  }
}
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
    padding-bottom: 20px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 16px;
    width: 210px;

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
    }

    .left-menu-list {
      width: 100%;
      margin-top: 20px;

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
  background:  rgba(244, 81, 81, 1);
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
