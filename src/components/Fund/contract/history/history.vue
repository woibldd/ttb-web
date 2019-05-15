<template>
  <div class="contract-history-container my-fund-content pt-40 f14">
    <div class="filter-list mb-39">
      <!-- <div
        class="filter-item c-primary"
        :class="[tabName==='active' && 'select']"
        @click="filter('active')">
        {{ $t('order_active') }}
      </div> -->
      <div
        class="filter-item c-primary"
        :class="[tabName==='history' && 'select']"
        @click="filter('history')">
        {{ $t('contract_trade_his') }}
      </div>
      <div
        class="filter-item c-primary"
        :class="[tabName==='executed' && 'select']"
        @click="filter('executed')">
        {{ $t('order_history') }}
      </div>
      <!-- <div class="currency-row">
        <div class="c-999 mr-13">
          {{ $t('pair') }}
        </div>
        <el-select
          class="opetion"
          v-model="selectPair"
          value-key="currency">
          <el-option
            v-for="(item, idx) in pairList"
            :key="idx"
            :label="item.name | pairfix"
            :value="item"/>
        </el-select>
      </div> -->
    </div>
    <div
      class="table-wrapper"
      v-loading="isLoading">
      <table
        v-if="!isLoading && tabName==='history'">
        <tr class="table__tr header c-999">
          <!-- 成交时间 -->
          <th class="table__th">
            {{ $t('contract_deal_time') }}
          </th>
          <!-- 合约 -->
          <th class="table__th">
            {{ $t('contract_name') }}
          </th>
          <!-- 成交类型 -->
          <th class="table__th">
            {{ $t('contract_deal_type') }}
          </th>
          <!-- 方向 -->
          <th class="table__th">
            {{ $t('deal_th_side') }}
          </th>
          <!-- 成交数量 -->
          <th class="table__th">
            {{ $t('deal_amount') }}
          </th>
          <!-- 成交价格 -->
          <th class="table__th">
            {{ $t('contract_deal_price') }}
          </th>
          <!-- 价值 -->
          <th class="table__th">
            {{ $t('contract_value') }}
          </th>
          <!-- 资金费率 -->
          <th class="table__th">
            {{ $t('fee_rate') }}
          </th>
          <!-- 已付费用 -->
          <th class="table__th">
            {{ $t('contract_has_paid') }}
          </th>
          <!-- 委托类型 -->
          <th class="table__th">
            {{ $t('contract_action_delegate_type') }}
          </th>
          <!-- 委托数量 -->
          <th class="table__th">
            {{ $t('entrust_amount') }}
          </th>
          <!-- 未成交数量 -->
          <th class="table__th">
            {{ $t('contract_undeal_amount') }}
          </th>
          <!-- 委托价格 -->
          <th class="table__th">
            {{ $t('contract_assign_price') }}
          </th>
          <th class="table__th">
            <!-- 已实现盈亏 -->
            {{ $t('contract_result_yet')}}
          </th>
          <!-- 委托ID -->
          <th class="table__th">
            {{ $t('contract_assign_id') }}
          </th>
        </tr>
        <tr
          class="table__tr body c-666"
          v-for="(item,index) in tableData"
          :key="index">
          <td class="table__td">{{ processValue('create_time_stamp',item) }}</td>
          <td
            class="table__td">{{ $t('contract_' + item.symbol) }}</td>
          <td class="table__td">{{ processValue('origin', item) }}</td> <!--成交类型-->
          <td class="table__td"> <span v-html="processValue('side', item)"/></td>
          <td class="table__td">{{ (item.amount || 0)  }}</td>

          <td class="table__td">{{ (item.price || 0) | fixed(2)}}</td>
          <td class="table__td">{{ (item.total || 0) | fixed(valueScale) }}</td>
          <td class="table__td">{{ processValue('fee_rate', item) }} </td>

          <td class="table__td">{{ (item.fee || 0) | fixed(8) }}</td>

          <td class="table__td">{{ processValue('type',item) }}</td>
          <td class="table__td">{{ item.amount_total }}</td>
          <td class="table__td">{{ unclosedQty(item) }}</td>
          <td class="table__td">{{  $big((item.price || 0)).toFixed(1) }}</td>
          <td class="table__td">{{ (item.realized || 0) | fixed(4)}}</td>
          <td class="table__td">{{ processValue('symbol_id', item) }}</td>
        </tr>
      </table>
      <!-- 委托历史 -->
      <table
        v-if=" !isLoading && tabName==='executed'">
        <tr class="table__tr header c-999">
          <!-- 委托时间 -->
          <th class="table__th">
            {{ $t('contract_assign_time') }}
          </th>
          <!-- 合约 -->
          <th class="table__th">
            {{ $t('contract_name') }}
          </th>
          <!-- 方向 -->
          <th class="table__th">
            {{ $t('deal_th_side') }}
          </th>
          <!-- 委托数量 -->
          <th class="table__th">
            {{ $t('entrust_amount') }}
          </th>
          <!-- 委托价格 -->
          <th class="table__th">
            {{ $t('contract_assign_price') }}
          </th>
          <!-- 完全成交 -->
          <th class="table__th">
            {{ $t('contract_all_dealed') }}
          </th>
          <!-- 剩余 -->
          <th class="table__th">
            {{ $t('order_th_unclose') }}
          </th>
          <!-- 成交价格 -->
          <th class="table__th">
            {{ $t('contract_deal_price') }}
          </th>
          <!-- 委托价值 -->
          <th class="table__th">
            {{ $t('contract_assign_value_raw')  }}
          </th>
          <!-- 类型 -->
          <th class="table__th">
            {{ $t('order_th_type') }}
          </th>
          <!-- 状态 -->
          <!-- <th class="table__th">
            {{ $t('status') }}
          </th> -->
          <!-- 委托ID -->
          <!-- <th class="table__th">
            {{ $t('contract_assign_id') }}
          </th> -->
        </tr>
        <tr
          class="table__tr body c-666"
          v-for="(item,index) in tableData"
          :key="index">
          <td class="table__td">{{ processValue('create_time',item) }}</td>
          <td class="table__td">{{ $t('contract_' + item.symbol) }}</td>
          <td class="table__td"><span v-html="processValue('side', item)"/></td>
          <td class="table__td">{{ item.amount }}</td>
          <td class="table__td">{{ $big(item.price || 0) | fixed(valueScale)}}</td>
          <td class="table__td">{{ item.executed }}</td>
          <td class="table__td">{{ surplus(item) }}</td><!-- 剩余 -->
          <td class="table__td">{{  $big(item.price || 0) | fixed(valueScale) }}</td>
          <td class="table__td">{{  $big(assignValue(item) || 0) | fixed(valueScale) }}</td> <!-- 委托价值 -->
          <td class="table__td">{{ processValue('type', item) }}</td>
          <!-- <td class="table__td">{{ processValue('state',item) }}</td>
          <td class="table__td">{{ item.id }}</td> -->
        </tr>
      </table>
    </div>

    <div
      class="history__footer pt-10"
      v-if="!isLoading">
      <ix-pagination
        :page.sync="page"
        :is-end="isLastPage"
        :func="getData"/>
    </div>
  </div>
</template>
<script>
import service from '@/modules/service'
import {state} from '@/modules/store'
import ixPagination from '@/components/common/ix-pagination'
import { pairfix } from '@/mixins/index'
import processValue from '@/mixins/process-contract-value'

export default {
  components: {ixPagination},
  mixins: [pairfix, processValue],
  data () {
    return {
      pairList: [],
      selectPair: '',
      tabName: 'history',
      tableData: [],
      page: 1, // page 都是从1 开始的,
      size: 10,
      isLoading: true,
      totalItems: 0,
      state
    }
  },
  computed: {
    isLastPage () {
      // console.log(this.totalItems, this.size * this.page)
      return (this.totalItems < this.size * this.page)
    },
    valueScale () {
      return 4
    },
  },
  filters:{
    smailNumber(val){  //小数点
      console.log(val)
    }
  },
  methods: {
    // 计算剩余
    surplus (item) {
      return this.$big(item.amount).minus(item.executed).toFixed(0)
    },
    unclosedQty(item){
      if (item.type == 3){
        return item.amount_total
      } else {
        return item.amount_total - item.amount_last
      }
    },
    // 委托价值, 数量/价格
    assignValue (item) {
      // return this.$big(item.amount).div(item.price).toFixed(4)
      return item.total;
    },
    async getPairs () {
      let res = await service.getPairList()
      if (!res.code) {
        this.pairList = res.data.items
        this.selectPair = this.pairList[0]
      }
    },
    getData () {
      const params = {
        symbol: this.selectPair,
        page: this.page,
        size: this.size
      }

      if (this.tabName === 'executed') {
        // 订单历史
        this.getOrderhistory(params)
      } else {
        // 获取交易历史
        this.getContractTradeHistory(params)
      }
    },
    filter (type) {
      this.tabName = type
      this.page = 1
      const params = {
        page: this.page,
        size: this.size
      }
      if (type === 'executed') {
        // 获取委托历史
        this.getOrderhistory(params)
      } else {
        // 获取交易历史,(已成交)
        this.getContractTradeHistory(params)
      }
    },
    resetPage () {
      this.page = 1
    },
    // 订单历史
    getOrderhistory () {
      this.isLoading = true
      const params = {
        page: this.page,
        size: this.size
      }
      service.getOrderhistory(params).then(res => {
        this.tableData = res.data.data
        this.totalItems = res.data.total
        // console.log(this.tableData, 'assign')
      }).finally(res => {
        this.isLoading = false
      })
    },
    // 已成交
    getContractTradeHistory () {
      this.isLoading = true

      const params = {
        page: this.page,
        size: 10
      }
      service.getContractTradeHistory(params).then(res => {
        this.tableData = res.data.data
        this.totalItems = res.data.total
        console.log(this.tableData, 'trace')
      }).finally(res => {
        this.isLoading = false
      })
    }
  },
  created () {
    this.getPairs()
    this.filter('executed')
  }
}
</script>
<style lang="scss">

.contract-history-container {
    .font-color-buy {
        color: #09C989 !important
    }
    .font-color-sell {
        color: #F24E4D !important
    }
}

</style>
<style lang="scss" scoped>
@import './history.scss';
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
</style>
