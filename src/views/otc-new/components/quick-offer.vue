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
            <el-row v-if="quoteId" class="details-row">
              <el-col :span="8">
                <h5> Simplex</h5>
                <p class="c-b0">
                  法定货币到数字货币转换的新标准。 Simplex让每个人都可......
                </p>
              </el-col>
              <el-col :span="4">
                <label class="c-b0">到账时间</label>
                <div>2-10 mins</div>
              </el-col>
              <el-col :span="4">
                <label class="c-b0">可获得{{`(${digitalMoneyCurrency})`}}</label>
                <div>{{digitalMoneyAmount}}</div>
              </el-col>
              <el-col :span="4">              
                <label class="c-b0">参考单价</label>
                <div class="text-primary" v-if="fiatMoneyAmount && digitalMoneyAmount">
                  {{$big(fiatMoneyAmount).div(digitalMoneyAmount).round(8,0)}}
                </div>
              </el-col>
              <el-col :span="4">
                <el-button @click="handleClickBuy" type="primary">购买</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="">

        </div>
      </div> 
    </div>
    
    <v-modal :open.sync="showModal" >
      <div class="modal-quick">
        <div class="modal-quick-title">
          即将从IXX跳转至Simplex
        </div>
        <div class="modal-quick-content">
          <p>
            如果您已在Simplex完成支付请耐心等待，Simplex将在2~10分钟内 将数字货币充值到您的IXX资金账户。
          </p>
          <div class="line"></div>
          <el-checkbox style="vertical-align: top !important;" v-model="agree"> 
            <label style="white-space: normal;">您已知晓Simplex是由第三方独立运营的法定货币与数字货币交易平台，IXX不对因使用该服务遭受的任何损失或损害承担任何责任。</label> 
          </el-checkbox> 
        </div>
        <div class="modal-quick-footer">
          <form id="payment_form" action="https://checkout.simplexcc.com/payments/new" method="post">
            <input type="hidden" name="version" value="1">
            <input type="hidden" name="partner" value="ixx">
            <input type="hidden" name="payment_flow_type" value="wallet">
            <input type="hidden" name="return_url_success" value="https://www.simplex.com">
            <input type="hidden" name="return_url_fail" value="https://www.simplex.com/support">
            <input type="hidden" name="payment_id" :value="paymentId"> 
          </form>

          <el-button v-loading="confirmLoading" @click="handleClickGoSimplex" :disabled="!agree" type="primary">
            前往Simplex支付
          </el-button>
        </div>
      </div>
    </v-modal>
  </div>
</template>


<script>

import numberInput from './myNumberInput.vue' 
import api from '@/modules/api/notc'
import {state} from '@/modules/store'
import utils from '@/modules/utils'
export default {
  components: {
    numberInput 
  },
  data() {
    return { 
      payTypeList: [ 
        { name: 'MasterCard', icon:'master-card' },
        { name: 'VISA', icon:'visa' }, 
      ], 
      showModal: false,
      agree: false,
      fiatMoneyAmount: 0,
      fiatMoneyCurrency: null,
      digitalMoneyAmount: 0,
      digitalMoneyCurrency: null,
      quoteId: '',
      validUntil: '',
      digitalAddress: '',
      paymentId: '',
      orderId: '',
      createTime: '',
      customPayType: null,
      confirmLoading: false
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
    handleClickGoSimplex() {
      this.fetchSimplePayment()
    },
    async fetchSimplePayment() { 
      this.confirmLoading = true
      let params = { 
        "account_details": {
          "app_provider_id": "ixx",
          "app_version_id": "1.5.9",
          "app_end_user_id": state.userInfo.id,
          "signup_login": { 
            "timestamp": this.$moment().format()
          }
        },
        "transaction_details": {
          "payment_details": {
            "quote_id": this.quoteId,
            "payment_id": this.paymentId,
            "order_id": this.orderId,
            "destination_wallet": {
              "currency": this.digitalMoneyCurrency,
              "address": this.digitalAddress,
              "tag": ""
            }
          },
          "original_http_ref_url": "https://ixxex.me/" 
        }
      } 
      const res = await api.simplePayment(params) 
      if (res && res.is_kyc_update_required) {
        document.forms["payment_form"].submit(); 
      } else {
        this.confirmLoading = false
      }
    },
    fetchForeignAddress(currency='BTC') { 
      const params = {
        currency 
      }
      api.foreignAddress(params).then(res => {
        if (res && !res.code) { 
          this.digitalAddress = res.data.address
          this.paymentId =  res.data.payment_id
          this.orderId = res.data.order_id
          this.createTime = res.data.create_time
        }
      })
    },
    async fetchQuote() {   
      while (!state.userInfo) {
        await utils.sleep(3e3)
      }
      
      if (state && state.userInfo) {
        let params = { 
          "digital_currency": this.$route.query.digital,
          "fiat_currency": this.$route.query.fiat,
          "requested_currency":  this.$route.query.fiat,
          "requested_amount": +this.$route.query.amount,
          "wallet_id": "ixx", 
          "payment_methods" : ["credit_card"] 
        }
        let res = await api.simpleQuote(params) 
        if (res && res.quote_id) { 
          state.otc.valid_until = res.valid_until
          state.otc.quote_id = res.quote_id  
          this.quoteId = res.quote_id 
          this.validUntil =  res.valid_until
          this.digitalMoneyAmount = res.digital_money.amount 
        } 
      } 
    },
    handleClickBuy() {
      this.showModal = true
    }
  }, 
  created() { 
    this.customPayType = this.payTypeList.find(item => item.name === this.$route.query.payment)
    this.fiatMoneyCurrency = this.$route.query.fiat
    this.digitalMoneyCurrency = this.$route.query.digital
    this.fiatMoneyAmount = this.$route.query.amount 
    this.fetchForeignAddress(this.digitalMoneyCurrency) 
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
  .modal-quick {
    width: 500px;
    .modal-quick-title {
      padding: 25px 30px;
      font-size: 18px;
      color: #151515;
      border-bottom: 1px solid #EAEAEA;
    }
    .modal-quick-content {
      padding: 25px 30px;
      font-size: 14px;
      color: #323232;
      border-bottom: 1px solid #EAEAEA;
      .line {
        margin: 25px 0;
        height: 1px;
        background: #dcdcdc;
      }
      .el-checkbox__input {
        vertical-align: top;
      }
    }
    .modal-quick-footer {
      padding: 25px 30px;
      font-size: 14px;
      color: #AAAAAA;
      text-align: right;
    }
  }

}

.custom-popover {
  max-height: 240px;
  overflow-x: hidden;
  overflow-y: auto; 
} 

</style>