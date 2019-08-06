<template>
  <div class="order-otcaction">
    <!-- 挂单 -->
    <div class="action-box">
      <div class="release">
        <!-- 标题 -->
        <div
          :class="{'buy': side===1, 'sell': side===2}"
          class="action-title title buy item"
          style="-webkit-padding-top: 20px;"
        >{{ $t(titleText, {currency}) }}</div>
        <div v-if="step===0">
          <!-- 买卖切换 -->
          <div
            class="sideTab tr item"
            style="margin-bottom: 15px;">
            <div class="btn-left td"  style="margin: 0px 15px;" >
              <v-btn
                :class="{'active': side===1}"
                class="w-110 buy"
                radius="15"
                height="30"
                @click="side=1,flag = false,awitFlag =false,nodata = false, nodata1 =false"
                :label="$t('otc_buy_currency', {currency: currency})"
              />
            </div>
            <div class="btn-left td"  style="margin: 0px 15px;">
              <v-btn
                :class="{'active': side===2}"
                class="w-110 sell"
                radius="15"
                height="30"
                @click="side=2,flag = false,awitFlag =false,nodata = false, nodata1 =false"
                :label="$t('otc_sell_currency', {currency: currency})"
              />
            </div>
          </div>
          <!-- 订单设置 -->
          <div class="action-input-group item">
            <div class="order-buy">
              <div class="action-order">
                <ul>
                  <li>
                    <div class="label">{{ $t('otc_current_index') }}</div>
                    <div class="content">
                      <span class="text">{{ indexPrice || 0 | fixed(2) }} {{legal_currency}}</span>
                    </div>
                  </li>
                  <li>
                    <div class="label">
                      {{ $t('otc_transaction_type') }}
                      <span class="red">*</span>
                    </div>
                    <div class="content">
                      <el-select
                        v-model="type"
                        :placeholder="$t('please_choose')"
                        style="width: 100%">
                        <el-option
                          :label="$t('otc_fixed_price')"
                          :value="1"/>
                        <el-option
                          :label="$t('otc_float_price')"
                          :value="2"/>
                      </el-select>
                    </div>
                  </li>
                  <li v-if="type===2">
                    <div class="label">
                      {{ $t('otc_float_ratio') }}
                      <span class="red">*</span>
                    </div>
                    <div class="content">
                      <div class="el-number-input">
                        <!-- <el-input-number
                          :max="130"
                          :min="70"
                          :controls="false"
                          :placeholder="$t('otc_placeholder_a')"
                          v-model="float_rate"
                          style="border: 1px solid #fff!important"
                        /> -->
                        <number-input
                          class="number-input"
                          v-model="float_rate"
                          :scale="2"
                          :placeholder="$t('otc_placeholder_a')"
                          @blur="floatRateWatcher"
                        />
                        <div
                          class="unit-label long"
                          v-html="'%'"/>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="label">
                      {{ $t('price') }}
                      <span class="red">*</span>
                    </div>
                    <div
                      class="content"
                      v-if="type===1">
                      <div class="el-number-input">
                        <!-- <el-input
                          type="number"
                          :placeholder="$t('otc_placeholder_b')"
                          v-model="inputPrice"
                          @input="computeTotal"
                          step-strictly
                        /> -->
                        <number-input
                          class="number-input"
                          v-model="inputPrice"
                          :scale="price_scale || 2"
                          :placeholder="side===1 ? $t('otc_placeholder_c') : $t('otc_placeholder_b')"
                        />
                        <div
                          class="unit-label long"
                          v-html="legal_currency"/>
                      </div>
                      <div
                        class="tips"
                        v-if="nodata">{{$t('otc_ziurec_1')}}</div>
                    </div>
                    <div
                      class="content"
                      v-else-if="type===2">
                      <div class="el-number-input">
                        <div class="em">{{ price }}</div>
                        <div
                          class="unit-label long"
                          v-html="legal_currency"/>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="label">
                      {{ $t('amount') }}
                      <span class="red">*</span>
                    </div>
                    <div class="content">
                      <div class="el-number-input">
                        <number-input
                          class="number-input"
                          v-model="amount"
                          :scale="amount_scale || 6" 
                          :placeholder="placeholder"
                        />
                        <div
                          class="unit-label long"
                          v-html="currency"/>
                      </div>
                      <div
                        class="tips"
                        v-if="nodata1">{{$t('otc_ziurec_2')}}</div>
                    </div>
                  </li>
                  <li>
                    <div class="label">
                      {{ $t('otc_total',{legal_currency}) }}
                      <span class="red">*</span>
                    </div>
                    <div class="content">
                      <div class="text-total">
                        <span class="UNA">{{ total || 0 | fixed(2) }}</span>
                        <div
                          class="unit-label long"
                          v-html="legal_currency"/>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="more-setting">
                <span class="MoreSettings">
                  <a>{{ $t('otc_more_setting') }}</a>
                </span>
              </div>
              <div class="action-order">
                <ul>
                  <li v-if="side===2">
                    <div class="label">
                      {{ $t('otc_payment_time_limit') }}
                      <span class="red">*</span>
                    </div>
                    <div class="content">
                      <el-select
                        style="width: 100%"
                        v-model="limitedTime"
                        :placeholder="$t('please_choose')"
                        disabled>
                        <el-option
                          :label="$t('otc_sell_tips_l')"
                          value="15"/>
                      </el-select>
                    </div>
                  </li>
                  <li>
                    <div class="label">
                      {{ $t('otc_opponent_kyc_level') }}

                    </div>
                    <div class="content">
                      <el-select
                        v-model="order.kyc_level"
                        :placeholder="$t('please_choose')"
                        style="width: 100%!important">
                        <el-option
                          label="KYC1"
                          :value="1"/>
                        <el-option
                          label="KYC2"
                          :value="2"/>
                      </el-select>
                    </div>
                  </li> 
                   <!--<li>-->
                    <!--<div class="label">{{ $t('otc_register_time') }}</div>-->
                    <!--<div class="content">-->
                      <!--&lt;!&ndash; <el-input :max="130" :min="70"  v-model="order.register_time" placeholder="请输入内容"></el-input> &ndash;&gt;-->
                      <!--<el-date-picker-->
                        <!--v-model="order.register_time"-->
                        <!--format="yyyy-MM-dd"-->
                        <!--value-format="timestamp"-->
                        <!--type="date"-->
                        <!--style="width: 100%!important"-->
                      <!--/>-->
                    <!--</div>-->
                  <!--</li>-->
                  <li>
                    <div class="label">{{ $t('otc_order_remarks') }}</div>
                    <div class="content" >
                      <el-input
                        class="coadawm"
                        :max="130"
                        :min="70"
                        maxlength="30"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        v-model="order.remark"
                      />
                      <!-- 请输入内容
                      :placeholder="$t('otc_placeholder_enter')"-->
                    </div>
                  </li>
                  <li v-if="flag">
                    <el-alert
                      :title="alertTitle"
                      :closable="alertFlag"
                      type="warning"/>
                  </li>
                  <li v-if="awitFlag">
                    <el-alert
                      :title="$t('otc_ziurec_12')"
                      :closable="alertFlag"
                      type="warning"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          class="order-info"
          v-if="step===1">
          <!-- 订单信息 -->
          <div class="action-order-info wrap item">
            <v-list
              v-if="step===1"
              :header="orderBuyHeader"
              :table="orderData"/>
          </div>
        </div>
      </div>
    </div>
    <!-- footer做一个吸底盒 -->
    <!-- 按钮 -->
    <div class="footer">
      <div class="tr message-box">
        <div
          v-if="!!message_success"
          class="msg success">
          <icon name="true"/>
          {{ message_success }}
        </div>
        <div
          v-if="!!message_failed"
          class="msg failed">
          <icon name="false"/>
          {{ message_failed }}
        </div>
      </div>
      <div class="action-button-group">
        <!--挂卖单-->
        <!-- 取消/发布卖单 -->
        <div
          v-if="step<1"
          class="tr">
          <div class="btn-left td">
            <v-btn
              class="btn-cancel cancel"
              radius="3"
              height="52"
              @click="closeSideBar"
              :label="$t('cancel')"
            />
          </div>
          <div class="btn-left td">
            <v-btn
              :class="{'buy': side===1, 'sell':side===2}"
              class="btn-apply"
              radius="3"
              height="52"
              @click="craeteOrder"
              :label="$t(confirmText)"
            />
          </div>
        </div>
        <!-- 撤单/关闭 -->
        <div
          v-else-if="step===1"
          class="tr">
          <div class="btn-left td">
            <v-btn
              class="btn-cancel cancel"
              radius="3"
              height="52"
              @click="revokeOrder"
              :label="$t('cancel_order')"
            />
          </div>
          <div class="btn-left td">
            <v-btn
              class="btn-apply close"
              radius="3"
              height="52"
              @click="closeSideBar"
              :label="$t('close')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from '@/modules/service.js'
import { state } from '@/modules/store.js'
import vList from '@/components/OTC/vlist/vertical-table'
import utils from '@/modules/utils.js'
import otcComputed from '@/components/OTC/mixins/index.js'
import _ from 'lodash'
// import otcWatch from "@/mixins/otc-watcher.js"
export default {
  data () {
    return {
      state,
      side: 1,
      limitedTime: '15',
      sideTitle: '发布购买委托单 BTC',
      message: this.$t('otc_tips_success'),
      message_success: '',
      message_failed: '',
      amount: '',
      operation: 1, // 操作 1: 买/卖, 2: 发布委托
      operSide: 1, // 操作类型 1: 买 ,2: 卖
      step: 0, // 步骤, 根据操作 和 类型 的不同,展示不同的结果
      inputPrice: "",
      float_rate: 100, // 浮动比例
      // total: 0,
      type: 1,
      nodata: false,
      nodata1: false,
      order: {
        currency: 'BTC',
        side: 1,
        type: 1,
        float_rate: 1,
        price: 0,
        amount: 0,
        total: 0,
        kyc_level: 2,
        register_time: new Date().getTime(),
        remark: ''
      },
      orderBuyHeader: {
        name: this.$t('otc_kvcoc_1'),
        count: 0,
        headers: [
          {
            title: 'type', // 交易类型
            text: this.$t('otc_transaction_type'),
            width: '',
            key: 'type'
          },
          {
            title: 'currency', // 币种
              text: this.$t('currency'),
            width: '',
            key: 'currency'
          },
          {
            title: 'price', // 单价(CNY)
             text: this.$t('otc_trans_idjg'),
            width: '',
            key: 'price'
          },
          {
            title: 'amount', // 数量(CNY)
            text: this.$t('amount'),
            width: '',
            key: 'amount'
          },
          {
            title: 'total', // 总金额(CNY)
            text: this.$t('otc_ziurec_19'),
            width: '',
            key: 'total'
          },
          {
            title: 'fee', // 平台服务费
             text: this.$t('otc_ziurec_13'),
            width: '',
            key: 'fee'
          },
          {
            title: 'kyc_level', // 对手认证等级
            text: this.$t('otc_opponent_kyc_level'),
            width: '',
            key: 'kyc_level'
          }
        ]
      },
      orderData: {},
      alertTitle: '',
      flag: false,
      alertFlag: false,
      awitFlag: false,
      balance: {},
    }
  },
  mixins: [otcComputed],
  props: {
    active_id: {
      type: Number,
      default: 0
    },
    view: {
      type: Object,
      defalut: {}
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: { 
    titleText () {
      if (this.side === 1) {
        return 'otc_publish_buy_order'
      } else if (this.side === 2) {
        return 'otc_publish_sell_order'
      }
    },
    confirmText () {
      if (this.side === 1) {
        return 'otc_order_confirm_buy'
      } else if (this.side === 2) {
        return 'otc_order_confirm_sell'
      }
    },
    price () {
      if (this.type === 1) {
        return this.inputPrice
      } else {
        return this.$big(this.float_rate || 0)
          .mul(0.01)
          .mul(this.indexPrice || 0)
          .toFixed(2)
      }
    }, 
    total () {
      return this.$big(this.amount || 0).mul(this.price || 0)
    },
    placeholder () {
      let plt = '0' 
      if (this.side === 1) {
        return this.$t('contract_order_enter_tips1')
      }
      else {
        if (JSON.stringify(this.balance) !== "{}")
          plt = this.balance[this.currency].available
        return '可用数量：' + plt
      }
    },
  },
  components: {
    vList
  },
  methods: {
    floatRateWatcher() {
      let val = this.float_rate
      if (!isNaN(Number(val))) {
        if (Number(val) > 130) {
          this.float_rate = 130
        }
        else if(Number(val) < 70) {
          this.float_rate = 70
        } 
      } 
    },
    openSideBar () {
      this.step = 0
      this.active_id = 0
      this.show = true
    },
    closeSideBar () {
      this.step = 0
      this.active_id = 0
      this.$emit('closeSide')
    },
    async craeteOrder () {
      this.nodata = false
      this.nodata1 = false
      if (!this.isLogin) {
        this.$router.push({
          name: 'login'
        })
        return
      }
      if (!this.price) {
        this.nodata = true
        if (!this.amount) {
          this.nodata1 = true
        }
      } else if (!this.amount) {
        this.nodata1 = true
      } else {
        this.order.currency = this.currency
        this.order.total = this.total.round(2, 0) // Number(this.$big(this.amount).mul(this.price).toFixed(2));
        this.order.type = this.type
        this.order.side = this.side
        this.order.price = this.price
        this.order.amount = this.amount
        this.order.float_rate = Number(this.$big(this.float_rate).mul(0.01))
        this.order.currency_type = this.legal_currency

        console.log({total: this.total})
        service.createOtcOrder(this.order).then(res => {
          this.nodata = false
          this.nodata1 = false
          if (!res.code) {
            this.step = 1
            this.orderData = res.data
            this.orderData.fee = this.$t('otc_ziurec_16')
            this.orderData.type =
              this.orderData.type == 1 ? 'otc_fixed_price' : 'otc_float_price'
            this.orderData.total = this.total
            // this.$big(this.orderData.price).mul(this.orderData.amount)
            this.active_id = res.data.active_id

            this.message_success = this.$t('otc_tips_success')
            this.message_failed = ''

            this.$eh.$emit('otc:assets:balance')
          } else if (res.message) {
            utils.alert(res.message)
            this.message_success = ''
            this.message_failed = this.$t('otc_tips_failed_a') + res.message
          }
        })
      }
    },
    revokeOrder () {
      let params = {
        type: 1,
        trans_id: this.active_id
      }
      service.otcOrderRemove(params)
      this.step = 0
      this.$emit('closeSide')
    },
    // computeTotal () {
    //   if (this.$big(this.amount).lt(0)) {
    //     this.amount = "0"
    //   }
    //   if (this.$big(this.inputPrice).lt(0)) {
    //     this.inputPrice = "0"
    //   }
    //   this.total = this.$big(this.amount || 0).mul(this.price || 0)
    // }
  },
  created() {    
    this.balance = {} 
    service.getOtcBalance().then(res => {
      if(res.code === 0) {  
        res.data.map(row => { 
          this.$set(this.balance, row.currency, row )
        }) 
      }
    })  
  },
  watch: {
    inputPrice () {
      this.flag = false
      this.alertTitle = ''
      this.awitFlag = false 
      console.log({symbolInfo:this.symbolInfo})
      let buy_price_one = this.symbolInfo.buy_price_one
      let sell_price_one = this.symbolInfo.sell_price_one
      if (this.legal_currency.toUpperCase() === 'SGD') {
        buy_price_one = this.symbolInfo.sgd_buy_price_one
        sell_price_one = this.symbolInfo.sgd_sell_price_one
      }


      if (this.currency === this.symbolInfo.currency) {
        let min_buy_price = Number(buy_price_one) * 0.8
        let min_sell_price = Number(sell_price_one) * 0.8
        let awit_buyPrice = Number(
          Number(min_buy_price) - Number(this.inputPrice)
        )
        let awit_sellPrice = Number(
          Number(min_sell_price) - Number(this.inputPrice)
        )
        if (this.side === 1) {
          if (this.$big(this.inputPrice).gt(sell_price_one)) {
            this.flag = true
             this.alertTitle =this.$t('otc_ziurec_3',{currency:this.currency,inputPrice:this.inputPrice,symbolInfo:sell_price_one, legal_currency:this.legal_currency})
           // `您发布的购买${this.currency}的交易单，价格为${this.inputPrice}CNY高于卖一价${this.symbolInfo.sell_price_one}CNY，以该价格发布可能给您带来损失`
          } else {
            this.flag = false
            if (awit_buyPrice > 0) {
              console.log({awit_buyPrice})
              this.awitFlag = true
            } else {
              this.awitFlag = false
            }
          }
        } else { 
          if (this.$big(this.inputPrice).lt(buy_price_one)) {
            this.flag = true 
              this.alertTitle =this.$t('otc_ziurec_15',{currency:this.currency,inputPrice:Number(this.inputPrice).toFixed(2),symbolInfo: Number(buy_price_one).toFixed(2), legal_currency:this.legal_currency})
          // `您发布的出售${this.currency}的交易单，价格为${this.inputPrice}CNY低于买一价${ this.symbolInfo.buy_price_one}CNY，以该价格发布可能给您带来损失`
          } else {
            this.flag = false
            if (awit_sellPrice > 0) {
              // console.log({awit_sellPrice})
              this.awitFlag = true
            } else {
              this.awitFlag = false
            }
          }
        }
      }
    },
    view () {
      if (JSON.stringify(this.view) != '{}') {
        this.orderData = this.view
        this.step = 1
      }
    },
    show () {
      //this.total = ''
       if (this.show) { 
        this.balance = {} 
        service.getOtcBalance().then(res => {
          if(res.code === 0) {  
            res.data.map(row => { 
              this.$set(this.balance, row.currency, row )
            }) 
          }
        })  
      }
      this.amount = ''
      this.orderData = []
      this.step = 0
      this.active_id = 0
      this.message_success = ''
      this.message_failed = ''
      this.inputPrice = ''
      // if (this.show === false) {
      //   this.view = {}
      // }
    },
    currency () {
      for (const symbol of this.state.otc.symbolList) {
        if (symbol.currency == this.currency) {
          this.state.otc.symbolInfo = symbol
          return
        }
      }
    },
    side () { 
      this.order.remark = ''
      this.inputPrice = ''
      this.amount = ''
      //this.total = ''
      this.message_success = ''
      this.message_failed = ''
    },
    // float_rate(val) {
    //   if (!isNaN(Number(val))) {
    //     if (Number(val) > 130) {
    //       this.float_rate = 130
    //     }
    //     else if(Number(val) < 70) {
    //       this.float_rate = 70
    //     } 
    //   } 
    // }

  }
}
</script>

<style lang="scss" scope>
  .tr {
    @include clearfix();
    .td {
      float: left;

    }
  }

  .order-otcaction {
    height: 100%;
    .tips {
      font-size: 12px;
      color: red
    }
    .action-box {
      height: calc(100% - 120px);
      padding: 0 38px;
      overflow: scroll;
      .title {
        &.buy {
          color: $otc-buy-bg;
        }
        &.sell {
          color: $otc-sell-bg;
        }
      }
      .action-title {
        margin-bottom: 20px;
        //color: $otc-buy-bg;
        font-size: 24px;
        font-weight: bold;
      }
      .sideTab {
        .btn-left {
          margin: 0 20px;
          .btn {
            color: #b1b1b1;
            background-color: #fff;
          }
          .active {
            color: #fff;
            &.buy {
              background-color: $otc-buy-bg;
            }
            &.sell {
              background-color: $otc-sell-bg;
            }
          }
        }
      }
      .item {
        .el-number-input,
        .el-input__inner,
        .el-textarea__inner {
          position: relative;
          width: 100%!important;
        }
      }
      ul {
        li {
          margin: 15px 0;
          //line-height: 40px;
          display: flex;
          .label {
            display: flex;
            align-items: center;
            flex: 100px 0 0 0;
            width: 100px;
           // margin-bottom: 15px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
          .content {
            flex: 1;
            line-height: 40px;
            .el-input__inner {
              text-align: left; 
            }
            // .coadawm{
            //   height: 80px!important;;
            // }

            .unit-label {
              right: 10px;
            }
            .text-total {
              position: relative;
              text-indent: 8px;
              height: 40px;
            }
            .el-number-input {
              text-indent: 15px;
              border: 1px solid #ccc;
              border-radius: 4px;
            }
          }
          @include clearfix();
          & > div {
            float: left;
          }

          .el-alert {
            line-height: 25px;
          }
        }
      }
      .ix-button {
        padding: 0 20px;
      }
    }
    .footer {
      box-shadow: 0px 0px 50px #aaaaaa;
      height: auto;
      position: absolute;
      width: 100%;
      overflow: hidden;
      left: 0;
      bottom: 0;
      .btn {
        &.buy {
          background-color: $otc-buy-bg;
        }
        &.sell {
          background-color: $otc-sell-bg;
        }
        &.cancel,
        &.close {
          background-color: #fff;
          color: #333;
        }
      }
    //   .tr.message-box {
    //     position: absolute;
    //     top: 8px;
    //     left: 0;
    //     width: 100%;
    //   }
      .msg {
        padding-left: 24px;
        font-size: 14px;
        color: #333;
        &.success {
          background-color: rgba(9, 201, 137, 0.1);
        }
        &.failed {
          background-color: rgba(244, 81, 81, 0.1);
        }
        .iconfont {
          vertical-align: middle;
        }
      }
    }
    .action-button-group {
      padding: 20px 40px;
      .btn-left {
        float: left;
        .btn {
          &.btn-cancel {
            width: 100px;
            margin-right: 19px;
          }
          &.btn-apply {
            width: 190px;
          }
        }
      }
    }
    .wrap {
      margin: 10px 0;
      table {
        width: 100%;
        font-size: 14px;
        th {
          text-align: left;
          border-bottom: 1px solid #ccc;
          &.status {
            text-align: right;

          }
        }
        tr {
          line-height: 25px;
        }
      }
    }
  }
  .MoreSettings {
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(41, 91, 220, 1);
    margin-bottom: 15px;
    > a {
      color: rgba(41, 91, 220, 1);
      font-size: 14px;
      margin-right: 23px;
    }
  }
  .UNA{
    display: inline-block;
    width: 162px;
    overflow: hidden;
    font-size: 13.33px;
  }
  .el-input-number {
    width: 100%;
    line-height: 34px;
    margin-top: 1px;
    text-indent: -20px;
    input {
      outline: none;
      background: none;
      border-color: transparent!important;
      box-shadow: none
    }
    .number-input {
      border-color: transparent!important;
    }
  }
</style>
