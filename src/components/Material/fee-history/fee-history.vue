<template>
  <div class="fee-history-container material-container">
    <div class="title-box">
      <div>{{ $t('assets_fee_history') }}</div>
    </div>
    <div class="material__content">
      <div class="c-999 mb-40">
        <p class="mb-10">{{ $t('all_fee_history_list_here') }}</p>
        <p>{{ $t('fee_rates_announce_every_eight_hour') }}</p>
      </div>
      <div class="select-row mb-40">
        <el-select
          v-model="selectPair"
          @change="getRateHistory"
          value-key="name">
          <el-option
            v-for="(item, idx) in allPairs"
            :key="idx"
            :label="$t('FUTURE_&USD', {currency: item.name.replace('FUTURE_','').replace('USD','')} )"
            :value="item"/> 
        </el-select>
      </div>
      <div class="table-section">
        <table class="table-wrapper">
          <tr class="table__tr header c-999">
            <th class="table__th">
              {{ $t('date') }}
            </th>
            <th class="table__th">
              {{ $t('contract_name') }}
            </th>
            <th class="table__th">
              {{ $t('fee_cost_interval') }}
            </th>
            <th class="table__th">
              {{ $t('fee_rate') }}
            </th>
            <th class="table__th text-align-right pl-5">
              {{ $t('day_fee_rate') }}
            </th>
          </tr>
          <tr
            class="table__tr body c-666"
            v-for="(item,index) in tableData"
            :key="index">
            <td class="table__td">{{ processValue('create_time', item) }}</td>
            <!-- <td class="table__td">{{ $t('contract_' + item.symbol) }}</td> -->
            <td class="table__td">{{$t('FUTURE_&USD', {currency: item.symbol.replace('FUTURE_','').replace('USD','')} )}}</td>
            <td class="table__td">{{ $t('every_eight_hour') }}</td>
            <td class="table__td">{{ (item.fee * 100) | fixed(4) }}%</td>
            <td class="table__td text-align-right pr-5">{{ (item.fee_rate_day * 100)  | fixed(4)  }}%</td>
          </tr>
        </table>
      </div>
      <div class="history__footer pt-10">
        <ix-pagination
          :page.sync="page"
          :is-end="isLastPage"
          :func="getPage"/>
      </div>
    </div>
  </div>
</template>
<script>
import ixPagination from '@/components/common/ix-pagination'
import processValue from '@/mixins/process-contract-value'
import service from '@/modules/service'

export default {
  components: {ixPagination},
  mixins: [processValue],
  data () {
    return {
      page: 1,
      size: 10,
      account: 'all',
      allPairs: [],
      pages:{},
      selectPair: {},
      tableData: []
    }
  },
  computed: {
    isLastPage () {
      return this.pages.total/this.size < this.page
    }
  },
  methods: {
    async getPairs () {
      await service.getContractSymList().then(res => {
        if (res && res.data) {
          this.allPairs = res.data.items
          this.selectPair = this.allPairs[0]
        }
      })
    },
    getPage () {
      console.log(this.page)
      let params = {
        symbol: this.selectPair.name,
        page : this.page
      }
      service.getFundFeeRateHistory(params).then(res => {
        this.tableData = res.data.data
        //console.log("@@@" + this.tableData)
      })
      console.log('next page')
    },
    getRateHistory () {
      const params = {
        symbol: this.selectPair.name
      }
      service.getFundFeeRateHistory(params).then(res => {
        this.tableData = res.data.data
        this.pages = res.data
        //console.log("@@@" + this.tableData)
      })
    }
  },
  async created () {
    await this.getPairs()
    this.getRateHistory()
  }
}
</script>
<style lang="scss">
.fee-history-container{
    .select-row__wrapper{
        width: 216px;
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
}
</style>
