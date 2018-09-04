<template>
  <footer>
    <div class="c_box">
      <router-link :to="{name:'Test2'}" class="footer_logo"></router-link>
    </div>
  </footer>
</template>

<script>
import {state} from '@/modules/store'
export default {
  
}
</script>

<style scoped lang="scss">
  @import "../styles/vars";
  @import "../styles/mixins";
  footer {
    min-width: $page-width;
    width: 100%;
    height:110px;
    background-color: #000;
  }
  .footer_logo{width:106px;height:30px;background:url(../assets/footer_logo.png);float:left;margin-top:40px;}
</style>
