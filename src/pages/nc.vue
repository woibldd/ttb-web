<template>
  <div class="nc-page">
    <div class="title">{{title}}</div>
    <div class="nc-box"><div id="nc"></div></div>
  </div>
</template>

<script>
import {state} from '@/modules/store';
import utils from '@/modules/utils'
import nc from '@/mixins/createnc';

export default {
  mixins: [nc],
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
  mounted() {
    this.initnc();
  },
  methods: {
    ncback() {
      if (this.utils.isIos()) {
        window.webkit.messageHandlers.getSlideData.postMessage(this.ncData);
      }

      if (this.utils.isAndroid()) {
        android.verifySuccess(this.ncData.sessionId, this.ncData.token, this.ncData.sig, this.ncData.scene);
      }
    }
  }
}
</script>

<style lang="scss">
.nc-page{
  height: 100vh; background: #fff;
  .title{position: absolute; top: 40%; width: 100%; font-size: 20px; text-align: center; color: $primary;}
  .nc-box{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin: 0 auto; box-sizing: border-box;}
}
</style>