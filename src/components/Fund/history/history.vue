<template>
  <div class="fund-container fund-history-container">
    <div class="my-fund-content">
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
          :label="state.title">
          <!-- <span>解锁/锁仓</span> -->
          <template slot-scope="scope">
            <span :class="['state', scope.row.state === 1 && 'complete']">{{ scope.row.state === 1 ? '已完成' : '未完成' }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script>
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
        {key: 'create_time', title: '时间'},
        {key: 'currency', title: '币种'},
        {key: 'confirm', title: '确认数'},
        {key: 'chain', title: '链名'},
        {key: 'amount', title: '数量'}
      ],
      state: {key: 'state', title: '状态'},
      tableData: [],
      from: 'all'
    }
  },
  computed: {
    title () {
      let res
      switch (this.from) {
        case 'deposit':
          res = this.$t('deposit')
          break
        case 'withdraw':
          res = this.$t('withdraw')
          break
        default:
          res = this.$t('我的资产')
          break
      }
      return res
    }
  },
  async created () {
    this.from = this.$route.params.from
    console.log(this.$route.params.from, 'from')
    this.getFundHistory(this.from)
  },
  methods: {
    getFundHistory (from = 'all') {
      let request = ''
      switch (from) {
        case 'deposit':
          request = service.getDepositHistory
          break
        case 'withdraw':
          request = service.getWithdrawHistory
          break
        default:
          break
      }
      const param = {
        page: 1,
        size: 10
      }
      request(param).then(res => {
        this.tableData = res.data
        console.log(res, 'resshsh')
      })
    }
  }
}
</script>
<style lang="scss">
.fund-history-container {

    .fund-total {
        margin-top: 45px;
        margin-bottom: 58px;
        display: flex;
        align-items: center;
    }
    .total__label {
        margin-right: 50px;
    }
    .total__coin {
        color: $primary;
    }
    .coin-rmb {
        display: inline-block;
        color: $text-weak;
    }
    .my-fund-operate {
        color: $primary;
        cursor: pointer;
        margin-left: 21px;
    }
    .state {
       color:  #EBB166;

       &.complete {
            color: #31C78C;
        }
    }

}
</style>
