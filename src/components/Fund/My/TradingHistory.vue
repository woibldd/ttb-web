<template>
  <div class="order--container">
    <div class="profile-container"
      v-loading="isLoading"> 
      <div class="filter"> 
        <el-tabs v-model="recordTab" @tab-click="handleTabChange">
          <el-tab-pane :label="$t('contract_trade_his')" name="executed"></el-tab-pane>
          <el-tab-pane :label="$t('order_history')" name="delegate"></el-tab-pane> 
        </el-tabs>
      </div> 
      <el-row :gutter="20"> 
        <el-col :span="4">
          <el-select
            id="contractType"
            class="opetion"
            v-model="myfilter.symbol"
            @change="filter"
            :placeholder="$t('please_choose')"
            size="mini"
            :filterable="true"
            value-key="currency">
            <el-option :label="langDict.currency[0]" value="" />
            <el-option
              v-for="(item, idx) in pairList"
              :key="idx"
              :label="item.product +'/'+ item.currency"
              :value="item.name"/>
          </el-select>
        </el-col> 
        <el-col :span="4"> 
          <el-select
            class="opetion"
            v-model="myfilter.side" 
            size="mini"
            @change="filter"> 
             <el-option v-for="(item, key) in langDict.side"
              :key="key"
              :label="item" 
              :value="key"/>
          </el-select>
        </el-col>  
        <el-col :span="8">
          <el-date-picker
            v-model="myfilter.daterange"
            @change="filter"
            size="mini"
            type="daterange"
            value-format="timestamp"
            range-separator="-"
            :start-placeholder="$t('el.datepicker.startDate')"
            :end-placeholder="$t('el.datepicker.endDate')">
          </el-date-picker>
        </el-col>  
      </el-row>
      <div class="table-wrapper"
        v-scroll-load="loadMore">
        <table 
          class="table scroll--body">
          <tr class="thead">
            <th>{{ $t('time') }}</th>
            <th>{{ $t('pair') }}</th>
            <th>{{ $t('deal_th_side') }}</th>
            <th>{{ $t('order_th_type') }}</th>
            <th>{{ $t('orderdeal_fee') }}</th>
            <!-- <th>{{ $t('order_ix_service_fee') }}</th> -->
            <th>{{ $t('avg_price') }}</th>
            <th>{{ $t('deal_amount') }}</th>
          <!-- <th>{{ $t('order_th_status') }}</th> -->
          </tr>
          <tr
            class="row-tr"
            v-for="(row,index) in tableData"
            :key="index">
            <td>
              <span v-if="recordTab==='executed'">{{ row.create_time }}</span>
              <span v-else>{{ row.create_time | date }}</span> 
            </td>
            <td>{{ row.symbol | pairfix }}</td>
            <td><span v-html="processSide(row.side)"/></td>
            <td>{{ row.type == 1 ? $t('operate_limit') : $t('operate_market') }}</td>
            <td>{{ row.fee | round(6) }} {{ row.side == 1 ? row.product : row.currency }}</td> 
            <td>{{ row.price }}</td>
            <td>{{ row.amount | round(5) }}</td> 
          </tr>
        </table>
        <div
          class="no-data"
          v-if="!isLoading&& !tableData.length">
          {{ $t('order_empty') }}
        </div>
        <div
          class="pt-10 pb-30 mb-20"
          style="text-align: center;"> 
          <ix-pagination
            :page.sync="params.page"
            :is-end="isLastPage"
            :func="getList"/>
        </div>
      </div> 
    </div>
  </div>
</template>
<script>
import service from '@/modules/service'
import { pairfix } from '@/mixins/index'
import ixPagination from '@/components/common/ix-pagination'

export default {
  mixins: [pairfix],

  data () {
    return {
      selectPair: {},
      pairList: [],
      tableData: [],
      originList: [],
      isLoading: true,
      total: 0,
      params: {
        page: 1,
        size: 10,
        symbol: ''
      },
      recordTab: 'executed', 
      myfilter: {
        symbol: '',
        side: '0',
        state: '0',
        daterange: [],  
      },
      dict: {
        side: [ 
          { value:0, text:'allin'}, 
          { value:1, text:'order_side_buy'}, 
          { value:2, text:'order_side_sell'}, 
        ],  
      },
      totalItems: 0,
    }
  },
  components: {
    ixPagination
  },
  methods: {
    handleTabChange(name) {
      // this.recordTab = name 
      this.params.page = 1
      this.filter()
    },
    filter () {  
      this.getList()
    },
    changePairs (e) {
      this.filterList()
      this.params.symbol = e.name
      this.getList()
    },
    currentHandle (e) {
      this.params.page = e
      this.getList()
    },
    processSide (side) {
      // 格式化方向
      let value = ''
      switch (side) {
        case 1:
        case 'BUY':
          value = `<span class="font-color-buy"> ${this.$t('order_side_buy')}</span>`
          break
        case 2:
        case 'SELL':
          value = `<span class="font-color-sell">${this.$t('order_side_sell')}</span>`
          break
        default:
          break
      }
      return value
    },
    async getAllPairs () {
      let res = await service.getPairList()
      if (!res.code) {
        this.pairList = res.data.items
      }
    },
    filterList () {
      this.tableData = this.originList.filter(item => {
        return item.symbol === this.selectPair.name
      })
    },
    getList () { 
      this.isLoading = true
      if (!this.myfilter.daterange) this.myfilter.daterange = [] 
      const params = {
        symbol: this.myfilter.symbol, 
        begin_time: this.myfilter.daterange[0],
        end_time: this.myfilter.daterange[1],
        side: this.myfilter.side, 
        page: this.params.page,
        size: this.params.size
      } 
      if (this.recordTab === 'executed') {
        service.getBiBiOrders(params).then(res => {
          this.totalItems = res.data.length
          this.originList = res.data
          this.tableData = res.data
        }).finally(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 500)
        })
      } else if (this.recordTab === 'delegate') {
        service.orderHistory(params).then(res => {
          this.totalItems = res.data.items.length
          this.originList = res.data.items
          this.tableData = res.data.items
        }).finally(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 500)
        })
      }
    },
    loadMore () { 
      if (this.tableData.length >= this.params.page * this.params.size) {
        this.isLoading = true
        this.params.page++
        this.getList()
      }
    }
  },
  computed: {
    isLastPage () {  
      return this.totalItems < this.params.size
    },
    langDict () {
      return this.allLangData.fund.dict
    }, 
  },
  async created () {
    await this.getAllPairs()
    this.getList()
  }
}
</script>
<style lang="scss">
    .order--container {
        .font-color-buy{
            color: #23C88B;
        }
        .font-color-sell{
            color: #F24E4D;
        }
    }
</style>
<style lang="scss" scoped>
.order--container {
    // padding-left: 60px;
    float: left; 
    .profile-container {
      width: 960px;
      position: relative;
      .el-tabs {
        /deep/ .el-tabs__header {
          .el-tabs__active-bar {
            background-color: $primary;
          }
          .el-tabs__item {
            &.is-active {
              color: $primary; 
            }
            &:hover {
              color: $primary; 
            }
          } 
        }
      }
      .filter-item { 
          height:32px;
          border-radius:6px;
          line-height: 32px;
          text-align: center;
          cursor: pointer; 
          padding: 0 10px;
          &.select {
            background: $primary;
            color: #fff;
            box-shadow:0px 2px 6px 0px rgba(201,169,108,0.6);
          }
        }
      .title-box {
        width: 100%;
        height: 40px;
        font-size: 18px;
        font-weight: 600;
        color: $text-strong;
        border-bottom: 1px solid #e6e6e6;
        span{
          color: #999;
          font-size: 14px;
          padding-left: 15px;
          font-weight: lighter;
        }
      }
    }
    .row-select {
        display: flex;
        align-items: center;
        color: #666666;
    }
    .table-wrapper { 
        overflow: scroll;
        width: 100%;
    }
    .table {
        width: 100%;
        tr {
            width: 100%;
            height: 40px;
            line-height: 40px;
        }
        th {
            color: #999999;
            text-align: left;
        }
        td {
            text-align: left;
        }
        .thead {
            border-top: 1px soild #EBEEF5;
            border-bottom: 1px soild #EBEEF5;
        }
        .row-tr {
            color: #666;
            &:nth-child(even) {
                background-color: rgba(250,250,250, 0.5)
            }

        }
    }
    .no-data {
        width: 100%;
        text-align: center;
        padding-top: 20px;
    }
}

</style>
