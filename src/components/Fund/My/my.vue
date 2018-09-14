<template>
  <div class="fund-container my-fund-container">
    <div class="title-box">
      <div> {{ $t('我的资产') }} <span class="history"> > {{ $t('资金记录') }}</span></div>
      <div
        class="fund-history"
        @click="showFundHistory"> {{ $t('资金记录') }}</div>
    </div>
    <div class="my-fund-content">
      <div class="fund-total">
        <div class="total__label">{{ $t('账户可用余额') }}</div>
        <div class="total__coin">{{ $t('账户可用余额') }} <span class="coin-rmb">≈ ￥3.00</span></div>
      </div>
      <el-table
        :data="tableData"
        class="fund-coin-pool">
        <el-table-column
          v-for="(hd, idx) in header"
          :key="idx"
          prop="date"
          label="key"
          width="180"/>
      </el-table>
    </div>
  </div>
</template>
<script>
import './my.scss'
// import utils from '@/modules/utils'
// import service from '@/modules/service'

export default {
  name: 'MyFund',
  data () {
    return {
      header: ['币种', '可用', '冻结 ', '总计', '估值', '操作']
    }
  },
  async created () {
  },
  methods: {
    showFundHistory () {

    }
  }
}
</script>
