<template>
  <div class="otc-buy-container">
    <div class="otc-buy-inner">
      <div class="title">
        <span class="font24 font-weight font-base title-text">{{ this.$t('yj_mb1') }}</span>
        <!-- <span class="font-gray">小额快速交易，单笔50000以下</span> -->
      </div>
     <div class="but-form">
       <div class="tip">
         <i class="iconfont">&#xe62e;</i>
        <span> {{currency}}{{$t('ck_jg')}}：</span> {{ downPrice }} CNY/{{ currency }}
       </div>
       <div class="amount-btn-con">
         <div class="btn-list">
           <div class="inner" v-for="(item, index) in payTypeData" :key="index" :class="{select: paySelect === index}" @click="selectHanlde(index)">{{item}}</div>
         </div>
         <div class="btn-ipt" :class="{err: err}" v-show="paySelect === 0">
           <number-input
              class="number-input"
              v-model="price"
              :scale="pricePoint"
              @blur="focus"
               :placeholder="this.$t('a_price_i')"
            />
           <span class="company"> CNY </span>
         </div>
          <div class="btn-ipt" v-show="paySelect === 1">
           <number-input
              class="number-input"
              v-model="amount"
              :scale="amountPoint"
               :placeholder="this.$t('a_account_i')"
            />
           <span class="company"> {{ currency }} </span>
         </div>
         <!--<div class="tip">选择付款方式</div>-->
         <!--<div class="pay-list-con">-->
           <!--<div class="pay-list" v-for="(item, index) in payData" :key="index" :data-pay="item.name" :class="{active: active === index}" @click="tabHanlde(item, index)">{{ item.name }}</div>-->
         <!--</div>-->
         <div class="result-msg">
           <dl>
             <dt></dt>
             <dd>
                <span>{{ this.$t('cj_jg') }}: </span>
               <template v-if="Number(price) >= 100 || amount">
                   <template v-if="Number(result.unitPrice) > 0">
                       <em>{{result.unitPrice}} CNY/{{currency}}</em>
                   </template>
                   <template v-else>
                       <div class="result-no-msg">
                           <i class="iconfont">&#xe61c;</i>{{ this.$t('wz_xx') }}<span>{{ this.$t('ck_bj') }}</span>
                       </div>
                   </template>
               </template>
               <template v-else>
                    <em>{{this.$t('sr_hq', {type: type})}}</em>
               </template>
             </dd>
             <dd>
               <span>{{ this.$t('cj_sl') }}</span>
               <template v-if="amount">
                   <em>{{amount}} {{currency}}</em>
               </template>
               <template v-else>
                   <em>--</em>
               </template>
             </dd>
             <dd>
               <span>{{ this.$t('cj_ze') }}: </span>
               <template v-if="price">
                   <em>{{price}} {{company}}</em>
               </template>
               <template v-else>
                   <em>--</em>
               </template>
             </dd>
           </dl>
         </div>
         <div class="result-btn">
           <!--购买-->
           <el-button class="res-btn" @click="purchaseHandle" style="width: 100%;" :disabled="buyDisabled">{{ this.$t('c_usdt') }}</el-button>
         </div>
       </div>
     </div>
    </div>
  </div>
</template>
<script>
import service from '@/modules/service'
import {Debounce } from './mixins'
import {state} from '@/modules/store'
import qs from 'qs'
export default {
  data () {
    return {
      radio1: 'bank',
      downPrice: '',
      value: '',
      company: 'CNY',
      active: 0,
      paySelect: 0,
      overdue: false,
      purchase: true,
      err: false,
      pricePoint: 2,
      amountPoint: 2,
      price: '',
      type: this.$t('but_je'),
      amount: '',
      timer: null,
      priceFlag: true,
      amountFlag: false,
      min_amount: 0,
      max_amount: 0,
      active_id: '',
      buyDisabled: false,
      result: {
        amount: 0,
        unitPrice: 0,
        allPrice: 0
      },
      payData: [
        {
            excellent: false,
            name: this.$t('but_bank'),
            pay: 1,
            data: {}
        },
        {
            excellent: false,
            name: this.$t('but_aliPay'),
            pay: 2,
            data: {}
        },
        {
            excellent: false,
            name: this.$t('but_wechat'),
            pay: 3,
            data: {}
        }
      ],
      payTypeData: [this.$t('a_1'), this.$t('a_2')],
    }
  },
  computed: {
    userInfo () {
      return state.userInfo || {}
    },
    id () {
      return this.userInfo.id
    },
    currency() {
        return this.$route.query.currency
    }
  },
  methods: {
    focus() {
       if(Number(this.price) < 100) {
           this.err = true
       } else {
           this.err = false
       }
    },
    tabHanlde(item, index) {
        this.active = index
        let arr = Object.keys(item.data)
        if(arr.length !== 0) {
            this.buyDisabled = false
            this.active_id = item.data.active_id
            this.result.unitPrice = item.data.price
            this.amount =this.$big(this.price).div(this.result.unitPrice).round(2, 0).toString()
        } else {
            this.result.unitPrice = 0
            this.amount = ''
            this.buyDisabled = true
        }
    },
    selectHanlde(index) {
        this.paySelect = index
        this.type = index === 0 ? '金额' : '数量'
        this.priceFlag = index === 0 ? true : false
        this.amountFlag = index === 0 ? false : true
         this.price = 0
        this.amount = 0
    },
    purchaseHandle: Debounce(function () {
        if (window.localStorage.getItem('X-TOKEN')) {
            if (this.paySelect === 0) {
                service.sellCoins(qs.stringify({
                    currency: this.currency,
                    user_id: this.id,
                    by_cny: this.price,
                    active_id: this.active_id,
                    price: this.result.unitPrice
                }), {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
               if (res.code === 0) {
                   this.$message.success('出售成功')
                   this.$router.push('/OTC/Hir')
               } else {
                   this.$message.warning(res.message)
               }
            })
            } else {
                service.sellAmount(qs.stringify({
                        currency: this.currency,
                        user_id: this.id,
                        by_amount : this.amount,
                        active_id: this.active_id
                    }), {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                if (res.code === 0) {
                    this.$message.success('出售成功')
                     this.$router.push('/OTC/Hir')
                } else {
                    this.$message.warning(res.message)
                }
                })
            }
        } else {
            this.$router.push({
                name: 'login',
                query: {redirect: this.$route.fullPath}
            })
        }
    }),
    overdueHandle() {},
    init() {
        this.min_amount = 0
        this.result.unitPrice = 0
        service.minactive(qs.stringify({
            currency: this.currency,
             isBuy: false
        }), {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res.code === 0) {
              if (res.data.length > 0) {
                  this.purchase = true
                  this.overdue = false
                  // 拿到单价最小
                  this.min_amount = Math.min.apply(Math, res.data.map(function(o){ return Number(o.otc_active.price )}))
                this.max_amount = Math.max.apply(Math, res.data.map(function(o){ return Number(o.otc_active.price )}))
                  res.data.forEach((item) => {
                      this.payData.forEach((child, index) => {
                          if(child.pay === item.payment_type) {
                              child.data = item.otc_active
                              if(Number(item.otc_active.price) === this.max_amount) {
                                  child.excellent = true
                                  this.active = index
                                  this.active_id = item.otc_active.active_id
                                  this.result.unitPrice = item.otc_active.price
                                  if (this.downPrice >= 100) {
                                       this.amount =this.$big(this.price).div(this.result.unitPrice).round(6, 0).toString()
                                  }
                              }
                          }
                      })
                  })
                 if(this.$route.query.active) {
                      this.paySelect = Number(this.$route.query.active)
                      if(this.$route.query.active === '0') {
                          this.price = this.$route.query.amount
                      }
                      else {
                          this.amount = this.$route.query.amount
                          this.price =this.$big(Number(this.amount)).times(this.result.unitPrice).round(6, 0).toString()
                          console.log(this.amount, this.result.unitPrice)
                      }
                  }
              } else {
                  this.purchase = false
                  this.overdue = true
              }
          }
        })
    },
    getPairList() {
        service.otcSymbolList({}).then((res) => {
            if (res.code === 0) {
                for(var i = 0; i <= res.data.length; i++) {
                if (res.data[i].currency === this.currency) {
                        this.downPrice = res.data[i].cny_rate
                        break;
                    } else {
                        this.downPrice = '--'
                    }
                }
            }
        })
    },
    setTimer() {
        this.timer = setInterval(() => {
            // this.getPairList()
        }, 3000)
    }
  },
  created() {
    this.$nextTick(() => {
        this.getPairList()
        this.init()
        if(this.$route.query.active) {
          if (this.$route.query.active === '0'){
            this.price = this.$route.query.amount 
            this.paySelect = 0
          } else if (this.$route.query.active === '1') { 
            this.amount = this.$route.query.amount 
            this.paySelect = 1
          } 
        } else {
          this.price = this.$route.query.amount 
        }    
    })
  },
  mounted() {//页面加载后执行方法
　　clearInterval(this.timer)
   		 this.setTimer()
  },
  distroyed() {
      clearInterval(this.timer)
  },
  watch: {
    price: Debounce(function(e) {
        if(this.priceFlag) {
            if( Number(e) >= 100) {
                this.amount =this.$big(e).div(this.result.unitPrice).round(6, 0).toString()
            }
        }
    }, 300),
    amount: Debounce(function(e) {
        if (this.amountFlag) {
            if (e) {
                this.price =this.$big(e).times(this.result.unitPrice).round(6, 0).toString()
            }
        }
    }, 500)
  }
}
</script>
<style lang="scss" scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 1244642 */
    src: url('//at.alicdn.com/t/font_1244642_hlgiygo2x14.eot');
    src: url('//at.alicdn.com/t/font_1244642_hlgiygo2x14.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1244642_hlgiygo2x14.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1244642_hlgiygo2x14.woff') format('woff'),
    url('//at.alicdn.com/t/font_1244642_hlgiygo2x14.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1244642_hlgiygo2x14.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
  .font-weight {
    font-weight: 600;
  }
  .font-base {
    color: #333;
  }
  .font24 {
    font-size: 24px;
  }
  .err-msg{
    padding-top: 8px;
    color: #e13c13
  }
  .err{
      border-color: #e13c13!important;
  }
    .result-no-msg {
        vertical-align: middle;
        i {
            padding-right: 6px;
            vertical-align: middle;
            color: #f2994a
        }
        span {
            color: #FDA22D;
            padding-left: 8px;
            display: inline-block;
            cursor: pointer;
        }
    }
  .otc-buy-container {
    width: 100%;
    height: 747px;
    background-color: #f7f9fc;
    padding-top: 30px;
    overflow: hidden;
    .but-form {
      box-shadow: 0 0 10px rgba(0, 0, 0, .1);
      border-radius: 3px;
      width: 540px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      padding: 32px 0;
      background-color: #fff;
      > .tip {
        width: 100%;
        padding-left: 44px;
        text-align: left;
        margin: 0 auto;
        color: #333;
        font-size: 12px;
        i {
          color: #F45151;
          font-size: 18px;
          vertical-align: middle;
        }
        span {
          color: #999;
        }
      }
    }
    .title {
      width: 490px;
      margin: 32px auto 34px;
      display: flex;
      align-items: center;
      .title-text {
        margin-right: 24px;
      }
      .font-gray {
        font-size: 14px;
        color: #999;
      }
    }
    .amount-btn-con {
      width: 450px;
      font-size: 12px;
      .btn-list {
        padding: 12px 0;
        .inner {
          position: relative;
          display: inline-block;
          padding-right: 35px;
          cursor: pointer;
          color: #999;
          &:first-child {
            &::after {
              position: absolute;
              content: '';
              width: 1px;
              height: 10px;
              background: #999;
              right: 18px;
              top: 50%;
              margin-top: -5px;
            }
          }
        }
        .select {
            color: #333;
            font-weight: bold
        }
      }
      .btn-ipt {
        width: 100%;
        height: 48px;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #ccc;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        display: flex;
        justify-items: center;
        align-items: center;
        span {
          display: block;
          flex: 0 0 0 60px;
          width: 60px;
          text-align: center;
        }
        input {
          flex: 1;
          outline: none;
          height: 80%;
          padding-left: 10px;
          border-color: transparent;
          &:focus {
            box-shadow: none;
          }
        }
      }
      .tip {
        padding: 16px 0;
        color: #999;
      }
      .pay-list-con {
        display: flex;
        .pay-list {
          flex: 1;
          box-sizing: border-box;
          border: 1px solid #eef0f7;
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 14px;
          color: #5b6a9a;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          &:nth-child(2) {
            margin: 0 20px;
          }
        }
        .active {
          border-color: #F45151;
          color: #F45151;
          &::after {
            font-family: 'iconfont';
            content: '\e615';
            position: absolute;
            height: 40px;
            width: 40px;
            font-size: 40px;
            right: 0;
            bottom: -6px;
          }
        }
        .excellent {
          &::before {
            content: '';
            position: absolute;
            -webkit-transform: rotate(0deg);
            transform: rotate(-47deg);
            left: -27px;
            top: 14px;
            width: 80px;
            height: 18px;
            background: #f45151;
          }
          &::after {
            content: '单价最优';
            position: absolute;
            -webkit-transform: rotate(0deg);
            transform: rotate(-47deg);
            width: 80px;
            left: -23px;
            top: -5px;
            color: #fff;
            font-size: 12px!important;
          }
        }
        .disabled {
          background: #eef0f7;
          color: #999;
          pointer-events: none;
        }
      }
      .result-msg {
        font-size: 14px;
        padding-top: 18px;
        padding-bottom: 18px;
        dd {
          padding: 12px 0;
          display: flex;
          span,em {
            flex: 1;
            text-align: left;
          }
          em {
            text-align: right;
            font-style: normal;
            font-size: 16px;
            font-weight: 500;
          }
        }
      }
      .result-btn {
        height: 48px;
        .el-button {
          padding: 15px 20px;
          border-color: transparent!important;
          box-shadow: none!important;
          &:focus, &:hover {
            background: transparent!important;
          }
        }
        .res-btn {
          background: #F45151!important;
          color: #fff!important;
          font-size: 16px;
          &:focus, &:hover {
            background: #e13c13!important;
          }
        }
        .err-btn {
          background: #FDA22D!important;
          color: #fff!important;
          font-size: 16px;
          &:focus, &:hover {
            background: #FDA22D!important;
          }
        }
      }
    }
  }
</style>
