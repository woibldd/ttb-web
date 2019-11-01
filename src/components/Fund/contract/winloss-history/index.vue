<template>
  <div class="contract-history-container my-fund-content pt-40 f14">
    <div class="filter-list mb-39"> 
       <!-- 账户 -->
      <div class="currency-row mr-40">
        <div class="c-999 mr-13">
          {{ $t('fund.contract.future') }}
        </div>
        <el-select
          class="opetion"
          v-model="currencyFuture"
          value-key="name">
          <el-option
            v-for="(item, idx) in futureTypes"
            :key="idx"
            :label="$t(item.name)"
            :value="item.key"/>
        </el-select>
      </div>
      <!-- 类型 -->
      <div class="currency-row mr-40">
        <div class="c-999 mr-13">
          {{ $t('fund.contract.contract_name') }}
        </div>
        <el-select
          class="opetion"
          v-model="currencyPair"
          @change="query"
          value-key="currency">
          <el-option
            v-for="(item, idx) in pairList"
            :key="idx"
            :label="item"
            :value="item"/> 
        </el-select>
      </div>
      <div class="currency-row">
        <el-date-picker
          width="200"
          v-model="timeRange"
          type="daterange" 
          range-separator="-"  
          :start-placeholder="$t('fund.contract.start')"
          :end-placeholder="$t('fund.contract.end')"/>
      </div>
      <el-button type='default' @click="query" class="ml-20">{{$t('fund.contract.query')}}</el-button>
    </div>
    <div class="table-wrapper">
      <table>
        <tr class="table__tr header c-999">
          <th class="table__th">
            {{ $t('fund.contract.contract_name') }}
          </th>
          <th class="table__th">
            {{ $t('fund.contract.close_side') }}
          </th>
          <th class="table__th">
            {{ $t('fund.contract.amount') }}
          </th>
          <th class="table__th">
            {{ $t('fund.contract.into_price') }}
          </th> 
          <th class="table__th">
            {{ $t('fund.contract.out_price') }}
          </th>
          <!-- 余额 -->
          <th class="table__th pr-10">
            {{ $t('fund.contract.close_realized') }}
          </th>
          <!-- 状态 -->
          <th class="table__th">
            {{ $t('fund.contract.close_type') }}
          </th>
          <th class="table__th">
            {{ $t('fund.contract.close_datetime') }}
          </th>
        </tr>
        <tr
          class="table__tr body c-666"
          v-for="(item,index) in tableData"
          :key="index">
          <td class="table__td">{{ item.currency }}</td>
          <td class="table__td">{{ $t(closeType[item.side]) }}</td>
          <td class="table__td">{{ item.amount }}</td>
          <td class="table__td"> {{item.open_price | fixed(valueScale)}} </td>
          <td class="table__td">{{ item.sell_price | fixed(valueScale)}} </td>
          <td class="table__td">
            <span :class="item.realized > 0 ? 'color-up' : 'color-down'" >
              {{ item.realized | fixed(8)}} 
            </span>
          </td>
          <td class="table__td">{{ $t(tradeType[item.origin]) }}</td>
          <td class="table__td pr-10">{{ (item.create_time / 1000) | date }}</td> 
        </tr>
      </table>
    </div>
    <div class="pt-10 pb-30 mb-20" style="text-align: center;">
      <el-pagination
        background
        layout="prev, pager, next"
        :currentPage="pages.page"
        :total="pages.total"
        :pageSize="pages.size"
        @current-change="pageChange"
        >
      </el-pagination>
    </div>
    <div class="realized-box">
      <div class="realized-item">
        <div class="title">{{$t('fund.contract.total_realized')}} </div>
        <div class="value">
          <span :class="realized.realized_total > 0 ? 'bgcolor-unp' : 'bgcolor-dnp'" >{{realized.realized_total | fixed(8)}}<b>BTC</b></span>
        </div>
        <div class="valuation">≈  {{translateByRate(realized.realized_total) | fixed(2)}} USD</div>
      </div>
      <div class="realized-item">
        <div class="title">{{$t('fund.contract.current_day_realized')}} </div>
        <div class="value">
          <span :class="realized.realized_today > 0 ? 'bgcolor-unp' : 'bgcolor-dnp'" >{{realized.realized_today | fixed(8)}}<b>BTC</b></span>
        </div>
        <div class="valuation">≈  {{translateByRate(realized.realized_today) | fixed(2)}} USD</div>
      </div>
      <div class="realized-item">
        <div class="title">{{$t('fund.contract.unrealized_mark_price')}} </div>
        <div class="value">
          <span :class="realized.realized_market > 0 ? 'bgcolor-unp' : 'bgcolor-dnp'" >{{realized.realized_market | fixed(8)}}<b>BTC</b></span>
        </div>
        <div class="valuation">≈ {{translateByRate(realized.realized_market) | fixed(2)}} USD</div>
      </div>
      <div class="realized-item">
        <div class="title">{{$t('fund.contract.unrealized_last_price')}} </div>
        <div class="value">
          <span :class="realized.realized_price > 0 ? 'bgcolor-unp' : 'bgcolor-dnp'" >{{realized.realized_price | fixed(8)}}<b>BTC</b></span>
        </div>
        <div class="valuation">≈ {{translateByRate(realized.realized_price) | fixed(2)}} USD</div>
      </div>
    </div>

    <div class="trend-view"> 
      <div class="charts">
        <trendCharts :pair="currencyPair"/>
      </div>
    </div>
  </div>
</template>

<script>

import service from '@/modules/service'
import processValue from '@/mixins/process-contract-value'
import trendCharts from './highcharts'
export default {
  mixins: [ processValue],
  components: {trendCharts},
  data() {
    return {
      timeRange: [],
      futureTypes: [
        { name:'contract_FUTURE_BTCUSD', key: 0}, 
      ],
      pairList: [
        'BTCUSD',
        'ETHUSD',
        'EOSUSD'
      ],
      currencyFuture: 0,
      currencyPair: 'BTCUSD',
      pages:{
        total: 0,
        page: 1,
        size: 10
      },
      page: 1, // page 都是从1 开始的
      size: 10, // 此接口没有分页,先写死200条
      valueScale: 4,
      beginTime: 0,
      endTime: 0,
      tableData: [],
      realized:{
        realized_total: 0, //累计已实现盈亏
        realized_today: 0,  //当日已实现盈亏
        realized_market: 0,  //未结盈亏(标记价格)
        realized_price: 0,  //未结盈亏(盘口价格)
      },
      cycleTime: 7,
      rates: null,
      tradeType: {
        1: "fund.contract.close_type_1",
        2: "fund.contract.close_type_2", 
        4: "fund.contract.close_type_4" 
      },
      closeType: {
        "买入平空":"fund.contract.close_side_1",
        "卖出平多":"fund.contract.close_side_2",
      }
    }
  },
  methods: {
    getFundHistory () {
      const params = {
        currency: this.currencyPair,
        page: this.pages.page,
        size: this.pages.size
      }
      if (this.timeRange.length > 0) {
        params.begin_time = this.timeRange[0] * 1
        params.end_time = this.timeRange[1] * 1
      }  
      service.getFutureCloseRealized(params).then(res => { 
        if (!!res && !res.code) {
          this.tableData = res.data.data.close_realized_list
          this.pages = res.data 
          this.realized = res.data.data
        }
      })
    },
    query() {
      this.getFundHistory(); 
    },
    pageChange(e) {
      console.log({e})
      this.pages.page = e
      this.getFundHistory(); 
    },
    translateByRate (value) {
      if (!this.rates) return 
      return this.$big(this.rates['USD']).times(value).toString()
    },
    
  },
  async created() { 
    let res = await service.getRates({currency: 'BTC'})  
    if (!!res && !res.code) {
      this.rates = res.data.BTC
    }
    console.log(this.rates)
    this.getFundHistory() 
  }

}
</script>


<style lang="scss" scoped>

  .color-up { 
    color:#08C988; 
  }
  .color-down { 
    color:#F24E4D; 
  }
  .bgcolor-unp { 
    color:#08C988; 
    font-size: 24px;
    b {
      font-size: 16px;
    }
  }
  .bgcolor-dnp { 
    color:#F24E4D; 
    font-size: 24px;
    b {
      font-size: 16px;
    }
  }
  .table-wrapper {
      height: 460px;
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
          width:120px;
          // height:32px;
          border-radius:6px;
      }
  }
  .realized-box {
    display: flex;
    .realized-item {
      flex: 1;
    }
  }
  .trend-view {
    margin-top: 30px;
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

