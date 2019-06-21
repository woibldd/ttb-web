<template>
  <div class="fund-container my-fund-container">
    <div class="title-box">
      <div>{{ $t('wallets_nav_asset') }}
        <span class="ml-30">
          <el-select  
            v-model="unit"
            @change="currencyChange"
            value-key="name">
            <el-option
              v-for="(item, idx) in currencyList"
              :key="idx"
              :label="item.name"
              :value="item"/>
          </el-select> 
        </span> 
      </div>
      <div class="title__right">
        <!-- <router-link
          :to="{name: 'LockWarehouse'}"
          class="c-mine mr-30 dib pointer"><icon
          name="anchor"/>{{ $t('mining') }}</router-link> -->
        <!-- <span
          @click="showLockModal = true"
          class="c-mine pointer mr-30 dib">
          {{ $t('locked') }}
        </span>
        <span
          @click="showUnlockModal = true"
          class="c-mine pointer mr-30 dib">
          {{ $t('unlock') }}
        </span> -->
        <router-link
          v-if="!showHistory"
          class="fund-history"
          :to="{name:'assetsHistory', params: {from: 'deposit'}}"> {{ $t('capital_record') }}</router-link>
      </div>
    </div> 
    <div
      v-if="!showHistory"
      class="my-fund-content">
      <div class="information">
        <icon name='information' />
        <span >
          充币成功后，若想进行”币币交易/法币交易/合约交易，需操作“资金划转”，将“资金账户”的币转移到该账户上。
        </span> 
      </div>
      <div class="fund-total">
        <div class="total__label">{{ $t('my_balance_equal') }}</div>
        <div class="total__coin">{{ total || 0 | fixed(unit.scale)  }} {{ unit.name }} </div>
        <!--  百万usdt活动需要,先写死 -->
        <div
          class="fund-with-usdt"
          v-if="plusMillionUsdt">
          +{{ millionUsdtAmount }} USDT≈ {{ $big(total).plus($big(plusUsdtEst)).toString() }}  {{ unit.name }}
        </div>
      </div>
      <el-table
        :data="tableData"
        class="fund-coin-pool">
        <el-table-column
          v-for="(hd, idx) in header"
          :key="idx"
          :prop="hd.key"
          :label="hd.title">
          <template slot-scope="scope">
            <span v-if="hd.key === 'currency'">
              <icon :name="scope.row.currency"/> 
              <i v-if="scope.row[hd.key] === 'ITD'" 
                class="airdrop" 
                v-tooltip.top-start='{html: true, content: $t("idt_tips"), classes: "assets"}'  > 
                {{scope.row[hd.key]}} <icon class='question' name='question-x' />
              </i>
               <i v-else-if="scope.row[hd.key] === 'BNL'" 
                class="airdrop" 
                v-tooltip.top-start='{html: true, content: $t("bnl_tips"), classes: "assets"}'  > 
                {{scope.row[hd.key]}} <icon class='question' name='question-x' />
              </i>
              <i v-else>{{scope.row[hd.key]}} </i>
            </span>
            <div v-else-if="hd.key === 'locking'">
              {{ scope.row.currency.toUpperCase() === 'USDT' && plusMillionUsdt? $big(scope.row[hd.key]).plus(millionUsdtAmount).toString() : scope.row[hd.key]  | fixed(8) }}
            </div>  
            <span v-else-if="hd.key==='estValue'">{{ scope.row[hd.key] || 0 | fixed(unit.scale)}}</span>
            <span v-else>{{ scope.row[hd.key] || 0 | fixed(8)}}</span>
          </template>
        </el-table-column>

        <el-table-column
          header-align='right'
          align="right"
          min-width="230px"
          :label="operate.title">
          <template slot-scope="scope">
            <span
              v-if="scope.row.currency === 'BTC'"
              @click="showModal = true"
              class="my-fund-operate">划转</span>
            <router-link
              v-if="scope.row.depositable"
              :to="'/fund/deposit/' + scope.row.currency"
              class="my-fund-operate">{{ $t('deposit') }}</router-link>
            <router-link
              v-if="scope.row.withdrawable"
              :to="'/fund/withdraw/'+scope.row.currency"
              class="my-fund-operate">{{ $t('withdraw') }}</router-link>
            <router-link
              v-if="scope.row.pairs"
              :to="{
                name: 'trading',
                params: {
                  pair: scope.row.pairs
                }
              }"
              class="my-fund-operate">{{ $t('asset_trading') }}</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div> 
    <v-modal :open.sync="showLockModal">
      <div class="lock-modal">
        <div class="modal__title mb-30">
          {{ $t('locked') }}
        </div>
        <div class="modal__content">
          <div class="modal__row mb-20">
            <div class="row__label">{{ $t('available_balance') }}</div>
            <div class="row__input" >{{ balance.available | round(4) }} IX </div>
          </div>
          <div class="modal__row mb-24">
            <div class="row__label">{{ $t('lock_amount') }}</div>
            <div class="row__input c-999" >
              <input
                type="number"
                min="20000"
                :max="maxLock"
                step="20000"
                @input="lockAmountChanged"
                @blur="blur('lock')"
                :placeholder="$t('integer_ultiple')"
                v-model="lock_amount">
            </div>
            <span
              class="maximum"
              @click="setMax('lock')">
              {{ $t('maximum') }}
            </span>
          </div>
          <v-btn
            @click="doLock"
            fontsize="20"
            height="46"
            :disabled="lock_disable"
            :label="$t('locked')"/>
        </div>
      </div>
    </v-modal>
    <v-modal :open.sync="showUnlockModal">
      <div class="lock-modal">
        <div class="modal__title mb-30">
          {{ $t('unlock') }}
          <span
            class="sub c-999">*{{ $t('unlocked') }}</span>
        </div>
        <div class="modal__content">
          <div class="modal__row mb-20">
            <div class="row__label">{{ $t('unlock_available') }}</div>
            <div class="row__input" >{{ balance.locked }} IX </div>
          </div>
          <div class="modal__row mb-24">
            <div class="row__label">{{ $t('unlocked_amount') }}</div>
            <div class="row__input c-999" >
              <input
                type="number"
                min="20000"
                :max="maxUnLock"
                step="20000"
                @blur="blur('unlock')"
                @input="unlockAmountChanged"
                :placeholder="$t('integer_ultiple')"
                v-model="unlock_amount">
            </div>
            <span
              class="maximum"
              @click="setMax('unlock')">
              {{ $t('maximum') }}
            </span>
          </div>
          <div class="unlocking">
            {{ $t('unlocking') }}: {{ balance.unlocking }} IX
          </div>
          <v-btn
            @click="doUnLock"
            fontsize="20"
            height="46"
            :disabled="unlock_disable"
            :label="$t('unlock')"/>
        </div>
      </div>
    </v-modal>
    <router-view/>
    <transfer-modal
      :show-modal.sync="showModal"
      @click="hideModal"/>
  </div>
</template>
<script>
import service from '@/modules/service'
import {state} from '@/modules/store'
import utils from '@/modules/utils'
import transferModal from '../contract/transfer-modal'

const ExchangePairs = {
  'BTC': 'BTC_USDT',
  'EOS': 'EOS_BTC',
  'ETH': 'ETH_USDT', 
  'IXX': 'IX_USDT',
  'IMCC': 'IMCC_USDT'
}

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
const MIN_AMOUNT_UNIT = 20000

export default {
  name: 'MyFund',
  data () {
    return {
      tableData: [],
      plusMillionUsdt: false,
      millionUsdtAmount: 1000000,
      showLockModal: false,
      showUnlockModal: false,
      unlock_loading: false,
      lock_disable: true,
      showModal:false,
      unlock_disable: true,
      unlock_amount: '',
      lock_amount: '',
      // 我的余额
      balance: {
        available: 0,
        unlocking: 0,
        locked: 0
      },
      currencyList: [
        {
          name: "CNY",
          symbol: "￥",
          scale: 2
        },
        {
          name: "USD",
          symbol: "$",
          scale: 4
        },
        {
          name: "BTC",
          symbol: "B",
          scale: 8
        }
      ],
      unit: {},
      rates: {},
    }
  },
  components: {
    transferModal
  },
  watch:{
    showModal(val){
      if(!val){
        this.getAccountBalanceList()
      }
    },
    valueScale() {
      this.getAccountBalanceList()
    }
  },
  computed: {
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
    valueScale() { 
      return state.locale === 'zh-CN' ? 2 : 4
    },
    header () {
      return state.locale && [
        {key: 'currency', title: this.$t('fees_name')},
        {key: 'available', title: this.$t('avlb')},
        {key: 'locking', title: this.$t('asset_th_unavlb')},
        {key: 'amount', title: this.$t('total_count')},
         {
            key: "estValue",
            title:
              this.$t("homechart_fiat") + this.unit.name
               
          }
      ]
    },
    operate () {
      return state.locale && {key: 'operate', title: this.$t('operation')}
    },
    // 百万usdt活动需要
    plusUsdtEst () {
      let result = 0
      let l = this.tableData.length
      for (let i = 0; i <= l; i++) {
        let item = this.tableData[i]
        if (item && item.currency.toUpperCase() === 'USDT') {
          result = this.getEstValue({
            amount: this.millionUsdtAmount,
            rates: item.rates
          })
          break
        }
      }
      return result
    },
    // ix锁仓/解锁
    maxLock () {
      if (this.balance.available) {
        return this.$big(this.balance.available).div(MIN_AMOUNT_UNIT).round(0, this.C.ROUND_DOWN).times(MIN_AMOUNT_UNIT).toString()
      }
      return 0
    },
    maxUnLock () {
      if (this.balance.locked) {
        return this.$big(this.balance.locked).div(MIN_AMOUNT_UNIT).round(0, this.C.ROUND_DOWN).times(MIN_AMOUNT_UNIT).toString()
      }
      return 0
    },
    myRemainTotal () {
      return (this.myPower.power || 0) - (this.myPower.amount || 0)
    }
  },
  async created () {
    this.unit = this.currencyList[0]
    let res = await service.getAllRate() 
    if (!res.code && !!res.data) {
      this.rates = res.data;
    }
    await this.getMine()
    this.getAccountBalanceList()
    this.getIxBalance()
    this.$nextTick(
      console.log(this.header)
    )
  },
  methods: {
    reset (type) {
      this.blur(type)
      this.unlock_amount = 0
      this.lock_amount = 0
      this.getIxBalance()
    },
    hideModal () {
      this.showModal = false
    },
    blur (type) {
      let amount = 0
      if (type === 'lock') {
        if (this.lock_amount === '') {
          this.lock_disable = true
          return
        }
        amount = this.$big(this.lock_amount)
        if (amount.mod(MIN_AMOUNT_UNIT) !== 0) {
          this.lock_amount = amount.div(MIN_AMOUNT_UNIT).round(0, this.C.ROUND_DOWN).times(MIN_AMOUNT_UNIT).toString()
          if (!parseInt(this.lock_amount)) {
            this.lock_disable = true
          }
        }
      } else {
        if (this.unlock_amount === '') {
          this.unlock_disable = true
          return
        }
        amount = this.$big(this.unlock_amount)
        if (amount.mod(MIN_AMOUNT_UNIT) !== 0) {
          this.unlock_amount = amount.div(MIN_AMOUNT_UNIT).round(0, this.C.ROUND_DOWN).times(MIN_AMOUNT_UNIT).toString()
          if (!parseInt(this.unlock_amount)) {
            this.unlock_disable = true
          }
        }
      }
    },
    async doLock () {
      let amount = this.lock_amount
      this.lock_loading = true
      let res = await service.balanceLock({
        amount
      })
      this.lock_loading = false
      if (!res.code) {
        // todo
        this.lock_amount = ''
        utils.success(this.$t('lock_success') + amount + ' IX')
        this.reset('lock')
        this.showLockModal = false
      } else {
        utils.alert(res.message)
      }
    },
    unlockAmountChanged () {
      if (parseInt(this.unlock_amount)) {
        if (this.$big(this.unlock_amount).gt(this.maxUnLock)) {
          this.unlock_amount = this.maxUnLock
        }
        if (!this.unlock_amount) {
          this.unlock_disable = true
        } else {
          this.unlock_disable = false
        }
      } else {
        this.unlock_disable = true
      }
    },
    lockAmountChanged () {
      if (parseInt(this.lock_amount)) {
        if (this.$big(this.lock_amount).gt(this.maxLock)) {
          this.lock_amount = this.maxLock
        }
        if (!this.lock_amount) {
          this.lock_disable = true
        } else {
          this.lock_disable = false
        }
      } else {
        this.lock_disable = true
      }
    },
    setMax (type) {
      if (type === 'lock') {
        this.lock_amount = this.maxLock
        this.lockAmountChanged()
        this.blur(type)
      } else {
        this.unlock_amount = this.maxUnLock
        this.unlockAmountChanged()
        this.blur(type)
      }
    },
    async doUnLock () {
      let amount = this.unlock_amount
      this.unlock_loading = true
      let res = await service.balanceUnLock({
        amount
      })
      this.unlock_loading = false
      if (!res.code) {
        // todo
        this.unlock_amount = ''
        utils.success(this.$t('unlock_success') + amount + ' IX')
        this.reset('lock')
        this.showUnlockModal = false
      } else {
        utils.alert(res.message)
      }
    },
    getAccountBalanceList () {
      return service.getAccountWalletList().then(res => {
        this.tableData = (res.data || []).map(item => {
          item.rates = item.rates || {}
          item.locking = this.$big(item.locking || 0).plus(this.$big(item.ordering || 0).plus(this.$big(item.withdrawing || 0))).toString()
          item.amount = this.$big(item.locking).plus(this.$big(item.available)).round(8, this.C.ROUND_DOWN).toString()
          item.estValue = this.getEstValue(item)
          item.available = this.$big(item.available).round(8, this.C.ROUND_DOWN).toString()
          item.pairs = ExchangePairs[item.currency] || 'BTC_USDT'
          return item
        })
      })
    },
    getEstValue (item) {
      let res = this.$big(0)
      let unit = this.unit.name
      let {currency,amount} = item 
      if (unit === 'BTC'){
        if(currency === 'BTC') {
          res = this.$big(amount) 
        }
        else {
          if (this.$big(amount).gt(0)) {
            res = this.$big(amount).times(this.rates[currency]['USD'] || 0).div(this.rates['BTC']['USD'])
          }
        }
      }
      else if (item.rates) {
        res = this.$big(amount).times(this.$big(item.rates[unit] || 0))
      }
      else {
        if (this.rates[currency]) {
          res = this.$big(amount).times(this.$big(this.rates[currency][unit] || 0))
        }
      } 
      return res
    },
    async getMine () {
      let res = await service.getMillionInfoMine()
      if (!res.code && res.data) {
        this.plusMillionUsdt = res.data.state === 1
        this.millionUsdtAmount = this.$big(this.millionUsdtAmount).minus(res.data.reward || 0).round(1).toString()
      } else {
      }
    },
    async getIxBalance () {
      const res = await service.getIxBalance()
      if (!res.code && res.data) {
        this.balance = res.data
      }
    },
    currencyChange(e) { 
      this.getAccountBalanceList()
    },
  }, 
  watch:{ 
    valueScale() {
      this.getAccountBalanceList()
    }
  },
}
</script>
<style lang="scss">
@import '~@/styles/tooltip.scss'; 
</style>
<style lang="scss" scoped>
@import './my.scss';
 
</style>
