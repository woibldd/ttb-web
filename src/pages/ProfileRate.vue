<template>
  <div class="user-center-right">
    <div class="profile-container">
      <div class="rate-tit">交易手续费</div>
      <div class="rate-tab">
        <div class="rate-tab-tit">
          <p class="lt rate-t-a">交易对</p>
          <p class="lt rate-t-b">挂单</p>
          <p class="lt rate-t-c">吃单</p>
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
        <p class="rate-tips-title">提示</p>
        <p>1、挂单是你所下的限价单并未与当前挂单成交，并被放在买卖盘中等待成交的摆单，它增加了买卖盘的流动性。</p>
        <p>2、当其他人的摆单主动与你所下的摆单成交，你将支付挂单交易手续费（请注意当其他人的限价单与你的限价单成交，而下单时间又早于你时，你将支付吃单费）。</p>
        <p>3、吃单是你所下的限价单或市价单与当前的挂单直接成交。</p>
        <p>4、当你所下的摆单主动与其他人的摆单成交，你将支付吃单交易手续费。</p>
        <p>5、交易手续费将从您的成交总额中扣除。若成交后获得比特币资产，则支付比特币交易手续费。</p>
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
