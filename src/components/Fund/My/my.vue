<template>
  <div class="fund-container my-fund-container">
    <div class="title-box">

      <div>{{ $t('wallets_nav_asset') }}</div>
      <router-link
        v-if="!showHistory"
        class="fund-history"
        to="/fund/my/history/deposit"> {{ $t('capital_record') }}</router-link>
    </div>
    <div
      v-if="!showHistory"
      class="my-fund-content">
      <div class="fund-total">
        <div class="total__label">{{ $t('my_balance_equal') }}</div>
        <div class="total__coin">{{ total }} {{ unit }} </div>
        <div
          is="ActivityPeace"
          @afterExchange="getAccountBalanceList"/>
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
            <span v-if="hd.key === 'currency'"><icon :name="scope.row.currency"/></span>
            <span>{{ scope.row[hd.key] }}</span>
          </template>
        </el-table-column>

        <el-table-column
          header-align='right'
          align="right"
          width="200px"
          :label="operate.title">
          <!-- <span>解锁/锁仓</span> -->
          <template slot-scope="scope">
            <router-link
              v-if="scope.row.depositable"
              :to="'/fund/deposit/' + scope.row.currency"
              class="my-fund-operate">{{ $t('deposit') }}</router-link>
            <router-link
              v-if="scope.row.withdrawable"
              :to="'/fund/withdraw/'+scope.row.currency"
              class="my-fund-operate">{{ $t('withdraw') }}</router-link>
            <router-link
              v-if="scope.row.currency === 'IX'"
              :to="{name: 'LockWarehouse'}"
              style="color: #fda22d"
              class="my-fund-operate"><icon
              name="anchor"/>{{ $t('mining') }}</router-link>
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
    <router-view/>
  </div>
</template>
<script>
import service from '@/modules/service'
import {state, actions} from '@/modules/store'
import ActivityPeace from './activity-peace'

const ExchangePairs = {
  'BTC': 'BTC_USDT',
  'ETH': 'ETH_USDT',
  'IX': 'IX_USDT'
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
export default {
  name: 'MyFund',
  data () {
    return {
      tableData: []
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
    }
  },
  async created () {
    this.getAccountBalanceList()
  },
  methods: {
    getAccountBalanceList () {
      return service.getAccountBalanceList().then(res => {
        this.tableData = (res.data || []).map(item => {
          item.rates = item.rates || {}
          item.locking = this.$big(item.locking || 0).plus(this.$big(item.ordering || 0).plus(this.$big(item.withdrawing || 0))).toString()
          item.amount = this.$big(item.locking).plus(this.$big(item.available)).round(4, this.C.ROUND_DOWN).toString()
          item.estValue = this.getEstValue(item)
          item.available = this.$big(item.available).round(4, this.C.ROUND_DOWN).toString()
          item.pairs = ExchangePairs[item.currency] || 'BTC_USDT'
          return item
        })
      })
    },
    getEstValue (item) {
      let res = this.$big(item.amount).times(this.$big(item.rates[this.unit] || 0))
      let num = 4
      if (this.unit === 'USD') {
        num = 8
      }
      return res.round(num, this.C.ROUND_DOWN).toString()
    }
  },
  components: {
    ActivityPeace
  }
}
</script>
<style lang="scss">
@import './my.scss';
@import '~@/styles/tooltip';
</style>
