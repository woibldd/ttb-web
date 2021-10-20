<template>
  <div class="profile-container">
    <div v-if="state.siteName!=='BachEx'"  class="title-box rate-tit mb-20">{{ $t('transaction_fees') }}</div>
    <div class="rate-tab">
      <!-- <div class="rate-tab-tit">
        <p class="lt rate-t-a">{{ $t('transaction_pair') }}</p>
        <p class="lt rate-t-b">{{ $t('maker') }}</p>
        <p class="lt rate-t-c">{{ $t('taker') }}</p>
      </div>
      <ul class="rate-ul">
        <li
          v-for="pair in pairList"
          :key="pair.name">
          <p class="lt rate-t-a">{{ pair.name | pairfix }}</p>
          <p class="lt rate-t-b">{{ $big(pair.make_rate).times(100).round(4, 0)}}%</p>
          <p class="lt rate-t-c">{{ $big(pair.take_rate).times(100).round(4, 0)}}%</p>
        </li>
      </ul> -->
      <table class="rate-table">
        <tr>
          <th>{{ $t('transaction_pair') }}</th> 
          <th>{{ $t('maker') }}</th>
          <th>{{ $t('taker') }}</th> 
        </tr>
        <tbody>
          <tr
            v-for="pair in pairList"
            :key="pair.name">
            <td class="">{{ pair.name | pairfix  }}</td> 
            <td class="">{{ $big(pair.make_rate || 0).mul(100) | fixed(4) }}%</td>
            <td class="">{{ $big(pair.take_rate || 0).mul(100) | fixed(4) }}%</td> 
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
      <p>5. {{ $t('rate_tips_e') }}</p>
      <!-- <p>6. {{ $t('rate_tips_f') }}</p> -->
      <!-- <p>7. {{ $t('rate_tips_g') }}</p> -->
    </div>
  </div>
</template>

<script> 
import service from '@/modules/service'
import { pairfix } from '@/mixins/index'
import { state } from '@/modules/store'
export default {
  mixins: [pairfix],
  name: 'TradingFee',
  components: {
  },
  data () {
    return {
      state,
      pairList: []
    }
  },
  async created () {
    let res = await service.getPairList()
    if (!res.code) {
      this.pairList = res.data.items
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
  
  .rate-table {
    width: 100%;
    tr {
      height: 45px;
      line-height: 45px;
      // display: flex;
      th {
        background-color: #f8f8f8;
        text-align: center;
        border: 1px solid #e5e5e5;
        color: #9A9A9A;
        // text-align: left;
        // flex: 1;
      }
      td {
        text-align: center;
        border: 1px solid #e5e5e5;
        color: #5B5B5B;
        // flex: 1;
      }
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
}
</style>
