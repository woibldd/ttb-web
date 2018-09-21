<template>
  <div class="fund-container fund-history-container">
    <div class="my-fund-content">
      <div class="fund-total">
        <div class="left">
          <div class="total__label">{{ $t('withdraw_avlb') }}</div>
          <div class="total__coin">{{ total | fixed(2) }} {{ unit }} </div>
        </div>
        <el-radio-group
          @change="changeType"
          class="total__switch"
          v-model="type">
          <!-- <el-radio-button label="all">{{ $t('近期交易') }}</el-radio-button> -->
          <el-radio-button label="deposit">{{ $t('deposit_record') }}</el-radio-button>
          <el-radio-button label="withdraw">{{ $t('withdraw_record') }}</el-radio-button>
          <el-radio-button label="reward"> {{ $t('fund_reward') }} </el-radio-button>
        </el-radio-group>
      </div>
      <el-table
        :data="tableData"
        height="550"
        v-loading="loading"
        cell-class-name="unrelease-cell"
        class="fund-coin-pool">
        <el-table-column
          v-for="(hd, idx) in (type==='reward' ? headerReward:header)"
          :key="idx"
          :formatter="formatter"
          :prop="hd.key"
          :label="hd.title"/>

        <el-table-column
          header-align='right'
          v-if="type!=='reward'"
          align="right"
          width="200px"
          :label="status.title">
          <!-- <span>解锁/锁仓</span> -->
          <template slot-scope="scope">
            <span :class="['state', hasComplated(scope.row) && 'complete']">
              {{ hasComplated(scope.row) ? $t('done') : $t('pending') }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          header-align='left'
          v-if="type==='reward'"
          align="left"
          width="200px"
          :label="status.title">
          <!-- <span>解锁/锁仓</span> -->
          <template slot-scope="scope">
            <div :class="['state complete', unReleased(scope.row) && 'un-release']">
              {{ unReleased(scope.row) ? $t('waiting_for_release') : $t('done') }}
              <icon
                name="question"
                v-if="unReleased(scope.row)" />
            </div>
            <span class="popover">
              {{ $t('mine_release_at', {time: formatTime(scope.row.release_time)}) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          header-align='right'
          v-if="type!=='reward'"
          align="right"
          width="200px"
          :label="operate.title">
          <!-- <span>解锁/锁仓</span> -->
          <template slot-scope="scope">
            <div class="contact-item">
              <icon name="fund-history-copy"/>
              <span
                class="show-address"
                @click="showCXID(scope.row)">{{ $t('view_txid') }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="history__footer pt-10">
        <ix-pagination
          :page.sync="page"
          :func="getPage"/>
      </div>
    </div>
  </div>
</template>
<script>
import service from '@/modules/service'
import utils from '@/modules/utils'
import {state} from '@/modules/store'
import ixPagination from '@/components/common/ix-pagination'
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
  components: {ixPagination},
  data () {
    return {
      header: [
        {key: 'create_time', title: this.$i18n.t('time')},
        {key: 'currency', title: this.$i18n.t('currency')},
        {key: 'confirm', title: this.$i18n.t('confirm')},
        {key: 'chain', title: this.$i18n.t('chain')},
        {key: 'amount', title: this.$i18n.t('amount')} // -fee
      ],
      headerReward: [
        {key: 'create_time', title: this.$i18n.t('time')},
        {key: 'currency', title: this.$i18n.t('currency')},
        {key: 'name', title: this.$i18n.t('order_th_type')},
        {key: 'amount', title: this.$i18n.t('amount')} // -fee
      ],
      status: {key: 'state', title: this.$i18n.t('state')},
      operate: {key: 'txid', title: this.$i18n.t('actions')},
      tableData: [],
      total: 0,
      from: 'all',
      type: this.$route.params.from || 'deposit',
      page: 1,
      unit: 'CNY',
      loading: true,
      state
    }
  },
  async created () {
    this.getFundHistory(this.type)
    this.getAccountBalanceList()
  },
  methods: {
    formatter (row, column) {
      if (column.property === 'create_time') {
        return utils.dateFormatter(row.create_time)
      } else {
        return row[column.property]
      }
    },
    showCXID (row) {
      const url = utils.getBlockChainUrl(row.txid, 'tx', row.chain)
      window.open(url)
    },
    changeType (type) {
      this.getFundHistory(type)
    },
    getPage () {
      this.getFundHistory(this.type)
    },
    formatTime (time) {
      return utils.dateFormatter(time, 'Y-M-D')
    },
    hasComplated (row) {
      if (this.type === 'deposit' && row.state === 1) {
        return true
      }

      if (this.type === 'withdraw' && row.state === 4) {
        return true
      }

      return false
    },
    unReleased (row) {
      return this.type === 'reward' && row.state === 0// 0 待发放, 1 已完成
    },
    getFundHistory (from = 'deposit') {
      this.loading = true
      let request = ''
      switch (from) {
        case 'deposit':
          request = service.getDepositHistory
          break
        case 'withdraw':
          request = service.getWithdrawHistory
          break
        case 'reward':
          request = service.getRewardHistory
          break
        default:
          break
      }

      if (!request) { return }
      const param = {
        page: this.page,
        size: 10
      }
      this.tableData = []
      request(param).then(res => {
        if (res.data.length === 0) {
          this.loading = false
        } else {
          this.tableData = res.data
          this.loading = false
        }
      })
    },
    getAccountBalanceList () {
      return service.getAccountBalanceList().then(res => {
        this.total = 0
        if (!res.code && res.data) {
          res.data.map(item => {
            item.locking = this.$big(item.ordering || 0).plus(this.$big(item.withdrawing || 0)).toString()
            item.amount = this.$big(item.locking).plus(this.$big(item.available)).round(8, this.C.ROUND_DOWN).toString()
            item.estValue = this.getEstValue(item)
            this.total = this.$big(this.total).plus(item.estValue)
            return item
          })
        }
      })
    },
    getEstValue (item) {
      let res = this.$big(item.amount).times(this.$big(item.rates[this.unit]))
      let num = 4
      if (this.unit === 'USD') {
        num = 8
      }
      return res.round(num, this.C.ROUND_DOWN).toString()
    }
  },
  watch: {
    'state.locale' (v) {
      this.getAccountBalanceList()
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

      &.un-release {
        color: #9FA9B7;
      }
    }
    .unrelease-cell .cell{

        overflow: visible !important;
        position: relative !important;
        cursor: default;

        &:hover {
          .popover{
            display: inline-block;
          }
        }

        .popover {
          z-index: 11;
          line-height: 1.2;
          position: absolute;
          padding: 6px 10px;
          box-sizing: border-box;
          display: none;
          font-size: 14px;
          font-weight: 400;
          width: 130px;
          background:rgba(159,169,183,1);
          border-radius:4px;
          color: white;
          left: 50px;
          top: 30px;
          word-break: initial;
        }
    }
    .show-address {
        cursor: pointer;
    }
    .total__switch {
       .el-radio-button__orig-radio,
       .el-radio-button__inner {
        background-color: white !important;
        display: inline-block;
        width: 80px;
        color: $text-weak !important;
        border: 1px solid $text-weak !important;
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        text-align: center;
        border-radius: 15px !important;
        padding: 0;
        box-shadow: none !important;
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
    .history__footer {
        display: flex;
        justify-content: flex-end;
    }
    .contact-item{
      height: 20px;
      color: #999999 !important;
      &:hover {
         color: #C1A538 !important;
      }
    }

}
</style>
