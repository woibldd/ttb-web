<template>
  <div class="fund-container my-fund-container">
    <div class="title-box">
      <div> {{ $t('wallets_nav_asset') }} <span class="title__second"> <span class="mt-10 mr-10">></span>{{ $t('capital_record') }}</span></div>
      <router-link
        v-if="!showHistory"
        class="fund-history"
        to="/fund/my/history/withdraw"> {{ $t('capital_record') }}</router-link>
    </div>
    <div
      v-if="!showHistory"
      class="my-fund-content">
      <div class="fund-total">
        <div class="total__label">{{ $t('withdraw_avlb') }}</div>
        <div class="total__coin">{{ total }} {{ unit }} </div>
      </div>
      <el-table
        :data="tableData"
        class="fund-coin-pool">
        <el-table-column
          v-for="(hd, idx) in header"
          :key="idx"
          :prop="hd.key"
          :label="hd.title"/>

        <el-table-column
          header-align='right'
          align="right"
          width="200px"
          :label="operate.title">
          <!-- <span>解锁/锁仓</span> -->
          <template slot-scope="scope">
            <router-link
              :to="'/fund/deposit/' + scope.row.currency"
              class="my-fund-operate">{{ $t('deposit') }}</router-link>
            <router-link
              :to="'/fund/withdraw/'+scope.row.currency"
              class="my-fund-operate">{{ $t('withdraw') }}</router-link>
            <router-link
              to="/trading"
              class="my-fund-operate">{{ $t('asset_trading') }}</router-link>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <router-view/>
  </div>
</template>
<script>
import './my.scss'
import service from '@/modules/service'
import {state, actions} from '@/modules/store'

/**
 *
currency 币名
available 可用量
ordering 委托锁定量
withdrawing 提币锁定量
quota 当前提币剩余额度
max_quota 当前提币总额度
 */
export default {
  name: 'MyFund',
  data () {
    return {
      header: [
        {key: 'currency', title: this.$t('fees_name')},
        {key: 'available', title: this.$t('avlb')},
        {key: 'ordering', title: this.$t('asset_th_unavlb')},
        {key: 'quota', title: this.$t('total_count')},
        {key: 'max_quota', title: this.$t('homechart_fiat')}
      ],
      operate: {key: 'operate', title: 'operation'},
      tableData: []
    }
  },
  computed: {
    showHistory () {
      return this.$route.name === 'history'
    },
    total () {
      let sum = this.$big(0)
      if (state.locale === 'zh-CN') {
        this.tableData.forEach(item => {
          sum = sum.plus(this.$big(item.available).times(this.$big(item.rates.CNY)))
        })
      } else if (state.locale === 'en') {
        this.tableData.forEach(item => {
          sum = sum.plus(this.$big(item.available).times(this.$big(item.rates.USD)))
        })
      }
      return sum.toString()
    },
    unit () {
      return state.locale === 'zh-CN' ? 'CNY' : 'USD'
    }
  },
  async created () {
    this.getAccountBalanceList()
    actions.updateSession()
  },
  methods: {
    getAccountBalanceList () {
      return service.getAccountBalanceList().then(res => {
        this.tableData = res.data || []
      })
    }
  }
}
</script>
