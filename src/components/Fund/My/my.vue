<template>
  <div class="fund-container my-fund-container">
    <div class="title-box">
      <div> {{ $t('我的资产') }} <span class="title__second"> <span class="mt-10 mr-10">></span>{{ $t('资金记录') }}</span></div>
      <router-link
        v-if="!showHistory"
        class="fund-history"
        to="/fund/my/history/withdraw"> {{ $t('资金记录') }}</router-link>
    </div>
    <div
      v-if="!showHistory"
      class="my-fund-content">
      <div class="fund-total">
        <div class="total__label">{{ $t('账户可用余额') }}</div>
        <div class="total__coin">{{ $t('账户可用余额') }} <span class="coin-rmb">≈ ￥3.00</span></div>
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
// import utils from '@/modules/utils'
import service from '@/modules/service'

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
        {key: 'currency', title: '币种'},
        {key: 'available', title: '可用'},
        {key: 'ordering', title: '冻结'},
        {key: 'quota', title: '总计'},
        {key: 'max_quota', title: '估值'}
      ],
      operate: {key: 'operate', title: '操作'},
      tableData: []
    }
  },
  computed: {
    showHistory () {
      return this.$route.name === 'history'
    }
  },
  async created () {
    this.getAccountBalanceList()
  },
  methods: {
    click (r) {
      console.log(r, '000')
    },
    getAccountBalanceList () {
      return service.getAccountBalanceList().then(res => {
        this.tableData = res.data || []
        console.log(res, 'pppp')
      })
    }
  }
}
</script>
