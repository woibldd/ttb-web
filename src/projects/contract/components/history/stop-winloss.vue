<template>
  <el-popover placement="top" @show="onShow" width="300" effect="dark" :ref="'popover-' + id" popper-class="stop-loss-container">
    <span class="icon icon-edit pointer" slot="reference" />
    <div>
      <div class="stopwin">
        <div class="r1 c-fff">
          <el-checkbox
            v-model="stopWinState"
            class="c-fff"
          >{{ $t('contract_page.order_action.modal.stop_win',{unit: "USD"}) }}</el-checkbox>
        </div>
        <div class="r2">
          <div class="row">
            <div class="action__table mt-10">
              <div class="table__tr c-fff">
                <div class="col">{{ $t('contract_trigger_type') }}</div>
                <div class="col2">
                  <el-select class="trigger_dropdown ml-6" v-model="stopWinType">
                    <el-option :label="$t('contract_page.order_action.order_price')" :value="1" />
                    <el-option :label="$t('contract_mark_price')" :value="2" />
                    <el-option :label="$t('contract_index_price')" :value="3" />
                  </el-select>
                </div>
                <div class="col1"></div>
              </div>
              <div class="table__tr c-fff">
                <div class="col">{{$t('price')}}</div>
                <div class="col2 pl-12">
                  <currency-input
                    class="trade"
                    v-model="stopWinPrice"
                    :currency="pairInfo.currency_name"
                    :accuracy="pairInfo.accuracy"
                    :scale="pairInfo.price_scale || 0"
                    :placeholder="$t('contract_order_enter_tips2')"
                  />
                </div>
                <div class="col1"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="r3">
          <!-- <p>{{$t('市场价格 上涨 至 8500 将触发 市价止盈单 预计 盈利： 0.00000432BTC')}}</p> -->
          <!-- <p>{{$t('%{triggerType} %{triggerSide} 至 %{triggerPrice} 将触发 %{triggerOrder} 预计 %{triggerResult}： %{realized}BTC', -->
          <p>
            {{$t('contract_page.order_action.modal.stop_win_tips',
            {
            triggerType: $t(triggerTypes[stopWinType]),
            triggerSide: side === 1 ? $t("contract_page.rise"): $t("contract_page.fall"),
            triggerPrice: stopWinPrice,
            realized: $big(stopWinRealized).round(8,0).toFixed(8)
            })}}
          </p>
        </div>
      </div>
      <div class="stoploss">
        <div class="r1 c-fff">
          <el-checkbox
            class="c-fff"
            v-model="stoplossState"
          >{{ $t('contract_page.order_action.modal.stop_loss',{unit: "USD"}) }}</el-checkbox>
        </div>
        <div class="r2">
          <div class="row">
            <div class="action__table mt-10">
              <div class="table__tr c-fff">
                <div class="col">{{ $t('contract_trigger_type') }}</div>
                <div class="col2">
                  <el-select class="trigger_dropdown ml-6" v-model="stoplossType">
                    <el-option :label="$t('contract_page.order_action.order_price')" :value="1" />
                    <el-option :label="$t('contract_mark_price')" :value="2" />
                    <el-option :label="$t('contract_index_price')" :value="3" />
                  </el-select>
                </div>
                <div class="col1"></div>
              </div>
              <div class="table__tr c-fff">
                <div class="col">{{$t('price')}}</div>
                <div class="col2 pl-12">
                  <currency-input
                    class="trade"
                    v-model="stoplossPrice"
                    :currency="pairInfo.currency_name"
                    :accuracy="pairInfo.accuracy"
                    :scale="pairInfo.price_scale || 0"
                    :placeholder="$t('contract_order_enter_tips2')"
                  />
                </div>
                <div class="col1"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="r3">
          <p>
            {{$t('contract_page.order_action.modal.stop_loss_tips',
            {
            triggerType: $t(triggerTypes[stoplossType]),
            triggerSide: side === 1 ? $t("contract_page.fall"): $t("contract_page.rise"),
            triggerPrice: stoplossPrice,
            realized: $big(stopLossRealized).round(8,0).toFixed(8)
            })}}
          </p>
        </div>
      </div>
      <div style="text-align: right; margin: 0">
        <el-button type="default" size="mini" @click="pCancel(id)">{{ $t('cancel')}}</el-button>
        <el-button 
          type="primary"  
          size="mini" 
          :disabled="!allowSubmit"
          @click="confirm">{{ $t('confirm')}}</el-button>
      </div> 
    </div>
  </el-popover>
</template>

<script>
import { state } from "@/modules/store";
import service from "@/modules/service";
import _ from 'lodash'
import utils from '@/modules/utils'

export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    price: {
      type: [Number, String],
      default: 0
    },
    amount: {
      type: [Number, String],
      default: 0
    },
    side: {
      type: Number,
      default: 1
    },
    liqPrice: {
      type: [Number, String],
      default: 0
    },
    pairInfo: {
      type: Object,
      default: {}
    }, 
    stopWinId: {
      type: Number,
      default: 0
    },  
    stoplossId: {
      type: Number,
      default: 0
    },   
    leverage: {
      type: [Number, String],
      default: 0
    },
    markPrice: {
      type: [Number, String],
      default: 0
    },
    indexPrice: {
      type: [Number, String],
      default: 0
    },
    lastPrice: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      state,
      triggerTypes: {
        1: "contract_page.order_action.order_price",
        2: "contract_mark_price",
        3: "contract_index_price"
      },
      stopWinState: false,
      stopWinType: 1, // 1 市价， 2 标记价格， 3 指数价格
      stoplossState: false,
      stoplossType: 1,
      stopWinPrice: 0,
      stoplossPrice: 0,
      stopWinIsExiste: false,
      stoplossIsExiste: false
    };
  },
  computed: {
    stopWinRealized() {
      let result = this.$big(0);
      let side = this.side;
      let amount = this.amount || 0;
      let price = this.price || 0;
      let swprice = this.stopWinPrice || 0;

      if (side === 1) {
        if (this.$big(swprice).lt(price)) return this.$big(0);
      } else {
        if (this.$big(swprice).gt(price)) return this.$big(0);
      }

      if (this.pairInfo.name === "FUTURE_BTCUSD") {
        if (price > 0 && swprice > 0 && amount > 0) {
          result = this.$big(amount)
            .div(price)
            .minus(this.$big(amount).div(swprice));
        } else if (price > 0 && swprice > 0 && amount < 0) {
         result = this.$big(amount).div(swprice).abs()
            .minus(this.$big(amount).div(price).abs())
        }
      } else {
        if (this.pairInfo) {
          let mul = this.pairInfo.multiplier;
          if (amount > 0) {
            result = this.$big(swprice || 0)
              .minus(price)
              .times(mul)
              .times(this.$big(amount).abs());
          } else if (amount < 0) {
            result = this.$big(price)
              .minus(swprice || 0)
              .times(mul)
              .times(this.$big(amount).abs());
          }
        }
      }
      return result;
    },
    stopLossRealized() { 
      let result = this.$big(0);
      let side = this.side
      let amount = this.amount || 0;
      let price = this.price || 0;
      let slprice = this.stoplossPrice || 0;
      let liqPrice = this.liqPrice;
      if (side === 1) {
        if (
          this.$big(slprice).gt(price) ||
          this.$big(slprice).lt(liqPrice || 0)
        )
          return this.$big(0);
      } else {
        if (
          this.$big(slprice).lt(price) ||
          this.$big(slprice).gt(liqPrice || 0)
        )
          return this.$big(0);
      }

      if (this.pairInfo.name === "FUTURE_BTCUSD") {
        if (price > 0 && slprice > 0 && side === 1) {
          result = (this.$big(amount).div(price))
            .minus(this.$big(amount).div(slprice))
        } else if (price > 0 && slprice > 0 && side === 2) {
          result = (this.$big(amount).abs().div(slprice))
            .minus(this.$big(amount).abs().div(price))
        }
      } else {
        if (this.pairInfo) {
          let mul = this.pairInfo.multiplier;
          if (side === 1) {
            result = this.$big(slprice || 0)
              .minus(price)
              .times(mul)
              .times(this.$big(amount).abs());
          } else if (side === 2) {
            result = this.$big(price)
              .minus(slprice || 0)
              .times(mul)
              .times(this.$big(amount).abs());
          }
        }
      }

      if (this.$big(result).gt(0)) result = this.$big(0);
      return result;
    }, 
    allowSubmit() {
      let side = this.side;
      let price = this.price || 0;
      let slprice = this.stoplossPrice || 0;
      let swprice = this.stopWinPrice || 0;
      let markPrice = this.markPrice
      let indexPrice = this.indexPrice
      let lastPrice = this.lastPrice
      let stopWinType = this.stopWinType
      let stoplossType = this.stoplossType 
      // 做多时，止盈触发价格不能低于委托价格，止损价格不能高于委托价格，不能低于爆仓价格
      // 做空时，止盈触发价格不能高于委托价格，止损价格不能低于委托价格，不能高于爆仓价格
      if (this.stopWinState) {
        if (side === 1) {
          if (stopWinType === 1 &&  this.$big(swprice).lt(price)) { 
            return false;
          }
          else if (stopWinType === 2 && (this.$big(swprice).lt(price) || this.$big(swprice).lt(lastPrice) || this.$big(swprice).lt(markPrice))) { 
            return false;
          }
          else if (stopWinType === 3 && (this.$big(swprice).lt(price) || this.$big(swprice).lt(lastPrice) || this.$big(swprice).lt(indexPrice))) { 
            return false;
          }
        } else {
          if (stopWinType === 1 && this.$big(swprice).gt(price)) { 
            return false;
          }
          else if (stopWinType === 2 && (this.$big(swprice).gt(price) || this.$big(swprice).gt(lastPrice) || this.$big(swprice).gt(markPrice))) { 
            return false;
          }
          else if (stopWinType === 3 && (this.$big(swprice).gt(price) || this.$big(swprice).gt(lastPrice) || this.$big(swprice).gt(indexPrice))) { 
            return false;
          }
        }
      }
  
      if (this.stoplossState) {
        if (side === 1) {
          if (this.$big(slprice).gt(price) || 
             this.$big(slprice).gt(lastPrice) || 
             this.$big(slprice).lt(this.liqPrice || 0)) {  
            return false; 
          } else if (stoplossType===2 && this.$big(slprice).gt(markPrice)) {
            return false; 
          } else if (stoplossType===3 && this.$big(slprice).gt(indexPrice)) {
            return false; 
          }  
        } else {
          if (this.$big(slprice).lt(price) ||
             this.$big(slprice).lt(lastPrice) ||
            this.$big(slprice).gt(this.liqPrice || 0)) { 
            return false;
          } else if (stoplossType===2 && this.$big(slprice).lt(markPrice)) {
            return false; 
          } else if (stoplossType===3 && this.$big(slprice).lt(indexPrice)) {
            return false;
          } 
        }
      }
      return true;
    }
  },
  methods: {
    pCancel(id) {
      this.pClose(id);
    },
    pClose(id) {
      this.$refs[`popover-` + id].doClose();
    },
    onShow(){ 
      this.stopWinState = false
      this.stoplossState = false
      this.stopWinIsExiste = false
      this.stoplossIsExiste = false
      this.stopWinPrice = 0
      this.stoplossPrice = 0
      const $this = this
      if (!!this.stopWinId || !!this.stoplossId) {
        service.getStoplossOrder({
          page : 1,
          size : 100
        }).then(res => {
          if (!!res && !res.code) {
            res.data.data.map(t => {
              if (t.id == $this.stopWinId) {
                $this.stopWinPrice = t.trigger_price
                $this.stopWinType = t.trigger_type
                $this.stopWinState = true
                $this.stopWinIsExiste = true
              }
              if (t.id == $this.stoplossId) {
                $this.stoplossPrice = t.trigger_price
                $this.stoplossType = t.trigger_type
                $this.stoplossState = true
                $this.stoplossIsExiste = true
              }
            })
          }
        })
      }
    },
    async confirm() {
      if (this.stopWinState) {  
        if (this.stopWinIsExiste) { 
          let res = await service.modifyContract({
            order_id:this.stopWinId,
            symbol: this.pairInfo.name,
            trigger_price: this.stopWinPrice,
          })
          if (res.code) {
            utils.warning(res.message)
          }
           
        } else {
          let res = await service.orderContract({
            type: 6,
            side: this.side === 1 ? 2 : 1,
            price: 0,
            amount: this.$big(this.amount).abs(),
            symbol: this.pairInfo.name,
            leverage: this.leverage,
            trigger_price: this.stopWinPrice,
            trigger_type: this.stopWinType,
            passive: 0,
            tp_type: -1 
          });  
          if (res.code) {
            utils.warning(res.message)
          }
        }  
        this.$eh.$emit("protrade:order:refresh", "confirm stop winloss"); 
      }
      if (this.stoplossState) { 
        setTimeout(async () => {  
          if (this.stoplossIsExiste) { 
            let res = await service.modifyContract({
              order_id:this.stoplossId,
              symbol: this.pairInfo.name,
              trigger_price: this.stoplossPrice,
            })
            if (res.code) {
              utils.warning(res.message)
            }  
          } else {
            let res = await service.orderContract({
              type: 4,
              side: this.side === 1 ? 2 : 1,
              price: 0,
              amount: this.$big(this.amount).abs() ,
              symbol: this.pairInfo.name,
              leverage: this.leverage,
              trigger_price: this.stoplossPrice,
              trigger_type: this.stoplossType,
              passive: 0,
              sl_type: -1 
            }) 
            if (res.code) {
              utils.warning(res.message)
            } 
          } 
          this.$eh.$emit("protrade:order:refresh", "confirm stop winloss"); 
        }, 1200)
      }  
      this.pClose(this.id)
    }

  },
  created() {
  }
};
</script>

<style lang="scss" >
.stop-loss-container {
  width: 300px !important;
  padding: 20px  !important;
  background: #1b1b1b !important;
  color: #fff !important;
  .stoploss {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .r1 {
    color: #fff;
    .el-checkbox{
      .el-checkbox__label {
          color: #fff;
      }
      &.is-checked {
        .el-checkbox__label {
          color: #fff;
        }
      }
    }
  }
  .r2 {
    .action__table {
      font-size: 12px;
      border-bottom: 0;
      border-right: 0;
      .table__tr {
        display: flex;
        height: 40px;
        box-sizing: border-box;
        line-height: 32px;

        .col {
          text-align: left;
          flex: 1;
        }
        .col2 {
          text-align: center;
          flex: 2;
          .currency-input.trade {
            width: 188px;
            .input {
              background-color: #292929;
              text-align: left;
            }
          }
          .trigger_dropdown {
            input {
              background: transparent !important;
              color: #fff !important;
              border-color: #fff !important;
              width: 188px !important;
            }
            .el-select__caret {
              color: #fff;
            }
          }
        }
        .col3 {
          text-align: center;
          flex: 3;
        }
      }
    }
  }
  .r3 {
    padding: 10px 20px;
    border: 1px solid $primary;
    font-size: 14px;
    color: $primary;
    background-color: rgba(210, 176, 112, 0.1);
    border-radius: 5px;
  } 
  $primary-color: #01CED1;
  .el-select-dropdown__item.selected {
    color: $primary-color !important;
  }

  .el-button.el-button--primary { 
    color: #fff;
    background-color: $primary-color !important;
    border-color: $primary-color !important; 
    &:hover,
    &:focus {
      color: #fff !important;
      background-color: $primary-color !important;
      border-color: $primary-color !important;
      opacity: 0.8;
    }   
    &.is-disabled {
      background-color: #999 !important;;
      color: #fff  !important; ;
    }
  }
}

.icon {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  width: 12px;
  height: 12px;
}
.icon-edit {
  background-image: url("../../../../assets/contract/icon-risk-edit.png");
}
</style>