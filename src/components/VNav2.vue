<template>
  <div class="nav_box">
    <div class="c_box">
      <router-link :to="{name:'Test2'}" class="nav_logo"></router-link>
      <div class="nav_right">
        <router-link :to="{name:'Test2'}" class="nav_log_res clk">登陆</router-link>
        <router-link :to="{name:'Test2'}" class="nav_log_res">注册</router-link>
        <div class="lang">简体中文<b></b></div>
      </div>
    </div>
  </div>
</template>

<script>
import {state, actions} from '@/modules/store'
import service from '@/modules/service'
import utils from '@/modules/utils'
import SettingModal from '@/components/SettingModal'

export default {

}
</script>

<style scoped lang="scss">
@import "../styles/vars";
@import "../styles/mixins";

.nav_box{width:100%;height:80px;line-height:42px;
  .nav_logo{float:left;width:150px;height:42px;display:block;background:url(../assets/nav_logo.png);float:left;margin:19px 0;}
  .nav_right{float:right;}
  .nav_right a{
    float:left;margin:19px 0 19px 40px;color:#fff;height:42px;font-size:14px;
    &:hover,&.clk{color:#C9A96C}
  }
  .lang{width:110px;height:24px;float:left;color:#fff;line-height:24px;border-radius:20px;border:1px solid #fff;margin:28px 0 0 60px;background:url(../assets/lang.png) no-repeat 12px center;text-indent:32px;position:relative;font-size:12px;cursor:pointer;
    b{width:8px;height:24px;background:url(../assets/xl.png) center center no-repeat;display:block;position:absolute;top:0;right:16px}
  }


}




</style>
