<template>
  <div class="profile-container">
    <div class="title-box rate-tit">{{ $t('contract_fees') }}</div>
    <div class="rate-tab">
      <!-- <div class="rate-tab-tit"> 
        <p class="lt">{{$t('杠杆')}}</p>
        <p class="lt">{{$t('提供流动性费率')}}</p>
        <p class="lt">{{$t('提取流动性分离v')}}</p>
        <p class="lt">{{$t('资金费率')}}</p>
        <p class="lt">{{$t('资金费率时间段')}}</p>
        <p class="lt">{{$t('下一资金费率')}}</p> 
      </div>
      <ul class="rate-ul"> 
        <li>
          <p class="lt rate-t-a">{{ $t('contract_FUTURE_BTCUSD') }}</p>
          <p class="lt rate-t-b">-0.0350%</p>
          <p class="lt rate-t-c">-0.0700%</p>
        </li>
         <li
          v-for="pair in pairList"
          :key="pair.name">
          <p class="lt rate-t-a">{{ $t('FUTURE_&USD', {currency: pair.currency.replace('USD','')} )  }}</p>
          <p class="lt rate-t-b">{{ pair.max_leverage }}</p>
          <p class="lt rate-t-b">{{ $big(pair.make_rate || 0).mul(100) | fixed(4) }}%</p>
          <p class="lt rate-t-c">{{ $big(pair.take_rate  || 0).mul(100) | fixed(4) }}%</p>
          
          <p class="lt rate-t-c"></p>
          <p class="lt rate-t-c">每8小时</p>
          <p class="lt rate-t-c">{{}}</p>
        </li>
      </ul> -->
      <table  class="rate-table">
        <tr>
          <th>{{ $t('transaction_pair') }}</th>
          <th>{{ $t('杠杆') }}</th>
          <th>{{ $t('提供流动性费率') }}</th>
          <th>{{ $t('提取流动性分离') }}</th>
          <th>{{ $t('资金费率') }}</th>
          <th>{{ $t('资金费率时间段') }}</th>
          <th>{{ $t('下一资金费率') }}</th> 
        </tr>
        <tbody>
          <tr v-for="pair in pairList" :key="pair.name">
            <td class="">{{ $t('FUTURE_&USD', {currency: pair.currency.replace('USD','')} )  }}</td>
            <td class="">{{ pair.max_leverage }}</td>
            <td class="">{{ $big(pair.make_rate || 0).mul(100) | fixed(4) }}%</td>
            <td class="">{{ $big(pair.take_rate  || 0).mul(100) | fixed(4) }}%</td> 
            <td class="">{{ $big(pair.fee_rate || 0).mul(100) | fixed(4) }}%</td>
            <td class="">{{ $t('每8小时') }}</td> 
            <td class="">{{ pair.next_fee_time | date('Y-M-D H:m:s')}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="rate-tips">
      <p class="rate-tips-title">{{ $t('tips') }}</p> 
      <p>1. {{ $t('rate_tips_a') }}</p>
      <p>2. {{ $t('rate_tips_b') }}</p>
      <p>3. {{ $t('rate_tips_c') }}</p>
      <p>4. {{ $t('rate_tips_d') }}</p>  
      <p>5. {{ $t('我们的永续合约，如BTC永续，其资金费用每隔一段时间在多仓和空仓的持有者之间进行交换。 在您的交易历史中，正数金额意味着你在此时段支付资金而 负数金额意味着您收取资金。 平台不支付或收取任何资金费用。') }}</p>  
    </div> 
  </div>
</template>

<script>
import service from '@/modules/service'
import { pairfix } from '@/mixins/index' 

export default {
  name: 'ContractFee',
  mixins: [pairfix],
  data () {
    return {
      pairList: [],
      symbolList: []
    }
  },
  async created () {
    let res = await service.getContractSymList()
    if (!res.code) {
      this.pairList = res.data.items 
    } 
    res = await service.getContractSymInfo({symbol: 'FUTURE_BTCUSD'})
    if (!res.code) {
      this.symbolList = res.data.future_symbol_info_list  
    } 

    if (this.pairList.length > 0 && this.symbolList.length > 0) {
      this.pairList.map(p => {
        let info = this.symbolList.filter(s => s.currency == p.currency)

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
    .rate-tab-tit{
      width: 100%;
      height: 35px;
      font-size: 12px;
      line-height: 35px;
      border-bottom: 1px solid #ccc;
    }
    .rate-ul{
      li{
        border-bottom: 1px solid #ccc;
        height: 45px;
        line-height: 45px;
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
        background: $primary;
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
      display: flex;
      th {
        text-align: left;
        flex: 1;
      }
      td {
        flex: 1;
      }
    }
  }
}
</style>
