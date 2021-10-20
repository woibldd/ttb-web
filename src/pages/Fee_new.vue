<template>
  <div class="page "> 
    <div class="banner" 
      :style="{backgroundImage: `url(${require('../assets/home/fee-banner.png')}`}"> 
      <div class="nav-box"> 
        <v-navbc :myClass="'light'" /> 
      </div> 
      <div class="banner-wrap between">
        <div class="l"> 
          <div>
            <div class="title">{{$t('market.fee')}}</div>
            <div class="sub-title">{{$t('fee.slogan', {siteName: 'IXX'})}}</div>
          </div>
        </div>
        <div class="r"> 
        </div>
      </div>
    </div> 
    <div class="page-fee">
      <div style="page-fee-wrap">
        <div class="fee-nav" flex="dir:column">
          <div class="fee-nav-item mr-30"> 
            <router-link :to="{name: 'TradingFee'}">{{$t('trading_fees')}}</router-link>
          </div>
          <div class="fee-nav-item mr-30"> 
            <router-link :to="{name: 'ContractFee'}">{{$t('contract_fees')}}</router-link>
          </div>
          <div class="fee-nav-item mr-30"> 
            <router-link :to="{name: 'UnitContractFee'}">{{$t('fee.unit_fees')}}</router-link>
          </div>
          <div class="fee-nav-item mr-30"> 
            <router-link :to="{name: 'MixContractFee'}">{{$t('fee.mix_fees')}}</router-link>
          </div> 
        </div>
        <div class="fee-center">
          <router-view/>  
        </div>
      </div> 

    </div>       
  </div>

</template>

<script> 
import {state} from '@/modules/store'
import VNavbc from '@/components/VNavBC'
export default {
  data() {
    return {
      state,
      tabName: 'trading',
      dataList: []
    }
  },
  components: {  
    VNavbc, 
  }, 
  computed: {

  }, 
}
</script>
<style lang="scss" scoped>
  
  
  .banner { 
    height:296px;
    color: #fff;
    .banner-wrap {
      width: 1200px;
      height:296px;
      margin:0 auto;
      display: flex; 
      align-items: center;
      .l { 
        .title {
          font-size: 30px;
        }
        .sub-title {
          font-size: 14px;
          margin-top: 10px; 
        }
      }
      .r { 
      }
    } 
    .nav-box {
      position: fixed;
      top: 0;
      left: 0; 
      width: 100%;
      z-index: 4; 
    }
  }

  .page-fee {
    background: #ffffff;
    margin: 0 auto;
    width: 1180px;
    padding-top: 60px;
    padding-bottom: 100px;

    .title_box {
      height: 50px;
      border-bottom: 1px solid #e6e6e6;
      margin-bottom: 50px;
      font-size: 18px;
    }
    .fee-nav {
      .fee-nav-item {
        font-size: 14px;
        a {
          padding-bottom: 6px;
          color:#9C9C9C;
          &.router-link-active { 
            color: #373737;
            border-bottom: 2px solid $primary;
          }
        }
      }
    }
  }
 
  .fee-center {
    padding-top: 60px; 
    .profile-container {
      width: 1200px;
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
    }
  }
</style>
