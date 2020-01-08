<template>
  <div class="profile-container">
    <div class="title-box rate-tit">{{ $t('fee.unit_fees') }}</div>
    <div class="rate-tab">
      <!-- <div class="rate-tab-tit">
        <p class="lt rate-t-a">{{ $t('transaction_pair') }}</p>
        <p class="lt">{{$t('杠杆')}}</p>
        <p class="lt">{{$t('提供流动性费率')}}</p>
        <p class="lt">{{$t('提取流动性分离v')}}</p>
        <p class="lt">{{$t('资金费率')}}</p>
        <p class="lt">{{$t('资金费率时间段')}}</p>
        <p class="lt">{{$t('下一资金费率')}}</p>
      </div>
      <ul class="rate-ul">
         <li
          v-for="pair in pairList"
          :key="pair.name">
          <p class="lt rate-t-a">{{ $t('FUTURE_&USD', {currency: pair.currency.replace('USD','')} )  }}</p>
          <p class="lt rate-t-b">{{ pair.max_leverage }}</p>
          <p class="lt rate-t-b">{{ $big(pair.make_rate || 0).mul(100) | fixed(4) }}%</p>
          <p class="lt rate-t-c">{{ $big(pair.take_rate  || 0).mul(100) | fixed(4) }}%</p>

          <p class="lt rate-t-c">123</p>
          <p class="lt rate-t-c">每8小时</p>
          <p class="lt rate-t-c">{{}}</p>
        </li>
      </ul> -->
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
            <td class="">{{ $t('FUTURE_&USD', {currency: pair.currency.replace('USD','')} ) }}</td>
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

export default {
  name: 'UnitContractFee',
  mixins: [pairfix],
  data () {
    return {
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
    res = await service.getUnitContractSymInfo({symbol: 'FUTURE_BTCUSD'})
    if (!res.code) {
      this.symbolList = res.data
    }

    if (this.pairList.length > 0 && this.symbolList.length > 0) {
      this.pairList.map(p => {
        let info = this.symbolList.filter(s => s.name == p.symbol)

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
    margin-top: 22px;
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
      border-bottom: 1px solid #ccc;
      // display: flex;
      th {
        text-align: left;
        // flex: 1;
      }
      td {
        // flex: 1;
      }
    }
  }
}
</style>
