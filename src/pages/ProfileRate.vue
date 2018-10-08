<template>
  <div class="user-center-right">
    <div class="profile-container">
      <div class="rate-tit">{{ $t('transaction_fees') }}</div>
      <div class="rate-tab">
        <div class="rate-tab-tit">
          <p class="lt rate-t-a">{{ $t('transaction_pair') }}</p>
          <p class="lt rate-t-b">{{ $t('maker') }}</p>
          <p class="lt rate-t-c">{{ $t('taker') }}</p>
        </div>
        <ul class="rate-ul">
          <li>
            <p class="lt rate-t-a">BTC/USTD</p>
            <p class="lt rate-t-b">0.2%</p>
            <p class="lt rate-t-c">0.02%</p>
          </li>
          <li>
            <p class="lt rate-t-a">BTC/USTD</p>
            <p class="lt rate-t-b">0.2%</p>
            <p class="lt rate-t-c">0.02%</p>
          </li>
          <li>
            <p class="lt rate-t-a">BTC/USTD</p>
            <p class="lt rate-t-b">0.2%</p>
            <p class="lt rate-t-c">0.02%</p>
          </li>
        </ul>
      </div>
      <div class="rate-tips">
        <p class="rate-tips-title">{{ $t('tips') }}</p>
        <p>{{ $t('rate_tips_a') }}</p>
        <p>{{ $t('rate_tips_b') }}</p>
        <p>{{ $t('rate_tips_c') }}</p>
        <p>{{ $t('rate_tips_d') }}</p>
        <p>{{ $t('rate_tips_e') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/modules/service'
import {state} from '@/modules/store'
import utils from '@/modules/utils'

export default {
  name: 'ProfileInfo',
  components: {
  },
  data () {
    return {
      state,
      historyList: [],
      kyc: {}
    }
  },
  computed: {
    name () {
      if (state.userInfo) {
        return state.userInfo.name
      }
      return ''
    },
    phone () {
      if (state.userInfo && state.userInfo.phone) {
        return utils.publicDesensitization(state.userInfo.phone)[0]
      }
      return ''
    },
    email () {
      if (state.userInfo && state.userInfo.email) {
        return utils.publicDesensitization(state.userInfo.email)[0]
      }
      return ''
    }
  },
  methods: {

  },
  async created () {
    // let kyc = await service.getKycInfo()
    // if (!kyc.code) {
    //   kyc.data =
    // }

    let historyResult = await service.getLoginHistory()
    if (!historyResult.code) {
      this.historyList = historyResult.data
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../styles/vars";
  @import '../styles/mixins';

  .user-center-right {

    padding-left: 60px;
    float: left;
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
            background: #C1A538;
            left: 0;
            top: 50%;
            margin-top: -2px;
          }
        }
      }
    }
  }
</style>
