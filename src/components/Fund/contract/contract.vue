<template>
  <div class="fund-container my-fund-container contract-container"> 
     <div class="title-box"> 
      <div>
        {{ $t('contract_account') }} 
         <span class="ml-30">
          <el-select  
            v-model="unit" 
            value-key="name">
            <el-option
              v-for="(item, idx) in currencyList"
              :key="idx"
              :label="item.name"
              :value="item"/>
          </el-select> 
        </span> 
      </div>
      <div>
        <router-link
          class="fund-history mr-22 "
          to="/fund/hyTrade/index"> {{ $t('account_balance') }}</router-link>
        <router-link
          class="fund-history mr-22"
          to="/fund/my/contract/history"> {{ $t('transaction_record') }}</router-link>
        <router-link
          class="fund-history"
          to="/fund/my/contract/assets-history"> {{ $t('capital_record') }}</router-link>
      </div>
    </div>
    <div class="my-fund-content">
      <div  class="gz-wrapper clearfix">
        <span>{{$t('otc_otutcol_15')}}</span>
        <h1> <icon :name="unit.name+'-unit'" /> {{total | fixed(unit.scale)}}</h1>
      </div>
      <div class="account-row">
        <div class="row__box pl-6">
          <!-- <div
            id="contract-summary-chart"
            class="chart-dom"/> -->
          <div v-if="false">
            <div class="currency-row">
              <div class="row__label">{{ $t('account') }}</div>
              <div class="row__value">
                <el-select
                  v-show="layer"
                  v-model="selectPair"
                  value-key="product_name">
                  <el-option
                    v-for="(item, idx) in allPairs"
                    :key="idx"
                    :label="item.product_name"
                    :value="item"/>
                </el-select>
              </div>
            </div>
            <!-- <div class="chart-note c-666 f12">
              <p>
                <span class="money-spot red"/>
                {{ $t('warehouse_margin') }}
              </p>
              <p>
                <span class="money-spot yellow"/>
                {{ $t('entrust_margin') }}
              </p>
              <p>
                <span class="money-spot blue"/>
                {{ $t('margin_balance') }}
              </p>
            </div> -->
          </div>
        </div> 
        <div class="row__box">
          <div class="currency-row">
            <div class="row__label"/>
            <div class="row__value"/>
          </div>
          <!-- 资金划转 -->
          <!-- <div
            class="account-exchange c-primary"
            @click="exchange">
            {{ $t('account_exchange') }}
          </div> -->
        </div>
      </div>
      <!-- 表格部分 -->
      <div class="account-row mt-40">
        <div class="row__box">
          <div class="box__table">
            <!-- 账户权益 -->
            <div class="table__tr border-bottom-1">
              <span
                class="c-999 cursor_help border_bottom_dash special"
                v-tooltip.top-center="{html: true, content: $t('contract_account_rights_tips'), classes: 'contract_fund'}">{{ $t('contract_account_rights') }}</span>
              <span class="c-333">{{ (holding.available || 0) | fixed(valueScale) }} {{ selectPair.product_name }}</span>
            </div>
            <!-- 保证金余额 -->
            <div class="table__tr border-bottom-1">
              <span
                class="c-999 cursor_help border_bottom_dash"
                v-tooltip.top-center="{html: true, content: $t('contract_margin_balance_tips'), classes: 'contract_fund'}">{{ $t('contract_margin_balance') }}</span>
              <span class="c-333">{{ (marginBalance || 0) | fixed(valueScale) }} {{ selectPair.product_name }}</span>
            </div>
            <!-- 可用余额 -->
            <div class="table__tr">
              <span
                class="c-999 cursor_help border_bottom_dash"
                v-tooltip.top-center="{html: true, content: $t('contract_avab_tips'), classes: 'contract_fund'}">{{ $t('withdraw_avlb') }}</span>
              <span class="c-333">{{ (holding.available_balance || 0) | fixed(valueScale) }} {{ selectPair.product_name }}</span>
            </div>
            <div class="table__btns">
              <div
                class="btn pointer"
                @click="exchange(1)">
                <div class="icon-wrapper">
                  <span class="icon icon-fund_coin"/>
                </div>
                <p class="flex1">{{ $t('transfer_in') }}</p>
              </div>
              <div
                class="btn pointer out"
                @click="exchange(2)">
                <div class="icon-wrapper">
                  <span class="icon icon-fund_out"/>
                </div>
                <p class="flex1">{{ $t('transfer_out') }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row__box">
          <div class="box__table">
            <!-- 账户权益 -->
            <div class="table__tr right border-bottom-1 yellow">
              <span
                class="c-999 cursor_help special"
                v-tooltip.top-center="{html: true, content: $t('contract_account_rights_tips'), classes: 'contract_fund'}">{{ $t('contract_account_rights') }}</span>
              <span class="c-333">{{ holding.available | fixed(valueScale) }} {{ selectPair.product_name }}</span>
            </div>
            <div class="table__tr right">
              <!-- 未实现盈亏 -->
              <span
                class="c-999 cursor_help"
                v-tooltip.top-center="{html: true, content: $t('contract_unrealized_profit_and_loss_tips'), classes: 'contract_fund'}">{{ $t('unrealized_profit_and_loss') }}</span>
              <span class="c-333">{{ (holding.unrealized || 0) | fixed(valueScale) }} {{ selectPair.product_name }}</span>
            </div>
            <!-- 保证金余额 -->
            <div class="table__tr right border-bottom-1 yellow">
              <span
                class="c-999 cursor_help"
                v-tooltip.top-center="{html: true, content: $t('contract_margin_balance_tips'), classes: 'contract_fund'}">{{ $t('contract_margin_balance') }}</span>
              <span class="c-333">{{ (marginBalance || 0) | fixed(valueScale) }} {{ selectPair.product_name }}</span>
            </div>
            <div class="table__tr right">
              <span
                class="c-999 cursor_help"
                v-tooltip.top-center="{html: true, content: $t('contract_were_margin_tips'), classes: 'contract_fund'}">{{ $t('warehouse_margin') }}</span>
              <span class="c-333">{{ (holding.margin_position || 0) | fixed(valueScale) }} {{ selectPair.product_name }}</span>
            </div>
            <!-- 委托保证金 -->
            <div class="table__tr right">
              <span
                class="c-999 cursor_help"
                v-tooltip.top-center="{html: true, content: $t('contract_entrust_margin_tips'), classes: 'contract_fund'}">{{ $t('entrust_margin') }}</span>
              <span class="c-333">{{ (holding.margin_delegation || 0) | fixed(valueScale) }} {{ selectPair.product_name }}</span>
            </div>
            <!-- 可用余额 -->
            <div class="table__tr right border-bottom-1 yellow">
              <span
                class="c-999 cursor_help"
                v-tooltip.top-center="{html: true, content: $t('contract_avab_tips'), classes: 'contract_fund'}">{{ $t('withdraw_avlb') }}</span>
              <span class="c-333">{{ (holding.available_balance || 0) | fixed(valueScale) }} {{ selectPair.product_name }}</span>
            </div>
            <!-- 杠杆倍数 -->
            <div
              class="table__tr right c-999"
              v-if="holding.margin_delegation">
              {{ $t('contract_fund_usee_lever', {per: (this.state.ct.holding.margin_position/this.state.ct.holding.available*100).toFixed(priceScale) + '%', lever: $big(holding.leverage || 0).toFixed(2)}) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <transfer-modal
      :show-modal.sync="showModal"
      @click="hideModal"/>
  </div>
</template>
<script>
import service from '@/modules/service'
import {state} from '@/modules/store'
import utils from '@/modules/utils'
import holdingMixins from '@/projects/contract/components/stateHoldingComputedMixins'
import dealSocketMixins from '@/mixins/deal-socket-mixins'
import transferModal from './transfer-modal'
/**
 *
currency 币名
available 可用量
ordering 委托锁定量
withdrawing 提币锁定量
quota 当前提币剩余额度
locking = ordering + withdrawing
amount = available + ordering + withdrawing
max_quota 当前提币总额度
 */
export default {
  name: 'MyFund',
  mixins: [holdingMixins, dealSocketMixins],
  data () {
    return {
      state,
      chart: null,
      amountNumber:'',
      dv: null,
      allPairs: [],
      tableData: [],
      select1: 1,
      popover: false,
      select2: 1,
      stateType:1,
      selectPair: '',
      selectPair2: '',
      layer : true,
      showModal: false,
      plusMillionUsdt: false,
      millionUsdtAmount: 1000000,
      accountInfo: {},
      pair: 'FUTURE_BTCUSD',
      rates: {},
      currencyList: [
        {
          name: 'CNY',
          symbol: '￥',
          scale: 2
        },
        {
          name: 'USD',
          symbol: '$',
          scale: 4
        },
        {
          name: 'BTC',
          symbol: 'B',
          scale: 8
        },
      ],
      unit: null,
    }
  },
  computed: {
    // lastPrice () {
    //   return this.state.ct.lastPrice
    // },
    gm(){
      console.log(123)
    },
    change2(){
      console.log(456)
    },
    pairInfo () {
      return this.selectPair
    },
    priceScale () {
      return this.pairInfo.price_scale || 2
    },
    valueScale () {
      return this.pairInfo.value_scale || 4
    },
    showHistory () {
      return this.$route.name === 'history'
    },
    total () {   
      let sum = this.$big(0)
      this.tableData.forEach(item => {
        sum = sum.plus(this.getEstValue(item))
      })
      return sum.toString()
    }, 
    // unit () {
    //   return state.locale === 'zh-CN' ? 'CNY' : 'USD'
    // },
    // symbol () {
    //   switch (this.unit) {
    //     case 'CNY': 
    //       return '￥' 
    //     case 'USD':
    //       return '$'
    //   }
    // },
    header () {
      return state.locale && [
        {key: 'currency', title: this.$t('fees_name')},
        {key: 'available', title: this.$t('avlb')},
        {key: 'locking', title: this.$t('asset_th_unavlb')},
        {key: 'amount', title: this.$t('total_count')},
        {key: 'estValue', title: this.$t('homechart_fiat') + '(' + (state.locale === 'zh-CN' ? 'CNY' : 'USD') + ')'}
      ]
    },
    operate () {
      return state.locale && {key: 'operate', title: this.$t('operation')}
    },
    currency () {
      return this.pairInfo.product_name
    },
    marginBalance() {
      //保证金余额 = 可用余额 + 未实现盈亏
      return this.$big(this.holding.available_balance || 0).plus(this.holding.unrealized || 0)
    },
    currencyChange(e) { 
      //this.getContractBalanceList()
    },

  },
  async created () { 
    this.unit = this.currencyList[0]
    await this.getAllRate() 
    await this.getPairs()
    this.getContractBalanceByPair()
    this.getContractBalanceList()
  },
  watch:{
    // popover(val){
    //   this.layer = !val
    // }
  },
  mounted () {
    // this.initChart()
    if(this.holding === undefined){
      utils.alert(this.$t('网络加载失败，请检查网络重试'))
    }
  },
  methods: {
    amounts(){
      this.amountNumber = 21321
    },
    exchange (number) {
      this.popover = true
      this.state.stateType = number
      // console.log(number,this.stateType)

       if (this.state.isSimulation) {
        utils.alert(this.$t('contract_simulation_exchange_limit'))
      } else {
        this.showModal = true
      }
    },
    async getPairs () {
      await service.getContractSymList().then(res => {
        if (res && res.data) {
          this.allPairs = res.data.items
          //this.selectPair = this.allPairs[0]
          this.selectPair = res.data.items.filter(arg => arg.product_name === 'BTC')[0]
        }
      })
    },
    hideModal () {
      this.showModal = false
    },
    async getAllRate() {
      let res = await service.getAllRate() 
      if (!res.code && !!res.data) {
        this.rates = res.data;
      }
    },
    // getEstValue (item) {
    //   // console.log('asjdlfkjaskldfjasldjflasdjfl;ajsdfljkasdlfk')
    //   let coin = item.currency.replace("USD","")
    //   let rate = this.rates[coin]
    //   if (!!rate) { 
    //     let res = this.$big(item.available).times(this.$big(rate[this.unit.name] || 0))
    //     let num = 8 
    //     return res.round(num, this.C.ROUND_DOWN).toString()
    //   } 
    //   return '0';
    // }, 
    getEstValue (item) {
      let res = this.$big(0)
      let unit = this.unit.name
      let {currency,camount} = item  
      if (unit === 'BTC'){
        if(currency === 'BTC') {
          res = this.$big(camount) 
        }
        else {
          if (this.$big(camount).gt(0) && !!this.rates[currency]) {
            res = this.$big(camount).times(this.rates[currency]['USD'] || 0).div(this.rates['BTC']['USD'])
          }
        }
      }
      else if (item.rates) {
        res = this.$big(camount).times(this.$big(item.rates[unit] || 0))
      }
      else {
        if (this.rates[currency]) {
          res = this.$big(camount).times(this.$big(this.rates[currency][unit] || 0))
        }
      } 
      return res
    },
    getContractBalanceList () {
      service.getContractBalanceList().then(res => { 
         if (!res.code && !!res.data) {
            this.tableData = (res.data || []).map(item => { 
            item.currency = item.currency.replace("USD","")
            item.camount = item.available
            item.estValue = this.getEstValue(item) 
            console.log({item})
            return item
          })
        }
      })
    },
    getContractBalanceByPair () { 
      service.getContractBalanceByPair({
        symbol: this.currency
      }).then(res => {
        this.accountInfo = res.data
        this.state.ct.holding = res.data 
        // this.tableData = res.data
      })
    }
  },
  components: {
    transferModal
  }
}
</script>
<style lang="scss" scoped>
  .popover{
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height:100%;
    .popover-background{
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      width: 100%;
      height:100%;
      z-index: 9
    }
    .balance{
      margin-top: 10px;
      color: #666;
      font-size: 12px;
      .fr{
        float: right;
      }
    }
    .input-label{
      position:relative;
      label{
        position: absolute;
        right: 15px;
        top: 20px;
        color: $primary;
        cursor: pointer;
      }
    }
    select{
      width: 174px;
      display: inline-block;
      height: 35px;
      border: 1px solid #ddd;
      background-color: #fff;
      border-radius: 3px;
      padding-left: 10px;
    }
    .popover-content{
      position: absolute;
      z-index: 10;
      left: 0;
      right: 0;
      top: 20%;
      height: 210px;
      width: 370px;
      background: #fff;
      margin: 0 auto;
      padding:20px;
      .footer{
        display: block;
        text-align: right;
        .popover-qx{
          background: none;
          border:none;
          padding:10px 20px;
        }
        .popover-hz{
          background: $primary;
          color: #fff;
          padding: 7px 15px;
          border:none;
          border-radius: 3px;
        }
      }
      input{
        display: inline-block;
        height: 35px;
        border: 1px solid #ddd;
        background-color: #fff;
        border-radius: 3px;
        padding-left: 10px;
        margin: 10px 0;
        width: 97%;
      }
      h2{
        font-size: 20px;
        font-weight: bold;
        display: block;
        margin-bottom: 30px;
      }
    }
  }
  .gz-wrapper {
    width: 520px;
    height: 176px;
    background: #F6F1FD;
    border-radius: 4px;
    position: relative;
    text-align: center;
    margin: 30px 0;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 6px;
      background: #A572E9;
      border-radius: 4px;
    }

    span {
      padding: 30px 0;
      font-size: 18px;
      display: block;
      font-weight: 400;
      color: #A572E9;
    }

    h1 {
      font-size: 30px;
      color: #A572E9;
    }
  }
</style>
