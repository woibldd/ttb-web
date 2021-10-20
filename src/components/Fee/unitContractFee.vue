<template>
  <div class="profile-container">
    <div v-if="state.siteName!=='BachEx'"  class="title-box rate-tit mb-20">{{ $t('fee.unit_fees') }}</div>
    <div class="rate-tab"> 
      <table class="rate-table">
        <tr>
          <th>{{ $t('transaction_pair') }}</th>
          <th>{{ $t('fee.contract.leverage') }}</th>
          <th>{{ $t('fee.contract.provision_fee') }}</th>
          <th>{{ $t('fee.contract.withdraw_fee') }}</th>
          <th>{{ $t('fee.contract.capital_fee') }}</th>
          <th>{{ $t('fee.contract.capital_fee_period') }}</th>
          <th>{{ $t('fee.contract.next_capital_fee') }}</th>
        </tr>
        <tbody>
          <tr
            v-for="pair in pairList"
            :key="pair.name">
            <td class="">{{ pair.name }}</td>
            <td class="">{{ pair.max_leverage }}</td>
            <td class="">{{ $big(pair.make_rate || 0).mul(100) | fixed(4) }}%</td>
            <td class="">{{ $big(pair.take_rate || 0).mul(100) | fixed(4) }}%</td>
            <td class="">{{ $big(pair.fee_rate || 0).mul(100) | fixed(4) }}%</td>
            <td class="">{{ $t('fee.contract.every_8_hours') }}</td>
            <td class="">{{ pair.next_fee_time | date('Y-M-D H:m:s') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="rate-tips">
      <p class="rate-tips-title">{{ $t('tips') }}</p>
      <p>1. {{ $t('fee.contract.tips_1') }}</p>
      <p>2. {{ $t('fee.contract.tips_2') }}</p>
      <p>3. {{ $t('fee.contract.tips_3') }}</p>
      <p>4. {{ $t('fee.contract.tips_4') }}</p>
      <p>5. {{ $t('fee.contract.tips_5') }}</p>
    </div>
  </div>
</template>

<script>
import service from '@/modules/service'
import { pairfix } from '@/mixins/index'
import { state } from '@/modules/store'

export default {
  name: 'UnitContractFee',
  mixins: [pairfix],
  data () {
    return {
      state,
      pairList: [],
      symbolList: []
    }
  },
  async created () {
    // sss
    let res = await service.getUnitContractSymList()
    if (!res.code) {
      this.pairList = res.data.items
    }
    // res = await service.getContractSymInfo({symbol: 'FUTURE_BTCUSD'})
    res = await service.getUnitContractSymInfo()
    if (!res.code) {
      this.symbolList = res.data
    }
 
    if (this.pairList.length > 0 && this.symbolList.length > 0) {
      this.pairList.map(p => {
        let info = this.symbolList.filter(s => s.name == p.name)

        if (info.length) {
          p.fee_rate = info[0].fee_rate
          p.next_fee_time = info[0].next_fee_time
          p.ss = info[0].currency
        }
      })
    }
  }
}

</script>

<style lang='scss'>
.profile-container {
  width: 960px;
  position: relative;
  .rate-tit{
    font-size: 18px;
    color: #666;
    width: 100%;
  }
  .rate-tab{
    width: 100%;
    height: auto; 
    font-size: 14px;
    color: #333;
    .rate-tab-tit {
      display: flex;
      width: 100%;
      height: 35px;
      font-size: 12px;
      line-height: 35px;
      border-bottom: 1px solid #ccc;
      p {
        flex: 1;
      }
    }
    .rate-ul{
      li{
      display: flex;
        border-bottom: 1px solid #ccc;
        height: 45px;
        line-height: 45px;
        p {
          flex: 1;
        }
      }
    }
    .lt{
      float: left;
    }
    .rate-t-a{
      width: 33%;
    }
    .rate-t-b{
      width: 34%;
      text-align: center;
    }
    .rate-t-c{
      width: 33%;
      text-align: right;
    }
  }
  .rate-tips{
    width: 100%;
    color: #999;
    font-size: 14px;
    margin-top: 35px;
    margin-bottom: 100px;
    p{
      margin-bottom: 5px;
    }
    .rate-tips-title  {
      color: #666;
      margin-bottom: 0;
      line-height: 44px;
      padding-left: 15px;
      position: relative;
      &::before{
        content: "";
        width: 4px;
        height: 4px;
        position: absolute;
        border-radius: 4px;
        background: #C1A538;
        left: 0;
        top: 50%;
        margin-top: -2px;
      }
    }
  }
  .rate-table {
    width: 100%;
    tr {
      height: 45px;
      line-height: 45px; 
      th {
        background-color: #f8f8f8;
        text-align: center;
        border: 1px solid #e5e5e5;
        color: #9A9A9A; 
      }
      td {
        text-align: center;
        border: 1px solid #e5e5e5;
        color: #5B5B5B; 
      }
    }
  }
}
</style>