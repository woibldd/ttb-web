<template>
  <div class="share-option-nav" flex="main:justify cross:strech">
    <div flex="cross:center">
      <!-- <img src="../assets/ixx_logo.png" height="40" alt="" srcset=""> -->
      <svg-icon icon-class="logo"  style="font-size:48px"  />
      <customSelect :mapData="mapData" default="BTC/USD" size="small">
        <div class="prefix-markness" slot="prefix" slot-scope="{value}">
          <svg-icon icon-class="btc" />
          <div class="sub-value">{{value}}</div>
        </div>
      </customSelect>
      <customSelect :mapData="mapData" default="BTC/USD" size="small">
        <div class="prefix-markness" slot="prefix" slot-scope="{value}">
          <svg-icon icon-class="btc" />
          <div class="sub-value">{{value}}</div>
        </div>
      </customSelect>
    </div>
    <div flex="cross:center">
      <a class="login-btn">登录</a>
      <el-button size="mini" type="success"><i class="el-icon-tickets" /> 充值</el-button>
    </div>
  </div>
</template>
<script>
// import logoUrl from '@/assets/ixx-k.png'
import customSelect from '@/components/customSelect'
export default {
  components: {
    customSelect
  },
  data(){
    return {
    }
  },
  created() {
    console.log(this)
  },
  computed: {
    mapData(){
      return [{value:'BTC/USD',subValue:'Digital'},{value:'ETH/USD',subValue:'Digital'}]
    }
  }
}
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
  .share-option-nav{
    height: 60px;
    border-bottom:1px solid rgba(105, 111, 128, 0.5);
    padding: 0 12px;
    box-sizing: border-box;
    .prefix-markness{
      top: 7px;
      left: 5px;
      position: relative;
      .sub-value{
        position: absolute;
        left: 90px;
        top: 1px;
        max-width: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .login-btn{
      margin-right: 20px;
      color: #fff;
      cursor: pointer;
    }
  }
</style>