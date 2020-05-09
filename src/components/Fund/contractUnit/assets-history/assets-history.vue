<template>
  <div class="contract-history-container my-fund-content pt-40 f14">
    <div class="filter-list mb-39">
      <!-- 账户 -->
      <!-- <div class="currency-row mr-40">
        <div class="c-999 mr-13">
          {{ $t('account') }}
        </div>
        <el-select
          class="opetion"
          v-model="selectCoin"
          value-key="name">
          <el-option
            v-for="(item, idx) in accountList"
            :key="idx"
            :label="item.name"
            :value="item.key"/>
        </el-select>
      </div> -->
      <!-- 类型 -->
      <!-- <div class="currency-row mr-40">
        <div class="c-999 mr-13">
          {{ $t('order_th_type') }}
        </div>
        <el-select
          class="opetion"
          v-model="selectCoin"
          value-key="currency">
          <el-option
            v-for="(item, idx) in allCoins"
            :key="idx"
            :label="item.currency"
            :value="item"/>
        </el-select>
      </div> -->
      <!-- <div class="currency-row">
        <el-date-picker
          v-model="timeRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"/>
      </div> -->
    </div>
    <div class="table-wrapper">
      <table>
        <tr class="table__tr header c-999">
          <th class="table__th">
            {{ $t('contract_assign_time') }}
          </th>
          <th class="table__th">
            {{ $t('currency') }}
          </th>
          <th class="table__th">
            {{ $t('operation') }}
          </th>
          <!-- 数额 -->
          <th class="table__th">
            {{ $t('contract_amount_value') }}
          </th>
          <!-- 余额 -->
          <th class="table__th pr-10">
            {{ $t('balance') }}
          </th>
          <!-- 状态 -->
          <th class="table__th">
            {{ $t('status') }}
          </th>
        </tr>
        <tr
          class="table__tr body c-666"
          v-for="(item,index) in tableData"
          :key="index">
          <td class="table__td">{{ item.create_time }}</td>
          <td class="table__td">{{ item.currency }}</td> 
          <td class="table__td"> {{ $t(`fund.opetate.${item.opetate}`)  }} </td>
          <td class="table__td">{{ item.amount | fixed(valueScale) }}</td>
          <td class="table__td pr-10">{{ item.available | fixed(valueScale) }}</td>
          <td class="table__td">{{ processStatus(item.status) }}</td>
        </tr>
      </table>
    </div>
    <div class="history__footer pt-10">
      <ix-pagination
        :page.sync="page"
        :is-end="isLastPage"
        :func="getFundHistory"/>
    </div>

  </div>
</template>
<script>
import service from '@/modules/service'
import ixPagination from '@/components/common/ix-pagination'
import processValue from '@/mixins/process-contract-value'

export default {
  components: {ixPagination},
  mixins: [processValue],
  data () {
    return {
      timeRange: '',
      allCoins: [],
      selectCoin: '',
      tabName: 'active',
      tableData: [],
      pages:{
        total: 0,
      },
      accountList: [
        {key: 'bibi', name: this.$t('trading_account')},
        {key: 'contract', name: this.$t('contract_account')},
        {key: 'all', name: this.$t('allin')}
      ],
      page: 1, // page 都是从1 开始的
      size: 10 // 此接口没有分页,先写死200条
    }
  },
  computed: {
    showHistory () {
      return this.tabName === 'executed'
    },
    isLastPage () {
      console.log(this.pages.total,this.size,this.page,this.pages.total/this.size,this.pages.total/this.size > this.page,this.pages.total/this.size)
      // console.log(this.totalItems < (this.pages.total / this.size ),(this.pages.total / this.size)
      return this.pages.total/this.size < this.page
    },
    valueScale (val) {
      // return val || 4
    },
  },
  methods: {
    getFundHistory () {
      const params = {
        page: this.page,
        size: this.size
      }
      service.getUnitFundHistory(params).then(res => {
        this.tableData = res.data.data
        this.tableData.forEach((item) => {
          if (item.to_balance === 3) {
            this.$set(item, 'name', this.$t('transfer_in'))
          }
          if (item.from_balance === 3) {
            this.$set(item, 'name', this.$t('transfer_out'))
          }
          if (item.opetate === 3) {
            this.$set(item, 'name', this.$t('day_liquidation'))
          }
          if (item.opetate === 7) {
            this.$set(item, 'name', this.$t('cash.th'))
          }
        })
        console.log(this.tableData)
        this.pages = res.data
      })
    },
    processStatus (value) {
      switch (value) {
        case 1:
          return this.$t('contract_simple_success')
        default:
          return this.$t('contract_simple_fail')
      }
    },
    processOperate (op) {
      switch (op) {
        case 1:
          return this.$t('transfer_in')
        default:
          return this.$t('contract_operate_default')
      }
    }
  },
  created () {
    this.getFundHistory()
  }
}
</script>
<style lang="scss" scoped>
    .table-wrapper {
        height: 502px;
        overflow: auto;
        table {
            width: 100%;
        }
    }
    .history__footer {
        width: 100%;
        border-top: 1px solid #CCCCCC;
        display: flex;
        justify-content: flex-end;
        .pa-btn {
            &:hover {
                color: $primary;
            }
        }
    }
    .filter-list {
        display: flex;
    }
    .currency-row {
        display: flex;
        height: 40px;
        align-items: center;
        .opetion {
            width:160px;
            // height:32px;
            border-radius:6px;
        }
    }
</style>
<style lang="scss">
.el-date-table td.end-date span, .el-date-table td.start-date span {
        background: #C9A96C !important;
    }
    .el-date-table td.in-range div, .el-date-table td.in-range div:hover, .el-date-table.is-week-mode .el-date-table__row.current div, .el-date-table.is-week-mode .el-date-table__row:hover div {
        background: rgba(201,169,108,0.2) !important;
    }
    .el-date-table td.today span,
    .el-picker-panel__icon-btn:hover,
    .el-date-table td.available:hover {
        color: #C9A96C !important;
    }
    .el-range-editor.is-active, .el-range-editor.is-active:hover {
        border-color: #C9A96C !important;
    }
</style>


