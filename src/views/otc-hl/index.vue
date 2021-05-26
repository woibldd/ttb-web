<template>
  <div class="otc-simple-container">
    <div class="otc-simple-nav">
      <div class="otc-simple-box" flex="main:justify">
        <!-- {{from}} -->
        <div class="l" flex="main:left">
          <div :class="['nav-item', 'nav-link-left', {active: from==='quick'}]"> 
            <router-link to="/hlotc/quick">{{$t('otc.quick')}}</router-link>
          </div> 
        </div>
        <div class="r" flex="main:left" >
          <div class="nav-item" v-popover:popover-order>
            <label for=""> <icon name="manager" /> {{$t('otc_transaction_manage')}}</label>
            <el-popover
              ref="popover-order"
              popper-class="custom-popover" 
              trigger="hover"
              placement="bottom">
              <ul>
                <li class="nav-link-right"> 
                  <router-link to="/hlotc/order">{{$t('otc_my_order')}}</router-link>
                </li>
                <li class="nav-link-right"> 
                  <router-link to="/hlotc/bill">{{$t('otc_side_35')}}</router-link>
                </li>
                <li class="nav-link-right"> 
                  <router-link to="/hlotc/collection">{{$t('otc_collection_payment_setting')}}</router-link>
                </li>
              </ul>
            </el-popover> 
          </div>
          <div class="nav-item" > 
            <router-link to="/knowledgeBase"> <icon name="help2" /> {{$t('footer_help')}}</router-link> 
          </div>
        </div> 
      </div>
    </div>
    <div class="otc-simple-content">
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
.otc-simple-container { 
  background-color:#F9F9F9;
  .otc-simple-nav {
    background-color: #FFFFFF;
    font-size: 14px;
    color: #272727;
    .otc-simple-box {
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
  .otc-simple-content { 
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