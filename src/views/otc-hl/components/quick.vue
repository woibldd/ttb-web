<template>
  <div class="otc-quick-container">
    <div class="otc-quick-box"
         flex="main:left">
      <!-- 左侧中介绍 -->
      <div class="coin-info">
        <div class="title">
          <icon :name="`coin-${coinInfo.name}`" />
          <span>{{$t('otc.about')}}{{ coinInfo.name }}</span>
        </div> 
        <div class="box">  
          <!-- <div>{{customDigitalCurrency}} </div>
          <div>{{customFiatCurrency}}</div> -->
          <p 
            v-tooltip.bottom="{html: true, content: coinInfo.brief_info, classes: ['contract', 'big']}" 
            :class="['issue-info-describe', {ellipsis: customDigitalCurrency.unit !== 'USDT'}]">{{coinInfo.brief_info}}</p>
          <div class="kline mt-20"> 
            <div v-if="customDigitalCurrency.unit !== 'USDT'" class="canvas">
              <canvas ref="myCanvas" width="578" height="150"></canvas>
            </div>
          </div>
          <div flex class="issue-info-row">
            <div flex-box="1">
              <h6>{{$t('issue_time')}}</h6>
              <span>{{ coinInfo.issue_time }}</span>
            </div>
            <div flex-box="1">
              <h6>{{$t('issue_circulation')}}</h6>
              <span>{{ coinInfo.issue_circulation }}</span>
            </div>
            <div flex-box="1">
              <div v-if="customDigitalCurrency.unit!=='USDT'">
                <h6>{{$t('homechart_24h_h')}}</h6>
                <span>${{ maxPrice }} </span> 
              </div>
              &nbsp;
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧操作form -->
      <div class="trade-box">
        <div class="form">
          <div class="trade-side">
            <div @click="handleChangeSide(1)"
                 :class="['side', 'side-buy', {'side-active': side===1}]">{{$t('otc_side_1')}}</div>
            <div @click="handleChangeSide(2)"
                 :class="['side', 'side-sell', {'side-active': side===2}]">{{$t('otc_side_2')}}</div>
          </div>
          <div class="trade-content">  
            <div class="valuation">
              <div class="label">1 {{customDigitalCurrency.unit}}{{$t('otc.value')}}</div>
              <div class="value">{{price}} <i>CNY</i> </div>
            </div>
            <div class="my-select pl-16 pr-16 mt-20">
              <el-dropdown @command="handleCommandDigitalCurrency">
                <div class="el-dropdown-link" flex="main:justify cross:center">
                  <label>
                    <span v-if="digitalCurrencies">
                      <icon :name="`coin-${customDigitalCurrency.unit}`" />
                      {{customDigitalCurrency.unit}} 
                    </span>
                    &nbsp;
                  </label>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown" class="custom-dropdown">
                  <el-dropdown-item 
                      v-for="(item, index) in digitalCurrencies" 
                      :command="index"
                      :key="index">
                    <icon :name="`coin-${item.unit}`"/> {{item.unit}} 
                  </el-dropdown-item> 
                </el-dropdown-menu>
              </el-dropdown>
            </div>   
            <div class="interlayer mt-25 mb-10" flex="main:justify">
              <div class="l">  
                <!-- priceType: 1, //0按数量，1按金额 --> 
                <span v-if="side===1">
                  <span v-if="priceType===1">{{$t('otc_purchase_amount')}}</span>
                  <span v-else>{{$t('buy_qty')}}</span>
                </span> 
                <span v-else> 
                  <span v-if="priceType===1">{{$t('otc_amount_sale')}}</span>
                  <span v-else>{{$t('sell_qty')}}</span>
                </span> 
              </div>
              <div class="r" v-if="side===2">
                {{$t('otc.account')}} {{available || '0.00'}} &nbsp;
                <router-link to="/fund/transfer">{{$t('account_exchange')}}</router-link>
              </div>
            </div> 
            <div class="">
              <!-- priceType: 1, //0按数量，1按金额 --> 
              <div v-if="priceType===1">
                <number-input   
                  :list="fiatCurrencies"
                  @selectChange="handleFiatCurrencyChange"
                  :selectValue="customFiatCurrency"
                  v-model="fiatAmount" 
                  :scale="2"/> 
              </div>
              <div v-else>  
                <xnumber-input 
                  skin="light"
                  v-model="digitalAmount" 
                  :precision="2">
                  <i slot="suffix" class="mr-10">{{(customDigitalCurrency || {}).unit}}</i>
                </xnumber-input> 
              </div>
              <div class="text-primary pointer mt-10" style="text-align:right;"> 
                <!-- priceType: 1, //0按数量，1按金额 -->
                <!--  a_1: "按金额出售", a_2: "按数量出售",
                      b_1: "按金额购买", b_2: "按数量购买", -->
                <icon name="exchange" />
                <label v-if="side===1" >
                  <span @click="handleChangePriceType(1)" v-if="priceType===0" v-html="$t('b_1')">按金额购买</span>
                  <span @click="handleChangePriceType(0)" v-else v-html="$t('b_2')">按数量购买</span>
                </label>
                <label v-else>
                  <span @click="handleChangePriceType(1)" v-if="priceType===0" v-html="$t('a_1')">按金额出售</span>
                  <span @click="handleChangePriceType(0)" v-else v-html="$t('a_2')">按数量出售</span>
                </label>
              </div>
            </div> 
            <div class="mt-5">
              <div class="mb-10"><label>{{$t(inSelectText)}}</label> </div>
              <div class="my-select pl-16 pr-16">
                <el-dropdown @command="handleCommandPayType">
                  <div class="el-dropdown-link" flex="main:justify cross:center">
                    <label>
                      <span v-if="customPayType">
                        <icon :name="customPayType.icon" />
                        {{ $t(customPayType.text)}} 
                      </span>
                      &nbsp;
                    </label>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </div>
                  <el-dropdown-menu slot="dropdown" class="custom-dropdown">
                    <el-dropdown-item 
                        v-for="(item, index) in payTypeList" 
                        :command="item.key"
                        :key="index" 
                        flex="main:justify">
                      <div>
                        <icon :name="item.icon"/> {{$t(item.text)}} 
                      </div>
                      <div v-if="!item.active">
                        <icon name="otc-add"/>
                      </div>
                    </el-dropdown-item> 
                  </el-dropdown-menu>
                </el-dropdown>
              </div>  
            </div>
            <div class="mt-25">
              <el-button style="width:100%;" @click="handleApply" type="primary"> 
                <span v-if="side===1">{{$t('otc.buy_now')}}</span>
                <span v-else-if="side===2">{{$t('otc_side_2')}}</span> 
              </el-button>
              <!-- <el-button style="width:100%;" @click="handleConfirm" type="danger"> {{$t('otc_side_2')}}</el-button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <v-modal :open.sync="secondConfirmShow"> 
        <div class="confirm-box">
          <div class="title">
            {{$t('confirm')}}<span>{{$t(`otc_side_${side}`)}}</span>
          </div>
          <div class="line"></div>
          <div class="content">
            <div class="row" flex="main:justify">
              <div class="label" v-html="$t('cj_jg')">成交单价：</div>
              <div class="text-primary">{{price}} CNY</div>
            </div>
            <div class="row" flex="main:justify">
              <div class="label" v-html="$t('cj_sl')">成交数量：</div>
              <div class="value">{{digitalAmount}} USDT</div>
            </div>
            <div class="row" flex="main:justify">
              <div class="label" v-html="$t('cj_ze')">成交总额：</div>
              <div class="value">{{fiatAmount}} CNY</div>
            </div>
            <div class="row mt-15 mb-15">
              <el-button style="width:100%;" @click="handleConfirm" type="primary"> 
                <span v-if="side===1">{{$t('otc.buy_now')}}</span>
                <span v-else-if="side===2">{{$t('otc_side_2')}}</span> 
              </el-button>
            </div>
          </div> 
        </div>
      </v-modal> 
      <v-modal :open.sync="showLayerModal">
        <div class="not-verified-layer">
          <div class="layer__title mb-30">{{ $t('otc_need_verify') }}</div>
          <div class="layer__content">
            <div class="layer__row">
              <span class="row__label">1. {{ $t('bind_phone') }}</span>
              <span
                v-if="!phone_bound"
                class="row__status "
                @click="clickVerifyRow('PhoneBind')"
              >{{ $t('to_bind') }}</span>
              <span
                v-if="phone_bound"
                class="row__status done"
              >{{ $t('done_verified') }}</span>
            </div>
          </div>
          <div class="layer__row mt-20">
            <span class="row__label">2. {{ $t('otc_bind_bankCard') }}</span>
            <span
              v-if="!card_bound"
              class="row__status "
              @click="clickVerifyRow('hlquick-collection')"
            >{{ $t('to_bind') }}</span>
            <span
              v-if="card_bound"
              class="row__status done"
            >{{ $t('done_verified') }}</span>
          </div>
          <div class="layer__row mt-20">
            <span class="row__label">
              3.
              <span v-html="$t('otc_kyc_verified')"/>
            </span>
            <span
              v-if="!kyc_bound"
              class="row__status "
              @click="clickVerifyRow('Kyc')"
            >{{ $t('to_verify') }}</span>
            <span
              v-if="kyc_bound"
              class="row__status done"
            >{{ $t('done_verified') }}</span>
          </div>
        </div>
      </v-modal>
    </div>
  </div>
</template>

<script>
import _ from 'lodash' 
import service from '@/modules/service'
import numberInput from './myNumberInput.vue'
import api from '@/modules/api/hl-otc' 
import {state} from '@/modules/store'
import utils from '@/modules/utils'
import coinData from '../coinInfoData'
import xnumberInput from '@/components/XNumberInput' 
 
export default {
  components: {
    numberInput,
    xnumberInput
  }, 
  data () {
    return {
      state,
      side: 1,
      price: 0,
      rates: null,
      coinInfo: {}, 
      priceHistory: [],  
      payTypeList: [ 
        { name: 'EBANK', icon:'bank-card', text: 'but_bank', key: 2, active:false, }, 
        { name: 'ALIPAY', icon:'alipay', text: 'but_aliPay', key: 0, active:false, },
        { name: 'WEIXIN', icon:'wechat', text: 'but_wechat', key: 1, active:false, },
      ],
      fiatAmount: '',
      digitalAmount: '',
      customDigitalCurrency: {},
      customFiatCurrency: null,
      customPayType: null, 
      outInputText: 'otc.payType',
      inSelectText: 'otc.payType',
      available: 0, //余额  
      ordering: 0, //冻结
      maxPrice: 0,
      priceType: 1, //0按数量，1按金额
      secondConfirmShow: false,
      userPayInfo: [],
      verifiedInfo: null,
      showLayerModal: false,
    }
  },
  computed: { 
    card_bound() { 
      return this.verifiedInfo && this.verifiedInfo.is_card
    },
    phone_bound() {
      return this.verifiedInfo && this.verifiedInfo.is_phone
    },
    kyc_bound() {
      // kyc > 0 就可以提币
      return this.verifiedInfo && this.verifiedInfo.kyc_level === 2
    },
    fiatCurrencies() {
      return ['CNY']
      // if (+this.side===1) {
      //   if (this.customDigitalCurrency === 'USDT') {
      //     return ['CNY'].concat(state.otc.fiatCurrencies)
      //   } else {
      //     return state.otc.fiatCurrencies
      //   }
      // } else {
      //   return ['CNY']
      // }
    },
    digitalCurrencies() {
      return state.otc.digitalCurrencies || [] 
    },
    digitalPrice() {
      if (this.rates && this.rates[this.customDigitalCurrency]) {
        let obj = this.rates[this.customDigitalCurrency]
        return obj.USD
      } 
      return 0
    }
  },
  watch: { 
    'state.locale' (val) { 
       this.getCurrencyInfo(this.customDigitalCurrency)
    }
  },
  methods: {  
    handleChangePriceType(num) {
      this.priceType = num
      this.digitalAmount = undefined
      this.fiatAmount = undefined
    },
    handleCommandDigitalCurrency(index) {
      this.customDigitalCurrency = this.digitalCurrencies[index]
      // this.getHistory(this.customDigitalCurrency)
      this.getCurrencyInfo(this.customDigitalCurrency) 
      // this.handleFiatCurrencyChange(this.fiatCurrencies[0])  
      this.fetchBalance()
    }, 
    handleCommandPayType(index) {
      this.customPayType = this.payTypeList.find(item => item.key===+index)
      if (!this.customPayType.active) {
        this.$router.push({name:'hlquick-collection'})
      }
    },
    getHistory (name) { 
      name = `${name}_USDT`
      const to = (new Date) * 1
      const from = to - 1000 * 60 * 60 * 24 //获取5个小时的数据
      service.getQuoteHistory({
        period: '5m',
        pair: name,
        begin: from,
        end: to
      }).then((res) => {
        if (!!res && !res.code) {
          this.priceHistory = res.data
          this.canvasInit() 
        }
      })
    },
    getCurrencyInfo (coinType) { 
      const {locale} = state  
      if (coinData[coinType]) {
        this.coinInfo = coinData[coinType][locale]
      } 
    }, 
    canvasInit() {
      let canvas = this.$refs.myCanvas
      let ctx2 = canvas.getContext('2d');
      ctx2.clearRect(0, 0, 578, 150)
      if (canvas && this.priceHistory) {  
        const list = []
        this.priceHistory.map((item, index) => {
          list.push(item.values[0]) 
        }) 
        const max = _.max(list) //最高价格
        const min = _.min(list) //最低价格
        const diff= this.$big(max).minus(min)  //价格差值
        const start = this.$big(min).minus(this.$big(diff).times(0.1)) //起点价格
        const end = this.$big(max).plus(this.$big(diff).times(0.1)) //终点价格 
        const xstep = this.$big(150).div(end.minus(start)) //价格1的步长
        const ystep = this.$big(578).div(list.length) //一个时间点的步长
        ctx2.beginPath(); 
        list.map((item, index) => { 
          let y = +this.$big(150).minus(this.$big(item).minus(start).times(xstep || 1))
          let x = +this.$big(index).times(ystep)
          ctx2.lineTo(x, y)
        })  
        ctx2.strokeStyle = '#09C989' 
        ctx2.stroke()
        this.maxPrice = max
      }
    }, 
    handleFiatCurrencyChange(sender) {
      this.customFiatCurrency = sender  
      this.customPayType = this.payTypeList[0]
      // this.handleCommandPayType(0) 
    },
    handleChangeSide(obj) {  
      this.side = obj
      if (+obj === 1) {   
        this.inSelectText = 'otc.payType'
      } else {  
        this.inSelectText = 'otc.collectionType'
      }   
      this.handleCommandDigitalCurrency(0)  
      let side = this.side === 1 ? 0 : 1
      this.fetchUnitPrice(this.customDigitalCurrency.unit, side) 
      this.customPayType = this.payTypeList[0]
      // this.handleFiatCurrencyChange(this.fiatCurrencies[0])     
      // this.handleCommandPayType(0)
    }, 
    async fetchQuote() {  
       const res = await api.gethlCoinList()
       if (!res.code && !res.status) { 
         return res.data
       } else {
        utils.alert(res.message)
        return null
      }
    },
    /**
     * 获取币种价格
     */
    async fetchUnitPrice(coin, side, fiat = 'CNY') {
      const params = { 
        unit: coin,
        type: side,
        localCurrency: fiat
      }
      const res = await api.gethlPriceByUnit(params) 
      if (!res.code && !res.status) {
         this.price = res.data
      } else {
        utils.alert(res.message)
        return null
      }
    },
    async fetchIsQualified() {
      const res = await api.gethlIsQualified()
      if (!res.code) {
        this.verifiedInfo = res.data 
        this.showLayerModal =
            !this.card_bound || !this.phone_bound || !this.kyc_bound
      } else {
        utils.alert(res.message)
        return null
      }
    },
    async fetchRates() {
      let res = await service.getAllRate()
      if (!res.code && !!res.data) {
        this.rates = res.data;
      }
    }, 
    fetchBalance() { 
      this.available = 0
      this.ordering = 0
      service.getOtcBalance().then(res => {
        if (res.code === 0) {
          const arr = _.filter(res.data, item => item.currency === this.customDigitalCurrency.unit) 
          if (arr.length > 0) {
            this.available = arr[0].available
            this.ordering = arr[0].ordering
          }
        }
      })
    },
    //一键买币
    async fetchQuickByAmount() {
      const params = {
        coin_symbol: this.customDigitalCurrency.unit,
        currency: this.customFiatCurrency,
        price_type: this.priceType, //购买方式 0按数量，1按金额
        coin_amount: this.digitalAmount || 0, //购买数量（priceType为0时必传，支持8位小数）
        money: this.fiatAmount || 0, //（priceType为1时必传，支持2位小数）
        pay_type: this.customPayType.name, //支付方式，EBANK":银行卡 "WEIXIN":微信支付 "ALIPAY":支付宝支付
      }  
      const res = await api.sethlQuickByAmount(params)
      if (!res.code && !res.status) {
        utils.success(this.$t('otc_seiitm_16'))  
        this.$router.push({name: 'hlquick-order'}) 
      } else {
        utils.alert(res.message)
      }

    },
    //一键卖币 
    async fetchQuickSellMoney() {
      const params = {
        coin_symbol: this.customDigitalCurrency.unit,
        currency: this.customFiatCurrency,
        price_type: this.priceType, //购买方式 0按数量，1按金额
        coin_amount: this.digitalAmount, //购买数量（priceType为0时必传，支持8位小数）
        money: this.fiatAmount, //（priceType为1时必传，支持2位小数）
        pay_type: this.customPayType.name, //支付方式，EBANK":银行卡 "WEIXIN":微信支付 "ALIPAY":支付宝支付
      }
      const res = await api.sethlQuickSellMoney(params)
      if (!res.code && !res.status) {
        utils.success(this.$t('otc_seiitm_16')) 
        this.$router.push({name: 'hlquick-order'}) 
      } else {
        utils.alert(res.message)
      }
    },
    fetchUserPayInfo() {
      api.gethlUserPayInfo().then(res => {
        if (!res.code && !res.status) {
          this.userPayInfo = res.data  
          // this.payTypeList.map(item => {
          res.data.map(item => {
            let find = this.payTypeList.find(obj => +obj.key===item.payMode)
            if (find) { 
              find.active = true
              // this.$set(find, 'active', true)
            }
          }) 
        }
      })
    },
    async init() {
      await this.fetchRates() 
      this.fetchUserPayInfo()
      this.fetchBalance() 
      let data = await this.fetchQuote() 
      if (data) {
        let side = this.side === 1 ? this.side : 0
        state.otc.digitalCurrencies = data
        this.customDigitalCurrency = this.digitalCurrencies[0]
        await this.fetchUnitPrice(data[0].unit, side)
        this.getCurrencyInfo(data[0].unit)
      } 
    }, 
    handleApply() { 
      if (!this.customPayType.active) {
        this.$router.push({name:'hlquick-collection'})
      }
      // priceType: 0按数量，1按金额
      if (this.priceType===0) {
        this.fiatAmount = this.$big(this.digitalAmount || 0).times(this.price).round(2, 0)
      } else if (this.priceType===1) {
        if (this.$big(this.fiatAmount || 0).gt(0)) {
          this.digitalAmount = this.$big(this.fiatAmount || 0).div(this.price).round(2, 0)
        } else {
          this.digitalAmount = 0
        }
      } 
      this.secondConfirmShow = true
    },
    async handleConfirm () {  
      if (this.side === 1) {
        this.fetchQuickByAmount() 
      } else {
        this.fetchQuickSellMoney()
      }
    }, 
    clickVerifyRow(v) {
      this.$router.push({
        name: v
      })
    }
  }, 
  async created () {  
    this.fetchIsQualified()
    this.init()
  }
}

</script>

<style lang="scss">
.otc-quick-container {
  padding:90px 0;
  width: 1200px;
  margin:0 auto;
  background-color: #f9f9f9;
  .otc-quick-box {
    .coin-info {
      width: 580px;
      margin-right: 150px;
      .title {
        margin-bottom: 1em;
        font-size: 32px;
        font-weight: bold;
        color: #2d2d2d;
        .iconfont {
          font-size: 32px;
        }
      }
      .box {
        .issue-info-describe {  
          font-size: 16px;
          font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
          font-weight: 400;
          text-align: justifyLeft;
          color: #9da0a5;
          line-height: 30px; 
          &.ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;/*超出3行部分显示省略号，去掉该属性 显示全部*/
            -webkit-box-orient: vertical; 
          }
        }
        .issue-info-row {
          margin-top:40px;
          text-align: left;
          h6 {
            font-size: 12px;
            color: #9da0a5;
          }
          span {
            font-size: 18px;
            color: #2d2d2d;
          }
        }
      }
    }
    .trade-box {
      width: 473px;
      background-color: #ffffff;
      .form {
        box-shadow: 0 6px 12px 0 rgba(36, 58, 120, 0.08);
        .trade-side {
          display: flex;
          background-color: #ffffff;
          .side {
            &:last-child {
              margin-left: 24px;
            }
            height: 52px;
            line-height: 52px;
            background: #e9ebf2;
            flex: 1;
            position: relative;
            font-size: 22px;
            font-weight:bold;
            text-align: center; 
            color: #9aa1b1;
            cursor: pointer;
            &.side-buy {
              &::after {
                content: "";
                position: absolute;
                border-bottom-right-radius: 6px;
                z-index: 1;
                background: #e9ebf2;
                top: 0;
                right: -11px;
                width: 22px;
                -webkit-transform: skewX(-15deg);
                transform: skewX(-15deg);
                height: 52px;
              }
              &.side-active {
                margin-top: -8px;
                padding-top: 8px;
                background: #fff;
                color: #1f2533;
                &::after {
                  border-bottom-right-radius: 0;
                  border-top-right-radius: 6px;
                  background: #fff;
                  height: 60px;
                  right: -13px;
                  -webkit-transform: skewX(15deg);
                  transform: skewX(15deg);
                }
              }
            }
            &.side-sell {
              &::before {
                content: "";
                position: absolute;
                border-bottom-left-radius: 6px;
                z-index: 1;
                background: #e9ebf2;
                top: 0;
                left: -10px;
                width: 22px;
                -webkit-transform: skewX(15deg);
                transform: skewX(15deg);
                height: 52px;
              }
              &.side-active {
                margin-top: -8px;
                padding-top: 8px;
                background: #fff;
                color: #1f2533;
                &::before {
                  border-bottom-left-radius: 0;
                  border-top-left-radius: 6px;
                  background: #fff;
                  height: 60px;
                  left: -12px;
                  -webkit-transform: skewX(-15deg);
                  transform: skewX(-15deg);
                }
              }
            }
          }
        }
        .trade-content {
          padding: 50px 30px;
          .valuation {
            .label {
              color: #525252;
              font-size: 12px;
            }
            .value {
              font-size:20px;
              color: #262626;
              i {
                font-size: 12px;
              }
            }
          }
          .my-select {
            padding: 5px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #e9ebf2;
            border-radius: 4px;
            .el-dropdown {
              width: 100%;
            }
          }
          h4 {
            font-size: 20px;
            color: #262626;
          }
        }
      }

    } 
      .el-input__inner,
      .el-input-group,
      .el-input__suffix { 
        height: 52px; 
        line-height: 52px;
        .el-input-group__append {
          padding: 0px 13px;
          width: 60px;
          border-color: #e9ebf2 !important;
        }
      } 
  }
  .confirm-box {
    width: 450px;
    .line {
      height: 1px;
      background-color: #EAEAEA;
    }
    .title {
      padding: 22px 36px;
      font-size: 18px;
      color:#151515;
      font-weight: 600;
    }
    .content { 
      padding: 22px 36px;
      .row {
        font-size: 14px;
        height: 2.5em;
        line-height: 2.5em;
        .label {
          color: #999999;
        }
        .value {
          color: #333333;
        }
      }
    }
  }
}

.custom-dropdown {
  width: 388px;
  .custom-dropdown-item {
    height: 30px;
    line-height: 30px;
    padding-left: 5px;
    &:hover {
      background-color: rgba($primary, 0.1)
    }
  }
}

  .not-verified-layer {
    position: relative;
    width: 410px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding-bottom: 50px;
    padding-top: 34px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .layer__title {
      font-size: 20px;
      font-weight: bold;
      color: $text-strong;
    }

    .layer__row_note {
      color: $text-weak;
      font-size: 16px;
    }
    .layer__row {
      width: 330px;
      display: flex;
      justify-content: space-between;

      .row__label {
        display: inline-block;
        padding-left: 20px;
        color: $text-light;
      }
      .row__status {
        color: $primary;
        cursor: pointer;

        &.done {
          color: #09c989;
          cursor: default;
        }
      }
    }
  }
</style>