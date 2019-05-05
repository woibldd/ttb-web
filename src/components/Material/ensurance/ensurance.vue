<template>
  <div class="fee-history-container material-container">
    <div class="title-box">
      <div>{{ $t('ensurance_fund') }}</div>
    </div>
    <div class="material__content">
      <div class="c-999 mb-40">
        <p class="mb-10"><span v-html="$t('ensurance_rules_a')"/></p>
        <p class="mb-10">{{ $t('ensurance_rules_b') }}</p>
        <p>{{ $t('ensurance_rules_c') }}</p>
      </div>
      <div class="select-row mb-40">
        <el-select
          v-model="selectPair"
          value-key="name">
          <el-option
            v-for="(item, idx) in allPairs"
            :key="idx"
            :label="$t('contract_' + item.name)"
            :value="item"/>
        </el-select>
      </div>
      <div class="table-section">
        <table class="table-wrapper">
          <tr class="table__tr header c-999">
            <th class="table__th">
              {{ $t('date') }}
            </th>

            <th class="table__th text-align-right pr-5">
              {{ $t('ensurance_fund_amount') }}
            </th>
          </tr>
          <tr
            class="table__tr body c-666"
            v-for="(item,index) in tableData"
            :key="index">
            <td class="table__td">{{ processValue('created_time', item) }}</td>
            <td class="table__td text-align-right pr-5">{{ item.left | round(4) }} BTC</td>
          </tr>
        </table>
      </div>
      <div class="history__footer pt-10">
        <!-- <ix-pagination
          :page.sync="page"
          :func="getPage"/> -->
      </div>
    </div>
  </div>
</template>
<script>
import ixPagination from '@/components/common/ix-pagination'
import service from '@/modules/service'
import processValue from '@/mixins/process-contract-value'

export default {
  components: {ixPagination},
  mixins: [processValue],
  data () {
    return {
      page: 1,
      account: 'all',
      allPairs: [],
      selectPair: {},
      contractTypes: [
        {key: 'all', name: 'BTC/USDT永续合约'}
      ],
      tableData: []
    }
  },
  methods: {
    async getPairs () {
      await service.getContractSymList().then(res => {
        console.log(res, 'symlist')
        if (res && res.data) {
          this.allPairs = res.data.items
          this.selectPair = this.allPairs[0]
        }
      })
    },
    getPage () {
      console.log('next page')
    },
    getData () {
      service.getEnsuranceFund().then(res => {
        this.tableData = [res.data]
      })
    }
  },
  async created () {
    this.getData()
    await this.getPairs()
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
