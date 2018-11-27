<template>
  <div class="page-home">
    <div class="header">
      <v-nav2
        is-home="true"
        v-if="!isMobile"
      />
      <mobile-nav v-if="isMobile"/>
    </div>
    <div class="banner">
      <div class="banner-txt"/>
    </div>
    <div class="c_box">
      <div class="tl">
        <div class="tlt">
          <p class="tl-tt">{{ $t('imta') }}</p>
          <p class="tl-ct">1000,000,000 IXX</p>
        </div>
        <div class="cre_jd">
          <div
            class="cre_jdc"
            :style="{width: progress+'%'}">
            <p>
              <em>{{ progress }}%</em>
            </p>
          </div>
          <span class="cre slt">0%</span>
          <span class="cre srt">100%</span>
        </div>
        <div
          class="cre_jdt cr_jd_lt"
          id="content">
          <p>
            <span>{{ $t('Openingtime') }}</span>  {{ $t('Ota') }}
          </p>
          <p><span>{{ $t('distime') }}</span> {{ $t('distimea') }}</p>
        </div>
        <div class="cre_jdt cr_jd_rt">
          <p><span>{{ $t('sinin') }}</span> 10-250000 IXX</p>
          <p><span>{{ $t('Priceof') }}</span> 1IX = 0.00289855USDT = 0.00000045BTC</p>
        </div>
      </div>
      <div class="tr">
        <div class="tr_d">
          <span class="tr_dt">
            <em>{{ $t('miningamount') }}</em>
          </span>
          <div class="tr_dc">
            <input
              type="number"
              min="20000"
              step="1"
              @input="onAmountInput"
              max="250000"
              :placeholder="$t('activity_max_input')"
              v-model="params.amount"
              class="tr-inp-t" >
            <span class="tr-tlt">IXX</span>
          </div>
          <div
            class="tr-ts"
            v-show="amount_error">{{ amount_error }}</div>
        </div>
        <div class="tr_d">
          <span class="tr_dt">
            <em>{{ $t('paymentcurrencyd') }}</em>
          </span>
          <div class="tr_dc">
            <input
              type="number"
              min="0"
              :max="balance[currency].available"
              @input="onValueInput"
              v-model="params.value"
              placeholder="0.00000000"
              class="tr-inp-t" >
            <select
              v-model="currency"
              @change="onAmountInput">
              <option
                :value="c"
                v-for="c in supportCurrency"
                :key="c"
              >
                {{ c }}
              </option>
            </select>
            <div class="sjb"/>
          </div>
          <div
            class="tr-ts"
            v-show="value_error">{{ value_error }}</div>
        </div>
        <p class="tr_ct">{{ $t('available') }} {{ balance.USDT.available | round(4) }} USDT<router-link :to="{name: 'deposit'}">{{ $t('TopUp') }}</router-link></p>
        <p class="tr_ct tmb">{{ $t('available') }} {{ balance.BTC.available | round(4) }} BTC <router-link :to="{name: 'deposit'}">{{ $t('TopUp') }}</router-link></p>

        <div class="inp_box">
          <v-btn
            class="btn"
            height="70"
            fontsize="24"
            :loading="loading"
            @click.prevent="submit"
            :disabled="btnDisabled"
            :label="btnLable"
          />
        </div>
      </div>
    </div>
    <div class="c_box process">
      <p class="pro_title">{{ $t('inMin') }}</p>
      <div class="pro-box b_a">01
        <span>{{ $t('applysub') }}</span>
      </div>
      <div class="pro-box b_b">02
        <span>{{ $t('topupa') }}</span>
      </div>
      <div class="pro-box b_c">
        <div class="bc_box">
          03
          <span>{{ $t('openInnov') }}</span>
        </div>
      </div>
      <div class="pro-box b_d">04
        <span>{{ $t('activityends') }}</span>
      </div>
      <div class="pro-box b_e">05
        <span>{{ $t('completeconfirmation') }}</span>
      </div>
    </div>
    <div class="c_box b_txt">
      <p>{{ $t('Subrules') }}</p>
      <ul>
        <li>{{ $t('eligibility') }}</li>
        <li>{{ $t('preparetopup') }}</li>
        <li>{{ $t('ofi') }}</li>
        <li>{{ $t('aends') }}</li>
        <li>{{ $t('comptright') }}</li>
        <li>{{ $t('totalamount') }}</li>
        <li>{{ $t('actbeloplat') }}</li>
      </ul>
    </div>
  </div>

</template>
<script>
import VNav2 from '@/components/VNav3'
import MobileNav from '@/components/Mobile/MobileNav.vue'
import utils from '@/modules/utils'
import VBtn from '@/components/VBtn'
import service from '@/modules/service'
import {state} from '@/modules/store'
import responsiveScale from '@/mixins/responsiveScale'
const MIN_BUY_UNIT = 10
const MAX_BUY_UNIT = 250000

export default {
  mixins: [responsiveScale],
  data () {
    return {
      state,
      loading: false,
      isMobile: utils.isMobile(),
      supportCurrency: ['USDT', 'BTC'],
      currency: 'USDT',
      progress: 20,
      balance: {
        BTC: {available: '0'},
        USDT: {available: '0'}
      },
      rates: {
        BTC: '0.00000045',
        USDT: '0.00289855'
      },
      params: {
        value: '',
        amount: ''
      },
      value_error: '',
      amount_error: ''
    }
  },
  components: {
    VBtn,
    MobileNav,
    VNav2
  },
  computed: {
    isLogin () {
      return this.state.userInfo !== null
    },
    btnDisabled () {
      return !this.isLogin || !this.params.amount || this.amount_error || this.value_error
    },
    btnLable () {
      if (!this.isLogin) {
        return this.$i18n.t('signin')
      } else {
        return this.$i18n.t('mined')
      }
    }
  },
  methods: {
    async fetch () {
      if (this.isLogin) {
        let result = await service.getBalance()
        if (!result.code && result.data) {
          this.balance.USDT = result.data.filter(item => item.currency === 'USDT')[0] || { available: '0' }
          this.balance.BTC = result.data.filter(item => item.currency === 'BTC')[0] || { available: '0' }
        }
      }
    },
    onAmountInput () {
      this.amount_error = ''
      this.value_error = ''
      let value = this.$big(this.params.amount || 0)
      if (value.lt(MIN_BUY_UNIT)) {
        value = this.$big(MIN_BUY_UNIT)
        this.params.amount = value.toString()
        // this.amount_error = this.$i18n.t('entexceeds')
      }
      if (value.gt(MAX_BUY_UNIT)) {
        value = this.$big(MAX_BUY_UNIT)
        this.params.amount = value.toString()
        // this.amount_error = this.$i18n.t('entexceeds')
      }
      let rates = this.$big(this.rates[this.currency])
      let amount = value.times(rates).round(8, this.C.ROUND_HALF_UP).toString()
      this.params.value = amount
    },
    onValueInput () {
      this.value_error = ''
      this.amount_error = ''
      let value = this.$big(this.params.value || 0)
      if (value.gt(this.balance[this.currency].available)) {
        value = this.$big(this.balance[this.currency].available)
        this.params.value = value
        this.value_error = this.$i18n.t('accbalanient')
      }
      let rates = this.$big(this.rates[this.currency])
      let amount = value.div(rates).round(8, this.C.ROUND_HALF_UP)
      if (amount.gt(MAX_BUY_UNIT) || amount.lt(MIN_BUY_UNIT)) {
        this.amount_error = this.$i18n.t('entexceeds')
        return
      }
      this.params.amount = amount.toString()
    },
    submit () {
      if (this.value_error || this.amount_error) {
        return
      }
      this.loading = true
      // todo sumit
    }
  },
  created () {
    this.fetch()
  }
}
</script>
<style lang="scss" scoped>



  .page-home{
    background-color: #262D36;
    background-image: url(/static/active/creation/banner.jpg);
    background-repeat: no-repeat;
    background-position: top center;
  }
  .banner{
    height: 670px;
    width: 100%;
    position: relative;
    .banner-txt{
      position: absolute;
      top: 250px;
      width: 100%;
      height: 137px;
      left: 0;
      background-image: url(/static/active/creation/banner-txt.png);
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
  .c_box{
    width: 1200px;
    height: auto;
    margin: 0 auto;
    padding-bottom: 88px;
    &::after{
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      clear: both;
    }
  }
  .tl{
    float: left;
    width: 660px;
    .tlt{
      width: 100%;
      height: 245px;
      background: #24292F;
      text-align: center;
      color: #fff;
      padding-top: 43px;
      box-sizing: border-box;
      .tl-tt{
        font-size: 24px;
        height: 35px;
        line-height: 35px;
      }
      .tl-ct{
        font-size: 72px;
        height: 75px;
        line-height: 75px;
        margin-top: 30px;
      }
    }
    .cre_jd{
      width: 100%;
      height: 8px;
      background: #343A42;
      border-radius: 8px;
      margin: 53px 0 22px 0;
      color: #fff;
      font-size: 16px;
      position: relative;
      .cre_jdc{
        height: 8px;
        background: #CAAA6C;
        border-radius: 8px;
        position: relative;
        p{
          position: absolute;
          top: -6px;
          right: -10px;
          width: 20px;
          height: 20px;
          border-radius: 10px;
          background: #FFC85D;
          em{
            position: absolute;
            text-align: center;
            margin-left: -25px;
            line-height: 24px;
            display: block;
            height: 24px;
            width: 50px;
            top: -30px;
            left: 50%;
          }
        }
      }
      .cre{
        position: absolute;
        top: 10px;
      }
      .slt{
        left: 0;
      }
      .srt{
        right: 0;
      }
    }
    .cre_jdt{
      float: left;
      color: #fff;
      font-size: 16px;
      line-height: 24px;
      margin-top: 16px;
      p{
        margin-bottom: 10px;
      }
      span{
        color: #CBE6FD;
      }
    }
    .cre_jdta{
      float: left;
      color: #000;
      font-size: 12px;
      line-height: 24px;
      margin-top: 16px;
      p{
        margin-bottom: 10px;
      }
      span{
        color: #CBE6FD;
      }
    }
    .cr_jd_lt{
      width: 45%;
    }
    .cr_jd_rt{
      width: 55%;
    }
  }
  .tr{
    float: right;
    width: 480px;
    font-size: 18px;
    .tr_d{
      width: 100%;
      height: 75px;
      margin-bottom: 37px;
      position: relative;
      .tr_dt{
        float: left;
        height: 75px;
        line-height: 25px;
        width: 90px;
        color: #fff;
        display: table;
        em{
          display: table-cell;
          vertical-align: middle;
        }
      }
      .tr_dc{
        float: left;
        width: 390px;
        height: 75px;
        position: relative;
        background: #24292F;
        span{
          height: 75px;
          height: 75px;
          color: #CAAA6C;
          line-height: 75px;
          position: absolute;
        }
        input{
          height: 75px;
          outline: medium;
          background: none;
          border: none;
          font-size: 18px;
          color: #ffffff;
          text-indent: 2em;
          appearance: none;

          &::placeholder {
            color: #446683;
          }
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
              -webkit-appearance: none;
          }

          &.tr-inp-t{
            width: 100%;
          }
        }
        select{
          height: 75px;
          border: none;
          float: right;
          text-align: center;
          display: block;
          font-size: 24px;
          color: #CAAA6C;
          padding: 0 12% 0 0;
          background: none;
          background: transparent;
          appearance: none;
          position: absolute;
          top: 0;
          right:0;
          opacity{
            text-align: center;
            font-size: 12px;
          }
        }
        .sjb{
          position: absolute;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid #CAAA6C;
          top: 50%;
          margin-top: -3px;
          right: 20px;
        }
        .tr-tlt{
          position: absolute;
          top: 0;
          right: 20px;
        }
      }
      .tr-ts{
        position: absolute;
        color: #EE5653;
        font-size: 12px;
        bottom: -25px;
        left: 100px;
      }
    }
    .tr_ct{
      width: 100%;
      height: 34px;
      line-height: 34px;
      color: #fff;
      margin-bottom: 10px;
      a{
        float: right;
        font-size: 20px;
      }
    }
  }
  .inp_box{
    .btn{
      width: 100%;
      height: 70px;
      border-radius: 5px;
      border: none;
      color: #fff;
      font-size: 24px;
      margin-top: 20px;

      &.disabled {
        background: #353F4D;

        &:hover {
          background: #353F4D;
        }
      }
    }
  }
  .process{
    background: #24292F;
    font-size: 24px;
    text-align: center;
    height: 307px;
    box-sizing: border-box;
    position: relative;
    .pro_title{
      color: #fff;
      height: 124px;
      line-height: 114px;
    }
    .pro-box{
      height: 76px;
      width: 76px;
      text-align: center;
      line-height: 76px;
      border-radius: 50px;
      background: rgba(53, 63, 77, 1);
      position: absolute;
      color: #fff;
      top: 125px;
      z-index: 1;
      span{
        font-size: 18px;
        display: block;
        position: absolute;
        width: 170px;
        bottom: -55px;
        height: 24px;
        line-height: 24px;
        left: 50%;
        margin-left: -85px;
      }
      &::after{
        content: "";
        width:73px;
        height: 2px;
        background: #A1A0D1;
        display: block;
        top: 50%;
        margin-top: -1px;
        right: -118px;
        position: absolute;
      }
    }
    .b_a{
      left: 82px;
    }
    .b_b{
      left: 322px;
    }
    .b_c{
      width: 104px;
      height: 104px;
      left: 50%;
      margin-left: -52px;
      background: #514C3F;
      top: 110px;
      box-shadow:0px 0px 21px 0px rgba(10,9,19,0.3);
      position: absolute;
    }
    .bc_box{
      width: 76px;
      height: 76px;
      border-radius: 76px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -38px;
      margin-top: -38px;
      position: absolute;
      background: #CAAA6C;
      span{
        bottom: -55px;
        color: #CAAA6C;
      }
    }
    .b_d{
      right: 322px;
    }
    .b_e{
      right: 82px;
      &::after{
        content: "";
        display: none;
      }
    }
  }
  .b_txt{
    margin-top: 15px;
    font-size: 14px;
    color: #CBE6FD;
    line-height: 24px;
    p{
      font-size: 18px;
      color: #fff;
      margin-bottom: 30px;
    }
  }
</style>
