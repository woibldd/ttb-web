<template>
  <div class="nc-page">
    <!-- <div class="title">{{title}}</div> -->
    <nc ref="nc" @getnc="getnc"/>
  </div>
</template>

<script>
import {state} from '@/modules/store';
import utils from '@/modules/utils'
import nc from '@/components/createnc';

export default {
  components: {nc},
  data() {
    return {
      state, utils
    }
  },
  computed: {
    title() {
      const temp = {
        'zh-CN': '安全验证',
        'zh-HK': '安全驗證',
        'en': 'Security',
        'ko': '안전인증'
      };
      const lang = this.$route.query.lang;

      if (lang) return temp[lang];
      else return temp[this.state.locale];
    }
  },
  methods: {
    getnc(data) {
      if (this.utils.isIos()) {
        window.webkit.messageHandlers.getSlideData.postMessage(data);
      }

      if (this.utils.isAndroid()) {
        android.verifySuccess(data.sessionId, data.token, data.sig, data.scene);
      }
    }
  }
}
</script>

<style lang="scss">
.nc-page{
  height: 100vh; padding: 20px; background: #000;
  .title{position: absolute; top: 40%; width: 100%; font-size: 20px; text-align: center; color: $primary;}
  .common{height: 52px!important; line-height: 56px!important; border-radius: 26px!important;}
  .nc-box{
    @extend .common;
    width: 85%;
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin: 0 auto; box-sizing: border-box;

    &.succls{
      .nc-container .nc_wrapper{background: #7f7f7f;}
      .nc_scale, .nc_bg{background: #7f7f7f!important;}
    }
  }
  .nc-container .nc_wrapper{
    @extend .common;
    margin: 0 auto;
    // padding: 0 5px;
    background: #474747;
  }
  .nc_scale{
    @extend .common;
    background: #474747; overflow: hidden;
    .btn_slide, .btn_ok{
      top: -1px; width: 50px; height: 50px!important; border-radius: 50%; text-indent: -9000px;
      background-repeat: no-repeat!important;
      background-position: center center!important;
      background-size: 30px!important;
    }
    .btn_slide{background-image: url('../assets/nc_default.png')!important; background-size: 30px!important; border: #717171 solid 2px;}
    .btn_ok{background-image: url('../assets/nc_succ.png')!important; background-size: 24px!important; border: #b2b2b2 solid 2px;}
    .scale_text{@extend .common;}
    .scale_text2{text-indent: -16px!important;}
    .nc_bg{
      @extend .common;
      background: #7f7f7f!important;
    }
    .nc-lang-cnt{
      -webkit-text-fill-color: #CECECE!important; font-size: 18px; text-indent: 18px;
    }
  }
}
</style>