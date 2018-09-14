<template>
  <div class="deposit-container fund-container">
    <div class="title-box">
      <div> {{ $t('我的资产') }}</div>
      <div class="fund-history"> {{ $t('资金记录') }}</div>
    </div>
    <div class="fund-items-content">
      <div class="fund-total">
        <span class="txt">{{ $t('账户可用余额') }}</span>
      </div>
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
      address: '',
      allCoins: [],
      selectCoin: {}
    }
  },
  async created () {
  },
  methods: {
  }
}
</script>
