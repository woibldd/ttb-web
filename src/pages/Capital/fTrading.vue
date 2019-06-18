<!--<template>-->
<!--<div class="fund-container my-fund-container">-->
<!--<div class="title-box">-->
<!--<div>{{ $t('trading') }}</div>-->
<!--</div>-->
<!--<div class="gz-wrapper clearfix">-->
<!--<span>法币资产估值</span>-->
<!--<h1>¥ 0.00000000</h1>-->
<!--</div>-->
<!--</div>-->
<!--</template>-->

<!--<script type="text/ecmascript-6">-->
<!--export default {}-->
<!--</script>-->

<!--<style lang="scss" rel="stylesheet/scss" scoped>-->

<!--</style>-->
<template>
  <div class="fund-container my-fund-container">
    <div class="title-box">
      <div>{{ $t('trading') }}</div>
      <div class="title__right">
        <!-- <router-link
          :to="{name: 'LockWarehouse'}"
          class="c-mine mr-30 dib pointer"><icon
          name="anchor"/>{{ $t('mining') }}</router-link> -->
        <!--<span-->
          <!--@click="showLockModal = true"-->
          <!--class="c-mine pointer mr-30 dib">-->
          <!--{{ $t('locked') }}-->
        <!--</span>-->
        <!--<span-->
          <!--@click="showUnlockModal = true"-->
          <!--class="c-mine pointer mr-30 dib">-->
          <!--{{ $t('unlock') }}-->
        <!--</span>-->
        <!--<router-link-->
          <!--v-if="!showHistory"-->
          <!--class="fund-history"-->
          <!--:to="{name:'assetsHistory', params: {from: 'deposit'}}"> {{ $t('capital_record') }}</router-link>-->
      </div>
    </div>
    <div class="gz-wrapper clearfix">
      <span>法币资产估值</span>
      <h1>¥ 0.00000000</h1>
    </div>
    <div
      v-if="!showHistory"
      class="my-fund-content">
      <!--<div class="fund-total">-->
        <!--<div class="total__label">{{ $t('my_balance_equal') }}</div>-->
        <!--<div class="total__coin">{{ total || 0 | fixed(valueScale)  }} {{ unit }} </div>-->
        <!--&lt;!&ndash;  百万usdt活动需要,先写死 &ndash;&gt;-->
        <!--<div-->
          <!--class="fund-with-usdt"-->
          <!--v-if="plusMillionUsdt">-->
          <!--+{{ millionUsdtAmount }} USDT≈ {{ $big(total).plus($big(plusUsdtEst)).toString() }}  {{ unit }}-->
        <!--</div>-->
      <!--</div>-->
      <el-table :empty-text=" $t('no_data') "
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
              <i>{{scope.row[hd.key]}} </i>
            </span> 
            <span v-else>{{ scope.row[hd.key] || 0 | fixed(8)}}</span>
          </template>
        </el-table-column>

        <el-table-column
          header-align='right'
          align="right"
          min-width="230px"
          :label="operate.title">
          <template >
            <span 
              @click="showModal = true"
              class="my-fund-operate">{{ $t('account_exchange') }}</span>  
          </template>
        </el-table-column>
      </el-table>
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
  import transferModal from '@/components/Fund/contract/transfer-modal'

  const ExchangePairs = {
    'BTC': 'BTC_USDT',
    'EOS': 'EOS_BTC',
    'ETH': 'ETH_USDT',
    'IX': 'IX_BTC'
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
        }
      }
    },
    components: {
      transferModal
    },
    watch:{
      showModal(val){
        if(!val){
          this.getOtcBalance()
        }
      },
      valueScale() {
        this.getOtcBalance()
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
      unit () {
        return state.locale === 'zh-CN' ? 'CNY' : 'USD'
      },
      valueScale() {
        return state.locale === 'zh-CN' ? 2 : 4
      },
      header () {
        return state.locale && [
          {key: 'currency', title: this.$t('fees_name')},
          {key: 'available', title: this.$t('avlb')}, 
          {key: 'ordering', title: this.$t('asset_th_unavlb')},
          {key: 'estValue', title: this.$t('homechart_fiat') + '(' + (state.locale === 'zh-CN' ? 'CNY' : 'USD') + ')'}, 
        ]
      },
      operate () {
        return state.locale && {key: 'operate', title: this.$t('operation')}
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
      await this.getMine()
      this.getOtcBalance()
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
      getOtcBalance () {
        return service.getOtcBalance().then(res => {
          this.tableData = (res.data || []).map(item => {
            item.rates = item.rates || {}
            item.locking = this.$big(item.locking || 0).plus(this.$big(item.ordering || 0).plus(this.$big(item.withdrawing || 0))).toString()
            item.amount = this.$big(item.locking).plus(this.$big(item.available)).round(8, this.C.ROUND_DOWN).toString()
            // item.estValue = this.getEstValue(item)
            item.available = this.$big(item.available).round(8, this.C.ROUND_DOWN).toString()
            item.pairs = ExchangePairs[item.currency] || 'BTC_USDT'
            return item
          })
        })
      },
      getEstValue (item) {
        let res = this.$big(item.amount).times(this.$big(item.rates[this.unit] || 0))
        let num = 8
        // if (this.unit === 'USD') {
        //   num = 8
        // }
        return res.round(num, this.C.ROUND_DOWN).toString()
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
      }
    },
    watch:{
      valueScale() {
        this.getOtcBalance()
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import './../../components/Fund/My/my.scss';
  .gz-wrapper {
    width: 520px;
    height: 176px;
    background: #F2F5FE;
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
      background: #3E77E6;
      border-radius: 4px;
    }

    span {
      padding: 30px 0;
      font-size: 18px;
      display: block;
      font-weight: 400;
      color: #3E77E6;
    }

    h1 {
      font-size: 30px;
      color: #3E77E6;
    }
  }
</style>
