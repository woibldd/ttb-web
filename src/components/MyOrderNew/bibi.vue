<template>
  <div class="order--container">
    <div class="profile-container"
      v-loading="isLoading">
      <div class="title-box">{{ $t('fund_trading_bill') }}</div>
      <!-- <div class="row-select mt-24 mb-24">
        <span>{{ $t('pair') }}</span>
        <div class="row__value ml-9">
          <el-select
            v-model="selectPair"
            value-key="name"
            @change="changePairs">
            <el-option
              v-for="(item, idx) in pairList"
              :key="idx"
              :label="item.name | pairfix"
              :value="item"/>
          </el-select>
        </div>
      </div> -->
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
            <td>{{ row.create_time }}</td>
            <td>{{ row.symbol | pairfix }}</td>
            <td> <span v-html="processSide(row.side)"/></td>
            <td>{{ row.type == 1 ? $t('operate_limit') : $t('operate_market') }}</td>
            <td>{{ row.fee | round(6) }} {{ row.side == 1 ? row.product : row.currency }}</td>
            <!-- <td>{{row.discount}}</td> -->
            <td>{{ row.price }}</td>
            <td>{{ row.amount | round(5) }}</td>
          <!-- <td>{{row.}}</td> -->
          </tr>
        </table>
        <div
          class="no-data"
          v-if="!isLoading&& !tableData.length">
          {{ $t('order_empty') }}
        </div>
      </div>
      <!-- <div class="pages" style="text-align: center;padding-top: 20px;" v-if="tableData.length">
        <el-pagination
          background
          @current-change="currentHandle"
          layout="prev, pager, next"
          :total="total" />
      </div> -->
    </div>
  </div>
</template>
<script>
import service from '@/modules/service'
import { pairfix } from '@/mixins/index'

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
      }
    }
  },
  methods: {
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
          value = `<span class="font-color-buy"> ${this.$t('order_side_buy')}</span>`
          break
        case 2:
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
      // const params = {
      //   page: 1,
      //   size: 10,
      //   symbol: this.selectPair.name
      // }
      this.params.symbol = this.selectPair.name || ''
      service.getBiBiOrders(this.params).then(res => {
        this.originList = this.originList.concat([], res.data) // 暂时前端过滤,所以保留最初的全部数据 
        this.tableData = this.tableData.concat([], res.data)
      }).finally(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 500)
      })
    },
    loadMore () { 
      if (this.tableData.length >= this.params.page * this.params.size) {
        this.isLoading = true
        this.params.page++
        this.getList()
      }
    }
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
        height: 420px;
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
