<template>
  <div
    class="history_table_container"
    v-scroll-load="loadMore">
    <table
      class="table scroll--body mb-10"
      v-show="!isFirst">
      <tr class="tr th pt-15">
        <th
          v-for="header in headers"
          :key="'th_' +header.title"
          :style="{width: header.width ? header.width: 'auto'}"
        >
          <span v-tooltip.top-center="{html: true, content: $t(header.tips), classes: 'contract'}">{{ $t(header.title) }}</span>
        </th>
      </tr>
      <tbody>
        <tr
          class="tr td"
          v-for="(row, index) in bodyData"
          :key="row.id && row.order_id ? (row.order_id +''+ row.id) : index">
          <td
            class="column"
            align="center"
            v-for="header in headers"
            @click="clickTd(row, header.key)"
            :key="header.title"
            :class="[{'pointer': header.key==='revert'}]"
            :style="{width: header.width ? header.width: 'auto'}"
          >
            <span v-if="header.title === 'contract_trigger_price'" v-html="triggerPrice(processValue('trigger_price', row))"></span>
            <span v-else-if="header.title === 'contract_trigger_price_rule'" v-html="triggerPrice(processValue('trigger_price', row), 1)" >
            </span>
            <span v-else-if="header.title==='contract_deal_price' ||
                header.title === 'contract_assign_price'"
                v-html="processValue(header.key, row)"/>
            <span v-else-if="header.title=== 'contract_assign_value'"
                v-html="processValue('contract_assign_value', row)"/>
            <span v-else v-html="processValue(header.key, row) "/>

          </td>
        </tr>
        <tr class="tr td">
          <td
            align="center"
            :colspan="headers.length">
            <span
              v-show="isLoading"
              style="line-height:13px">loading</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 仓位tab -->
    <div 
      v-if="isFirst && isLogin && holdingList">
      <div v-for="(cholding,idx) in holdingList" :key="idx" class="holding-box"> 
        <div 
          v-if="cholding.holding && cholding.holding != 0"
          class="werehouse-box"
          >
          <div class="currency-col flex-column">
            <!-- <p>{{ $t('contract_' + symbol.name) }} </p> -->
            <p>{{ $t('contract_FUTURE_' + cholding.currency) }} </p>
            <p
              class="mt-9"
              :class="{'color-up': cholding.holding > 0, 'color-down':cholding.holding < 0}"> {{ cholding.holding > 0 ? $t('contract_action_button_up_r') : $t('contract_action_button_down_r') }} </p>
          </div>
          <div class="equal-col">
            <div class="col__row mb-10">
              <span
                class="label"
                v-tooltip.top-center="{html: true, content: $t('contract_current_werehouse_poi_tips'), classes: 'contract'}">{{ $t('contract_current_werehouse_poi') }}</span> <span
                  class="value"
                  :class="{'color-up': cholding.holding > 0, 'color-down':cholding.holding < 0}">{{ cholding.holding }}</span>
            </div>
            <div class="col__row mb-13">
              <span
                class="label"
                v-tooltip.top-center="{html: true, content: $t('contract_history_postion_header_value_tips'), classes: 'contract'}">
                {{ $t('contract_history_postion_header_value') }}</span>
                <span class="value">{{ cholding.value  | fixed(cholding.pairInfo.value_scale || 4) }}</span>
            </div>
            <div class="col__row">
              <!-- 开仓价格 -->
              <span
                class="label"
                v-tooltip.top-center="{html: true, content: $t('contract_history_postion_header_avg_tips'), classes: 'contract'}">{{ $t('contract_history_postion_header_avg') }}</span> <span class="value">{{ cholding.price | round(cholding.pairInfo.price_scale || 2) }}</span>
            </div>
          </div>
          <div class="equal-col">
            <div class="col__row mb-10">
              <span
                class="label"
                v-tooltip.top-center="{html: true, content: $t('contract_history_postion_header_force_tips'), classes: 'contract'}">{{ $t('contract_history_postion_header_force') }}</span> 
                <span class="value" >  
                  {{ (cholding.liq_price || 0) | round(cholding.pairInfo.price_scale || 2) }}
                </span>
            </div>
            <div class="col__row mb-10">
              <span
                class="label"
                v-tooltip.top-center="{html: true, content: $t('contract_mark_price_tips_table'), classes: 'contract'}">{{ $t('contract_mark_price') }}</span> <span class="value">{{ cholding.markPrice  }}</span>
            </div>
            <div class="col__row">
              <span
                class="label"
                v-tooltip.top-center="{html: true, content: $t('contract_history_postion_header_promise_tips'), classes: 'contract'}">{{ $t('contract_history_postion_header_promise') }}</span>
              <div class="value">
                <input
                  type="number"
                  v-model="cholding.margin_position"
                  @click="showEnsModal(cholding)"
                  v-tooltip.top-center="{html: true, content: $t('contract_history_postion_header_promise_tips'), classes: 'contract'}"
                  readonly
                  class="input-num "
                  :class="cholding.leverage == 0 ? '' : 'pointer'"
                  >
                  <span
                  v-if="cholding.leverage != 0"
                  @click="showEnsModal(cholding)"
                  class="input-lab pointer"
                  >±</span>
                  <!-- {{ pairInfo.product_name }} -->
              </div>
            </div>
          </div>
          <div class="equal-col">
            <div class="col__row mb-10">
              <span class="label">{{ $t('contract_lever_times') }}</span> <span class="value">{{ cholding.leverage == 0? $t('contract_all_in') : (cholding.leverage + 'x') }}</span>
            </div>
            <!-- 未实现盈亏 -->
            <div class="col__row mb-10">
              <span
                class="label"
                v-tooltip.top-center="{html: true, content: $t('contract_history_postion_header_delta_rate_tips'), classes: 'contract'}">{{ $t('contract_history_postion_header_delta_rate') }}</span>
                <i class="value profit"  
                  v-tooltip.top-center="{html: true, content: $t('contract_close_tips3'), classes: 'contract'}"
                >
                  <span 
                    class="value val1" 
                    :class="{'color-up': cholding.unrealized > 0, 'color-down': cholding.unrealized < 0}">
                    {{ cholding.unrealized | fixed(cholding.pairInfo.value_scale || 4) }} ({{ cholding.roe }}%) 
                  </span>
                  <span
                    class="value val2"
                    :class="{ 'bgcolor-unp': cholding.unrealizedlp > 0,  'bgcolor-dnp': cholding.unrealizedlp < 0}">
                    {{ cholding.unrealizedlp | fixed(cholding.pairInfo.value_scale || 4) }} ({{ cholding.roelp }}%) 
                  </span> 

                </i>
            </div>
            <div class="col__row">
              <span
                class="label"
                v-tooltip.top-center="{html: true, content: $t('contract_result_yet_tips'), classes: 'contract'}">{{ $t('contract_result_yet') }}</span> <span
                  class="value"
                  :class="{'color-up': cholding.realized > 0, 'color-down': cholding.realized < 0}">{{ cholding.realized | round(cholding.pairInfo.value_scale || 4) }}</span>
            </div>
          </div>
          <!-- 平仓/市价全平 -->
          <div class="operate-col pl-16 pt-16 close"
            v-loading='cholding.clearLoading'> 
            <div
              class="equal mr-21 "
              v-if='!cholding.future_close_id'> 
              <div
                class="label mb-10 t-a-center nowrap"
                v-tooltip.top-center="{html: true, content: $t('contract_action_open_short_tips'), classes: 'contract'}">{{ $t('contract_equal_werehouse_price') }}</div>
              <!-- <input
                type="number"
                class="input-num mb-10"> -->
                
              <!-- :class="{'btn-disabled': btnDisabled }" -->
              <!-- 限价平仓 -->  
              <div
                class="btn"
                :class="{'btn-disabled': !cholding.unwindPrice  }"
                
                @click.prevent="submitOrder('limit', cholding)">
                {{ $t('contract_action_open_short') }}  
              </div>
            </div> 
            <div
              class="equal"
              v-if='!cholding.future_close_id'>
              <!-- <div class="label mb-6 t-a-center">{{ $t('contract_equal_werehouse_amount') }}</div> --> 
              <!-- v-model="state.ct.markTickList[cholding.currency]" --> 
              <input
                v-model="cholding.unwindPrice"
                min=0
                step="0.5"
                @input="checkInput(cholding)"
                ref='input_price'
                v-tooltip.top-center="{html: true, content: $t('contract_action_open_short_tips'), classes: 'contract'}"
                class="input-num mb-10"/> 
              <div
                class="btn full"
                @click.prevent="submitOrder('market', cholding)"
              >
                {{ $t('contract_market_price') }}
              </div>
            </div>
            <!-- yzf 2019/3/20 展示和关闭平仓委托-->
            <div class="equal"
              v-if='!!cholding.future_close_id'>
              <div
                class="label mb-10 t-a-left nowrap"
                v-tooltip.top-center="{html: true, content: $t('contract_action_open_short_tips'), classes: 'contract'}">{{ $t('contract_action_open_short') }}
              </div>
              <div>
                <label class='label'
                  v-html="$t('contract_history_close_content', { price: $big(cholding.close_position_price || 0).toFixed(cholding.pairInfo.price_scale || 2)})">
                </label>
                <span
                  class="op op_cancel"
                  @click="cancel(cholding)"/>
              </div>
            </div>
          </div> 
        </div> 
      </div> 
    </div> 
    <!-- 增加/减少保证金 modal -->
    <v-modal :open.sync="showPromiseFundModal">
      <div class="modal-operate-ensurance pd-26 c-333">
        <div class="modal__title f16 bold">{{ $t('contract_add_incre_ensurance') }}</div>
        <div class="modal__content">
          <div class="showing-unit mb-24">
            <p class="mr-30">{{ $t('contract_show_unit') }}</p>
            <el-radio-group v-model="modal.radio">
              <el-radio label='1'>{{ $t('contract_add_ensurance') }}</el-radio>
              <el-radio label='-1'>{{ $t('contract_increase_ensurance') }}</el-radio>
            </el-radio-group>
          </div>
          <div class="current-info sp_container">
            <p class="mb-10"> <span class="dib mr-5">{{ $t('contract_your_current_werehouse') }} </span> {{ $t('contract_many_piece_con', {amount: selectedHolding.amount}) }} ({{ selectedHolding.leverage }}x)</p>
            <p class="mb-10"> <span class="dib mr-5">{{ $t('contract_have_apply_yet') }}</span> {{ selectedHolding.margin_position  | round( 4) }} BTC</p>
            <p>
              <span
                class="dib mr-5"
                v-if="modal.radio === '1'">{{ $t('contract_aval_balance') }} </span>
              <span
                class="dib mr-5 cursor_help border_bottom_dash relative"
                v-tooltip.left-start="{html: true, content: $t('contract_max_remove_account_tips'), classes: 'contract', placement:'.sp_container'}"
                v-if="modal.radio !== '1'">{{ $t('contract_max_remove_account') }} </span>

              {{ modal.radio === '1' ? selectedHolding.canAddMargin : selectedHolding.canRemoveMargin  | round( 4) }} 
              <!-- {{ selectedHolding.product_name }} -->
              BTC
            </p>
          </div>
          <div class="f16 bold mt-22 mb-20">
            <p>{{ modal.radio === '1' ? $t('contract_add_ensurance') : $t('contract_increase_ensurance') }}</p>
            <p class="input-wrapper">
              <el-input
                class="mt-15"
                type='number'
                min="0"
                :max="modal.radio === '1' ? selectedHolding.canAddMargin : selectedHolding.canRemoveMargin"
                v-model="modal.amount"/>
              <span class="unit">
                BTC
                <!-- {{ selectedHolding.product_name }} -->
              </span>
            </p>
          </div>
          <div class="btns">
            <div
              class="btn-cancel pointer"
              @click="showPromiseFundModal = false">{{ $t('cancel') }}</div>
            <v-btn
              class="btn"
              :class="{'btn-disabled': btnEnsuranceDisabled }"
              @click="changePromiseFund"
              :label="modal.radio === '1' ? $t('contract_add_ensurance') : $t('contract_increase_ensurance')"/>
              <!-- 此处需要根据modal是弹出操作源头,显示增减 -->
          </div>
        </div>
      </div>
    </v-modal>
    <div
      class="mask"
      v-if="!isLogin"
      :class="{show: state.userStatus === 0}">
      <div class="mask-front">
        <div class="hint">{{ $t('operate_noauth') }}</div>
        <div class="link-group">
          <!-- <router-link
            class="link btn ibt signin bgcolor-up"
            :to="{name: 'login'}"><span>{{ $t('signin') }}</span></router-link> -->
            <span
              class="link btn ibt signin bgcolor-up"
              @click="tologin"
            >{{ $t('signin') }}</span>
          <router-link
            class="link btn ibt signup bgcolor-down"
            :to="{name: 'register'}"><span>{{ $t('signup') }}</span></router-link>
        </div>
      </div>
    </div>
    <div
      class="mask show loadfailed"
      v-if="state.loadingfailed">
      <div class="mask-front ">
        <div class="hint">
          <i class="icon"></i>
        </div>
        <div class="hint">
          {{ $t('contract_loading') }}
          <a
            @click='reload'
          >{{ $t('contract_reload')}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from '@/modules/service'
import {state, actions} from '@/modules/store'
import utils from '@/modules/utils'
import stateHoldingMixins from '../stateHoldingComputedMixins'
import pairInfoMixins from '../statePairInfoComputedMixins'
import stateMixins from '../stateComputedMixins'
import orderWatcher from '@/mixins/contract-order-watcher'
import processValue from '@/mixins/process-contract-value'

export default {
  data () {
    return {
      state,
      showPromiseFundModal: false,
      modal: {
        amount: '',
        radio: '1' // 1增加保证金, -1 减少
      },
      // unwindPrice: this.markPrice,
      bindMarkPrice: true,
      clearWarehouseLoading: false,
      //showupm: true, 
      showupm: '',
      selectedHolding: {}, 
    }
  },
  mixins: [
    pairInfoMixins,
    stateMixins,
    stateHoldingMixins,
    orderWatcher,
    processValue
  ],
  computed: {
    isLoading () {
      return this.loading
    },
    isLogin () {
      return !!this.state.userInfo
    },
    isFirst () {
      return this.name && this.name === 'contract_history_position'
    },
    bodyData () { 
      console.log(this.tableData) 
      if (Array.isArray(this.tableData)) {
        let dataview = this.tableData.map((val)=> {
          let row = val 
          return row
        }) 
        return dataview
      }
      return []
    },
    pairInfo () {
      if (this.state.ct.pairInfo) {
        return this.state.ct.pairInfo
      }
      return {}
    },
    lastPrice () {
      if (this.state.ct.lastPrice) {
        return this.state.ct.lastPrice.toString()
      }
    },
    btnDisabled () {
      return !this.unwindPrice || this.unwindPrice == "0"
    },
    btnEnsuranceDisabled() {
      return !this.modal.amount || this.modal.amount == "0" 
    },
    holdingData() {
      return this.state.ct.computeHoldingList
    },
    markTickList() {
      return state.ct.markTickList
    },
    lastPriceList() {
      return state.ct.lastPriceList
    }
  },
  methods: {
    tologin() {
      //console.log(this.$route.fullPath)
      utils.setStorageValue("LoginBack", "/contract.html")
      actions.setLoginBack( "/contract.html")
      this.$router.push({
        name: 'login'
      })
    },
    //价格输入框过滤，对不符合格式的输入值进行过滤
    transforPrice(v){
      //console.log('transforPrice')
      if(Number(v)){
        let accuracy = this.pairInfo.accuracy || 1
        let scale = this.pairInfo.price_scale || 4
        const minStep = Math.pow(10, -scale) * accuracy
        let $newValue = this.$big( v || 0)
        if (!$newValue.mod(minStep).eq(0)) {
          $newValue = $newValue.div(minStep).round(scale >= 1 ? scale - 1 : 0, 0).mul(minStep)
        }
        return $newValue
      }
    },
    triggerPrice (trgPrice, type = 0) {
        let diffPrice = this.lastPrice - trgPrice
        let triggerPriceStr = ''
        if (type === 0) {
           if (diffPrice > 0){
              triggerPriceStr = `<=${trgPrice}`
          }
          else{
              triggerPriceStr = `>=${trgPrice}`
          }
        }
        else {
          if (diffPrice > 0){
              triggerPriceStr = `${this.lastPrice}(<span class='font-color-sell'>+${ diffPrice.toFixed(1) }</span>)`
          }
          else{
              triggerPriceStr = `${this.lastPrice}(<span class='font-color-buy'>${diffPrice}</span>)`
          }
        }
        return triggerPriceStr;
    },
    loadMore () {
      this.$emit('loadMore')
    },
    clickTd (row, key) {
      if (key === 'revert') {
        const params = {
          symbol: row.symbol || this.pairInfo.name,
          order_id: row.id
        }
        service.revertContract(params).then(res => {
          if (!res.code) {
            // utils.success()
            // 刷新所有订单
            this.$toast({title: this.$t('delegate_cancellation'),body: this.$t('contract_revert_success'),color: 'yellow'})
            this.$eh.$emit('protrade:order:refresh','clickTd')
          } else {
            this.$toast({title: this.$t('delegation_cancellation_failed'),body: res.message,color: 'red'})
            // utils.alert()
          }
        })
      }
      //console.log(row, key)
    },
    showEnsModal (cholding) {
      // console.log(this.holding.leverage)
      // if(this.holding.leverage != 0)
      //   this.showPromiseFundModal = true
      console.log({cholding})
      this.selectedHolding = cholding
      if(cholding.leverage != 0)
        this.showPromiseFundModal = true

    },
    changePromiseFund () {  
      if(this.btnEnsuranceDisabled) return;
      let max = this.modal.radio === '1' ? this.selectedHolding.canAddMargin : this.selectedHolding.canRemoveMargin
      let amount = this.modal.amount
      if (!amount || this.$big(amount).lte(0)) {
        amount = 0
        this.modal.amount = amount
        return
      } else if (this.$big(amount).gt(max)) {
        amount = max
        this.modal.amount = amount
        utils.alert(this.$t('contract_margin_over_amount'))
        return
      }
      let params = {
        amount,
        currency: this.selectedHolding.currency
      }
      params.amount = Number(this.modal.radio) * Number(params.amount)
      service.changePromiseFund(params).then(res => {
        console.log('change 保证金, 传参是:', params.amount)
        let  type = ''
        if (params.amount>0){
          type = '增加'
        } else {
          type = '减少'
        }
        if (!res.code) {
          utils.success(this.$t('contract_order_success_type',{orderType:type}))
          this.$eh.$emit('protrade:order:refresh','changePromiseFund')
        } else {
          utils.alert(res.message)
        }
      }).finally(() => {
        this.showPromiseFundModal = false
      })
    },
    async submitOrder (type, holding) {
       
      if (!holding.amount) return 
      // if (this.btnDisabled) return
      if (!type) {
        type = 'limit'
      }
      if (type === 'limit' && (!holding.unwindPrice || holding.unwindPrice == "0")) {
        return
      }
 
      let title = ""
      // let content = ""
      let confirmText = ""
      let side = ""
      let price = 0
      //限价
      let msg = 'contract_close_tips1'; 
      if (type === 'limit'){
        confirmText = this.$t('contract_close_limit')
        if(holding.amount > 0) {
          title = this.$t('contract_close_limit_sell')
        } else if (holding.amount < 0) {
          title = this.$t('contract_close_limit_buy')
        }
        price = holding.unwindPrice
      }
      //市价
      else {
        confirmText = this.$t('contract_close_market')
        msg = 'contract_close_tips4'
        if(holding.amount > 0) {
          title = this.$t('contract_close_market_sell')
        } else if (holding.amount < 0) {
          title = this.$t('contract_close_market_buy')
        }
        // price = this.lastPrice
       // price = holding.lastPrice
      } 
      if(holding.amount > 0) {
        side = this.$t('order_side_sell')
      } else if (holding.amount < 0) {
        side = this.$t('order_side_buy')
      }

      const h = this.$createElement;
      let message = h('div', {style: 'text-align: center;'}, [
          h('div', { style: 'margin:10px; font-size: 16px;'}, [
          h('span', { style: holding.amount > 0 ? 'color: #F24E4D' : 'color: #09C989' }, side ),
          h('span', null, this.$t(msg,{ price, amount: Math.abs(holding.amount), currency: holding.symbol}))]),
          h('div', {style: 'font-size: 16px;'},  this.$t('contract_close_tips2'))
        ])
 
      // this.clearWarehouseLoading = true
      holding.clearLoading = true
      const ok = await utils.confirm(this, {
        customClass: "ix-message-box-wrapper",
        confirmBtnText: confirmText,
        confirmButtonClass: "btn--confirm",
        cancelButtonClass: "btn--cancel",
        title,
        message
      });

      
      if (!ok) {
        // this.clearWarehouseLoading = false 
        holding.clearLoading = false
        return;
      }

      //已有平仓订单
      if (holding.future_close_id) {
        utils.alert(this.$t('contract_order_repeat'))
        // this.clearWarehouseLoading = false
        holding.clearLoading = false
        return
      }
      //let $price = this.unwindPrice.toString()
      let $price = price
      if (this.$big($price).lt(0)) {
        holding.unwindPrice = 0
        $price = '0'
      }
      
      let order = {
        price: type === 'market' ? '0' : $price.toString(),
        symbol: holding.pairInfo.name
      }
      let res = await service.orderContractClose(order)
      if (!res.code) {
        utils.success(this.$t('successful_closing'))
        //平仓订单提交后 更新平仓价格，之后刷新会从接口中重新获取，但是会有延迟
        // this.state.ct.curCommitPrice = $price

        this.$eh.$emit('protrade:order:refresh', 1 )
        //this.$eh.$emit('protrade:order:refresh', 'submitOrder' )
        //this.clearWarehouseLoading = false
        holding.clearLoading = false
      } else {
        utils.alert(res.message)
        //this.clearWarehouseLoading = false
        holding.clearLoading = false
      }
    },
    set ({price, amount, dontOveride, side}) {
      // if (price) {
      //   if (!dontOveride || (dontOveride && (!holding.unwindPrice || holding.unwindPrice == 0))) {
      //     holding.unwindPrice = price
      //   }
      // }
    },
    checkInput (cholding) { 
      cholding.changeUnwindPrice = true
      if (cholding.unwindPrice){
        let accuracy = cholding.pairInfo.accuracy || 1
        let scale = cholding.pairInfo.price_scale || 4
        const minStep = Math.pow(10, -scale) * accuracy
        let $newValue = this.$big(cholding.unwindPrice || 0)
        if (!$newValue.mod(minStep).eq(0)) {
          $newValue = $newValue.div(minStep).round(scale >= 1 ? scale - 1 : 0, 0).mul(minStep)
        }
        cholding.unwindPrice = $newValue.toString()
      }
    },
    inputPriceOnfocus(){
      this.bindMarkPrice = false
      console.log(this.bindMarkPrice)
    },
    cancel (holding) {
      console.log('close current Entrust', this.pairInfo.name, holding.future_close_id)
      //this.clearWarehouseLoading = true
      holding.clearLoading = true
      const params = {
          symbol: holding.pairInfo.name,
          order_id: holding.future_close_id
        }
        service.revertContract(params).then(res => {
          if (!res.code) {
            utils.success(this.$t('contract_revert_success'))
            // 刷新所有订单
            this.$eh.$emit('protrade:order:refresh', 1)
            //this.clearWarehouseLoading = false
            holding.clearLoading = false
          } else {
            utils.alert(res.message)
            //this.clearWarehouseLoading = false
            holding.clearLoading = false
          }
        })
    },
    reload () {
      this.$eh.$emit('protrade:order:refresh','reload')
      state.loadingfailed=false;
    },
     
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    headers: {
      type: Array,
      default () {
        return []
      }
    },
    tableData: {
      type: Array | Object,
      default () {
        return {}
      }
    },
    activeList: {
      type: Array | Object,
      default () {
        return []
      }
    }
  },
  watch: {  
    markTickList:{
      handler:function(val,oldval){
        console.log('markTickListmarkTickListmarkTickListmarkTickListmarkTickListmarkTickListmarkTickList')
      },
      deep:true//对象内部的属性监听，也叫深度监听
    },
    
    lastPriceList() {
      console.log('lastPriceListlastPriceListlastPriceListlastPriceListlastPriceListlastPriceListlastPriceList')
    },
    // unwindPrice(v){
    //   let accuracy = this.pairInfo.accuracy || 1
    //   let scale = this.pairInfo.price_scale || 4
    //   const minStep = Math.pow(10, -scale) * accuracy
    //   let $newValue = this.$big( v || 0)
    //   if (!$newValue.mod(minStep).eq(0)) {
    //     $newValue = $newValue.div(minStep).round(scale >= 1 ? scale - 1 : 0, 0).mul(minStep)
    //   }
    //   this.unwindPrice = $newValue
    // },
    // holding (v) {
    //   this.holding.roe = this.roe
    // },
    markPrice(v) {
      if(this.bindMarkPrice){
        // console.log(this.bindMarkPrice)
        this.unwindPrice = this.transforPrice(v)
      }
    },
  },
  created () {
    this.$eh.$on('protrade:exchange:set', this.set)
    this.unwindPrice = this.transforPrice(this.markPrice)
    //平仓价格跟随标记价格变动，但是获得一次焦点后就不再变化，
    //在切换tab或刷新页面再重新绑定标记价格
    setTimeout(x => {
      this.$nextTick(() => {
        if(this.$refs.input_price){
          console.log('refs:' + this.$refs.input_price)

          this.$refs.input_price.onfocus = () => { this.bindMarkPrice = false;}
        }
      });
    }, 1000);
  },
  destroyed () {
    this.$eh.$off('protrade:exchange:set', this.set)
  }
}
</script>
<style lang="scss">

.router-spa_contract.el-popup-parent--hidden{
  padding-right: 0 !important;
}

.font-color-buy {
    color: #09C989 !important
}
.font-color-sell {
    color: #F24E4D !important
}
</style>

<style lang="scss" scoped>
// input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
//     -webkit-appearance: inner-spin-button !important;
//     opacity: 1 !important; //默认显示上下的小箭头
// }
.cursor_help {
    cursor: help;
}
.border_bottom_dash {
        border-bottom: 1px dashed #C8AA6C;
    }
.history_table_container {
  height: 240px;
  padding: 14px;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 12px;
  .flex-column {
      flex-direction: column;
  }
  .f16 {
      font-size: 16px !important;
  }
  .bold {
      font-weight: bold;
  }
  .dib{
      display: inline-block;
  }
  .table {
    width: 100%;
    // border: 1px solid #0F0F0F;
    .tr {
      &:nth-of-type(even){
        background: #10172A;
      }
      &.th {
        color: #ACACAC;
        border-bottom: 1px solid #666;
        th {
          padding-bottom: 12px;
          padding-top: 15px;
        }
      }
      &.td {
        color: #ffffff;
        line-height: 24px;
      }
    }
  }

  // 隐藏滚动条
  &::-webkit-scrollbar { width: 0 !important }
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
}
.bgcolor-unp {
    background-color: #8CBF26;
    opacity: .6;
  }
  .bgcolor-dnp {
    background-color: #e8704f;
    opacity: .6;
  }
.werehouse-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 4px 8px;
    border-bottom: 1px solid #0F0F0F;
    font-size: 12px;
    height: 92px;
    border:1px solid rgba(15,15,15,1);

    .label {
        color: #ACACAC;
    }
    .value {
        color: #fff;
    }
    .close {
      width: 180px;
      .op {
        width: 14px;
        height: 14px;
        vertical-align: text-bottom;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
      .op_cancel {
        background-image: url("../../../../assets/contract/icon-num-cancel.png");
      }
    }
    .currency-col {
        color: $primary;
        font-size: 20px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .input-num {
        width: 62px;
        height: 18px;
        color: $primary;
        background-color: #1B1B1B;
        padding-left: 7px;
        margin-left: -7px;
        box-sizing: border-box; 
        border-width: 0;
  
    }
    .input-lab {
        color: $primary;
        padding-left: 7px;
        margin-left: -7px;
    }
    .equal-col {
        padding-top: 14px;
        display: flex;
        flex-direction: column;
        width: 200px;
        .col__row {
            width: 100%;
            display: flex;
            .label{
                flex: 3
            }
            .value {
                flex: 1;
                min-width: 62px;
                white-space: nowrap;
            }
        }
    }
    .t-a-center {
        text-align: center;
    }
    .operate-col {
        border-left: 1px solid #0F0F0F;
        display: flex;

        .label {
            height: 18px;
            line-height: 18px;
        }

        .btn {
            width:70px;
            height:24px;
            line-height: 24px;
            text-align: center;
            border:1px solid rgba(9,201,137,1);
            color: rgba(9,201,137,1);

            &.full {
                background-color: rgba(9,201,137,1);
                color: #252525;
            }
        }
        
        
    }
}
.modal-operate-ensurance {
    min-width: 420px;
    font-size: 14px;
    .modal__title {
        margin-bottom: 39px;
    }
    .showing-unit {
        width: 100%;
        display: flex;
    }
    .current-info {
        color: #666666;
    }
    .input-wrapper {
        position: relative;
        .unit {
            position: absolute;
            right: 20px;
            top: 22px;
            color: #999999;
            font-weight: normal;
        }
    }
    .btns {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .btn-cancel {
            text-align: right;
            padding-right: 40px;
            color: #393D4D;
        }
        > div {
            width: 133px;
        }

    }
}
.pointer {
    &:hover{
        color: $primary-hover;
    }
}
.mask {
  width: 100%;
  height: 100%;
  z-index: 100;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 300ms, visibility 0s 300ms;
  box-sizing: border-box;
  text-align: center;
  background-color: rgba($contract-block-bg, 0.8);
  &.show {
    transition: none;
    visibility: visible;
    opacity: 1;
  }
  .mask-front {
    position: absolute;
    top: 42%;
    margin-top: -35px;
    width: 100%;
    text-align: center;
    font-size: 0;
  }
  .hint {
    margin-bottom: 18px;
    font-size: 14px;
    color: white;
  }
  .link {
    font-size: 12px;
    text-align: center;
    padding: 0 20px;
    min-width: 84px;
    box-sizing: border-box;
    margin: 0 4px 8px;
    color: white;
    border-radius: 3px;
    line-height: 32px;
    &.signin {
      background-color: $buy;
    }
    &.signup {
      background-color: $sell;
    }
  }
  &.loadfailed {
    background-color: rgb(37, 37, 37) !important;

    .hint {
      .icon {
        display: inline-block;
        height: 80px;
        width: 96px;
        background: url("../../../../assets/contract/loadfail.png") no-repeat center/cover;
      }
    }
  }

}
  .nowrap {
    white-space: nowrap;
  }
.btn-disabled{
  -webkit-filter: grayscale(60%);
  -moz-filter: grayscale(60%);
  -ms-filter: grayscale(60%);
  -o-filter: grayscale(60%);
  filter: grayscale(60%);
  // filter: gray;
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1); 
  // border-color:#177757;
  cursor: not-allowed;
}

.profit {
    .val1 {
      display: inline;
    }
    .val2 {
      display: none;
    }
  &:hover {
    .val1 {
      display: none;
    }
    .val2 {
      display: inline;
    }
  }
}
</style>
