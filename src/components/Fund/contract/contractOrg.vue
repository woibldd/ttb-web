<template>
  <div class="fund-container my-fund-container contract-container">
    <div class="title-box">
      <div>
          {{ $t('capital_record') }}
        <span class="ml-30">
          <el-select
            v-model="unit"
            value-key="name">
            <el-option
              v-for="(item, idx) in coinList"
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
          class="fund-history"
          to="/fund/my/contract/assets-history"> {{ $t('capital_record') }}</router-link>
      </div>
    </div>
    <div class="my-fund-content">
      <div class="gz-wrapper clearfix">
        <span>{{ $t('otc_otutcol_15') }}</span>
        <h1> <icon :name="unit.name+'-unit'" /> {{ total | fixed(unit.scale) }}</h1>
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
          <!-- ???????????? -->
          <!-- <div
            class="account-exchange c-primary"
            @click="exchange">
            {{ $t('account_exchange') }}
          </div> -->
        </div>
      </div>
      <!-- ???????????? -->
      <div class="account-row mt-40">
        <div class="row__box">
          <div class="box__table">
            <!-- ???????????? -->
            <div class="table__tr border-bottom-1">
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_account_rights_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help border_bottom_dash special">{{ $t('contract_account_rights') }}</span>
              <span class="c-333">{{ (holding.available || 0) | fixed(valueScale) }} BTC</span>
            </div>
            <!-- ??????????????? -->
            <div class="table__tr border-bottom-1">
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_margin_balance_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help border_bottom_dash">{{ $t('contract_margin_balance') }}</span>
              <span class="c-333">{{ (holding.marginBalance || 0) | fixed(valueScale) }} BTC</span>
            </div>
            <!-- ???????????? -->
            <div class="table__tr">
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_avab_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help border_bottom_dash">{{ $t('withdraw_avlb') }}</span>
              <span class="c-333">{{ (holding.available_balance || 0) | fixed(valueScale) }} BTC</span>
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
            <!-- ???????????? -->
            <div class="table__tr right border-bottom-1 yellow">
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_account_rights_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help special">{{ $t('contract_account_rights') }}</span>
              <span class="c-333">{{ holding.available | fixed(valueScale) }} BTC</span>
            </div>
            <div class="table__tr right">
              <!-- ??????????????? -->
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_unrealized_profit_and_loss_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help">{{ $t('unrealized_profit_and_loss') }}</span>
              <span class="c-333">{{ (holding.unrealized || 0) | fixed(valueScale) }} BTC</span>
            </div>
            <!-- ??????????????? -->
            <div class="table__tr right border-bottom-1 yellow">
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_margin_balance_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help">{{ $t('contract_margin_balance') }}</span>
              <span class="c-333">{{ (holding.marginBalance || 0) | fixed(valueScale) }} BTC</span>
            </div>
            <div class="table__tr right">
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_were_margin_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help">{{ $t('warehouse_margin') }}</span>
              <span class="c-333">{{ (holding.margin_position || 0) | fixed(valueScale) }} BTC</span>
            </div>
            <!-- ??????????????? -->
            <div class="table__tr right">
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_entrust_margin_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help">{{ $t('entrust_margin') }}</span>
              <span class="c-333">{{ (holding.margin_delegation || 0) | fixed(valueScale) }} BTC</span>
            </div>
            <!-- ???????????? -->
            <div class="table__tr right border-bottom-1 yellow">
              <span
                v-tooltip.top-center="{html: true, content: $t('contract_avab_tips'), classes: 'contract_fund'}"
                class="c-999 cursor_help">{{ $t('withdraw_avlb') }}</span>
              <span class="c-333">{{ (holding.available_balance || 0) | fixed(valueScale) }} BTC</span>
            </div>
            <!-- ???????????? -->
            <!-- <div
              class="table__tr right c-999"
              v-if="holding.margin_delegation">
              {{ $t('contract_fund_usee_lever', {per: (this.state.ct.holding.margin_position/this.state.ct.holding.available*100).toFixed(priceScale) + '%', lever: $big(holding.leverage || 0).toFixed(2)}) }}
            </div> -->
          </div>
        </div>
      </div>

      <div class="account__row  mt-40">
        <div class="row__box card-list">
          <div v-for="(holding,index) in holdingList" :key="index" class="card-detail">
            <contractCard
              v-if="(holding.amount || 0) != 0"
              :holding="holding"
            />
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
import { state } from '@/modules/store'
import utils from '@/modules/utils'
import dealSocketMixins from '@/mixins/deal-socket-mixins'
import tickTableMixin from '@/mixins/contract-tick-table'
import transferModal from './transfer-modal'
import contractCard from './contract-card'
/**
 *
currency ??????
available ?????????
ordering ???????????????
withdrawing ???????????????
quota ????????????????????????
locking = ordering + withdrawing
amount = available + ordering + withdrawing
max_quota ?????????????????????
 */
export default {
  name: 'MyFund',
  components: {
    transferModal,
    contractCard
  },
  mixins: [dealSocketMixins, tickTableMixin],
  data() {
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
      coinList: [
        {
          name: 'CNY',
          symbol: '???',
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
      unit: null
    }
  },
  computed: {
    holdingList() {
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
        Vue.set(holding, 'lastPrice', lastPrice)
        Vue.set(holding, 'markPrice', markPrice)
        // console.log(holding, 'vue-set')
        holding.unrealized = '0'
        holding.unrealizedlp = '0'
        holding.roe = '0'
        holding.roelp = '0'

        // ????????????
        const value = '0'
        let unrealized = '0'
        let unrealizedlp = '0'
        if (currency === 'BTCUSD') {
          const unitPrice = 1 // ?????? ?????????
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
          // VDS?????????????????????   //?????????0.0001BTC???
          // ?????????VDSUSD ???????????? - VDSUSD ???????????????* ??????????????? * ????????????
          // ????????? VDSUSD ????????????- VDSUSD ???????????????* ??????????????? * ????????????
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

          // if (this.$big(amount || 0).eq(0) || this.$big(price || 0).eq(0)) {
          //   holding.roe = this.$big('0')
          //   holding.roelp = this.$big('0')
          // }
          // else {
          //   holding.roe = unrealized
          //     // .div((this.$big(amount).abs()).div(price))
          //     .mul(holding.leverage == 0 ? 20 : holding.leverage)
          //     .mul(100)
          //     .toFixed(2)
          //   holding.roelp = unrealizedlp
          //     .div((this.$big(amount).abs()).div(price))
          //     .mul(holding.leverage == 0 ? 20 : holding.leverage)
          //     .mul(100)
          //     .toFixed(2)
          // }
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
            .mul(100)
            .toFixed(2)

          // console.log(holding.roe)
          holding.roelp = unrealizedlp
            .div(holding.value)
            .mul(holding.leverage == 0 ? maxLever : holding.leverage)
            .mul(100)
            .toFixed(2)
            // console.log(holding.roelp)
        }

        // ????????????
        if (!holding.changeUnwindPrice) {
          // ???????????????
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
        // ???????????????
        holding.margin = this.$big(holding.margin_position || 0).plus(holding.unrealized).round(pairInfo.value_scale || 4).toString()
        // ???????????????=????????????????????????????????????????????????=????????????-???????????????-??????????????????
        holding.margin_available = this.$big(holding.available || 0).minus(holding.margin_position || 0).minus(holding.margin_delegation || 0).round(value_scale || 4, this.C.ROUND_DOWN).toString()
        holding.canRemoveMargin = holding.margin_user
        holding.canAddMargin = holding.available_balance
        // ???????????????
        holding.marginPercent = holding.available == 0 ? '0.00' : this.$big(holding.margin_delegation || 0).div(holding.available).mul(100).round(2).toString()
        // holding.test = 0;
        return holding
      })
      return list
    },
    holding() {
      const obj = {}
      const list = this.holdingList
      if (!!list && list.length > 0) {
        const item = list[0]
        obj.available = item.available // ????????????
        obj.marginBalance = this.$big(item.available_balance || 0) // ???????????????
        obj.available_balance = item.available_balance // ????????????
        obj.unrealized = this.$big(0) // ???????????????
        obj.margin_position = this.$big(0) // ???????????????
        obj.margin_delegation = this.$big(0) // ???????????????

        // ??????????????? = ???????????? + ???????????????
        list.map(arg => {
          if (obj.marginBalance.eq(0)) {
            obj.marginBalance = obj.marginBalance.plus(arg.available_balance || 0)
          }
          obj.marginBalance = obj.marginBalance.plus(arg.unrealized || 0)
          obj.unrealized = obj.unrealized.plus(arg.unrealized || 0)
          obj.margin_position = obj.margin_position.plus(arg.margin_position || 0)
          obj.margin_delegation = obj.margin_delegation.plus(arg.margin_delegation || 0)
        })
      }
      return obj
    },
    // lastPrice () {
    //   return this.state.ct.lastPrice
    // },
    gm() {
      console.log(123)
    },
    change2() {
      console.log(456)
    },
    pairInfo() {
      return this.selectPair
    },
    priceScale() {
      return 2
    },
    valueScale() {
      return 4
    },
    showHistory() {
      return this.$route.name === 'history'
    },
    total() {
      let sum = this.$big(0)
      this.tableData.forEach(item => {
        sum = sum.plus(this.getEstValue(item))
      })
      return sum.toString()
    },
    header() {
      return state.locale && [
        { key: 'currency', title: this.$t('fees_name') },
        { key: 'available', title: this.$t('avlb') },
        { key: 'locking', title: this.$t('asset_th_unavlb') },
        { key: 'amount', title: this.$t('total_count') },
        { key: 'estValue', title: this.$t('homechart_fiat') + '(' + (state.locale === 'zh-CN' ? 'CNY' : 'USD') + ')' }
      ]
    },
    operate() {
      return state.locale && { key: 'operate', title: this.$t('operation') }
    },
    marginBalance() {
      // ??????????????? = ???????????? + ???????????????
      // return this.$big(this.holding.available_balance || 0).plus(this.holding.unrealized || 0)
      console.log({ holdingList: this.holdingList })
      const holdingList = this.holdingList
      const balance = this.$big(0)
      if (holdingList) {
        holdingList.map(holding => {
          if (balance.eq(0)) {
            balance.plus(holding.available_blance || 0)
          }
          balance.plus(holding.unrealized || 0)
        })
      }
      return balance.toString()
    },
    currencyChange(e) {
      // this.getContractBalanceList()
    }

  },
  watch: {
    // popover(val){
    //   this.layer = !val
    // }
  },
  async created() {
    if (!this.coinList) {
      this.coinList = [
        {
          name: 'CNY',
          symbol: '???',
          scale: 2
        },
        {
          name: 'USD',
          symbol: '$',
          scale: 4
        }
      ]
    }
    this.unit = this.coinList[0]
    await this.getAllRate()
    await this.getPairs()
    this.getContractBalanceList()
  },

  mounted() {
    // this.initChart()
    if (this.holding === undefined) {
      utils.alert(this.$t('??????????????????????????????????????????'))
    }
  },
  methods: {
    amounts() {
      this.amountNumber = 21321
    },
    exchange(number) {
      this.popover = true
      state.stateType = number
      // console.log(number,this.stateType)

      if (state.isSimulation) {
        utils.alert(this.$t('contract_simulation_exchange_limit'))
      } else {
        this.showModal = true
      }
    },
    async getPairs() {
      await service.getContractSymList().then(res => {
        if (res && res.data) {
          console.log({ data: res.data })
          this.allPairs = res.data.items
          // this.selectPair = this.allPairs[0]
          state.ct.pairInfoList = {}
          res.data.items.forEach(element => {
            state.ct.pairInfoList[element.name] = element
          })
          // this.selectPair = res.data.items.filter(arg => arg.product_name === 'BTC')[0]
        }
      })
    },
    hideModal() {
      this.showModal = false
    },
    async getAllRate() {
      const res = await service.getAllRate()
      if (!res.code && !!res.data) {
        this.rates = res.data
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
    getEstValue(item) {
      let res = this.$big(0)
      const unit = this.unit.name
      const { currencyName, camount } = item
      if (unit === 'BTC') {
        if (currencyName === 'BTC') {
          res = this.$big(camount)
        } else {
          if (this.$big(camount).gt(0) && !!this.rates[currencyName]) {
            res = this.$big(camount).times(this.rates[currencyName]['USD'] || 0).div(this.rates['BTC']['USD'])
          }
        }
      } else if (item.rates) {
        res = this.$big(camount).times(this.$big(item.rates[unit] || 0))
      } else {
        if (this.rates[currencyName]) {
          res = this.$big(camount).times(this.$big(this.rates[currencyName][unit] || 0))
        }
      }
      return res
    },
    getContractBalanceList() {
      service.getContractBalanceList().then(res => {
        if (!res.code && !!res.data) {
          state.ct.holdingList = res.data
          this.tableData = (res.data || []).map(item => {
            item.currencyName = item.currency.replace('USD', '')
            item.camount = item.available
            item.estValue = this.getEstValue(item)
            console.log({ item })
            return item
          })
        }
      })
    },
    getContractBalanceByPair() {
      // service.getContractBalanceByPair({
      //   symbol: this.currency
      // }).then(res => {
      //   this.accountInfo = res.data
      //   this.state.ct.holding = res.data
      //   // this.tableData = res.data
      // })
      // service.getContractBalanceList()
      //   .then(res => {
      //     this.state.ct.holdingList= res.data
      //   })
    }
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
</style>
