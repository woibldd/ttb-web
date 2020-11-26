<template>
  <div class="quick-offer-container">
    <div class="quick-nav-wrap">
      <div class="quick-nav" flex="main:left cross:center">
        <div class="quick-nav-item">
          <label>购买</label> 
          <div class="quick-nav-drop">
            <el-dropdown @command="handleCommandDigitalCurrency">
              <div class="el-dropdown-link" flex="main:justify cross:center">
                <label>
                  <span v-if="digitalMoneyCurrency">
                    <icon :name="`coin-${digitalMoneyCurrency}`" />
                    {{digitalMoneyCurrency}} 
                  </span>
                  &nbsp;
                </label>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item 
                    v-for="(item, index) in digitalCurrencyList" 
                    :command="index"
                    :key="index">
                  <icon :name="`coin-${item}`"/> {{item}} 
                </el-dropdown-item> 
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="quick-nav-item">
          <label>金额</label>  
          <div class="quick-nav-drop"> 
            <el-input-number 
              v-model="fiatMoneyAmount"  
              @change="handleAmountChange" 
              :controls="false"></el-input-number>
            <el-dropdown @command="handleCommandFiatCurrency">
              <div class="el-dropdown-list" flex="main:right cross:center">
                <label>
                  <span v-if="fiatMoneyCurrency">
                    <icon :name="`coin-${fiatMoneyCurrency}`" />
                    {{fiatMoneyCurrency}} 
                  </span>
                  &nbsp;
                </label>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown" class="custom-popover">
                <el-dropdown-item 
                    v-for="(item, index) in fiatCurrencyList" 
                    :command="index"
                    :key="index">
                  <icon :name="`coin-${item}`"/> {{item}} 
                </el-dropdown-item> 
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div> 
        <div class="quick-nav-item">
          <label>支付方式</label>
          <div class="quick-nav-drop">
            <el-dropdown @command="handleCommandType">
              <div class="el-dropdown-link" flex="main:justify cross:center">
                <label>
                  <span v-if="customPayType">
                    <icon :name="customPayType.icon" />
                    {{customPayType.name}} 
                  </span>
                  &nbsp;
                </label>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown" popper-class="test">
                <el-dropdown-item 
                    v-for="(item, index) in payTypeList" 
                    :command="index"
                    :key="index">
                  <icon :name="item.icon"/> {{item.name}} 
                </el-dropdown-item> 
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div> 
    </div>
    <div class="quick-content-wrap">
      <div class="quick-content">
        <div class="offer-price">
          <div class="title mt-20">
            <strong>最有报价</strong>
            <span>综合手续费、到账时间、价格等，为您推荐</span>
          </div>
          <div class="details">
            <el-row class="details-row">
              <el-col :span="8">
                <h5>Moon Pay</h5>
                <p class="c-b0">
                  法定货币到数字货币转换的新标准。 MoonPay让每个人都可......
                </p>
              </el-col>
              <el-col :span="4">
                <label class="c-b0">到账时间</label>
                <div>2-10 mins</div>
              </el-col>
              <el-col :span="4">
                <label class="c-b0">可获得(USDT)</label>
                <div>961.36999993</div>
              </el-col>
              <el-col :span="4">              
                <label class="c-b0">参考单价</label>
                <div class="text-primary">$1.04</div>
              </el-col>
              <el-col :span="4">
                <el-button type="primary">购买</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="">

        </div>
      </div> 
    </div>
    <div class="quick"></div>
  </div>
</template>


<script>

import numberInput from './myNumberInput.vue' 
import api from '@/modules/api/notc'
import {state} from '@/modules/store'
export default {
  components: {
    numberInput 
  },
  data() {
    return {
      // digitalCurrencyList: [ 'BTC', 'USDT', 'ETH'],
      // fiatCurrencyList: [ 'CNY',  'USD'],
      payTypeList: [ 
        { name: 'MasterCard', icon:'master-card' },
        { name: 'VISA', icon:'visa' }, 
      ],
      fiatMoneyAmount: 0,
      fiatMoneyCurrency: null,
      digitalMoneyAmount: 0,
      digitalMoneyCurrency: null,
      customPayType: null, 
    }
  },
  computed: {
    fiatCurrencyList() { 
      return state.otc.fiatCurrencies || []
    },
    digitalCurrencyList() { 
      return state.otc.digitalCurrencies || []
    }
  },
  methods: {
    handleCommandType(index) {
      this.customPayType = this.payTypeList[index]
    },
    handleCommandDigitalCurrency(index) {
      this.digitalMoneyCurrency = this.digitalCurrencyList[index]
    },
    handleCommandFiatCurrency(index) {
      this.fiatMoneyCurrency = this.fiatCurrencyList[index]
    },
    handleAmountChange() {
      
    },
    fetchSimplePayment() {
      let params = { 
        "account_details": {
          "app_provider_id": "ixx",
          "app_version_id": "1.5.9",
          "app_end_user_id": state.userInfo.id,
          "signup_login": { 
            "timestamp": "2020-11-13T14:42:24.832+08:00"
          }
        },
        "transaction_details": {
          "payment_details": {
            "quote_id": state.otc.quote_id,
            "payment_id": state.otc.payment_id,
            "order_id": state.otc.order_id,
            "destination_wallet": {
              "currency": this.digitalMoneyCurrency,
              "address": state.otc.digitalAddress,
              "tag": ""
            }
          },
          "original_http_ref_url": "https://ixxex.me/"
        }
      } 
      api.simplePayment()
    },
    fetchForeignAddress(currency='BTC') { 
      const params = {
        currency 
      }
      api.foreignAddress(params).then(res => {
        if (res && !res.code) {
          state.otc.digitalAddress = res.data.address
          state.otc.payment_id =  res.data.payment_id
          state.otc.order_id = res.data.order_id
          state.otc.time = res.data.create_time
        }
      })
    },
    async fetchQuote() {  
      let res = await api.simpleQuote() 
      if (res && res.quote_id) {
        state.otc.fiatCurrencies = res.supported_fiat_currencies
        state.otc.digitalCurrencies = res.supported_digital_currencies
        state.otc.valid_until = res.valid_until
        state.otc.quote_id = res.quote_id  
      } 
    }
  },
  created() { 
    this.customPayType = this.payTypeList[0] 
    if (state.otc.fiatMoney) {
      this.fiatMoneyCurrency = state.otc.fiatMoney.currency
      this.fiatMoneyAmount = state.otc.fiatMoney.amount
    }
    if (state.otc.digitalMoney) {
      this.digitalMoneyCurrency = state.otc.digitalMoney.currency
      this.digitalMoneyAmount = state.otc.digitalMoney.amount
    }
    if (state.otc.fiatCurrencies && !this.fiatMoneyCurrency) { 
      this.fiatMoneyCurrency = this.fiatCurrencyList[0]
    }
    if (state.otc.digitalCurrencyList && !this.digitalMoneyCurrency) { 
      this.digitalMoneyCurrency = this.digitalCurrencyList[0]
    }
    // this.digitalMoneyCurrency = this.digitalCurrencyList[0]
    // this.fiatMoneyCurrency = this.fiatCurrencyList[0]
    this.fetchForeignAddress(this.digitalMoneyCurrency || 'BTC') 
    this.fetchQuote()
  }
}
</script>

<style lang="scss">
.quick-offer-container
{
  .quick-nav-wrap {
    background-color: #F9F9F9;
    .quick-nav {
      margin: 0 auto;
      width: 1200px;
      height: 130px; 
      .quick-nav-item {
        margin-right: 30px;
        .quick-nav-drop {
          padding: 0 15px;
          height: 40px;
          line-height: 40px;
          border: 1px solid #e9ebf2;
          border-radius: 4px;
          background-color: #ffffff;
          .el-dropdown-link {
            width: 150px;
          }
          .el-dropdown-list {
            width: 100px;
            max-height: 240px;
            overflow-x: hidden;
            overflow-y: auto;

          }
          .el-input-number {
            .el-input__inner {
              padding-left: 0;
              height: 36px;
              border: none;
              text-align: left;
            }
          }
        }
      }
    }
  }
  .quick-content-wrap {
    background-color: #ffffff;
    .quick-content {
      width: 1200px;
      margin: 0 auto;
      // background-color: #ffffff;
      .offer-price {
        .title {
          height:56px;
          line-height: 56px;
          font-size: 14px;
          color: #878889;
          strong {
            font-size: 18px;
            color: #2b2b2b;
          }
        }
        .details {
          .details-row {
            padding: 30px 26px;
            border: 1px solid #878889;
          }
        }
      }
    } 
  }

}

.custom-popover {
  max-height: 240px;
  overflow-x: hidden;
  overflow-y: auto; 
}
.test {
  font-size: 66px !important;
}

</style>