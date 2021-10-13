<template>
  <div
    class="ix-panel"
    :class="{loading: loading}">
    <div class="ix-header-sub" :skin="state.skin"> 
      <label class="ml-15" for="">{{$t('order')}}</label>
      <router-link
        class="mr-20"
        style="float:right;"
        :to="{name: 'Fee'}">{{ $t('footer_fee') }}</router-link>
    </div>  
    <div class="ix-tab-side " flex="box:mean" :skin="state.skin">
      <div class="btn buy"
        @click="state.pro.side=1"
        :class="{active: state.pro.side===1}">
        {{$t('order_side_buy')}}
      </div>
      <div class="btn sell"
        @click="state.pro.side=2"
        :class="{active: state.pro.side===2}">
        {{$t('order_side_sell')}}
      </div> 
    </div> 
    <div class="ix-tab-type"> 
      <!-- <el-tabs v-model="tabType" @tab-click="setTab">
        <el-tab-pane label="限价单" name="limit"></el-tab-pane>
        <el-tab-pane label="市价单" name="market"></el-tab-pane>
        <el-tab-pane label="条件单" name="stop"></el-tab-pane> 
      </el-tabs> --> 
      <div class="type-menus" :class="[state.skin]" style="display:flex;">
        <div  
          @click="setTab('limit')"
          :class="['menu-box', 'mr-30',{active:tabType === 'limit'}]">
          <label>
            {{$t('operate_limit')}}
          </label>
        </div>
        <div  
          @click="setTab('market')"
          :class="['menu-box', 'mr-30',{active:tabType === 'market'}]">
          <label>
            {{$t('operate_market')}}
          </label>
        </div>
        <div  
          @click="setTab('stop')"
          :class="['menu-box', 'mr-30',{active:tabType === 'stop'}]">
          <label>
            {{$t('contractMix.mapFormContent.mapBtns.3.text')}}
          </label>
        </div>
      </div> 
    </div>
    <div class="op-container">
      <ProLimitOrder v-show="tabType === 'limit'"/>
      <ProMarketOrder v-show="tabType === 'market'"/>
      <ProStopOrder v-show="tabType === 'stop'"/>
    </div>
    <!-- <div
      :skin="state.skin"
      class="mask"
      :class="{show: state.userStatus === 0}">
      <div class="mask-front">
        <div class="hint">{{ $t('operate_noauth') }}</div>
        <div class="link-group">
          <a
            class="link btn ibt signin bgcolor-up"
            @click.prevent="signin"><span>{{ $t('signin') }}</span></a>
          <router-link
            class="link btn ibt signup bgcolor-down"
            :to="{name: 'register'}"><span>{{ $t('signup') }}</span></router-link>
        </div>
      </div>
    </div> -->
    <div
      :class="['vertical-login', state.skin]"
      v-if="!state.userInfo" >
      <div class="message mt-30 ml-24">{{ $t('appNav.welcome', {siteName: state.siteName})}}!</div>
      <div class="vertical-login-box">
        <div class="logo">
          <!-- <img :src="require(`../../../assets/site/${state.siteName}/logo${state.skin==='dark' ? '' : '-dark'}.png`)" alt=""> -->
          <img :src="require(`../../../assets/ixx/ixx_logo${state.skin==='dark' ? '' : '-dark'}.png`)" alt="">  
        </div>
        <div
          class="login-button"
          @click="login('login')">{{ $t('appNav.signin') }}</div>
        <div
          class="login-button register mt-20"
          @click="login('register')">{{ $t('appNav.signup') }}</div> 
      </div>
    </div>
  </div>
</template>

<script>
import {state, actions} from '@/modules/store'
import ProLimitOrder from './ProLimitOrder'
import ProMarketOrder from './ProMarketOrder'
import ProStopOrder from './ProStopOrder'

export default {
  name: 'Operate',
  components: {
    ProLimitOrder,
    ProMarketOrder,
    ProStopOrder
  },
  data () {
    return {
      state,
      bodyHeight: 0,
      loading: false,
      tabType: 'limit',
      // tabType: 1, 
      tabSide: 1,
    }
  },
  methods: { 
    login (arg) {
      if (arg === 'login') { 
        this.$router.push({name: 'login'})
      } else if (arg === 'register') { 
        this.$router.push({name: 'register'})
      }
    },
    setTab (tab) {
      // console.log(tab, event)
      this.tabType = tab
      this.$eh.$emit('order:tab_switch', tab)
    },
    layoutInit () {
      this.onresize()
      this.$eh.$on('app:resize', this.onresize)
    },
    onresize () {
      if (this.container)
        this.bodyHeight = this.container.height - 32 + 'px'
    },
    signin () {
      actions.setLoginBack({
        fullPath: this.$route.fullPath
      })
      this.$router.push({
        name: 'login'
      })
    },
    handleSwitchType () {

    }
  },
  destroyed () {
    this.$eh.$off('app:resize', this.onresize)
    this.$eh.$off('protrade:layout:init', this.layoutInit)
  },
  created () {
    this.$eh.$on('protrade:layout:init', this.layoutInit)
  }
}
</script>

<style lang="scss" scoped>
.ix-panel {
  position: relative;
  .ix-tab-side {
    margin: 20px 25px;
    font-size: 14px;
    overflow: hidden;
    // background-color: #2c3138;
    color: #7f7f80;
    text-align: center;  
    // border: 1px solid #dddddd;
    // border-radius: 5px;
    &[skin~='dark'] { 
      color: $--contract-action-label;
      .buy,.sell {
        background-color: #2C3138;
      }
    } 
    .btn { 
      padding: 10px 12px;
    }
    .buy {
      border-radius: 4px;
      // border-color: #dddddd;
      // border-width: 1px;
      // border-style: solid none solid solid;
      background-color: #f3f3f3;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .sell {
      border-radius: 4px;
      // border-color: #dddddd;
      // border-width: 1px;
      // border-style: solid solid solid none; 
      background-color: #f3f3f3;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .active {
      color: #FFFFFF;
      &.buy {
        background-color: $--color-success;
        border:none;
      }
      &.sell {
        background-color: $--color-danger;
        border:none;
      }
    } 
    
  }
  .ix-tab-type {
    margin: 0 25px; 
    .type-menus {
      display:flex; 
      padding-top:10px;
      text-align:center;
      font-size: 14px;
      border-bottom: solid 1px #e6e6e6;
      &.dark {
        border-color: #474747; 
        .menu-box{ 
          color:#ACACAC;
          &.active {
            label { 
              color:#ffffff; 
            }
          } 
        }
      }
      .menu-box{
        height:30px;
        color:#666666;
        &.active {
          label {
            padding: 11px 0;
            color:#3f475a;
            border-bottom:2px solid $primary; 
          }
        } 
      }
    }
  }

  .ix-header-sub {
    // height: 32px;
    // line-height: 32px;
    // text-align: left;
    // background-color: $nav;
    // color: white; 
    height: 32px;
    line-height: 32px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 12px; 
    background-color: $--ix-header-bg;
    color: $--ix-header-color;
    &[skin~='dark'] {
      background-color: $--ix-header-bg2;
      color: $--ix-header-color2;
    }
  }
  .ix-header-nav {
    font-size: 12px;
    opacity: .4;
    transition: opacity 300ms;
    color: $nav-grey-color;
    display: inline-block;
    line-height: 30px;
    height: 30px;
    border-top: none;
    vertical-align: top;
    padding: 0 20px;
    &.cur {
      opacity: 1;
      background: $protrade-bg;
      border-top: 2px solid $primary;
    }
    // &.limit {
    //   border-color: #ff0000;
    // }
    // &.market {
    //   border-color: #00ff00;
    // }
  }
  .op-container {
    box-sizing: border-box;
    padding: 5px 12px 10px;
    overflow-y: auto;
    flex: 1;
    min-height: 250px;
  }
  .mask {
    width: 100%;
    height: 100%;
    z-index: 100;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 300ms, visibility 0s 300ms;
    box-sizing: border-box;
    text-align: center;
    background-color: rgba($loading-mask, 0.8);
    
    &[skin~='dark'] {
      background-color: $loading-mask2;
    }
    &.show {
      transition: none;
      visibility: visible;
      opacity: 1;
    }
    .mask-front {
      position: absolute;
      top: 42%;
      margin-top: -35px;
      width: 100%;
      text-align: center;
      font-size: 0;
    }
    .hint {
      margin-bottom: 18px;
      font-size: 14px;
      color: $loading-mask-color;
    } 
    .link {
      font-size: 12px;
      text-align: center;
      padding: 0 20px;
      min-width: 84px;
      box-sizing: border-box;
      margin: 0 4px 8px;
      color: white;
      border-radius: 3px;
      line-height: 32px;
      &.signin {
        background-color: $buy;
      }
      &.signup {
        background-color: $sell;
      }
    }
  }
}
</style>
