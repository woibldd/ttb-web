<template>
  <div class="otc-new-container">
    <div class="otc-new-nav">
      <div class="otc-new-box" flex="main:justify">
        <div class="l" flex="main:left">
          <div class="nav-item"> 
            <router-link to="/notc/quick">快捷买币</router-link>
          </div>
          <div class="nav-item"> 
            <router-link to="/notc/trade">C2C交易</router-link>
          </div>
        </div>
        <div class="r" flex="main:left">
          <div class="nav-item">交易管理</div>
          <div class="nav-item">帮助中心</div>
        </div> 
      </div>
    </div>
    <div class="otc-new-content">
      <router-view></router-view> 
    </div>
  </div>
</template>

<script>
import {state} from '@/modules/store'
export default {
  data() {
    return {
      state,
    }
  }
}
</script>

<style lang="scss">
.otc-new-container { 
  background-color:#F9F9F9;
  .otc-new-nav {
    background-color: #FFFFFF;
    font-size: 14px;
    color: #272727;
    .otc-new-box {
      width: 1200px;
      margin: 0 auto;
    }
    .nav-item {
      padding: 15px 0;
      margin-right: 40px;
      cursor: pointer;
    }
  }
  .otc-new-content { 
    // margin: 0 auto;
    // width: 1200px;
    // background-color: #F9F9F9;
  }
}
</style>