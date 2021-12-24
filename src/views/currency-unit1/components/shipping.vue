<template>
  <div class="shipping">
    <!--
        v-loading="!!item.future_close_id"
        element-loading-text="系统正在以市价【市场最优价格】为你的【ETH币本位】平仓，请耐心等待..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" -->
    <div
      v-for="item in data"
      :key="item.currency"
      class="shipping-item"
      flex>
      <div>
        <h2 class="text-active text-primary">{{ item.name }}</h2>
        <h3
          v-if="item.holding > 0"
          class="text-success">{{ $t(`contract.mapFormContent.mapHandleBtn.buy`) }}</h3>
        <h3
          v-else
          class="text-danger">{{ $t(`contract.mapFormContent.mapHandleBtn.sell`) }}</h3>
        
      </div>
      <div
        flex
        style="flex:1;">
        <div flex>
          <div
            v-for="(value,key,i) in tableColumns"
            :style="[{width:i>6 ? '14%' : '8%'}]"
            :key="key">
            <!-- label -->
            <p
              class="text-info">
              <span v-tooltip.top="{html: true, content: $t(`contract.mapTableTapContents.shipping.mapTableColumns.${key}.tips`), classes: 'contract'}">
                {{ $t(`contract.mapTableTapContents.shipping.mapTableColumns.${key}.label`) }}
              </span>
              <el-popover
                :ref="'popover-margin' + item.currency"
                v-if="key === 'margin_position' && +item.leverage !==0"
                placement="top"
                width="400">
                <div>
                  <div flex="main:justify">
                    <el-radio
                      v-model="checked"
                      :label="0">增加仓位保证金</el-radio>
                    <el-radio
                      v-model="checked"
                      :label="1">减少仓位保证金</el-radio>
                  </div>
                  <hr>
                  <div
                    style="font-size:12px; line-height:24px">
                    <p>你的当前仓位: <span class="text-primary"> {{ item.holding }}</span> 张合约 ({{ item.leverage }}x)</p>
                    <p>当前已分配的保证金: <span class="text-primary">{{ item.margin_position | toRound(8) }}</span> {{ item.currency }} 【最大可减少 <span class="text-primary">{{ Math.floor(item.margin_position) }}</span> {{ item.currency }}】<span
                      v-if="checked"
                      class="text-primary hover-point"
                      @click="margin_position = Math.floor(item.margin_position)">全部</span></p>
                    <p>可用保证金: <span class="text-primary">{{ item.available_balance | toRound(8) }}</span> {{ item.currency }}【最大可增加 <span class="text-primary">{{ Math.floor(item.available_balance) | toRound(8) }}</span> {{ item.currency }}】<span
                      v-if="!checked"
                      class="text-primary hover-point"
                      @click="margin_position = Math.floor(item.available_balance)">全部</span></p>
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
                  class="el-icon-edit hover-point"  style="font-size:15px;" />
              </el-popover>
            </p>  
            <!-- value -->
            <p class="text-info">
              <template
                v-if="i<5"> 
                <span
                  v-if="key==='holding'"
                  :class="item.holding > 0 ? 'text-success' : 'text-danger'">
                  {{ item[key] }}
                </span>
                <span v-else>{{ key === 'markPrice'? bigRound(markData[item.currency], getProduct(item.name).price_scale || 2) :key === 'liq_price'?bigRound(item[key],getProduct(item.name).price_scale || 2):item[key] }}</span>
              </template>
              <template v-else-if="key==='lp_tp'"> 
                 <!-- <p class="interval">{{ $t('shipping.winLimit') }} / {{ $t('shipping.lossLimit') }}</p> -->
                <p>
                  <span class="text-success">{{ !+item.tp_price?'--':item.tp_price }}</span>  / <span class="text-danger">{{ !+item.sl_price?'--':item.sl_price }}</span>
                  <el-popover
                    placement="top"
                    :popper-class="['custom-popper',, state.skin ]"
                    width="400"
                    trigger="click"
                    :ref="'popover-' + item.currency">
                    <div :class="['tlp-wrap']">
                      <div
                        v-for="(formItem,index) in formArrData"
                        :key="index"
                        class="popover-body">
                        <el-checkbox
                          class="text-light"
                          v-model="formItem.type">{{ $t(formItem.option ,{unit: "USD"}) }}</el-checkbox>
                        <div flex="main:justify">
                          <label class="text-light">{{ $t('contract.mapFormContent.mapInput.triggerType') }}</label>
                          <el-select
                            v-model="formItem.trigger_type"
                            :disabled="!formItem.type"
                            size="small"
                            class="custom-select transactionPrice"
                            @change="handleInput(false,formItem,item.holding, item.price)">
                            <el-option
                              v-for="(subValue,subKey) in mapFormContent.mapTriggerType"
                              :key="subKey"
                              :label="subValue"
                              :value="+subKey"/>
                          </el-select>
                        </div>
                        <div flex="main:justify">
                          <label class="text-light">{{ $t('contract.mapFormContent.mapInput.triggerPrice') }}</label>
                          <input
                            :disabled="!formItem.type"
                            :value="formItem.trigger_price"
                            type="text"
                            @input="handleInput($event,formItem,item.holding, item.price)"
                          >
                          <span>USD</span>
                        </div> 
                        <p> 
                            {{$t(formItem.tips, {
                              triggerType: mapFormContent.mapTriggerType[formItem.trigger_type],
                              triggerSide: ((item.buy && !index) || (!item.buy && !!index))  ? $t("contract_page.rise"): $t("contract_page.fall") ,
                              triggerPrice: formItem.trigger_price||'--',
                              realized: formItem.calcProfit||'--',
                              currency: item.currency
                              })
                            }} 
                        </p>
                      </div>
                      <el-button
                        type="primary"
                        style="margin-top:12px;width:100%"
                        :loading="buyBtnLoading"
                        :disabled="verifyPopoverBtn(item)"
                        @click="submitOrder(item)">{{$t('confirm')}}</el-button>
                    </div>
                    <i
                      slot="reference"
                      class="el-icon-edit hover-point text-primary"
                      style="font-size:15px;"
                      @click="handleEdit(item)" />
                  </el-popover>
                </p> 
              </template>
              <template
                v-else
                class="text-info">
                <span
                  v-if="key==='margin_position'">
                  <span class="text-primary">
                    {{ item[key]|bigRound(8) }} {{ item.currency }}
                  </span>
                  <br> 
                  <span>
                    ≈ {{ translateByRate(item.currency, item[key])|bigRound(2) }} USD
                  </span>
                </span>
                <span
                  class="unrealized"
                  v-else-if="key==='unrealized'">
                  <span
                    class="lastPrice">
                    <span :class="item['funUnrealized'](item)['unrealized'] > 0 ? 'text-success' : 'text-danger'">
                      {{ item['funUnrealized'](item)['unrealized'] |bigRound(8) }}
                      ({{ item['funUnrealized'](item)['roe'] |bigRound(2) }}%)
                    </span>
                    <br>
                    <span>
                      ≈ {{ translateByRate(item.currency, item['funUnrealized'](item)['unrealized'])|bigRound(2) }} USD
                    </span>
                  </span>
                  <span
                    class="marketPrice">
                    <span :class="item['funUnrealized'](item)['unrealizedM'] > 0 ? 'text-success' : 'text-danger'">
                      {{ item['funUnrealized'](item)['unrealizedM'] |bigRound(8) }}
                      ({{ item['funUnrealized'](item)['roeM'] |bigRound(2) }}%)
                    </span>
                    <br>
                    <span>
                      ≈ {{ translateByRate(item.currency, item['funUnrealized'](item)['unrealizedM'])|bigRound(2) }} USD
                    </span>
                  </span>

                </span>
                <span
                  v-else-if="key==='realized'">
                  <span :class="item[key] > 0 ? 'text-success' : 'text-danger'">
                    {{ item[key]|bigRound(8) }}
                  </span>
                  <br>
                  <span>
                    ≈ {{ translateByRate(item.currency, item[key])|bigRound(2) }} USD
                  </span>
                </span>
                <span v-else-if="key==='value'">
                  <span>
                    {{ $big(item[key]).abs()| bigRound(8) }}
                  </span> 
                  <br>
                  <span>
                    ≈ {{ translateByRate(item.currency, $big(item[key]).abs())| bigRound(2) }} USD
                  </span>
                </span>
                <span v-else>
                  <span>
                    {{ item[key]|bigRound(8) }}
                  </span>
                  <br>
                  <span>
                    ≈ {{ translateByRate(item.currency, item[key])|bigRound(2) }} USD
                  </span>
                </span>
              </template> 
            </p>
          </div> 
        </div>
        <div
          v-if="!item.future_close_id || +item.close_position_price === 0 "
          v-loading="loadingHouse"
          style="min-width: 150px;"
          flex="dir:top main:justify"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.5)">  
          <div style="font-size:12px;text-align: left; ">
            <span>{{ $t('contract_exit_price') }}</span>
            <input
              :value="input|| bigRound(markData[item.currency], getProduct(item.name).price_scale || 2)"
              :class="['custom-input', state.skin]"
              style="width:80px;text-align:center"
              @focus="e=>e.currentTarget.select()"
              @input="e=>input = e.target.value">
          </div>
          <!-- <div
            class="el-button el-button--small bd-primary"
            @click="closeStorehouse(item)">{{ $t('contract_close_limit') }}</div>
          <div
            class="el-button el-button--small bd-primary"
            style="margin-left:0"
            @click="closeStorehouse(item,true)">{{ $t('contract_close_market') }}</div> --> 
          <div>
            <el-button size="mini" style="width: 70px;" type="success" plain  @click="closeStorehouse(item)">{{ $t('contract_action_limit_price') }}</el-button>
            <el-button size="mini" type="success" style="width: 70px;margin-left:0" @click="closeStorehouse(item, true)">{{ $t('contract_action_market_price') }}</el-button>
          </div>
        </div>
        <div
          v-else
          v-loading="loadingHouse"
          class="product-hover"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.5)">
          <div flex="cross:center">
            <!-- <p>{{ $t('contract_history_close_content', price: item.closePrice | bigRound(2)) }} -->
            在{{ item.closePrice|bigRound(2) }}的平仓委托
            <i
              class="el-icon-close hover-point"
              title="取消"
              @click="cancelOrder(item)" /> 
              <!-- <el-button type="primary" @click="cancelOrder(item)">取消平仓</el-button> -->
          </div>
        </div>
        <!-- <div class="el-loading-mask" style="background-color: rgba(0, 0, 0, 0.8);">
          <div class="el-loading-spinner">
            <p>
              <span><i class="el-icon-bell" /> 系统以150的价格发布了平仓委托 </span>
              <el-link type="primary" :underline="false">取消平仓</el-link>
            </p>
          </div>
        </div> -->
      </div> 
    </div>
    <span
      v-if="data && data.length === 0"
      class="el-table__empty-text">{{ $t('el.table.emptyText') }}</span>
  </div>
</template>
<script>
import { bigDiv, bigTimes, calcProfit, toBig } from '@/utils/handleNum'
import { getRates, closeStorehouse, cancelOrder, setModify, setTransferMargin, submitOrder } from '@/modules/api/currencyUnit' 
import utils from '@/modules/utils'
import {state} from '@/modules/store'
export default {
  name: 'Shipping',
  props: {
    data: {
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
          option: 'contract_page.order_action.modal.stop_win',
          tips: 'contract_page.order_action.modal.stop_win_tips', 
          type: false,
          trigger_type: 1,
          trigger_price: '',
          isEdit: false,
          calcProfit: ''
        },
        {
          option: 'contract_page.order_action.modal.stop_loss',
          tips: 'contract_page.order_action.modal.stop_loss_tips', 
          type: false,
          trigger_type: 1,
          trigger_price: '',
          isEdit: false,
          calcProfit: ''
        }
      ],
      loadingHouse: false
    }
  },
  computed: {
    mapFormContent () {
      return this.allLangData.contract.mapFormContent
    }
  },
  async created () {
    this.currencyRates = (await getRates()).data
  },
  methods: {
    setTransferMargin (item) {
      setTransferMargin({ name: item.name, amount: !this.checked ? this.margin_position : -this.margin_position }).then(res => {
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
      } else {
        this.formArrData[0].isEdit = false
        this.formArrData[0].type = false
      }
      this.handleInput(false, this.formArrData[0], holdingObj.holding, holdingObj.price)
      if (holdingObj.sl_price && +holdingObj.sl_price) {
        this.formArrData[1].type = true
        this.formArrData[1].trigger_price = holdingObj.sl_price
        this.formArrData[1].isEdit = true
      } else {
        this.formArrData[1].isEdit = false
        this.formArrData[1].type = false
      }
      this.handleInput(false, this.formArrData[1], holdingObj.holding, holdingObj.price)
    },
    handleValueByKey (key, item) {
      switch (key) {
        case 'markPrice':
          return this.markData[item.currency]
        case 'value':
          return bigDiv([item.holding, item.price])
        default:
          return item[key]
      }
    },
    translateByRate (currency, value) {
      // console.log(value, this.currencyRates) 
      if (!this.currencyRates || !this.currencyRates[currency] || !value) return
      // return bigTimes([this.currencyRates['USD'], value])
      return toBig(this.currencyRates[currency]['USD']).times(value)
    },
    async closeStorehouse (item, isMarket) {
      this.loadingHouse = true
      // "contract_close_tips1": "在%{price}价格%{amount}张%{currency}合约。",
      // "contract_close_tips2": "在执行时，将平掉你的整个仓位。",
      const side = item.holding > 0 ? `<span class="text-danger">${this.$t('order_side_sell')}</span>` : `<span class="text-success">${this.$t('order_side_buy')}</span>`
      const price = isMarket ? this.$t('contract_order_enter_tips3') : this.input || this.markData[item.currency]
      const amount = Math.abs(item.holding)
      const currency = item.currency
      // const isOk = await this.confirm(`${side}${this.$t('contract_close_tips1', {price, amount, currency})}<br>${this.$t('contract_close_tips2')}`)
      
      const title = isMarket ? this.$t('contract_close_market') : this.$t('contract_close_limit')
      const content = `${side}${this.$t('contract_close_tips1', {price, amount, currency})}<br>${this.$t('contract_close_tips2')}`
      const isOk = await utils.confirm(this, {
          customClass: "ix-message-box-wrapper",
          // confirmBtnText: confirmbtn,
          confirmButtonClass: "btn--confirm",
          cancelButtonClass: "btn--cancel",
          title,
          content,
          dangerouslyUseHTMLString: true
        }); 
      // const isOk = await this.confirm(`<span class="text-primary">卖出</span>在${isMarket ? '最优' : this.input || this.markData[item.currency]}价格${item.holding}张${item.currency}合约在执行时，将平掉你的整个仓位`, isMarket ? '市价平仓' : '限价平仓')
      if (!isOk) {
        this.loadingHouse = false
        return
      }
      const params = { name: item.name, user_id: item.user_id, price: isMarket ? 0 : +this.input || +this.markData[item.currency] }
      // console.log({params})
      closeStorehouse(params).then(res => {
        if (!res.code) {
          this.loadingHouse = false
          this.$emit('change')
          this.$message.success(this.$t('tj_cg')) 
        } else {
          this.$message.error(res.message)
        }
      }).catch(res => {
        this.loadingHouse = false
      })
      // if (this.visibleChecked) {
      //   this.disabled = true
      // }
      // const params = { name: item.name, user_id: item.user_id, price: isMarket ? '0' : this.input }
      // closeStorehouse(params).then(res => {
      //   this.$emit('change')
      //   this.$message.success(this.$t('tj_cg'))
      // })
      // this.visible = false
      // this.visible1 = false
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
      const cur_product = this.products.find(p => p.name === name)
      if (isBuy) {
        // let tp_price = this.formArrData[0].trigger_type
        const check1 = isBuy &&
          +this.formArrData[0].trigger_price > +price &&
          +this.formArrData[0].trigger_price > ((cur_product[obj[this.formArrData[0].trigger_type]] || {}).current || +price)
        const check2 = isBuy &&
          +this.formArrData[1].trigger_price < +price &&
          +this.formArrData[1].trigger_price < ((cur_product[obj[this.formArrData[1].trigger_type]] || {}).current || +price)
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
          +this.formArrData[0].trigger_price < ((cur_product[obj[this.formArrData[0].trigger_type]] || {}).current || +price)
        const check2 = !isBuy &&
          +this.formArrData[1].trigger_price > +price &&
          +this.formArrData[1].trigger_price > ((cur_product[obj[this.formArrData[1].trigger_type]] || {}).current || +price)
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
          const fun = item.isEdit ? setModify : submitOrder
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
    },
    getProduct(name) { 
      const cur_product = this.products.find(p => p.name === name)
      return cur_product || {}
    }
  }
}
</script>
<style lang="scss" scoped>
  .shipping{
    min-height: 100%;
    .shipping-item{
      padding: 22px 0;
      border-bottom: 1px solid #222;
      &>div{
        // .interval{
        //   margin-top: 15px;
        // }
        &:first-child{
          min-width: 88px;
          padding-right:30px;
          padding-left:10px;
          // border-right: 1px dashed #333;
          line-height: 30px;
        }
        &:last-child{
          padding-left:30px;
          &>:first-child{
            flex: 1;
              text-align: left;
              flex-wrap: wrap;
              font-size: 12px;
              &>div{
                width: 10%
            }
          }
          &>.product-hover{
            width:200px;
            background-size:30px 30px;
            background-image:linear-gradient(45deg, $--color-primary 25%, transparent 25%, transparent 50%, $--color-primary 50%, $--color-primary 75%, transparent 75%, transparent);
            animation:barberpole 0.5s linear infinite;
            position: relative;
            &>div{
              position: absolute;
              height: 100%;
              width: 100%;
              left: 0;
              top: 0;
              background: $--contract-table-bg;
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
      .custom-input {
        border-width: 1px;
        background-color: transparent;
        &.dark {
          color: #ccc;
        }
      }
    }

  }
  .custom-popper {
    .popover-body>*{
      margin-top: 12px;
      line-height: 32px;
      &>input,&>.transactionPrice{
        background: transparent;
        // border: 1px solid #333;
        // text-align: center;
        // color: #ddd;
        box-sizing: border-box;
        width: 70%;
        font-size: 12px;
      }
      &>input{
        text-align: left;
        // padding-right: 45px;
        &:disabled{
          // color: #333;
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
    &.dark {
      background-color: #29292f;
      color: #ddd;
      .popover-body>* {
        &>span, label, p {
          color: #ccc; 
        }
        &>input {
          border-radius: 5px;
          border-width: 1px;
          color: #ccc;
        }
      }
    }

  }
</style>
