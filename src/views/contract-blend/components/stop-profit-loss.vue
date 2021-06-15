<template>
  <div :class="['stop-container', state.skin]">
    <div class="handle">
      {{$t('contractMix.stoppl.set_pro_loss')}}
    </div>
    <div class="line"></div> 
    <div class="content" v-if="order">
      <div class="holding-info">
        <div class="r1">
          <em>{{order.name}}</em> 
          <label class="lever">{{order.leverage==='0' ? $t('contract_all_in') : `${order.leverage}X`}}</label> 
          <label :class="{success: order.side===1, danger: order.side===2}"> {{$t(`contractMix.side.${order.side}`)}}</label>
        </div>
        <div class="r2" flex="main:left">
          <em class="mr-12">{{$t('contractMix.stoppl.average_open_price')}}</em> 
          <span class="mr-12"> {{order.price | round(order.product.price_scale)}}{{` ${order.currency}`}}</span>
          <em class="mr-12">{{$t('contractMix.stoppl.newPrice')}}</em> 
          <span class="mr-12"> {{(order.product.BLEND || {}).current  | round(order.product.price_scale)}} {{` ${order.currency}`}}</span> 
        </div>
      </div>
      <div class="line mt-25 mb-20"></div>
      <div class="box">
        <div class="mb-20" flex="main:justify">
          <div class="txl">
            <el-checkbox @change="handleCheckChange('checkProfit')" v-model="checkProfit">{{$t('contractMix.stoppl.set_profit')}}</el-checkbox>
            <el-checkbox @change="handleCheckChange('checkLoss')" v-model="checkLoss">{{$t('contractMix.stoppl.set_loss')}}</el-checkbox>
          </div>
          <div class="txr">
            <label :class="{active: +type===6 }" @click="handleSetType(6)" class="tab-label">{{$t('contract_market_price')}}</label>
            <label :class="{active: +type===5 }" @click="handleSetType(5)" class="tab-label">{{$t('contract_limit_price')}}</label>
          </div>
        </div>
        <div v-if="checkProfit" class="row" flex>
          <div class="l" flex-box="1">
            <div>{{$t('contractMix.stoppl.take_profit_trigger_price')}}</div>
            <div>
              <xnumberInput :min="0" v-model="tp_trigger_price">
                <i slot="suffix">USDT</i>
              </xnumberInput>
            </div>
          </div>
          <div  v-if="type===5" class="r ml-15" flex-box="1">
            <div>{{$t('contractMix.stoppl.take_profit_commission_price')}}</div>
            <div>
              <xnumberInput :min="0" v-model="tp_price">
                <i slot="suffix">USDT</i>
              </xnumberInput>
            </div>
          </div>
        </div>
        <div v-if="checkLoss"  class="row" flex>
          <div class="l" flex-box="1">
            <div>{{$t('contractMix.stoppl.stop_loss_trigger_price')}}</div>
            <div>
              <xnumberInput :min="0" v-model="sl_trigger_price">
                <i slot="suffix">USDT</i>
              </xnumberInput>
            </div>
          </div>
          <div v-if="type===5" class="r ml-15" flex-box="1">
            <div>{{$t('contractMix.stoppl.stop_loss_order_rice')}}</div>
            <div>
              <xnumberInput :min="0" v-model="sl_price">
                <i slot="suffix">USDT</i>
              </xnumberInput>
            </div>
          </div>
        </div>
        <div class="row">
          <div>{{$t('contractMix.stoppl.flat_amount')}}</div>
          <div>
            <xnumberInput :min="0" v-model="amount">
              <i slot="suffix">USDT</i>
            </xnumberInput>
          </div>
        </div>
        <div class="row mt-7" flex> 
          <!-- <div class="label pointer" @click="handleProportion(0.1)" flex-box="1">10%</div> -->
          <el-button class="label pointer"  @click="handleProportion(0.1)" flex-box="1">10%</el-button>
          <el-button class="label pointer"  @click="handleProportion(0.25)" flex-box="1">25%</el-button>
          <el-button class="label pointer"  @click="handleProportion(0.5)" flex-box="1">50%</el-button>
          <el-button class="label pointer"  @click="handleProportion(0.75)" flex-box="1">75%</el-button>
          <el-button class="label pointer"  @click="handleProportion(1)" flex-box="1">100%</el-button> 
        </div>
        <div class="row">
          {{$t('contractMix.stoppl.can_be_leveled')}} {{order.sum_close_amount}} 
        </div>
        <div class="msg text-danger">
          {{errmsg}} &nbsp;
        </div>
      </div> 
    </div>
    <div class="line"></div>
    <div class="bottom">
      <el-button @click="close" :type="state.skin==='dark'? 'dark' : 'primary'" plain>
        {{$t('cancel')}}
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        {{$t('confirm')}}
      </el-button>
    </div>
  </div>
</template>

<script>
import xnumberInput from '@/components/XNumberInput.vue' 
import api from '@/modules/api/blend'
import {state} from '@/modules/store'
export default { 
  props: {
    order: {
      type: Object,
      default: {}
    }
  },
  components: {
    xnumberInput,
  },
  data() {
    return {
      state,
      errmsg: '',
      checked: false,
      checkProfit: true,
      checkLoss: true,
      type: 6, // 5限价止盈止损 6市价止盈止损
      side: 0, // 3平多(卖出平多) 4平空(买入平空)
      amount: 0,
      tp_trigger_price: 0, //止盈触发价格
      tp_price: 0, //止盈委托价格，市价传0
      sl_trigger_price: 0, //止损触发价格
      sl_price: 0, //止损委托价格，市价传0 
    }
  },
  methods: {
    handleSetType(typeid) {
      this.type = typeid
    },
    handleProportion(num) {
      this.amount = this.$big(this.order.sum_close_amount || 0).times(num).round(0,0).toString()
    },
    handleCheckChange(type) {
      if (!this.checkProfit && !this.checkLoss) {
        this.$message.warning( this.$t('contractMix.stoppl.set_profit_loss_not_empty'))
        this.$set(this, type, true) 
      }
    },
    async handleSubmit() {
      let isOK = this.checkParams()
      if (!isOK) {
        return
      }
      const params = {
        type: this.type,
        amount: this.amount, 
        name: this.order.name,
        currency: this.order.currency,
        price:0,
      }
      if (this.order.side===1) {
        params.side = 3
      } else {
        params.side = 4
      }
      if (this.checkProfit) {
        params.tp_trigger_price = this.tp_trigger_price //止盈触发价格
        params.tp_price = this.tp_price
      }
      if (this.checkLoss) {
        params.sl_trigger_price = this.sl_trigger_price//止损触发价格
        params.sl_price = this.sl_price
      } 
      api.submitBlendOrder(params).then(res => {
        if (!res.code) {
          this.$message.success(this.$t('tj_cg')) 
          this.$eh.$emit('mix:handleAmount', this.handleAmountObj)
          this.close()
        } else {
          this.$message.error(res)
        }
      })
    },
    checkParams() {
      this.errmsg = ''
      const lastPrice = (this.order.product.BLEND || {}).current || 0
      if (this.checkProfit && (!this.tp_trigger_price || +this.tp_trigger_price === 0)) {
        this.errmsg = this.$t('contractMix.stoppl.input_pro_price')//'止盈触发价格不能为0'
        return false
      }
      if (this.checkLoss &&  (!this.sl_trigger_price || +this.sl_trigger_price === 0)) {
        this.errmsg = this.$t('contractMix.stoppl.input_loss_price')//'止损触发价格不能为0'
        return false
      }
      if (+this.amount===0) {
        this.errmsg = this.$t('contractMix.stoppl.input_can_amount')//'平仓数量不能为0'
        return false
      } 
      if (this.$big(this.amount || 0).gt(this.order.sum_close_amount)) { 
        this.errmsg = this.$t('contractMix.stoppl.close_amount')//'平仓数量大于可平仓数量'
        return false
      }

      //平多
      //止盈触发价格 > 最新价格
      //止损触发价格 < 最新价格
      if (this.order.side === 1) {
        if (this.checkProfit && this.$big(this.tp_trigger_price).lt(lastPrice)) {
          this.errmsg = this.$t('contractMix.stoppl.price_3')//'止盈触发价格必须大于最新成交价格'
          return false
        }
        if (this.checkLoss && this.$big(this.sl_trigger_price).gt(lastPrice)) {
          this.errmsg = this.$t('contractMix.stoppl.price_1')//'止损触发价格必须小于最新成交价格'
          return false
        }
      } 
      //平空
      //止盈触发价格 < 最新价格
      //止损触发价格 > 最新价格
      else if (this.order.side === 2) {
        if (this.checkProfit && this.$big(this.tp_trigger_price).gt(lastPrice)) {
          this.errmsg = this.$t('contractMix.stoppl.price_2')//'止盈触发价格必须小于最新成交价格'
          return false
        }
        if (this.checkLoss && this.$big(this.sl_trigger_price).lt(lastPrice)) {
          this.errmsg = this.$t('contractMix.stoppl.price_4')//'止损触发价格必须大于最新成交价格'
          return false
        }
      }
      return true
    },
    close () { 
      this.$emit('close')
    }
  },
}
</script>

<style lang="scss">
  .stop-container {
    width: 445px;
    .line {
      height: 1px;
      background-color: #E2E2E2;
    }
    .handle { 
      padding: 14px;
      text-align: left;
      color: #383838;
      font-size: 14px;
    }
    .content {
      padding: 20px 24px 5px;
      text-align: left;
      .holding-info {
        color: #383838;
        .r1 {
          em {
            font-size: 16px;
          }
          label {
            padding: 1px 8px;
            background-color: #FFEFF2;
            border-radius: 2px;
            color: #E72D2B;
            &.lever {
              margin-left: 50px;
            }
            &.success {
              background-color: #E7F9F3;
              color: #08C989;
            }
          }
        }
        .r2 {
          font-size: 12px;
          em {
            color: #9B9B9B;
          }
        }
      }
      .box {
        font-size: 12px;
        .tab-label {
          padding: 7px 11px;
          background: #f7f7f7;
          border-radius: 2px;
          color: #979797;
          &.active {
            background-color: #FFEFF2;
            color: #E72D2B;
          }
        }
        .label {
          padding: 2px 0;
          text-align: center;
          background-color: #F7F7F7;
          border-radius: 2px;
          &:not(:nth-child(1)) {
            margin-left:14px;
          }
        }
        .el-input__suffix {
          line-height: 40px;
        }
      }
    }
    .bottom {
      padding: 17px;
      .el-button {
        width: 128px;
      }
    }
    &.dark {
      color: #cccccc;
      background-color: #121212;
      .line { 
        background-color: #666;
      }
      .content{
        .el-input .el-input__inner, 
        .el-button.label, 
        .el-button span,
        .box .tab-label {
          background-color: transparent;
        }
        .box .tab-label,
        .holding-info .r1 label {
          border:1px solid #999;
          background-color: transparent;
          &.active {
            background-color: transparent;
          }
        } 
      }
      .handle, .content  .holding-info {
        color:#cccccc
      }
    }
  }
</style>