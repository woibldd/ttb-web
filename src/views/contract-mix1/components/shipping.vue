<template>
  <div class="shipping">
    <!--
        v-loading="!!item.future_close_id"
        element-loading-text="系统正在以市价【市场最优价格】为你的【ETH币本位】平仓，请耐心等待..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" -->
    <div
      v-for="(item, idx) in dataList"
      :key="idx"
      class="shipping-item"
      :skin="state.skin"
      flex> 
      <div>
        <h2 class="text-active text-primary">{{ item.name }}</h2>
        <h3
          v-if="item.side === 1"
          class="text-success">{{ $t(`contractMix.side.${item.side}`) }}</h3>
        <h3
          v-else
          class="text-danger">{{ $t(`contractMix.side.${item.side}`) }}</h3> 
        <h3 class="text-primary">
          <span @click="handleOpenStopModal(item)" class="pointer"><icon name="edit" />{{$t(`contractMix.stoppl.set_profit_loss`) }}</span>
        </h3>
      </div>
      <div
        flex
        style="flex:1;"> 
        <div flex> 
          <div
            v-for="(value,key,i) in tableColumns" 
            v-show="(state.siteLabel==='goldcoin' && key!=='liq_price') || state.siteLabel!=='goldcoin'"
            :key="key"
            flex-box="1">
            <!-- label -->
            <p 
              class="text-info">
              <span v-tooltip.top="{html: true, content: $t(`contractMix.mapTableTapContents.shipping.mapTableColumns.${key}.tips`), classes: 'contract'}">
                {{ $t(`contractMix.mapTableTapContents.shipping.mapTableColumns.${key}.label`) }}
              </span>
              <el-popover
                :ref="'popover-margin' + item.currency"
                v-if="key === 'margin_position' && +item.leverage !==0"
                placement="top"
                width="400">
                <div>
                  <div flex="main:left">
                    <el-radio
                      v-model="checked"
                      :label="0">{{$t('contract_add_ensurance')}}</el-radio>
                    <el-radio
                      v-model="checked"
                      :label="1">{{$t('contract_increase_ensurance')}}</el-radio>
                  </div>
                  <hr>
                  <div
                    style="font-size:12px; line-height:24px">
                    <p>{{$t('contract_your_current_werehouse')}}: <span class="text-primary"> {{ item.holding }}</span> {{$t('contract_many_piece_con', {amount:''})}} ({{ item.leverage }}x)</p>
                    <p>{{$t('contract_have_apply_yet')}}: <span class="text-primary">{{ item.margin_position | round(item.symbol.price_scale || 2) }}</span> {{ item.currency }} 【{{$t('contract_max_remove_account')}} <span class="text-primary">{{ item.margin_user | round(item.symbol.price_scale || 2) }}</span> {{ item.currency }}】<span
                      v-if="checked"
                      class="text-primary hover-point"
                      @click="margin_position = Math.floor(item.margin_user)">{{$t('input_all')}}</span></p>
                    <p>{{$t('contract_aval_balance')}}: <span class="text-primary">{{ item.available_balance | round(item.symbol.price_scale || 2) }}</span> {{ item.currency }} <span
                      v-if="!checked"
                      class="text-primary hover-point"
                      @click="margin_position = Math.floor(item.available_balance)">{{$t('input_all')}}</span></p>
                  </div>
                  <el-input
                    v-model="margin_position"
                    size="small"
                    :min="-Math.floor(item.margin_position)"
                    :max="Math.floor(item.available_balance)"
                    style="width:100%"
                    placeholder="请输入数量" />
                </div>
                <hr>
                <div flex="main:justify cross:center dir:right">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="setTransferMargin(item)">{{$t('confirm')}}</el-button>
                </div>
                <i
                  slot="reference"
                  class="el-icon-edit hover-point"  style="font-size:15px;"/>
              </el-popover>
            </p>
            <!-- value -->
            <p
              v-if="i<5"
              class="text-value">
              <span
                v-if="key==='holding'"
                :class="item.holding > 0 ? 'text-success' : 'text-danger'">
                {{ item[key] }}
              </span>
              <span v-else-if="key==='markPrice'">
                <span v-if="item.product">
                  {{ (item.product.MARKET || {}).current | fixed(item.symbol.price_scale || 2) }}
                </span>
              </span>
              <span v-else-if="key==='price'">
                <span v-if="item.product">
                  {{ item[key] | fixed(item.symbol.price_scale || 2) }}
                </span>
              </span>
              <span v-else-if="key==='_leverage'">
                {{+item.leverage===0 ? $t('contract_cal_full'):`${item.leverage}x`}}
              </span>
              <span v-else-if="key==='liq_price'">
                {{item[key] | fixed(item.symbol.price_scale) }}
              </span> 
              <span v-else> 
                {{item[key] }}
                <!-- {{key === 'markPrice'? (item.product.MARKET || {}).current:item[key]}} -->
              </span>
            </p>
            <p
              v-else
              class="text-value">
              <span
                v-if="key==='margin_position'">
                <span class="text-primary"> 
                  {{ item[key] | fixed(item.symbol.price_scale || 2) }} {{ item.currency }}
                </span>
                <br> 
              </span> 
              <span
                class="unrealized"
                v-else-if="key==='unrealized'">
                <span
                  class="lastPrice">
                  <span :class="item['funUnrealized'](item)['unrealized'] > 0 ? 'text-success' : 'text-danger'">
                    {{ item['funUnrealized'](item)['unrealized'] |round(item.symbol.price_scale || 2) }}  {{ item.currency }}
                    ({{ item['funUnrealized'](item)['roe'] |round(2) }}%)
                  </span>
                  <br> 
                </span>
                <span
                  class="marketPrice">
                  <span :class="item['funUnrealized'](item)['unrealizedM'] > 0 ? 'text-success' : 'text-danger'">
                    {{ item['funUnrealized'](item)['unrealizedM'] | round(item.symbol.price_scale || 2) }}  {{ item.currency }}
                    ({{ item['funUnrealized'](item)['roeM'] |round(2) }}%)
                  </span>
                  <br> 
                </span>
              </span>
              <span
                v-else-if="key==='realized'">
                <span :class="item[key] > 0 ? 'text-success' : 'text-danger'">
                  {{ item[key]|fixed(item.symbol.price_scale || 2) }} {{ item.currency }}
                </span>
                <br> 
              </span>
              <span v-else-if="key==='value'">
                <span>
                    {{ item['funUnrealized'](item)['openValue'] |fixed(item.symbol.price_scale || 2) }} 
                </span>
                <br> 
              </span>
              <span v-else>
                <span>
                  {{ item[key] }}
                </span>
                <br> 
              </span>
            </p> 
          </div>
        </div>
        <div
          :class="['close_position', 'pl-20', 'pr-20', state.skin]"
          v-if="!item.future_close_id || +(item.close_position_price || 0) === 0 "
          v-loading="loadingHouse"
          flex="dir:left main:justify"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.5)"> 
          <div 
            style="font-size:12px" class="mr-8">
            <div class="ml-5 mr-10">{{ $t('contract_exit_price') }}</div>
            <div>
              <input
                :value="item.inputEdit ? item.input : (item.input || bigRound((item.product.MARKET || {}).current, 2))"
                :class="['custom-input', state.skin]"
                style="width:75px;text-align:center;height: 20px;margin: 1px;"
                @focus="() => { item.input = item.input || (item.product.MARKET || {}).current; item.inputEdit = true}"
                @blur="() => item.inputEdit = false" 
                @input="e=>item.input = e.target.value">  
            </div> 
            <div>
              <el-button size="mini" type="success" class="mt-10" @click="closeStorehouse(item, true)">
                {{ $t('contractMix.closeMarket') }}
              </el-button> 
            </div>
          </div>
          <div 
            style="font-size:12px">
            <div class="ml-5 mr-10">{{ $t('contract_equal_werehouse_amount') }}</div> 
            <div>
              <el-input-number  
                size="mini" 
                :min="1" 
                style="width:79px;"
                v-model="item.inputAmount" 
                :controls="false"></el-input-number> 
            </div>
            <el-button size="mini" type="success" class="mt-10"  plain  @click="closeStorehouse(item)">
              {{ $t('contract_close_limit') }}
            </el-button>
          </div>
          <div class="text-primary" >
            <icon name="question-n" v-tooltip.top="{html: true, content: $t('contractMix.closeMarketTips')}"/>
          </div> 
        </div>
        <div
          v-else
          v-loading="loadingHouse"
          class="product-hover"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.5)">
          <div flex="cross:center"> 
            在{{ item.closePrice }}的平仓委托
            <i
              class="el-icon-close hover-point"
              title="取消"
              @click="cancelOrder(item)" /> 
          </div>
        </div> 
      </div> 
    </div>
    <span
      v-if="dataList && dataList.length === 0"
      class="el-table__empty-text">{{ $t('el.table.emptyText') }}</span>
    <v-modal :open.sync="showStopModal" >
      <stopModal @close="handleCloseStopModal" :order="selectedOrder"/>
    </v-modal>
  </div>
</template>
<script>
import { bigDiv, bigTimes, calcProfit, toBig, bigRound } from '@/utils/handleNum'
import { getRates, closeOrder, cancelOrder, modifyOrder, setTransferMargin, submitOrder } from '@/modules/api/contractMix'
import utils from '@/modules/utils'
import {state} from '@/modules/store'
import stopModal from './stop-profit-loss'

export default {
  name: 'Shipping',
  components: {stopModal},
  props: {
    dataList: {
      type: Array,
      default: null
    },
    tableColumns: {
      type: Object,
      default: null
    },
    markData: {
      type: Object,
      default: () => {}
    },
    currentData: {
      type: Object,
      default: () => {}
    },
    activeProduct: {
      type: [Object, String],
      default: () => {}
    },
    products: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      state,
      bigRound,
      currencyRates: null,
      visible: false,
      visible1: false,
      disabled: false,
      visibleChecked: false,
      margin_position: '',
      input: '',
      checked: 0,
      trigger_type: 1,
      buyBtnLoading: false,
      popoverVisible: false,
      margin_popover: false,
      formArrData: [
        {
          type: false,
          trigger_type: 1,
          trigger_price: '',
          isEdit: false,
          calcProfit: ''
        },
        {
          type: false,
          trigger_type: 1,
          trigger_price: '',
          isEdit: false,
          calcProfit: ''
        }
      ],
      loadingHouse: false,
      scale: 2,
      inputEdit: false,
      showStopModal: false,
      selectedOrder: null,
    }
  },
  computed: {
    mapFormContent () {
      return this.allLangData.contractMix.mapFormContent
    }
  },
  methods: {
    handleOpenStopModal (order) {
      this.selectedOrder = order
      this.showStopModal = true
    },
    handleCloseStopModal () { 
      this.showStopModal = false
    },
    setTransferMargin (item) {
      const amount = !this.checked ? this.margin_position : -this.margin_position
      setTransferMargin({ name: item.name, amount, side: item.side }).then(res => {
        this.$emit('change')
        // this.margin_popover = false
        this.pClose('margin' + item.currency)
        this.margin_position = 0
        this.checked = 0
        if (!res.code) {
          this.$message.success(this.$t('tj_cg'))
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleInput (e, formItem, amount, price) {
      // e && (formItem.trigger_price = e.target.value.replace(/^(0+)|[^\d]+/g, ''))
      e && (formItem.trigger_price = e.target.value)
      // const obj = {
      //   1: 'UNIT',
      //   2: 'INDEX',
      //   3: 'MARKET'
      // }
      // formItem.calcProfit = formItem.trigger_price ? calcProfit(amount, this.activeProduct[obj[formItem.trigger_type]].current, formItem.trigger_price) : '--'
      // console.log({amount, price, trigger_price: formItem.trigger_price})
      formItem.calcProfit = formItem.trigger_price ? calcProfit(amount, price, formItem.trigger_price) : '--'
    },
    handleEdit (holdingObj) {
      if (holdingObj.tp_price && +holdingObj.tp_price) {
        this.formArrData[0].type = true
        this.formArrData[0].trigger_price = holdingObj.tp_price
        this.formArrData[0].isEdit = true
        this.formArrData[0].id = holdingObj.future_tp_id
      } else {
        this.formArrData[0].isEdit = false
        this.formArrData[0].type = false
      }
      this.handleInput(false, this.formArrData[0], holdingObj.holding, holdingObj.price)
      if (holdingObj.sl_price && +holdingObj.sl_price) {
        this.formArrData[1].type = true
        this.formArrData[1].trigger_price = holdingObj.sl_price
        this.formArrData[1].isEdit = true
        this.formArrData[1].id = holdingObj.future_sl_id
      } else {
        this.formArrData[1].isEdit = false
        this.formArrData[1].type = false
      }
      this.handleInput(false, this.formArrData[1], holdingObj.holding, holdingObj.price)
    },
    handleValueByKey (key, item) {
      switch (key) {
        case 'markPrice':
          return this.markData[this.activeProduct.currency]
        case 'value':
          return bigDiv([item.holding, item.price])
        default:
          return item[key]
      }
    },
    translateByRate (value) {
      // console.log(value, this.currencyRates)
      if (!this.currencyRates || !value) return
      // return bigTimes([this.currencyRates['USD'], value])
      return toBig(this.currencyRates['USD']).times(value)
    },
    async closeStorehouse (item, isMarket) {
      if (!item.inputAmount && !isMarket) {
        this.$message.warning(this.$t('contract_order_enter_tips1'))
        return
      }
      this.loadingHouse = true 
      const title = isMarket ? this.$t('contract_close_market') : this.$t('contract_close_limit')  
      let option = item.side === 1 ? `<span class="text-danger">${ this.$t('order_side_sell')}</span>` : `<span class="text-success">${this.$t('order_side_buy')}</span>`
      let price = item.input || this.markData[this.activeProduct.currency] 
      let amount = item.inputAmount
      let currency = item.currency 

      let content = `${option}${this.$t('contract_close_tips1', {price, amount, currency: item.name})}`
      if (isMarket) {
        option = item.side === 1 ? this.$t('contract_close_market_buy') : this.$t('contract_close_market_sell')
        content = `<div>${this.$t('contractMix.closeMarketConfirm')}</div>`
      }

      
      const isOk = await utils.confirm(this, {
          customClass: "ix-message-box-wrapper",
          // confirmBtnText: confirmbtn,
          confirmButtonClass: "btn--confirm",
          cancelButtonClass: "btn--cancel",
          title,
          content,
          dangerouslyUseHTMLString: true
        }); 
      const orderPrice = isMarket ? 0 : item.input || this.markData[this.activeProduct.currency]

      // const isOk = await this.confirm(`<span class="text-primary">卖出</span>在${isMarket ? '最优' : this.input || this.markData[item.currency]}价格${item.holding}张${item.currency}合约在执行时，将平掉你的整个仓位`, isMarket ? '市价平仓' : '限价平仓')
      if (!isOk) {
        this.loadingHouse = false
        return
      }

      // const params = { name: item.name, side: item.side, price: orderPrice }
      if (isMarket) {
        const mparams = { name: item.name, side: item.side, price: 0 }
        closeOrder(mparams).then(res => { 
          // this.$emit('change')
          if (!res.code) {
            this.$eh.$emit('mix:handleAmount', this.handleAmountObj)
            this.$message.success(this.$t('tj_cg'))
          } else {
            this.$message.error(res.data)
          }
        })
        this.loadingHouse = false 
      } else {
        const params = { 
          amount: item.inputAmount, 
          name: item.name,
          currency: item.currency, 
          price: orderPrice,
          type: 1
        }  
        if (item.side===1) {
          params.side = 3
        } else {
          params.side = 4
        }

        submitOrder(params).then(res => {
          if (!res.code) {
            this.$message.success(this.$t('tj_cg')) 
            this.$eh.$emit('mix:handleAmount', this.handleAmountObj)
            this.loadingHouse = false
          } else {
            this.$message.error(res)
            this.loadingHouse = false
          }
        })
      }
      


      // closeOrder(params).then(res => {
      //   this.loadingHouse = false
      //   this.$emit('change')
      //   if (!res.code) {
      //     this.$message.success(this.$t('tj_cg'))
      //   } else {
      //     this.$message.error(res.data)
      //   }
      // }).catch(res => {
      //   this.loadingHouse = false
      // })
      //   this.loadingHouse = false 
    },
    cancelOrder (item) {
      const { user_id, future_close_id, name } = item
      this.loadingHouse = true
      cancelOrder({ user_id, order_id: future_close_id, name }).then(res => {
        // this.$emit('change')
        // this.$message.success(this.$t('tj_cg'))
        this.loadingHouse = false
        if (!res.code) {
          this.$emit('change')
          this.$message.success(this.$t('tj_cg'))
        } else {
          this.$message.error(res.message)
        }
      })
    },
    verifyPopoverBtn (item) {
      // const map_price = {
      //   1: price,
      // }
      const {price, buy, name} = item
      const obj = {
        1: 'UNIT',
        2: 'INDEX',
        3: 'MARKET'
      }
      const isBuy = buy
      const curProduct = this.products.find(p => p.name === name)
      if (isBuy) {
        // let tp_price = this.formArrData[0].trigger_type
        const check1 = isBuy &&
          +this.formArrData[0].trigger_price > +price &&
          +this.formArrData[0].trigger_price > ((curProduct[obj[this.formArrData[0].trigger_type]] || {}).current || +price)
        const check2 = isBuy &&
          +this.formArrData[1].trigger_price < +price &&
          +this.formArrData[1].trigger_price < ((curProduct[obj[this.formArrData[1].trigger_type]] || {}).current || +price)
        if (this.formArrData[0].type && this.formArrData[1].type && check1 && check2) {
          return false
        } else if (this.formArrData[0].type && check1 && !this.formArrData[1].type) {
          return false
        } else if (!this.formArrData[0].type && this.formArrData[1].type && check2) {
          return false
        }
        return true
      } else {
        const check1 = !isBuy &&
          +this.formArrData[0].trigger_price < +price &&
          +this.formArrData[0].trigger_price < ((curProduct[obj[this.formArrData[0].trigger_type]] || {}).current || +price)
        const check2 = !isBuy &&
          +this.formArrData[1].trigger_price > +price &&
          +this.formArrData[1].trigger_price > ((curProduct[obj[this.formArrData[1].trigger_type]] || {}).current || +price)
        if (this.formArrData[0].type && this.formArrData[1].type && check1 && check2) {
          return false
        } else if (this.formArrData[0].type && check1 && !this.formArrData[1].type) {
          return false
        } else if (!this.formArrData[0].type && this.formArrData[1].type && check2) {
          return false
        }
        return true
      }
    },
    submitOrder (holdingObj) {
      // const product = this.activeProduct
      const { passive, holding, buy, tp_price, sl_price, name, future_sl_id, future_tp_id } = holdingObj
      this.buyBtnLoading = true
      this.formArrData.forEach((item, index) => {
        const data = index === 0 ? { tp_type: -1, type: item.type && '6', order_id: future_tp_id } : { sl_type: -1, type: item.type && '4', order_id: future_sl_id }
        if (item.type) {
          const fun = item.isEdit ? modifyOrder : submitOrder
          if (item.isEdit && item.trigger_price === (!index ? tp_price : sl_price)) {
            this.buyBtnLoading = false
            return
          }

          if (!item.isEdit) {
            fun({ amount: Math.abs(holding), passive, price: '0', side: buy ? 2 : 1, name, ...item, ...data }).then(res => {
              this.buyBtnLoading = false
              if (!res.code) {
                this.$emit('change')
                this.$message.success(this.$t('tj_cg'))
              } else {
                this.$message.error(res.message)
              }
            }) 
          } else {
            fun({order_id : data.order_id, symbol: data.name, trigger_price: item.trigger_price}).then(res => {
               this.buyBtnLoading = false
              if (!res.code) {
                this.$emit('change')
                this.$message.success(this.$t('tj_cg'))
              } else {
                this.$message.error(res.message)
              }
            }) 
          }
        }
      })
      this.pClose(holdingObj.currency)
    },
    pClose (id) {
      // console.log(this.$refs[`popover-` + id])
      this.$refs[`popover-` + id][0].doClose()
    }
  },
  watch: {
    dataList: {
      handler () {
        if (this.products && this.dataList) {
          this.dataList.map(item => {
            item.product = this.products.find(p => p.name === item.name)
          })
        }
      },
      immediate: true
    }
  },
  async created () {
    this.currencyRates = await getRates()
  }
}
</script>
<style lang="scss" scoped>
  .shipping{
    min-height: 100%;
    .shipping-item{
      padding: 22px 0;
      // height: 125px;
      border-bottom: 1px solid #222;
      &>div{
        .interval{
          margin-top: 15px;
        }
        &:first-child{
          width: 130px;
          padding-right:30px;
          padding-left:10px;
          // border-right: 1px dashed #333;
          line-height: 20px;
        }
        &:last-child{
          padding-left:30px;
          &>:first-child{
            flex: 1;
              text-align: left;
              flex-wrap: wrap;
              font-size: 12px;
            //   &>div{
            //     width: 20%
            // }
          }
          &>.product-hover{
            width:200px;
            // background-size:30px 30px;
            // background-image:linear-gradient(45deg, $--color-primary 25%, transparent 25%, transparent 50%, $--color-primary 50%, $--color-primary 75%, transparent 75%, transparent);
            // animation:barberpole 1s linear infinite;
            position: relative;
            border:1px dashed #aaa;
            &>div{
              position: absolute;
              height: 100%;
              width: 100%;
              left: 0;
              top: 0;
              // background: $--contract-table-bg;
              transform: scale(.99);
              padding: 0 20px;
              box-sizing: border-box
            }
          }
        }
        .unrealized {
          .marketPrice {
            display:none;
            .text-success {
              background-color: #8CBF26;
              color:#fff;
              opacity: .9;
            }
            .text-danger {
              background-color: #e8704f;
              color:#fff;
              opacity: .9;
            }
          }
          &:hover {
            .lastPrice {
              display:none;
            }
            .marketPrice {
              display:inline;
            }
          }
        }
      }
      .text-info {
        color: #888888
      }
      .text-value {
        color: #2C2C2C;
      }  
      &[skin~='dark'] { 
        .text-info {
          color: #ACACAC;
        }
        .text-value {
          color: #ffffff;
        } 
      } 
    }
    .custom-input {
      border-width: 1px;  
      border-color: rgb(240, 240, 240) 
    }
    .custom-input.dark { 
      color: #FFFFFF;
      background-color: transparent;
      border-width: 1px;
    }
    .close_position{
      /deep/ .el-input .el-input__inner { 
        border-radius: 0;
        height:24px;
      }
      &.dark {
        /deep/ .el-input .el-input__inner {
          background-color: transparent; 
          color: #FFFFFF;
        } 
      } 
    }
  }
  .popover-body>*{
    margin-top: 12px;
    line-height: 32px;
    &>input,&>.transactionPrice{
      background: transparent;
      border: 1px solid #333;
      text-align: center;
      color: #ddd;
      box-sizing: border-box;
      width: 70%;
      font-size: 12px;
    }
    &>input{
      text-align: right;
      padding-right: 45px;
      &:disabled{
        color: #333;
        cursor: not-allowed
      }
    }
    &>span{
      position:absolute;
      right:14px;
      color:#999;
      border-left: 1px solid #333;
      padding-left: 4px;
    }
  }
</style>
