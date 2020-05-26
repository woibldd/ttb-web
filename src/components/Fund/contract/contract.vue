<template>
  <div class="fund-container my-fund-container contract-container">
    <div class="title-box">
      <div>
        {{ computedTitle }}
        <span class="ml-30">
          <el-select
            class="ddl-small"
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
          to="/fund/my/contract/index"> {{ $t('account_balance') }}</router-link>
        <router-link
          class="fund-history mr-22"
          to="/fund/my/contract/history"> {{ $t('transaction_record') }}</router-link>
        <router-link
          class="fund-history mr-22"
          to="/fund/my/contract/assets-history"> {{ $t('capital_record') }}</router-link> 
         <router-link
          class="fund-history"
          to="/fund/my/contract/winloss-history"> {{ $t('fund.contract.winloss_record') }}</router-link>
      </div>
    </div>
    <div class="my-fund-content">
      <div class="gz-wrapper clearfix">
        <span>{{ $t('otc_otutcol_15') }}</span>
        <h1> <icon :name="unit.name+'-unit'" /> {{ total | fixed(unit.scale) }}</h1>
      </div>
      <div class="account-row">
        <div class="row__box pl-6"> 
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
          </div>
        </div>
        <div class="row__box">
          <div class="currency-row">
            <div class="row__label"/>
            <div class="row__value"/>
          </div> 
        </div>
      </div>
      <!-- 表格部分 -->
      <div class="account-row mt-40">
        <div class="row__box">
          <div class="box__table">
            <!-- 账户权益 -->
            <div
              class="table__tr border-bottom-1"
              flex="main:justify">
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_account_rights_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help border_bottom_dash special">{{ $t('contract_account_rights') }}</span>
              <span class="c-333">{{ (holding.available || 0) | fixed(8) }} {{ selectPair.product_name }} </span>
              <span
                class="c-999"
                style="transform: scale(0.8);position:absolute;margin-left: 90px;">≈ {{ translateByRate(holding.available) | fixed(2) }} USD</span>
            </div>
            <!-- 保证金余额 -->
            <div class="table__tr border-bottom-1">
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_margin_balance_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help border_bottom_dash">{{ $t('contract_margin_balance') }}</span>
              <span class="c-333">{{ (marginBalance || 0) | fixed(8) }} {{ selectPair.product_name }}</span>
              <span
                class="c-999"
                style="transform: scale(0.8);position:absolute;margin-left: 90px;">≈ {{ translateByRate(marginBalance) | fixed(2) }} USD</span>
            </div>
            <!-- 可用余额 -->
            <div class="table__tr">
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_avab_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help border_bottom_dash">{{ $t('withdraw_avlb') }}</span>
              <span class="c-333">{{ (holding.available_balance || 0) | fixed(8) }} {{ selectPair.product_name }}</span>
              <span
                class="c-999"
                style="transform: scale(0.8);position:absolute;margin-left: 90px;">≈ {{ translateByRate(holding.available_balance) | fixed(2) }} USD</span>
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
                v-tooltip.top-center="{html: true, content: $t('contract_account_rights_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help special">{{ $t('contract_account_rights') }}</span>
              <span class="c-333">{{ (holding.available || 0) | fixed(8) }} {{ selectPair.product_name }}</span>
              <span
                class="c-999"
                style="transform: scale(0.8);position:absolute;margin-left: 90px;">≈ {{ translateByRate(holding.available) }} USD</span>
            </div>
            <div class="table__tr right">
              <!-- 未实现盈亏 -->
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_unrealized_profit_and_loss_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help">{{ $t('unrealized_profit_and_loss') }}</span>
              <span class="c-333">{{ (holding.unrealizedlp || 0) | fixed(8) }} {{ selectPair.product_name }}</span>
              <span
                class="c-999"
                style="transform: scale(0.8);position:absolute;margin-left: 90px;">≈ {{ translateByRate(holding.unrealizedlp) }} USD</span>
            </div>
            <!-- 保证金余额 -->
            <div class="table__tr right border-bottom-1 yellow">
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_margin_balance_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help">{{ $t('contract_margin_balance') }}</span>
              <span class="c-333">{{ (marginBalance || 0) | fixed(8) }} {{ selectPair.product_name }}</span>
              <span
                class="c-999"
                style="transform: scale(0.8);position:absolute;margin-left: 90px;">≈ {{ translateByRate(marginBalance) }} USD</span>
            </div>
            <!-- 仓位保证金 -->
            <div class="table__tr right">
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_were_margin_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help">{{ $t('warehouse_margin') }}</span>
              <span class="c-333">{{ (holding.margin_position || 0) | fixed(8) }} {{ selectPair.product_name }}</span>
              <span
                class="c-999"
                style="transform: scale(0.8);position:absolute;margin-left: 90px;">≈ {{ translateByRate(holding.margin_position) }} USD</span>
            </div>
            <!-- 委托保证金 -->
            <div class="table__tr right">
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_entrust_margin_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help">{{ $t('entrust_margin') }}</span>
              <span class="c-333">{{ (holding.margin_delegation || 0) | fixed(8) }} {{ selectPair.product_name }}</span>
              <span
                class="c-999"
                style="transform: scale(0.8);position:absolute;margin-left: 90px;">≈ {{ translateByRate(holding.margin_delegation) }} USD</span>
            </div>
            <!-- 可用余额 -->
            <div class="table__tr right border-bottom-1 yellow">
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_avab_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help">{{ $t('withdraw_avlb') }}</span>
              <span class="c-333">{{ (holding.available_balance || 0) | fixed(8) }} {{ selectPair.product_name }}</span>
              <span
                class="c-999"
                style="transform: scale(0.8);position:absolute;margin-left: 90px;">≈ {{ translateByRate(holding.available_balance) }} USD</span>
            </div>
            <!-- 杠杆倍数 -->
            <!-- <div
              class="table__tr right c-999"
              v-if="holding.margin_delegation">
              {{ $t('contract_fund_usee_lever', {per: holding.margin + '%', lever: $big(holding.leverage || 0).toFixed(2)}) }}
            </div> -->
          </div>
        </div>
      </div>

      <div class="account__row  mt-40">
        <div class="row__box card-list">
          <div
            v-for="(holding,index) in holdingList"
            :key="index"
            class="card-detail"
            v-if="(holding.holding || 0) != 0">
            <contractCard
              :holding="holding"
              :rates="btcRates" 
              :unrealized="holding.unrealizedlp"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <transfer-modal
      :show-modal.sync="showModal"
      @click="hideModal"/> -->
  </div>
</template>
<script>
import service from '@/modules/service'
import { state } from '@/modules/store'
import utils from '@/modules/utils'
import tickTableMixin from '@/mixins/fund-contract-tick'
import dealSocketMixins from '@/mixins/deal-socket-mixins'
import contractCard from './contract-card'
// import transferModal from './transfer-modal'
import {bigTimes} from '@/utils/handleNum'
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
  mixins: [tickTableMixin, dealSocketMixins],
  components: { contractCard },
  // mixins: [dealSocketMixins],
  data () {
    return {
      state,
      chart: null,
      amountNumber: '',
      dv: null,
      allPairs: [],
      tableData: [],
      select1: 1,
      popover: false,
      select2: 1,
      stateType: 1,
      selectPair: '',
      selectPair2: '',
      layer: true,
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
        }
        // {
        //   name: 'BTC',
        //   symbol: 'B',
        //   scale: 8
        // },
      ],
      unit: null,
      loading: false,
      btcRates: {}
    }
  },
  computed: {
    // lastPrice () {
    //   return this.state.ct.lastPrice
    // },
    
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
      if (this.tableData.length > 0) {
        //btc合约用的是同一个公用账户，估值直接取available就行了
        sum = this.getEstValue(this.tableData[0])
      } 
      return sum.toString()
    },
    operate () {
      return state.locale && { key: 'operate', title: this.$t('operation') }
    },
    currency () {
      return this.pairInfo.product_name
    },
    // 保证金余额
    marginBalance () {
      // 保证金余额 = 可用余额 + 未实现盈亏
      return this.$big(this.holding.available_balance || 0).plus(this.holding.unrealizedlp || 0)
    },
    // 保证金=【（仓位保证金+委托保证金）/保证金余额】*100%（四舍五入，取整）
    margin () {
      return this.$big(this.holding.margin_position)
        .plus(this.holding.margin_delegation)
        .div(this.marginBalance)
        .times(100)
        .round(0)
    },
    computedTitle(){
      const obj = {
        '/fund/my/contract/index':this.$t('account_balance'),
        '/fund/my/contract/history':this.$t('transaction_record'),
        '/fund/my/contract/assets-history':this.$t('capital_record'),
      }
      // console.log(this.$route.path,222);
      
      return obj[this.$route.path]
    },
    // 计算杠杆倍数
    curLever () {
      let value = this.$big(0)
      this.holdingList.map(item => {
        value = value.plus(item.value)
      })
      if (this.$big(this.marginBalance).eq(0)) {
        return '0'
      } else {
        return value.div(this.marginBalance).toString()
      }
    },
    holding () {
      const obj = {}
      // console.log({ obj })
      const list = this.holdingList
      if (!!list && list.length > 0) {
        const item = list[0]
        obj.available = item.available // 账户权益
        obj.marginBalance = this.$big(item.available_balance || 0) // 保证金余额
        obj.available_balance = item.available_balance // 可用余额
        obj.unrealized = this.$big(0) // 未实现盈亏
        obj.unrealizedlp = this.$big(0)
        obj.margin_position = this.$big(0) // 仓位保证金
        obj.margin_delegation = this.$big(0) // 委托保证金
        obj.totalValue = this.$big(0) // 持仓总价值
        list.map(arg => {
          // 保证金余额 = 可用余额 + 未实现盈亏
          if (obj.marginBalance.eq(0)) {
            obj.marginBalance = obj.marginBalance.plus(arg.available_balance || 0)
          }
          obj.marginBalance = obj.marginBalance.plus(arg.unrealizedlp || 0)
          obj.unrealized = obj.unrealized.plus(arg.unrealized || 0)
          obj.unrealizedlp = obj.unrealizedlp.plus(arg.unrealizedlp || 0)
          obj.margin_position = obj.margin_position.plus(arg.margin_position || 0)
          obj.margin_delegation = obj.margin_delegation.plus(arg.margin_delegation || 0)
          obj.totalValue = obj.totalValue.plus(arg.value)
        })

        if (!this.$big(obj.totalValue).eq(0)) {
          obj.margin = this.$big(obj.totalValue)
            .div(obj.marginBalance)
            .times(100)
            .toFixed(2) 
        }
        if (!this.$big(obj.margin_position).plus(obj.margin_delegation).eq(0)) {
          obj.leverage = (this.$big(obj.margin_position)
            .plus(obj.margin_delegation))
            .div(obj.available)
            .times(100)
            .toFixed(2) 
        }
      }
      // console.log({ obj })
      return obj
    },
    holdingList () {
      let list = state.ct.holdingList
      const pairInfoList = state.ct.pairInfoList
      list = list.map((holding) => {
        if (holding) {
          // hack
          holding.amount = holding.holding || '0'
          holding.value = '0'
        } else {
          holding = {
            amount: '0',
            available_balance: '0',
            value: '0'
          }
        }
        const pairInfo = pairInfoList['FUTURE_' + holding.currency]
        if (!pairInfo) {
          return holding
        }
        holding.pairInfo = pairInfo
        const lastPrice = pairInfo.lastPrice// this.lastPrice
        const markPrice = pairInfo.markTick // this.markPrice
        const mul = pairInfo.multiplier
        const value_scale = pairInfo.value_scale

        const amount = holding.holding
        const currency = holding.currency
        const price = holding.price
        // console.log({ lastPrice, markPrice, mul, price })

        holding.product_name = pairInfo.product_name
        holding.value_scale = pairInfo.value_scale || 4
        holding.price_scale = pairInfo.price_scale

        // holding.lastPrice = lastPrice
        // holding.markPrice = markPrice
        this.$set(holding, 'lastPrice', lastPrice)
        this.$set(holding, 'markPrice', markPrice)
        // console.log(holding, 'vue-set')
        holding.unrealized = '0'
        holding.unrealizedlp = '0'
        holding.roe = '0'
        holding.roelp = '0'

        // 计算价值
        const value = '0'
        let unrealized = '0'
        let unrealizedlp = '0'
        if (currency === 'BTCUSD') {
          const unitPrice = 1 // 单价 先写死
          if (markPrice) {
            holding.value = this.$big(amount).div(holding.markPrice || 0).times(unitPrice).round(value_scale || 4).abs().toString()
          } else {
            holding.value = '0'
          }
        } else {
          holding.value = this.$big(holding.price || 0).times(amount).times(mul).abs().toString()
        }
        // holding.value = value
        if (currency === 'BTCUSD') {
          if (holding.amount > '0' && !!holding.markPrice && !!holding.lastPrice) {
            unrealized = this.$big(amount).div(price).minus(this.$big(amount).div(holding.markPrice))
            unrealizedlp = this.$big(amount).div(price).minus(this.$big(amount).div(holding.lastPrice))
          } else if (holding.amount < 0 && !!holding.markPrice && !!holding.lastPrice) {
            unrealized = (this.$big(amount).abs().div(holding.markPrice)).minus(this.$big(amount).abs().div(price))
            unrealizedlp = (this.$big(amount).abs().div(holding.lastPrice)).minus(this.$big(amount).abs().div(price))
          } else {
            unrealized = this.$big('0')
            unrealizedlp = this.$big('0')
          }

          holding.unrealized = unrealized
          holding.unrealizedlp = unrealizedlp
        }
        // VDS BHD
        else {
          // VDS未实现盈亏计算   //乘数（0.0001BTC）
          // 多：（VDSUSD 标记价格 - VDSUSD 开仓价格）* 比特币乘数 * 合约数量
          // 空：（ VDSUSD 开仓价格- VDSUSD 标记价格）* 比特币乘数 * 合约数量
          if (amount > 0) {
            unrealized = (this.$big(holding.markPrice || 0).minus(price)).times(mul).times(this.$big(amount).abs())
            unrealizedlp = (this.$big(holding.lastPrice || 0).minus(price)).times(mul).times(this.$big(amount).abs())
          } else if (amount < 0) {
            unrealized = (this.$big(price).minus(holding.markPrice || 0)).times(mul).times(this.$big(amount).abs())
            unrealizedlp = (this.$big(price).minus(holding.lastPrice || 0)).times(mul).times(this.$big(amount).abs())
          } else {
            unrealized = this.$big('0')
            unrealizedlp = this.$big('0')
          }

          holding.unrealized = unrealized
          holding.unrealizedlp = unrealizedlp
        }
        // console.log(holding.value)
        if (this.$big(amount || 0).eq(0) || this.$big(price || 0).eq(0) || !holding.value || holding.value === '0') {
          holding.roe = this.$big('0')
          holding.roelp = this.$big('0')
        } else {
          const maxLever = pairInfo.max_leverage || 100

          holding.roe = unrealized
            .div(holding.value)
            .mul(holding.leverage == 0 ? maxLever : holding.leverage)
            .mul(100).mul(2)
            .toFixed(2)

          // console.log(holding.roe)
          holding.roelp = unrealizedlp
            .div(holding.value)
            .mul(holding.leverage == 0 ? maxLever : holding.leverage)
            .mul(100).mul(2)
            .toFixed(2)
            // console.log(holding.roelp)
        }

        // 平仓价格
        if (!holding.changeUnwindPrice) {
          // 最小步算法
          const accuracy = holding.pairInfo.accuracy || 1
          const scale = holding.pairInfo.price_scale || 4
          const minStep = Math.pow(10, -scale) * accuracy
          let $newValue = this.$big(markPrice || 0)
          if (!$newValue.mod(minStep).eq(0)) {
            $newValue = $newValue.div(minStep).round(scale >= 1 ? scale - 1 : 0, 0).mul(minStep)
          }
          const unwindPrice = $newValue
          this.$set(holding, 'unwindPrice', unwindPrice)
        }

        holding.margin = '0'
        holding.margin_position = this.$big(holding.margin_position || 0).round(value_scale || 4).toString()
        // 动态保证金
        holding.margin = this.$big(holding.margin_position || 0).plus(holding.unrealized).round(pairInfo.value_scale || 4).toString()
        // 保证金余额=用户当前还可用于开仓的保证金数量=账户权益-仓位保证金-委托保证金。
        holding.margin_available = this.$big(holding.available || 0).minus(holding.margin_position || 0).minus(holding.margin_delegation || 0).round(value_scale || 4, 0).toString()
        holding.canRemoveMargin = holding.margin_user
        holding.canAddMargin = holding.available_balance
        // 保证金占比
        holding.marginPercent = holding.available == 0 ? '0.00' : this.$big(holding.margin_delegation || 0).div(holding.available).mul(100).round(2).toString()
        // holding.test = 0;
        return holding
      })
      return list
    }
  },
  watch: {
    // popover(val){
    //   this.layer = !val
    // }
  },
  async created () {
    this.currencyList = [{
      name: 'CNY',
      symbol: '￥',
      scale: 2
    },
    {
      name: 'USD',
      symbol: '$',
      scale: 4
    } ]

    if (state.locale === 'zh-CN') {
      this.unit = this.currencyList[0]
    } else {
      this.unit = this.currencyList[1]
    }
    await this.getAllRate()
    await this.getPairs()
    // this.getContractBalanceByPair()
    this.getContractBalanceList()

    // const res = await service.getRates({currency: 'BTC'})
    // if (!res.code && res.data) {
    //   this.btcRates = res.data.BTC 
    // }
  },
  mounted () {
    // this.initChart()
    if (this.holding === undefined) {
      utils.alert(this.$t('网络加载失败，请检查网络重试'))
    }
  },
  methods: {
    translateByRate (value, scale = 2) {
      if (!this.btcRates || !this.btcRates['USD']) return
      // return bigTimes([this.btcRates['USD'], value], scale)
      return this.$big(this.btcRates['USD'] || 0).times(value || 0).round(scale)
    }, 
    exchange (number) {
      this.popover = true
      this.state.stateType = number
      // console.log(number,this.stateType)

      if (this.state.isSimulation) {
        utils.alert(this.$t('contract_simulation_exchange_limit'))
      } else {
        // this.showModal = true
        this.$router.push({
          path: '/fund/transfer',
          query: {
            currency: 'BTC'
          }
        })
      }
    },
    async getPairs () {
      await service.getContractSymList().then(res => {
        if (res && res.data) {
          this.allPairs = res.data.items
          // this.selectPair = this.allPairs[0]
          this.selectPair = res.data.items.filter(arg => arg.product_name === 'BTC')[0]

          // this.state.ct.pairInfoList = {}
          // res.data.items.forEach(element => {
          //   this.state.ct.pairInfoList[element.name] = element
          // });
        }
      })
    },
    hideModal () {
      this.showModal = false
    },
    async getAllRate () {
      const res = await service.getAllRate()
      if (!res.code && !!res.data) {
        this.rates = res.data
        this.btcRates = res.data.BTC
      }
    },

    getEstValue (item) {
      let res = this.$big(0)
      const unit = this.unit.name
      const { currencyName, camount } = item
      if (unit === 'BTC') {
        if (currencyName === 'BTC') { // 折合与账户币种都是BTC，不进行换算
          res = this.$big(camount)
        } else {
          if (this.rates[currencyName]) {
            res = this.$big(camount || 0).times(this.rates[currencyName]['USD'] || 0).div(this.rates['BTC']['USD'])
          }
        }
      } else if (item.rates) { // 优先使用账户信息中自带的汇率
        res = this.$big(camount).times(this.$big(item.rates[unit] || 0))
      } else {
        if (this.rates[currencyName]) {
          res = this.$big(camount || 0).times(this.$big(this.rates[currencyName][unit] || 0))
        }
      }
      return res
    },
    getContractBalanceList () {
      service.getContractBalanceList().then(res => {
        if (!res.code && !!res.data) {
          state.ct.holdingList = res.data.slice()
          this.tableData = (res.data || []).map(item => {
            item.currencyName = item.currency.replace('USD', '')
            item.camount = item.available
            item.estValue = this.getEstValue(item) 
            return item
          })
        }
      })
    } 
  } 
}
</script>
<style lang="scss" scoped>
  @import './contract.scss';
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
  .card-list {
    @include clearfix;
    .card-detail {
      float: left;
      margin-right: 40px;
      &:nth-child(3),&:nth-child(6),&:nth-child(9) {
        margin-right: 0;
      }
    }
  }
  .fund-history {
      color: #999;
      border-color: #999;
      &.router-link-active {
          color: $primary;
          border-color: $primary;
      }
  }
  .el-select.ddl-small {
    width:100px;
  }
</style>
