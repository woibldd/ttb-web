<template>
  <div class="nc-page">
    <div class="nc-box"><div id="nc"></div></div>
  </div>
</template>

<script>
import utils from '@/modules/utils'
import nc from '@/mixins/createnc';

export default {
  mixins: [nc],
  data() {
    return {
      utils
    }
  },
  mounted() {
    this.initnc();
  },
  methods: {
    ncback() {
      if (this.utils.isIos()) {
        android.verifySuccess();
      }

      if (this.utils.isAndroid()) {
        const send = {
          sessionId: this.ncData.sessionId,
          sig: this.ncData.sig
        };
        window.webkit.messageHandlers.getSlideData.postMessage(send);
      }
    }
  }
}
</script>

<style lang="scss">
.nc-page{
  height: 100vh; background: #fff;
  .nc-box{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin: 0 auto; box-sizing: border-box;}
}
</style>