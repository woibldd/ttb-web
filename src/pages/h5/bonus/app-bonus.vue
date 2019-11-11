<template>
  <div class="bonus">
    <div class="bonus--banner" :class="{'zh': state.locale === 'zh-CN'}">
      <div class="btn" @click="popupHandle()">
        {{$t('gift.banner.btn_text')}}
      </div>
    </div>
    <div class="bonus--hot-list">
      <div class="hot-inner">
        <div class="count">
          <div class="number">$10</div>
          <div class="tip">{{$t('gift.content.tips_1')}}</div>
          <div class="date">{{ $t("gift.content.valuation", {value: valueA}) }}</div>
        </div>
        <div class="text">
          <ul>
            <li>1.{{$t('gift.content.detail_a')}}</li>
            <li>2.{{$t('gift.content.detail_b')}}</li>
            <li>3.{{$t('gift.content.detail_c')}}</li>
            <li>4.{{$t('gift.content.detail_d')}}</li>
            <li>5.{{$t('gift.content.detail_e')}}</li>
          </ul>
        </div>
      </div>
      <div class="hot-inner  bonus--hot-list-1">
        <div class="count">
          <div class="number">$50</div>
          <div class="tip">{{$t('gift.content.tips_2')}}</div>
          <div class="date">{{ $t("gift.content.valuation", {value: valueB}) }}</div>
        </div>
        <div class="text">
          <ul>
            <li>1.{{$t('gift.content.detail_f')}}</li>
            <li>2.{{$t('gift.content.detail_g')}}</li>
            <li>3.{{$t('gift.content.detail_h')}}</li>
            <li>4.{{$t('gift.content.detail_i')}}</li>
            <li>5.{{$t('gift.content.detail_j')}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="option" @click="popupHandle()">
      {{$t('gift.content.btn_text')}}
    </div>
    <div class="bonus-pop-fixed" v-show="show" @click="show = false">
      <div class="bonus-fixed-container">
        <h1 class="title">{{ $t('gift.modal.title') }}</h1>
        <h2 class="describe">{{ $t('gift.modal.describe') }}</h2>
        <div class="qr-code">
          <div class="code">
            <img src="./img/ixx_kefu_big.jpg" alt="">
            <p class="footer_ewm_ltxt">{{ $t('gift.modal.qr_a') }}</p>
          </div>
          <div class="code">
            <img src="./img/kefu_telegran_ewm.jpg" alt="">
            <p class="footer_ewm_ltxt">{{ $t('gift.modal.qr_b') }}</p>
          </div>
        </div>
        <div class="item">{{ $t('gift.modal.contact_a')}}</div>
        <div class="item">{{ $t('gift.modal.contact_b')}}</div>
        <div class="item">{{ $t('gift.modal.contact_c')}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Big from 'big.js'
  import service from "@/modules/service";
  import { state, actions } from "@/modules/store";
  import utils from '@/modules/utils'
  export default {
    data() {
      return {
        state,
        rates: {},
        show: false
      }
    },
    computed: {
      valueA() {
        if (this.rates)
          return new Big(10).div(this.rates.USD || 1).round(8, 0).toFixed(8)
        return ''
      },
      valueB() {
        if (this.rates)
          return new Big(50).div(this.rates.USD || 1).round(8, 0).toFixed(8)
        return ''
      }
    },
    methods: {
      popupHandle() {
        if (utils.isAndroid()) {
          let flag = android.isLogin()
          if (!flag) {
            android.goLogin()
          } else {
            this.show = true
          }
        } else {
          if(utils.isIos()) {
            let isLogin = this.$route.query.isLogin
            if(isLogin === '1') {
              this.show = true
            } else {
              var url = 'jsbridge://enter_for'
              var iframe = document.createElement('iframe');
              iframe.style.width = '1px';
              iframe.style.height = '1px';
              iframe.style.display = 'none';
              iframe.src = url;
              document.body.appendChild(iframe);
              setTimeout(function() {
                iframe.remove();
              }, 100);
            }
          }
        }
      }
    },
    async created() {
      let res = await service.getRates({ currency: "BTC" });
      if (!!res && !res.code) {
        this.rates = res.data.BTC;
      }
      window.switchLang = actions.setLocale
    },
    mounted() {
      this.$nextTick(() => {
        window.switchLang = actions.setLocale
      })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .bonus {
    background: #f6f6f6;
    overflow: hidden;
    &--banner {
      height: 208px;
      overflow: hidden;
      background: #001313 url('./img/h5_banner-en.png') top center no-repeat;
      background-size: 115%;
      position: relative;

      .btn {
        position: absolute;
        width: 54%;
        height: 44px;
        color: #fff;
        background: #23CED0;
        text-align: center;
        line-height:44px;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%);
        font-size:13px;
        border-radius: 4px;
      }
    }
    .zh {
      background: #001313 url('./img/h5_banner-zh-CN.png') top center no-repeat;
      background-size: 115%;
    }
    &--hot-list {
      padding-top: 24px;
      width: 94%;
      margin: 0 auto;

      .hot-inner {
        background: #fff;
        /*box-shadow: 0 .02rem .48rem rgba(182, 205, 216, 0.5);*/
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 24px;
        .count {
          font-size: 12px;
          padding-top: 18px;
          padding-bottom:18px;
          position: relative;
          background:linear-gradient(-45deg,rgba(35,206,208,1),rgba(31,198,139,1));
          // &:before {
          //   content: '';
          //   width: 4px;
          //   height: 4px;
          //   position: absolute;
          //   top: -10px;
          //   left: -10px;
          //   background: #f6f6f6;
          //   zoom: 20;
          //   border-radius: 50%;
          // }

          .tip {
            background: #0D9382;
            display: inline-block;
            color: #fff;
            padding:4px;
            margin-left: 15px;
          }

          .number {
            display: inline-block;
            font-size: 36px;
            vertical-align: middle;
            /*font-weight: bold;*/
            color: #fff;
            padding: 0 0 0 40px;
          }

          .date {
            color: #fff;
            /*padding-left: .1rem;*/
            padding-top: 8px;
            line-height: 1.2;
            padding-left: 40px;
          }
        }

        .text {
          padding: 12px 0;
          background: #fff;
          position: relative;

          // &:before {
          //   content: '';
          //    width: 20px;
          //   height: 20px;
          //   position: absolute;
          //   top: -10px;
          //   right: -10px;
          //   background: #f6f6f6;
          //   zoom: 1;
          //   border-radius: 50%;
          // }

          li {
            font-size: 12px;
            padding: 0 10px;
            transform: scale(.94);
            line-height: 1.2
          }
        }
      }
    }

    &--hot-list-1 {
      li {
        line-height: 20px !important;
      }
    }

    .option {
      width: 70%;
      margin: .64rem auto;
      color: #fff;
      background: #23CED0;
      text-align: center;
      line-height: 44px;
      font-size: 13px;
      border-radius: .08rem;
    }

    .bonus-pop-fixed {
      width: 100%;
      height: 100%;
      position: fixed;
      background: rgba(0,0,0,.1);
      left: 0;
      top: 0;
      z-index: 10
    }
    .bonus-fixed-container {
      width: 300px;
      font-size: 12px;
      padding: 20px;
      text-align: center;
      position: absolute;
      left: 50%;
      margin-left: -170px;
      top: 50%;
      transform: translateY(-50%);
      background: #fff;
      img {
        width: 120px;
        height: 120px;
        margin: .3rem 0 .24rem 0;
      }
      h1 {
        font-size: 16px;
        padding: .36rem 0;
      }
      h2 {
        font-size: .26rem;
        color: #23CED0;
      }
      .item {
        text-align: left;
        padding-top: .3rem;
        color: #23CED0;
      }
      .qr-code {
        display: flex;
        .code {
          flex: 1;
        }
      }
    }
  }
</style>
