<template>
  <div class="contract-history-container my-fund-content pt-40 f14">
    <div class="filter-list mb-39"> 
      <div
        class="filter-item c-primary"
        :class="[tabName==='history' && 'select']"
        @click="handleTabChange('history')">
        {{ $t('contract_trade_his') }}
      </div>
      <div
        class="filter-item c-primary"
        :class="[tabName==='executed' && 'select']"
        @click="handleTabChange('executed')"> 
        {{ $t('order_history') }}
      </div> 
    </div>
    <div>
      <el-row :gutter="20"> 
        <el-col :span="4">
          <el-select
            id="contractType"
            class="opetion"
            v-model="myfilter.symbol"
            @change="pairChange"
            :placeholder="$t('please_choose')"
            size="mini"
            value-key="currency">
            <el-option :label="langDict.currency[0]" value="" />
            <el-option
              v-for="(item, idx) in pairList"
              :key="idx"
              :label="item.name"
              :value="item.name"/>
          </el-select>
        </el-col> 
        <el-col :span="4"> 
          <el-select
            class="opetion"
            v-model="myfilter.side" 
            size="mini"
            @change="pairChange">  
            <el-option v-for="(item, key) in langDict.side"
              :key="key"
              :label="item" 
              :value="key"/>
          </el-select>
        </el-col> 
        <el-col :span="4"> 
          <el-select
            v-if="tabName === 'executed'"
            class="opetion"
            v-model="myfilter.state"  
            @change="pairChange"
            size="mini"> 
            <el-option v-for="(item, key) in langDict.delegate_state"
              :key="key"
              :label="item" 
              :value="key"/>
          </el-select> 
          <el-select
            v-else
            class="opetion"
            v-model="myfilter.state"  
            @change="pairChange"
            size="mini"> 
            <el-option v-for="(item, key) in langDict.state"
              :key="key"
              :label="item" 
              :value="key"/>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="myfilter.daterange"
            @change="pairChange"
            size="mini"
            type="daterange"
            value-format="timestamp"
            range-separator="-"
            :start-placeholder="$t('el.datepicker.startDate')"
            :end-placeholder="$t('el.datepicker.endDate')">
          </el-date-picker>
        </el-col> 
      </el-row> 
    </div>
    <div
      class="table-wrapper"
      v-loading="isLoading">
      <table
        v-if="!isLoading && tabName==='history'">
        <tr class="table__tr header c-999">
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('contract_deal_time') }}
          </th>
          <!-- ?????? -->
          <th class="table__th">
            {{ $t('contract_name') }}
          </th>
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('contract_deal_type') }}
          </th>
          <!-- ?????? -->
          <th class="table__th">
            {{ $t('deal_th_side') }}
          </th>
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('deal_amount') }}
          </th>
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('contract_deal_price') }}
          </th>
          <!-- ?????? -->
          <th class="table__th">
            {{ $t('contract_value') }}
          </th>
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('fee_rate') }}
          </th>
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('contract_has_paid') }}
          </th>
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('contract_action_delegate_type') }}
          </th>
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('entrust_amount') }}
          </th>
          <!-- ??????????????? -->
          <th class="table__th">
            {{ $t('contract_undeal_amount') }}
          </th>
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('contract_assign_price') }}
          </th>
          <th class="table__th">
            <!-- ??????????????? -->
            {{ $t('contract_result_yet')}}
          </th>
          <!-- ??????ID -->
          <th class="table__th">
            {{ $t('contract_assign_id') }}
          </th>
        </tr>
        <tr
          class="table__tr body c-666"
          v-for="(item,index) in tableData"
          :key="index">
          <td class="table__td">{{ processValue('create_time_stamp',item) }}</td>
          <!-- <td class="table__td">{{ $t('contract_' + item.symbol) }}</td> -->
          <td class="table__td">{{ item.name }}</td> 
          <td class="table__td">{{ processValue('origin', item) }}</td> <!--????????????-->
          <td class="table__td"> <span v-html="processValue('side', item)"/></td>
          <td class="table__td">{{ (item.amount || 0)  }}</td> 
          <td class="table__td">{{ (item.price || 0) | fixed(valueScale)}}</td>
          <td class="table__td">{{ (item.total || 0) | fixed(valueScale) }}</td>
          <td class="table__td">{{ processValue('fee_rate', item) }} </td> 
          <td class="table__td">{{ (item.fee || 0) | fixed(8) }}</td> 
          <td class="table__td">{{ processValue('type',item) }}</td>
          <td class="table__td">{{ item.amount_total }}</td>
          <td class="table__td">{{ unclosedQty(item) }}</td>
          <td class="table__td">{{ (item.price || 0) | fixed(valueScale) }}</td>
          <td class="table__td">{{ (item.realized || 0) | fixed(valueScale)}}</td>
          <td class="table__td">{{ processValue('unit_id', item) }}</td>
        </tr>
      </table>
      <!-- ???????????? -->
      <table
        v-if=" !isLoading && tabName==='executed'">
        <tr class="table__tr header c-999">
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('contract_assign_time') }}
          </th>
          <!-- ?????? -->
          <th class="table__th">
            {{ $t('contract_name') }}
          </th>
          <!-- ?????? -->
          <th class="table__th">
            {{ $t('deal_th_side') }}
          </th>
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('entrust_amount') }}
          </th>
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('contract_assign_price') }}
          </th>
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('contract_all_dealed') }}
          </th>
          <!-- ?????? -->
          <th class="table__th">
            {{ $t('order_th_unclose') }}
          </th>
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('contract_deal_price') }}
          </th>
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('contract_trigger_price') }}
          </th>
          <!-- ???????????? -->
          <th class="table__th">
            {{ $t('contract_assign_value_raw')  }}
          </th>
          <!-- ?????? -->
          <th class="table__th">
            {{ $t('order_th_type') }}
          </th>
          <!-- ?????? -->
          <th class="table__th">
            {{ $t('status') }}
          </th>
          <!-- ??????ID -->
          <!-- <th class="table__th">
            {{ $t('contract_assign_id') }}
          </th> -->
        </tr>
        <tr
          class="table__tr body c-666"
          v-for="(item,index) in tableData"
          :key="index">
          <td class="table__td">{{ processValue('create_time',item) }}</td>
          <!-- <td class="table__td">{{ $t('contract_' + item.symbol) }}</td> -->
          <td class="table__td">{{ item.name }}</td>
          <td class="table__td"><span v-html="processValue('side', item)"/></td>
          <td class="table__td">{{ item.amount }}</td>
          <td class="table__td">{{ $big(item.price || 0) | fixed(2)}}</td>
          <td class="table__td">{{ item.executed }}</td>
          <td class="table__td">{{ surplus(item) }}</td><!-- ?????? -->
          <td class="table__td">{{  $big(item.price || 0) | fixed(2) }}</td>
          <td class="table__th"> {{ (item.trigger_price || "0") == "0" ? "--" : $big(item.trigger_price).round(valueScale || 0).toFixed(valueScale) }} </td>
          <td class="table__td">{{  $big(assignValue(item) || 0) | fixed(valueScale) }}</td> <!-- ???????????? -->
          <td class="table__td">{{ processValue('type', item) }}</td>
          <td class="table__td">{{ $t(`contract.state.${item.state}`) }}</td>
          <!-- <td class="table__td">{{ item.id }}</td> -->
        </tr>
      </table>
    </div>

    <div
      class="history__footer pt-10"
      v-if="!isLoading">
      <ix-pagination
        :page.sync="page"
        :is-end="isLastPage"
        :func="filter"/>
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
      page: 1, // page ?????????1 ?????????,
      size: 10,
      isLoading: true,
      totalItems: 0,
      selectPair: "BTCUSD",
      state,
      myfilter: {
        symbol: '',
        side: '0',
        state: '0',
        daterange: '',  
      },
      dict: {
        side: [ 
          { value:0, text:'allin'}, 
          { value:1, text:'order_side_buy'}, 
          { value:2, text:'order_side_sell'}, 
        ],
        state: [ 
          { value:0, text:'allin'}, 
          { value:1, text:'contract.state.1'}, 
          { value:2, text:'contract.state.2'},
          { value:3, text:'contract.state.3'}, 
          { value:4, text:'contract.state.4'}, 
          { value:5, text:'contract.state.5'},
          { value:6, text:'contract.state.6'}, 
          { value:7, text:'contract.state.7'},  
        ], 
        trade_state: [ 
          { value:0, text:'allin'}, 
          { value:1, text:'contractMix.origin.1'}, 
          { value:2, text:'contractMix.origin.2'}, 
          { value:3, text:'contractMix.origin.3'},
        ]

      }
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
    langDict () {
      return this.allLangData.fund.dict
    }
  },
  filters:{
    smailNumber(val){  //?????????
      console.log(val)
    }
  },
  methods: {
    // ????????????
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
    // ????????????, ??????/??????
    assignValue (item) {
      // return this.$big(item.amount).div(item.price).toFixed(4)
      return item.total;
    },
    async getPairs () {
      let res = await service.getUnitContractSymList()
      if (!res.code) {
        this.pairList = res.data.items
        this.myfilter.symbol = ''
      }
    }, 
    handleTabChange(name) {
      this.tabName = name
      this.myfilter.state = '0'
      this.filter()
    },
    filter () { 
      if (!this.myfilter.daterange) this.myfilter.daterange = []
      const params = {
        name: this.myfilter.symbol, 
        begin_time: this.myfilter.daterange[0],
        end_time: this.myfilter.daterange[1],
        side: this.myfilter.side,
        state: this.myfilter.state,
        page: this.page,
        size: this.size
      }
      if (this.tabName === 'executed') {
        // ??????????????????
        this.getOrderhistory(params)
      } else {
        // ??????????????????,(?????????)
        this.getContractTradeHistory(params)
      }
    },
    resetPage () {
      this.page = 1
    },
    // ????????????
    getOrderhistory (params) {
      this.isLoading = true 
      service.getUnitOrderhistory(params).then(res => {
        console.log(res.data.data, '????????????')
        this.tableData = res.data.data
        this.totalItems = res.data.total
        // console.log(this.tableData, 'assign')
      }).finally(res => {
        this.isLoading = false
      })
    },
    // ?????????
    getContractTradeHistory (params) {
      this.isLoading = true 
      service.getUnitTradeHistory(params).then(res => {
        this.tableData = res.data.data
        this.totalItems = res.data.total
        console.log(this.tableData, 'trace')
      }).finally(res => {
        this.isLoading = false
      })
    }, 
    pairChange() {
      // console.log({test: this.pairList})
      this.filter()
    },
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
.table__th {
  text-align: center;
}
.table__td {
  white-space: nowrap;
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
</style>
