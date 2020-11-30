<template>
  <div class="otc-new-container">
    <div class="otc-new-nav">
      <div class="otc-new-box" flex="main:justify">
        <!-- {{from}} -->
        <div class="l" flex="main:left">
          <div :class="['nav-item', 'nav-link-left', {active: from==='quick'}]"> 
            <router-link to="/notc/quick">快捷买币</router-link>
          </div>
          <div :class="['nav-item', 'nav-link-left', {active: from==='trade'}]"> 
            <router-link to="/notc/trade">C2C交易</router-link>
          </div>
        </div>
        <div class="r" flex="main:left" >
          <div class="nav-item" v-popover:popover-order>
            <label for=""> <icon name="manager" /> 交易管理</label>
            <el-popover
              ref="popover-order"
              popper-class="custom-popover" 
              trigger="hover"
              placement="bottom">
              <ul>
                <li class="nav-link-right"> 
                  <router-link to="/notc/order">我的订单/委托单</router-link>
                </li>
                <li class="nav-link-right"> 
                  <router-link to="/notc/bill">法币账单</router-link>
                </li>
                <li class="nav-link-right"> 
                  <router-link to="/notc/collection">收付款设置</router-link>
                </li>
              </ul>
            </el-popover> 
          </div>
          <div class="nav-item" > 
            <router-link to="/knowledgeBase"> <icon name="help2" /> 帮助中心</router-link> 
          </div>
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
  },
  computed: { 
    from () {
      return this.$route.name
    }, 
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
      color: #777777;
      &.active {
        border-bottom: 2px solid #3f3f3f;
      }
      a {
        color: #777777;
        &:hover {
          color: #272727;
        }
        &.router-link-active {
          color: #272727;
        }
      }
    }
  }
  .otc-new-content { 
    min-height: 850px; 
    // margin: 0 auto;
    // width: 1200px;
    // background-color: #F9F9F9;
  }
}
.nav-link-right {
  height: 30px;
  line-height: 30px;
  &:hover {
    background-color: rgba($primary, 0.1);
  }
  a {
    display:inline-block;
    width: 100%;
    color: #272727;
    &:hover {
      color: $primary;
    }
    &.router-link-active {
      color: $primary; 

    }
  }
}
</style>