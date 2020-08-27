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
      flex>
      <div>
        <h2 class="text-active">{{ $t(`contractMix.mapTabs.${item.name}`) }}</h2>
        <h3
          v-if="item.side === 1"
          class="text-success">{{ $t(`contractMix.side.${item.side}`) }}</h3>
        <h3
          v-else
          class="text-danger">{{ $t(`contractMix.side.${item.side}`) }}</h3> 
      </div>
      <div
        flex
        style="flex:1;"> 
        <div flex> 
          <div
            v-for="(value,key,i) in tableColumns"
            :key="key">
            <p
              class="text-info"
              :class="{interval:i>4}">
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
                      :label="0">增加仓位保证金</el-radio>
                    <el-radio
                      v-model="checked"
                      :label="1">减少仓位保证金</el-radio>
                  </div>
                  <hr>
                  <div
                    style="font-size:12px; line-height:24px">
                    <p>你的当前仓位: <span class="text-primary"> {{ item.holding }}</span> 张合约 ({{ item.leverage }}x)</p>
                    <p>当前已分配的保证金: <span class="text-primary">{{ item.margin_position | bigRound(2) }}</span> {{ item.currency }} 【最大可减少 <span class="text-primary">{{ item.margin_user | bigRound(2) }}</span> {{ item.currency }}】<span
                      v-if="checked"
                      class="text-primary hover-point"
                      @click="margin_position = Math.floor(item.margin_position)">全部</span></p>
                    <p>可用保证金: <span class="text-primary">{{ item.available_balance | bigRound(2) }}</span> {{ item.currency }}【最大可增加 <span class="text-primary">{{ item.available_balance | bigRound(2) }}</span> {{ item.currency }}】<span
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
                    @click="setTransferMargin(item)">确定</el-button>
                </div>
                <i
                  slot="reference"
                  class="el-icon-edit hover-point" />
              </el-popover>
            </p>
            <p
              v-if="i<5"
              class="text-info">
              <span
                v-if="key==='holding'"
                :class="item.holding > 0 ? 'text-success' : 'text-danger'">
                {{ item[key] }}
              </span>
              <span v-else-if="key==='markPrice'">
                <span v-if="item.product">
                  {{ (item.product.MARKET || {}).current | bigRound(item.product.price_scale || 2) }}
                </span>
              </span>
              <span v-else-if="key==='price'"> 
                  {{ item[key] | bigRound(item.product.price_scale) }} 
              </span>

              <span v-else> 
                {{ key === 'markPrice'? (item.product.MARKET || {}).current :key === 'liq_price'?bigRound(item[key],2):item[key] }}
              </span>
            </p>
            <p
              v-else
              class="text-info">
              <span
                v-if="key==='margin_position'">
                <span class="text-primary">
                  {{ item[key]|bigRound(8) }} {{ item.currency }}
                </span>
                <br>
                <!-- <span>
                  ≈ {{ translateByRate(item[key])|bigRound(2) }} USDT
                </span> -->
              </span>
              <span
                class="unrealized"
                v-else-if="key==='unrealized'"> 
                <span
                  class="lastPrice">
                  <span :class="item['funUnrealized'](item)['unrealized'] > 0 ? 'text-success' : 'text-danger'">
                    {{ item['funUnrealized'](item)['unrealized'] |bigRound(8) }}  {{ item.currency }}
                    ({{ item['funUnrealized'](item)['roe'] |bigRound(2) }}%)
                  </span>
                  <br> 
                </span>
                <span
                  class="marketPrice">
                  <span :class="item['funUnrealized'](item)['unrealizedM'] > 0 ? 'text-success' : 'text-danger'">
                    {{ item['funUnrealized'](item)['unrealizedM'] | bigRound(8) }}  {{ item.currency }}
                    ({{ item['funUnrealized'](item)['roeM'] |bigRound(2) }}%)
                  </span>
                  <br> 
                </span>
              </span>
              <span
                v-else-if="key==='realized'">
                <span :class="item[key] > 0 ? 'text-success' : 'text-danger'">
                  {{ item[key]|bigRound(8) }} {{ item.currency }}
                </span>
                <br>
                <!-- <span>
                  ≈ {{ translateByRate(item[key])|bigRound(2) }} USDT
                </span> -->
              </span>
              <span v-else-if="key==='value'">
                <span>
                  {{  $big(item[key] || 0).abs().round(8) }} {{ item.currency }}
                </span>
                <br>
                <!-- <span>
                  ≈ {{ translateByRate(item[key])| toBig().abs().round(2) }} USDT
                </span> -->
              </span>
              <span v-else>
                <span>
                  {{ item[key] }}
                </span>
                <br>
                <!-- <span>
                  ≈ {{ translateByRate(item[key])|bigRound(2) }} USDT
                </span> -->
              </span>
            </p>
            <!-- <p v-if="key==='unrealized'">
              {{ translateByRate(item['funUnrealized'](item)['unrealized'])|bigRound(2) }} USD
            </p>
            <p v-else-if="i>4">≈ {{ translateByRate(item[key])|bigRound(2) }} USD </p> -->
          </div>
        </div>
        <div
          v-if="!item.future_close_id || +(item.close_position_price || 0) === 0 "
          v-loading="loadingHouse"
          flex="dir:top cross:center main:justify"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.5)">
          <!-- <el-popover :ref="`popover-${item.name}`" :disabled="disabled" placement="top" width="160">
            <p>确定要以 <span class="text-primary">市价【{{ $t(`contract.mapFormContent.perfactPrice`) }}】</span>平掉所有持仓吗</p>
            <hr>
            <div flex="main:justify cross:center">
              <el-checkbox v-model="visibleChecked">不在提示</el-checkbox>
              <el-button type="primary" size="mini" @click="closeStorehouse(item,true)">确定</el-button>
            </div>
            <el-button slot="reference" type="primary" @click="visibleChecked && closeStorehouse(item,true)">市价平仓</el-button>
          </el-popover>
          <div />
          <el-popover placement="top" width="160">
            <el-input :value="input||markData[item.currency]" selected size="small" autofocus placeholder="请输入平仓价格" @input="value=>input=value" />
            <p style="margin-top:5px">确定到<span class="text-primary">指定价格</span>后平掉所有持仓吗</p>
            <hr>
            <div flex="main:justify cross:center dir:right">
              <el-button type="primary" size="mini" @click="closeStorehouse(item)">确定</el-button>
            </div>
            <el-button slot="reference" type="primary" plain>限价平仓</el-button>
          </el-popover> -->
          <div
            flex="dir:top"
            style="font-size:12px">
            <div>{{ $t('contract_exit_price') }}</div>
            <input
              :value="input || bigRound((item.product.MARKET || {}).current, 2)"
              class="custom-input"
              style="width:80px;text-align:center"
              @focus="e=>e.currentTarget.select()"
              @input="e=>input = e.target.value">
          </div>
          <div
            class="el-button el-button--small bd-primary"
            @click="closeStorehouse(item)">{{ $t('contract_close_limit') }}</div>
          <div
            class="el-button el-button--small bd-primary"
            style="margin-left:0"
            @click="closeStorehouse(item,true)">{{ $t('contract_close_market') }}</div>
          <!-- <el-button size="small" style="margin-left:0" type="primary" @click="closeStorehouse(item)" plain>{{ $t('contract_close_limit') }}</el-button>
          <el-button size="small" style="margin-left:0" type="primary" @click="closeStorehouse(item,true)" plain>{{ $t('contract_close_market') }}</el-button> -->
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
              @click="cancelOrder(item)" /></p>
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
      v-if="dataList && dataList.length === 0"
      class="el-table__empty-text">{{ $t('el.table.emptyText') }}</span>
  </div>
</template>
<script>
import { bigDiv, bigTimes, calcProfit, toBig, bigRound } from '@/utils/handleNum'
import { getRates, closeOrder, cancelOrder, modifyOrder, setTransferMargin, submitOrder } from '@/modules/api/contractMix'
import utils from '@/modules/utils'
export default {
  name: 'Shipping',
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
      loadingHouse: false
    }
  },
  computed: {
    mapFormContent () {
      return this.allLangData.contractMix.mapFormContent
    }
  },
  methods: {
    setTransferMargin (item) {
      const amount = !this.checked ? this.margin_position : -this.margin_position
      setTransferMargin({ name: item.name, amount, side: item.side }).then(res => {
        this.$emit('change')
        // this.margin_popover = false
        this.pClose('margin' + item.currency)
        this.margin_position = 0
        this.checked = 0
        if (!res.code) {
          this.$message.success(this.$t('handleSuccess'))
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
      this.loadingHouse = true
      // "contract_close_tips1": "在%{price}价格%{amount}张%{currency}合约。",
      // "contract_close_tips2": "在执行时，将平掉你的整个仓位。",
      // const side = item.holding > 0 ? `<span class="text-danger">卖出</span>` : `<span class="text-success">买入</span>`
      const option = item.side === 1 ? `<span class="text-danger">卖出</span>` : `<span class="text-success">买入</span>`
      const price = isMarket ? '最优' : this.input || this.markData[this.activeProduct.currency]
      const amount = Math.abs(item.holding)
      const currency = item.currency
      const isOk = await utils.confirm(this, {
          title:this.$t('contract_action_open_short'),
          content: `${option}${this.$t('contract_close_tips1', {price, amount, currency})}<br>${this.$t('contract_close_tips2')}`,
          type: 'warning',
          dangerouslyUseHTMLString: true,
        }
      )
      const orderPrice = isMarket ? 0 : this.input || this.markData[this.activeProduct.currency]

      // const isOk = await this.confirm(`<span class="text-primary">卖出</span>在${isMarket ? '最优' : this.input || this.markData[item.currency]}价格${item.holding}张${item.currency}合约在执行时，将平掉你的整个仓位`, isMarket ? '市价平仓' : '限价平仓')
      if (!isOk) {
        this.loadingHouse = false
        return
      }

      const params = { name: item.name, side: item.side, price: orderPrice }
      // console.log({params})
      closeOrder(params).then(res => {
        this.loadingHouse = false
        this.$emit('change')
        if (!res.code) {
          this.$message.success(this.$t('tj_cg'))
        } else {
          this.$message.error(res.data)
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
      //   this.$message.success(this.$t('handleSuccess'))
      // })
      // this.visible = false
      // this.visible1 = false
    },
    cancelOrder (item) {
      const { user_id, future_close_id, name } = item
      this.loadingHouse = true
      cancelOrder({ user_id, order_id: future_close_id, name }).then(res => {
        // this.$emit('change')
        // this.$message.success(this.$t('handleSuccess'))
        this.loadingHouse = false
        if (!res.code) {
          this.$emit('change')
          this.$message.success(this.$t('handleSuccess'))
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
                this.$message.success(this.$t('handleSuccess'))
              } else {
                this.$message.error(res.message)
              }
            }) 
          } else {
            fun({order_id : data.order_id, symbol: data.name, trigger_price: item.trigger_price}).then(res => {
               this.buyBtnLoading = false
              if (!res.code) {
                this.$emit('change')
                this.$message.success(this.$t('handleSuccess'))
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
      padding: 12px;
      height: 125px;
      border-bottom: 1px solid #222;
      &>div{
        .interval{
          margin-top: 15px;
        }
        &:first-child{
          width: 130px;
          padding-right:50px;
          padding-left:10px;
          border-right: 1px dashed #333;
          line-height: 30px;
        }
        &:last-child{
          padding-left:50px;
          &>:first-child{
            flex: 1;
              text-align: left;
              flex-wrap: wrap;
              font-size: 12px;
              &>div{
                width: 20%
            }
          }
          &>.product-hover{
            width:200px;
            background-size:30px 30px;
            background-image:linear-gradient(45deg, $--color-primary 25%, transparent 25%, transparent 50%, $--color-primary 50%, $--color-primary 75%, transparent 75%, transparent);
            animation:barberpole 1s linear infinite;
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
