<template>
  <div class="page-home">
    <div class="header">
      <v-nav2
        is-home="true"
        :notice="notice"
        @hide="notice = null"/>
    </div>
    <div class="banner">
      <div class="banner-txt"/>
    </div>
    <div class="c_box">
      <div class="tl">
        <div class="tlt">
          <p class="tl-tt">IX创世挖矿总额：</p>
          <p class="tl-ct">1000,000,000 IX</p>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import VNav2 from '@/components/VNav2'
export default {
  data () {
  },
  components: {
    VNav2
  }

}
</script>
<style lang="scss" scoped>
  @import "~@/styles/vars";
  @import "~@/styles/mixins";
  .page-home{
    background-color: #262D36;
    background-image: url(/static/active/creation/banner.jpg);
    background-repeat: no-repeat;
    background-position: top center;
  }
  .banner{
    height: 670px;
    width: 100%;
    position: relative;
    .banner-txt{
      position: absolute;
      top: 250px;
      width: 100%;
      height: 137px;
      left: 0;
      background-image: url(/static/active/creation/banner-txt.png);
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
  .c_box{
    width: 1200px;
    height: auto;
    margin: 0 auto;
    &::after{
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      clear: both;
    }
  }
  .tl{
    float: left;
    width: 660px;
    .tlt{
      width: 100%;
      height: 245px;
      background: #24292F;
      text-align: center;
      color: #fff;
      padding-top: 43px;
      box-sizing: border-box;
      .tl-tt{
        font-size: 24px;
        height: 35px;
        line-height: 35px;
      }
      .tl-ct{
        font-size: 72px;
        height: 75px;
        line-height: 75px;
        margin-top: 30px;
      }
    }
  }
</style>
