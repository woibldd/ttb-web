<template>
  <div class="fund-container fund-history-container">
    <div class="my-fund-content">
      <div class="fund-total">
        <div class="left">
          <div class="total__label">{{ $t('账户可用余额') }}</div>
          <div class="total__coin">{{ $t('账户可用余额') }} <span class="coin-rmb">≈ ￥3.00</span></div>
        </div>
        <el-radio-group
          @change="changeType"
          class="total__switch"
          v-model="type">
          <!-- <el-radio-button label="all">{{ $t('近期交易') }}</el-radio-button> -->
          <el-radio-button label="deposit">{{ $t('deposit') }}</el-radio-button>
          <el-radio-button label="withdraw">{{ $t('withdraw') }}</el-radio-button>
          <!-- <el-radio-button label="reward"> {{ $t('奖励分配') }} </el-radio-button> -->
        </el-radio-group>
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
        <el-table-column
          header-align='right'
          align="right"
          width="200px"
          :label="operate.title">
          <!-- <span>解锁/锁仓</span> -->
          <template slot-scope="scope">
            <span
              class="show-address"
              @click="showCXID(scope.row)">查看地址</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import service from '@/modules/service'
import utils from '@/modules/utils'
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
      operate: {key: 'txid', title: '操作'},
      tableData: [],
      from: 'all',
      type: ''
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
    showCXID (row) {
      const url = utils.getBlockChainUrl(row.txid, row.currency)
      window.open(url)
    },
    changeType (type) {
      this.getFundHistory(type)
    },
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
      if (!request) { return }
      const param = {
        page: 1,
        size: 10
      }
      request(param).then(res => {
        this.tableData = res.data
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
        justify-content: space-between;

        .left {
            display: flex;
        }
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
    .total__switch {
       .el-radio-button__orig-radio,
       .el-radio-button__inner {
        background-color: white;
        display: inline-block;
        width: 80px;
        color: $text-weak;
        border: 1px solid $text-weak;
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        text-align: center;
        border-radius: 15px;
        padding: 0;
        box-shadow: none;
        margin-left: 10px;
       }

        .el-radio-button{
            box-shadow: none !important;
        }
        .el-radio-button.is-active {
            .el-radio-button__inner {
                color: $primary !important;
                border: 1px solid $primary !important;
            }
        }
    }

}
</style>
