<template>
  <div class="fund-container fund-history-container">
    <div class="my-fund-content">
      <div class="fund-total">
        <div class="left">
          <div class="total__label">{{ $t('withdraw_avlb') }}</div>
          <div class="total__coin">{{ total }} {{ unit }} </div>
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
        height="550"
        class="fund-coin-pool">
        <el-table-column
          v-for="(hd, idx) in header"
          :key="idx"
          :formatter="formatter"
          :prop="hd.key"
          :label="hd.title"/>

        <el-table-column
          header-align='right'
          align="right"
          width="200px"
          :label="status.title">
          <!-- <span>解锁/锁仓</span> -->
          <template slot-scope="scope">
            <span :class="['state', scope.row.state === 4 && 'complete']">{{ scope.row.state === 1 ? $t('done') : $t('pending') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          header-align='right'
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
      status: {key: 'state', title: this.$i18n.t('state')},
      operate: {key: 'txid', title: this.$i18n.t('actions')},
      tableData: [],
      from: 'all',
      type: 'deposit',
      page: 1,
      total: 0,
      unit: 'CNY',
      state
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
          res = this.$t('asset')
          break
      }
      return res
    }
  },
  async created () {
    this.from = this.$route.params.from
    this.getFundHistory(this.from)
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
    getFundHistory (from = 'deposit') {
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
        page: this.page,
        size: 10
      }
      request(param).then(res => {
        this.tableData = res.data
      })
    },
    getAccountBalanceList () {
      return service.getAccountBalanceList().then(res => {
        let sum = 0
        if (state.locale === 'zh-CN') {
          this.unit = 'CNY'
          res.data.forEach(item => {
            sum += item.available * item.rates.CNY
          })
        } else if (state.locale === 'en') {
          this.unit = 'USD'
          res.data.forEach(item => {
            sum += item.available * item.rates.USD
          })
        }
        this.total = sum
      })
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
